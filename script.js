const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function initPreloader() {
  const preloader = document.querySelector("[data-preloader]");
  const count = document.querySelector("[data-count]");
  if (!preloader || !count) return;

  if (prefersReducedMotion) {
    count.textContent = "100";
    preloader.classList.add("is-done");
    return;
  }

  const duration = 1000;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const value = Math.min(100, Math.floor((elapsed / duration) * 100));
    count.textContent = String(value);

    if (elapsed < duration) {
      window.requestAnimationFrame(tick);
    } else {
      count.textContent = "100";
      window.setTimeout(() => preloader.classList.add("is-done"), 180);
    }
  };

  window.requestAnimationFrame(tick);
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const setState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setState();
  window.addEventListener("scroll", setState, { passive: true });
}

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

function duplicateTrack(selector) {
  const track = document.querySelector(selector);
  if (!track) return;

  Array.from(track.children).forEach((child) => {
    const clone = child.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.inert = true;
    track.appendChild(clone);
  });
}

initPreloader();
initStaggeredMenu();
initHeader();
initReveal();
initActiveNav();
initContactForm();
duplicateTrack(".gallery__track");
if (window.matchMedia("(max-width: 1440px)").matches) {
  duplicateTrack(".logos__track");
}
