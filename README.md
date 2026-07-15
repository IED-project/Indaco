# indaco - Portfolio di Andrea Fortuna

Sito portfolio one-page realizzato con **Next.js, React, Tailwind CSS e shadcn**.
Usa gli asset in `public/`, il font Suisse locale, `model-viewer` per il simbolo 3D e il carosello Skiper UI per i progetti.

## Avvio

```bash
npm run dev
```

Poi apri http://localhost:3000.

## Struttura

- `app/page.js` - homepage e contenuti della one-page
- `app/globals.css` - design system, layout responsive e Tailwind CSS
- `components/ui/skiper-ui/skiper47.jsx` - carosello dei progetti
- `app/components/` - componenti del portfolio
- `public/images/optimized/` - copie leggere dei render usati nella pagina
- `public/images/` e `public/models/` - asset originali del brand

## Brand

- Accento **Indaco** `#7D39EB`
- Nero `#0A0910`
- Carta `#F0ECE5`
- Font: Suisse Intl Trial

## Da personalizzare

- Link social reali, se vuoi aggiungerli nel footer
- Licenza del font Suisse Intl per uso commerciale
