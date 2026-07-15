# indaco - Portfolio di Andrea Fortuna

Sito portfolio one-page ristrutturato in **HTML, CSS e JavaScript vanilla**.
La versione statica usa gli asset in `public/`, il font Suisse locale, `model-viewer` per il simbolo 3D e GSAP per il menu staggered e il MagicBento dei servizi.

## Avvio

```bash
npm run dev
```

Poi apri http://localhost:4173

Puoi anche aprire `index.html` direttamente, ma il server locale e' consigliato per il viewer 3D.

## Struttura

- `index.html` - markup semantico della one-page
- `styles.css` - design system, layout responsive e stati interattivi
- `script.js` - preloader, reveal, nav attiva, pannello servizi e form mailto
- `vendor/model-viewer.min.js` - componente 3D locale
- `vendor/gsap.min.js` - animazioni del menu StaggeredMenu e della griglia MagicBento
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
