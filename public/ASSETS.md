# Assets — status & checklist

Files follow a strict naming convention. Drop correctly-named files into a game's
folder and they appear automatically; anything missing shows a labelled
placeholder instead, so the site never looks broken.

```
public/games/<game>/
  cover.jpg     key art / thumbnail  → the game's card + video poster
  clip.mp4      gameplay clip        → banner on the detail page (click to play)
  shot-1.jpg    screenshot           → gallery on the detail page
  shot-2.jpg
  shot-3.jpg
  shot-4.jpg
```

Videos are **click-to-play** with `preload="none"` — a visitor downloads nothing
until they press play, and sees `cover.jpg` until then.

## Current state ✅

| Game | cover | clip | screenshots |
|---|:--:|:--:|:--:|
| Cross Fire Rush | ✅ | ✅ | 4 |
| Water Car Simulator | ✅ | ✅ | 4 |
| Tower War Defense | ✅ | ✅ | 3 |
| Operation Secure | ✅ | ✅ | 3 |
| FractureRun | ❌ | ✅ | 0 |
| Co-op Zombie Survival | — | — | — *(coming-soon card, no media needed yet)* |

**Everything you supplied was compressed** — originals are safe in
`media-originals/` at the project root (not shipped). Screenshots went from
1–3 MB PNGs to 100–240 KB JPEGs; videos from 115–266 MB to 0.7–12 MB.

## Still needed ❌

**FractureRun** is the weakest card right now — it's your only *shipped* personal
game and it has no images. Worth 10 minutes:
```
public/games/fracture-run/cover.jpg     16:9  (key art or a good frame)
public/games/fracture-run/shot-1.jpg    9:16  portrait, it's a mobile game
public/games/fracture-run/shot-2.jpg    9:16
```
Then add matching entries to `media` in `src/data/projects.js`.

**Your photo:**
```
public/about/portrait.jpg    4:3 landscape, 1200px+ wide
```

**One manual delete:** `public/games/cross-fire-rush/0909(1).mp4` (115 MB) is
locked by OneDrive so I couldn't remove it. A copy is already safe in
`media-originals/`. Delete it when OneDrive lets go — the build already strips
it, so it won't ship either way.

## Adding assets later

If you add more screenshots than the data declares, add matching entries to that
game's `media` array in `src/data/projects.js` — `shot-1.jpg` maps to `media[1]`,
`shot-2.jpg` to `media[2]`, and so on.

To re-compress anything new, the settings that worked well were: images resized
to 1600px wide (900px for portrait) at JPEG quality 82; video scaled to 1280px
wide, 30 fps, H.264 CRF 32, no audio, `+faststart`.

---

# Links

## Done ✅
GitHub · LinkedIn · YouTube · Google Play — all live.
FractureRun → Play Store + GitHub.

## Missing ❌

| What | Where |
|---|---|
| 7Seas platform URLs for Water Car Simulator, Tower War Defense, Operation Secure | `links.play` in `src/data/projects.js` |
| Cross Fire Rush link (once it releases) | same |
| itch.io profile URL + handle | `src/data/links.js` |
| Direct repo URLs for FractureRun (currently points at your GitHub profile, not the project) | `links.source` |
| Résumé as **PDF** | `public/` + `profile.cv` |

## Also worth doing

The `[insert ...]` notes inside the **Technical** and **What I'd do differently**
sections of each game are the specifics only you know — the approach you took on
hit registration, what you cut for the WebGL frame budget, how you tuned the wave
curve. Those are the paragraphs interviewers read hardest.
