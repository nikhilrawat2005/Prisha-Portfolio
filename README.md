# Pratyaksha — UI/UX Portfolio

A self-contained portfolio site. Mobile-first (built natively for phone screens, then a separate adapted layout for laptop/desktop — not a shrunk desktop site).

## How to open it

**Quickest:** double-click `index.html` — it opens straight in your browser. Everything (fonts via Google Fonts CDN, images, videos) works from this folder as-is.

**To host it properly (recommended before sharing the link):**
- Drag the whole `portfolio` folder onto [Netlify Drop](https://app.netlify.com/drop), or
- Upload it to GitHub Pages / Vercel / any static host
- Keep the folder structure exactly as-is — `index.html`, `style.css`, `script.js` and the `assets/` folder all need to stay together

## What's inside

```
portfolio/
├── index.html      → all page content/sections
├── style.css        → design system (colors, type, layout, animation)
├── script.js         → scroll reveal, section nav, lightbox logic
└── assets/           → images + videos used in the Work section
```

## Editing content later

- **Text:** open `index.html`, all copy is plain text inside the tags — safe to edit directly.
- **Colors/fonts:** all defined once at the top of `style.css` under `:root { ... }` — change a value there and it updates everywhere.
- **Contact links:** search `index.html` for `wa.me`, `linkedin.com`, and `mailto:` to update the WhatsApp number, LinkedIn URL or email.
- **Adding a new project card:** copy one `<button class="card">...</button>` block in the Work section and swap the `data-*` attributes and image paths.

## Notes

- Built with plain HTML/CSS/JS — no build step, no dependencies to install.
- Respects reduced-motion settings and has visible keyboard focus states.
- Tested across phone, tablet, laptop and large desktop widths.
