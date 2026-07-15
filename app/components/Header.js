"use client";

import { useEffect, useState } from "react";
import { AnimateIcon, Mail } from "./icons";
import { withBasePath } from "@/lib/base-path";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav__pill">
        <a href="#top" className="nav__brand" aria-label="indaco, home">
          <img src={withBasePath("/images/logo-white.svg")} alt="indaco" />
        </a>
        <nav className="nav__links" aria-label="Navigazione principale">
          <a href="#lavori">Lavori</a>
          <a href="#servizi">Servizi</a>
          <a href="#simbolo">3D</a>
        </nav>
        <AnimateIcon as="a" className="btn btn--nav" href="mailto:andrea.fortuna00@gmail.com">
          Contattami
          <span className="btn__icon">
            <Mail size={14} />
          </span>
        </AnimateIcon>
      </div>
    </header>
  );
}
