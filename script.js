// Flag condivisa: se vera, salta o abbrevia le animazioni in tutte le funzioni init qui sotto.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Menu off-canvas: animazione di apertura/chiusura a cascata (prelayer, pannello, link) con GSAP.
function initStaggeredMenu() {
  const wrapper = document.querySelector("[data-staggered-menu]");
  if (!wrapper || !window.gsap) return;

  const toggle = wrapper.querySelector("[data-menu-toggle]");
  const panel = wrapper.querySelector("[data-menu-panel]");
  const layers = Array.from(wrapper.querySelectorAll(".sm-prelayer"));
  const icon = wrapper.querySelector("[data-menu-icon]");
  const textInner = wrapper.querySelector("[data-menu-toggle-text]");
  const menuLinks = Array.from(panel.querySelectorAll("a"));
  const position = wrapper.dataset.position || "right";
  const offscreen = position === "left" ? -100 : 100;
  let open = false;
  let busy = false;
  let openTimeline = null;
  let closeTween = null;
  let textTween = null;

  const setToggleText = (opening) => {
    const currentLabel = opening ? "Menu" : "Chiudi";
    const targetLabel = opening ? "Chiudi" : "Menu";
    const sequence = [currentLabel, targetLabel, currentLabel, targetLabel, targetLabel];
    textInner.innerHTML = sequence.map((label) => `<span class="sm-toggle-line">${label}</span>`).join("");
    gsap.set(textInner, { yPercent: 0 });
    textTween?.kill();
    textTween = gsap.to(textInner, {
      yPercent: -80,
      duration: 0.74,
      ease: "power4.out",
    });
  };

  const resetPanelContent = () => {
    const labels = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numbered = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    gsap.set(labels, { yPercent: 140, rotate: 10 });
    gsap.set(numbered, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
  };

  const setA11y = (nextOpen) => {
    wrapper.toggleAttribute("data-open", nextOpen);
    document.body.classList.toggle("menu-open", nextOpen);
    toggle.setAttribute("aria-expanded", String(nextOpen));
    toggle.setAttribute("aria-label", nextOpen ? "Chiudi menu" : "Apri menu");
    panel.setAttribute("aria-hidden", String(!nextOpen));
    panel.inert = !nextOpen;
  };

  const playOpen = () => {
    openTimeline?.kill();
    closeTween?.kill();
    resetPanelContent();
    busy = true;

    const labels = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numbered = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const tl = gsap.timeline({
      onComplete: () => {
        busy = false;
      },
    });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen, opacity: 1 },
        { xPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
        index * 0.07
      );
    });

    const panelStart = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
    tl.fromTo(
      panel,
      { xPercent: offscreen, opacity: 1 },
      { xPercent: 0, opacity: 1, duration: 0.65, ease: "power4.out" },
      panelStart
    );

    tl.to(
      labels,
      {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      panelStart + 0.12
    );

    tl.to(
      numbered,
      {
        "--sm-num-opacity": 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      },
      panelStart + 0.22
    );

    if (socialTitle) {
      tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, panelStart + 0.26);
    }

    if (socialLinks.length) {
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
        },
        panelStart + 0.3
      );
    }

    openTimeline = tl;
  };

  const playClose = () => {
    openTimeline?.kill();
    busy = true;
    closeTween?.kill();
    closeTween = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        resetPanelContent();
        busy = false;
      },
    });
  };

  const openMenu = () => {
    if (busy || open) return;
    open = true;
    setA11y(true);
    setToggleText(true);
    gsap.to(icon, { rotate: 225, duration: 0.8, ease: "power4.out", overwrite: "auto" });
    gsap.to(toggle, { color: "#0a0910", delay: 0.18, duration: 0.3, ease: "power2.out" });
    playOpen();
  };

  const closeMenu = () => {
    if (busy || !open) return;
    open = false;
    setA11y(false);
    setToggleText(false);
    gsap.to(icon, { rotate: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(toggle, { color: "#f0ece5", delay: 0.04, duration: 0.24, ease: "power2.out" });
    playClose();
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else openMenu();
  };

  gsap.set([panel, ...layers], { xPercent: offscreen, opacity: 1 });
  gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
  panel.inert = true;
  resetPanelContent();

  toggle.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (link.getAttribute("href")?.startsWith("#")) closeMenu();
    });
  });

  document.addEventListener("mousedown", (event) => {
    if (!open) return;
    if (panel.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// Video di apertura a schermo intero: parte al caricamento, poi nasconde l'overlay (con timeout di sicurezza).
function initPreloader() {
  const preloader = document.querySelector("[data-preloader]");
  const video = document.querySelector("[data-preloader-video]");
  if (!preloader) return;

  const finish = () => preloader.classList.add("is-done");

  if (prefersReducedMotion || !video) {
    finish();
    return;
  }

  const fallback = window.setTimeout(finish, 4000);

  video.addEventListener("ended", () => {
    window.clearTimeout(fallback);
    window.setTimeout(finish, 260);
  });

  video.addEventListener("error", () => {
    window.clearTimeout(fallback);
    finish();
  });
}

// Header del sito: aggiunge uno sfondo pieno/sfocato quando la pagina viene scrollata.
function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const setState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setState();
  window.addEventListener("scroll", setState, { passive: true });
}

// Testo della missione: divide il testo in parole e le accende di bianco man mano che si scorre.
function initMissionReveal() {
  const text = document.querySelector("[data-mission-text]");
  if (!text) return;

  const words = text.textContent.trim().split(/\s+/);
  text.innerHTML = words.map((word) => `<span class="mission__word">${word}</span>`).join(" ");
  const wordEls = Array.from(text.querySelectorAll(".mission__word"));

  if (prefersReducedMotion) {
    wordEls.forEach((el) => el.classList.add("is-lit"));
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = text.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // Il progresso va da "il testo entra vicino al fondo del viewport" (start)
    // a "il testo si avvicina al terzo superiore" (end), coprendo l'intera altezza del blocco.
    const start = viewportHeight * 0.9;
    const end = viewportHeight * 0.35;
    const total = rect.height + (start - end);
    const traveled = start - rect.top;
    const progress = Math.min(1, Math.max(0, traveled / total));
    const litCount = Math.round(progress * wordEls.length);

    wordEls.forEach((el, index) => {
      el.classList.toggle("is-lit", index < litCount);
    });
  };

  // Rallenta lo scroll handler con rAF: ricalcola al massimo una volta per frame.
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

// Fade-in generico: rivela ogni elemento [data-reveal] la prima volta che entra nel viewport.
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

// Evidenziazione nav: marca il link dell'header/menu della sezione attualmente visibile.
function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".site-nav a, .sm-panel-item[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const targets = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.22, rootMargin: "-22% 0px -56% 0px" }
  );

  targets.forEach((target) => observer.observe(target));
}

// Form di contatto: validazione lato client, poi apre un link mailto: precompilato (nessun backend).
function initContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("[data-form-status]");
  if (!form || !status) return;

  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    message: form.elements.message,
  };

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  };

  const markInvalid = (field, invalid) => {
    field.classList.toggle("is-invalid", invalid);
    field.setAttribute("aria-invalid", invalid ? "true" : "false");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    markInvalid(fields.name, name.length < 2);
    markInvalid(fields.email, !emailIsValid);
    markInvalid(fields.message, message.length < 12);

    if (name.length < 2 || !emailIsValid || message.length < 12) {
      setStatus("Completa nome, email valida e un messaggio un po' piu dettagliato.", true);
      return;
    }

    const subject = encodeURIComponent(`Nuovo progetto da ${name}`);
    const body = encodeURIComponent(`${message}\n\nDa: ${name}\nEmail: ${email}`);
    setStatus("Apro il client email con il messaggio gia compilato.");
    window.location.href = `mailto:andrea.fortuna00@gmail.com?subject=${subject}&body=${body}`;
  });

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      markInvalid(field, false);
      if (status.classList.contains("is-error")) setStatus("");
    });
  });
}

// Clona ogni track del marquee abbastanze volte da riempire la riga per un loop continuo.
function initLogosMarquee() {
  const rows = document.querySelectorAll(".logos__row");
  rows.forEach((row) => {
    const track = row.querySelector(".logos__track");
    if (!track) return;

    const rowWidth = row.getBoundingClientRect().width;
    const trackWidth = track.getBoundingClientRect().width;
    if (!trackWidth) return;

    // Servono abbastanza copie perché il contenuto copra sempre il viewport mentre
    // una track scorre completamente fuori (ognuna anima translateX della propria larghezza).
    const copies = Math.max(2, Math.ceil((rowWidth * 2) / trackWidth));
    for (let i = 1; i < copies; i += 1) {
      const clone = track.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      row.appendChild(clone);
    }
  });
}

// Progetti: la sezione resta pinnata (position: sticky) mentre si scrolla il wrapper alto,
// e il progresso verticale viene tradotto in translateX della strip. Scroll nativo mai bloccato:
// rotellina, trackpad, touch e tastiera funzionano tutti senza gestione di eventi ad hoc.
function initHorizontalScroll() {
  const wrapper = document.querySelector("[data-horizontal-wrapper]");
  const track = document.querySelector("[data-horizontal-track]");
  if (!wrapper || !track || prefersReducedMotion) return;

  let maxX = 0;
  let ticking = false;

  const measure = () => {
    // Larghezza della strip meno un viewport = corsa massima orizzontale.
    maxX = track.scrollWidth - window.innerWidth;
  };

  const update = () => {
    const rect = wrapper.getBoundingClientRect();
    const total = wrapper.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    track.style.transform = `translateX(${-progress * maxX}px)`;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  measure();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    update();
  });
}

// Avvia tutte le funzionalità qui sopra al caricamento dello script.
initPreloader();
initStaggeredMenu();
initHeader();
initMissionReveal();
initHorizontalScroll();
initReveal();
initActiveNav();
initContactForm();
initLogosMarquee();
