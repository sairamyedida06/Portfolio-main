# Yedida Sai Ram — portfolio

Personal portfolio for a Unity / C# game developer, aimed at studios hiring.
Light theme only, one accent colour, sized for reading.

## Run it

```bash
npm run dev     # local dev server
npm run build   # production build into dist/
```

## Where to edit things

Almost everything is content, and content lives in `src/data/`:

| File | Controls |
|---|---|
| `src/data/projects.js` | **All six games.** The homepage list AND the `/work/:slug` detail pages both read from this array. |
| `src/data/experience.js` | Jobs, skills, education, certifications, talks & community. |
| `src/data/links.js` | Name, role, location, email, phone, résumé link, social URLs. |

**Adding or removing a project is a `projects.js` edit only** — the list, the
routes, the detail page, and prev/next navigation all follow automatically.
Set `featured: true` on one project to flag it as the flagship.

Layout and styling:

| File | Controls |
|---|---|
| `src/index.css` | Palette, type sizes, card behaviour, animations. |
| `src/Home.jsx` | Homepage sections and their copy. |
| `src/ProjectDetail.jsx` | The `/work/:slug` page layout. |
| `src/App.jsx` | Header, footer, routing. |
| `src/ui.jsx` | Shared pieces: labels, media frames, spec rows, buttons. |
| `src/HeroToy.jsx` | The drivable car — **copied verbatim from the studio site.** |

`src.backup-v1/` is the previous dark design, kept for reference. Delete it
whenever you like.

## Before you launch

Search the project for `[insert` — that's every remaining blank:

- Your itch.io URL in `src/data/links.js`
- Platform links for the 7Seas titles in `src/data/projects.js`
- The `[insert ...]` notes inside `challenges` and `learned` on each project —
  these are the technical specifics only you know, and they're the parts a
  hiring manager reads most closely
- Your photo at `public/sai-ram.jpg`
- Game screenshots and clips (each placeholder names exactly what goes there)

Also: **export your résumé as PDF** into `public/` and update `profile.cv` in
`src/data/links.js`. The .docx works, but recruiters expect a PDF.

## Notes

- Light theme only — no dark mode, by design.
- The car roams the whole homepage on desktop (arrow keys) and becomes a
  drag-and-fling toy on touch devices. Disabled under `prefers-reduced-motion`.
- Deployment: this is a single-page app with client-side routing. Your host
  needs a rewrite rule sending all paths to `index.html`, or `/work/cross-fire-rush`
  will 404 on a hard refresh. (Netlify: a `_redirects` file containing
  `/* /index.html 200`. Vercel handles it automatically.)
