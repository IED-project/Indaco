export default function GlassHero() {
  return (
    <section className="ghero">
      {/* Filtro SVG: turbolenza fractal + displacement per la rifrazione reale */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="glass-fractal" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.09"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="90"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Aurora sullo sfondo, fuori dal vetro */}
      <div className="ghero__aurora" aria-hidden>
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
      </div>

      <div className="glass">
        {/* Aurora rifratta dentro il vetro */}
        <div className="glass__refract" aria-hidden>
          <span className="blob blob--a" />
          <span className="blob blob--b" />
          <span className="blob blob--c" />
        </div>
        <div className="glass__ribs" aria-hidden />
        <div className="glass__sheen" aria-hidden />

        <div className="glass__content">
          <div className="glass__top">
            <span className="glass__pill">INDACO · AF 2026</span>
            <ul className="glass__col">
              <li>ITALIA</li>
              <li>DISPONIBILE</li>
              <li>FREELANCE</li>
            </ul>
            <ul className="glass__col">
              <li>BRAND IDENTITY</li>
              <li>3D &amp; MOTION</li>
              <li>DIREZIONE VISIVA</li>
            </ul>
            <ul className="glass__col">
              <li>PORTFOLIO</li>
              <li>STUDIO</li>
              <li>CONTATTI</li>
            </ul>
          </div>

          <div className="glass__bottom">
            <h1 className="glass__title">
              <span className="glass__line glass__line--1">
                INDACO
                <span className="glass__aside">
                  ANDREA FORTUNA
                  <br />
                  DESIGNER &amp; FOUNDER
                  <br />
                  PORTFOLIO
                </span>
              </span>
              <span className="glass__line glass__line--2">
                <svg
                  className="glass__star"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"
                    fill="currentColor"
                  />
                </svg>
                STUDIO
                <span className="glass__arrow" aria-hidden>
                  ⟶
                </span>
                <span className="glass__date">©2026</span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
