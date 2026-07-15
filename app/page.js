import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Reveal from "./components/Reveal";
import ModelViewer from "./components/ModelViewer";
import { Carousel_001 } from "@/components/ui/skiper-ui/skiper47";
import {
  AnimateIcon,
  ArrowRight,
  Sparkles,
  Eye,
  Box,
  Globe,
  Smartphone,
  LayoutGrid,
} from "./components/icons";

const progetti = [
  {
    num: "01",
    eyebrow: "UI · UX",
    titolo: "OFFFY",
    img: "/images/OFFFY-mockup-iphone.jpg",
    alt: "Interfaccia mobile del progetto OFFFY",
  },
  {
    num: "02",
    eyebrow: "3D · BRAND IDENTITY",
    titolo: "Relive",
    img: "/images/relive-preview.jpg",
    alt: "Visual tridimensionale del progetto Relive",
  },
  {
    num: "03",
    eyebrow: "BRAND IDENTITY",
    titolo: "Play Camp",
    img: "/images/Play_camp.jpg",
    alt: "Identità visiva del progetto Play Camp",
  },
  {
    num: "04",
    eyebrow: "VISUAL IDENTITY",
    titolo: "House of Cocktail",
    img: "/images/House_of_cocktail-banner.jpg",
    alt: "Banner del progetto House of Cocktail",
  },
  {
    num: "05",
    eyebrow: "CREATIVE CONCEPT",
    titolo: "Starbucks × Supreme",
    img: "/images/Starbucks_Supreme-preview.webp",
    alt: "Concept creativo Starbucks e Supreme",
  },
  {
    num: "06",
    eyebrow: "3D · MOTION",
    titolo: "Materia digitale",
    img: "/images/modellazione-3d-mockup.jpeg",
    alt: "Mockup di modellazione tridimensionale",
  },
];

const servizi = [
  {
    icona: Sparkles,
    nome: "Brand identity",
    testo:
      "Identità visive e sistemi di marca: logo, colore, tipografia e regole d'uso pensate per durare.",
  },
  {
    icona: Eye,
    nome: "Direzione visiva",
    testo:
      "Una direzione estetica chiara e coerente, dalla tipografia al motion fino ai dettagli.",
  },
  {
    icona: Box,
    nome: "3D & Motion",
    testo:
      "Render, materiali e animazioni in Blender per dare profondità e carattere al brand.",
  },
  {
    icona: Globe,
    nome: "Web design",
    testo:
      "Siti curati per studi, founder e brand, espressivi e facili da navigare.",
  },
  {
    icona: Smartphone,
    nome: "Product design",
    testo:
      "UX e UI per prodotti digitali, dai primi flussi alle interfacce pronte per lo sviluppo.",
  },
  {
    icona: LayoutGrid,
    nome: "Design system",
    testo:
      "Fondamenta scalabili e componenti riutilizzabili, utili anche dopo la consegna.",
  },
];

const numeri = [
  { valore: "1", label: "Simbolo" },
  { valore: "3", label: "Colori di brand" },
  { valore: "8", label: "Pesi tipografici" },
  { valore: "11", label: "Render 3D" },
];

const marquee = [
  "Brand identity",
  "3D & Motion",
  "Direzione visiva",
  "Web design",
  "Product design",
  "Design system",
];

function MarqueeRow() {
  return (
    <>
      {marquee.map((m) => (
        <span key={m}>
          {m}
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Preloader />
      <Header />
      <Reveal />

      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__pill" data-reveal>
            INDACO · PORTFOLIO 2026
          </span>
          <h1 data-reveal>
            Do forma a brand,
            <br />
            prodotti digitali e mondi 3D.
          </h1>
          <p className="hero__sub" data-reveal>
            Sono Andrea Fortuna, designer e founder di indaco. Unisco identità,
            interfacce e 3D con chiarezza e carattere.
          </p>
          <div className="hero__ctas" data-reveal>
            <AnimateIcon
              as="a"
              className="btn btn--big"
              href="mailto:andrea.fortuna00@gmail.com"
            >
              Contattami
              <span className="btn__icon">
                <ArrowRight size={16} />
              </span>
            </AnimateIcon>
            <a className="btn btn--big btn--ghost" href="#lavori">
              Scopri i lavori
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      {/* 3D stage */}
      <section className="section container" id="simbolo">
        <div className="section__head section__head--center" data-reveal>
          <span className="eyebrow">IL SIMBOLO</span>
          <h2>La stella a quattro punte, in tre dimensioni.</h2>
          <p>
            Ruota, avvicina, esplora: il cuore del brand indaco reso come
            oggetto reale.
          </p>
        </div>
        <div className="stage" data-reveal>
          <ModelViewer />
        </div>
      </section>

      {/* Progetti */}
      <section className="section container" id="lavori">
        <div className="section__head section__head--center" data-reveal>
          <span className="eyebrow">LAVORI SELEZIONATI</span>
          <h2>Progetti selezionati.</h2>
          <p>
            Identità, prodotti digitali e mondi 3D. Trascina per esplorare una
            selezione dei miei lavori.
          </p>
        </div>
        <div className="projects-carousel" data-reveal>
          <Carousel_001
            images={progetti}
            showPagination
            showNavigation
            loop
            spaceBetween={24}
          />
        </div>
      </section>

      {/* Servizi */}
      <section className="section container" id="servizi">
        <div className="section__head section__head--center" data-reveal>
          <h2>Cosa posso fare per te.</h2>
        </div>
        <div className="cards">
          {servizi.map((s) => {
            const Icona = s.icona;
            return (
              <AnimateIcon as="div" className="card" key={s.nome} data-reveal>
                <Icona size={30} className="card__icon" />
                <h3>{s.nome}</h3>
                <p>{s.testo}</p>
              </AnimateIcon>
            );
          })}
        </div>
      </section>

      {/* Numeri del brand */}
      <section className="section container">
        <div className="stats" data-reveal>
          {numeri.map((n) => (
            <div className="stats__cell" key={n.label}>
              <span className="stats__value">{n.valore}</span>
              <span className="stats__label">{n.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="section container">
        <div className="cta" data-reveal>
          <h2>
            Hai un progetto in mente?
            <br />
            Parliamone.
          </h2>
          <AnimateIcon
            as="a"
            className="btn btn--big"
            href="mailto:andrea.fortuna00@gmail.com"
          >
            Contattami
            <span className="btn__icon">
              <ArrowRight size={16} />
            </span>
          </AnimateIcon>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container" id="contatti">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/images/logo-white.svg" alt="indaco" />
            <a href="mailto:andrea.fortuna00@gmail.com">
              andrea.fortuna00@gmail.com
            </a>
          </div>
          <div className="footer__col">
            <span>Menu</span>
            <a href="#lavori">Lavori</a>
            <a href="#servizi">Servizi</a>
            <a href="#simbolo">3D</a>
          </div>
          <div className="footer__col">
            <span>Social</span>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>Progettato e sviluppato da Andrea Fortuna · indaco®</span>
          <span>©2026</span>
        </div>
      </footer>
    </main>
  );
}
