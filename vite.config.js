import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
 * Everything in public/ is copied into the build verbatim, so a stray original
 * (a 100 MB screen recording, an unprocessed PNG) would silently ship. Game
 * assets follow a strict naming convention — anything else in dist/games is
 * dropped after the copy, and named in the build log.
 */
const CONVENTION = /^(cover\.jpg|clip\.mp4|shot-\d+\.jpg)$/;

function pruneStrayGameAssets() {
  return {
    name: "prune-stray-game-assets",
    apply: "build",
    closeBundle() {
      const root = path.resolve("dist/games");
      if (!fs.existsSync(root)) return;
      for (const slug of fs.readdirSync(root)) {
        const dir = path.join(root, slug);
        if (!fs.statSync(dir).isDirectory()) continue;
        for (const file of fs.readdirSync(dir)) {
          if (CONVENTION.test(file)) continue;
          const full = path.join(dir, file);
          const mb = (fs.statSync(full).size / 1048576).toFixed(1);
          fs.rmSync(full, { force: true, recursive: true });
          this.warn(`pruned unused asset from build: games/${slug}/${file} (${mb} MB)`);
        }
      }
    },
  };
}

/*
 * GitHub Pages serves unknown paths with 404.html. Shipping a copy of
 * index.html under that name lets a direct hit on /work/<slug> boot the app
 * and route correctly, instead of showing GitHub's 404 page.
 */
function spaFallback() {
  return {
    name: "spa-fallback-404",
    apply: "build",
    closeBundle() {
      const index = path.resolve("dist/index.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve("dist/404.html"));
        // Stops Pages' Jekyll step from skipping files it doesn't recognise.
        fs.writeFileSync(path.resolve("dist/.nojekyll"), "");
      }
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  /*
   * Production is served from https://sairamyedida06.github.io/Portfolio-main/,
   * so every asset URL needs that prefix — but `npm run dev` stays at the root
   * so localhost keeps working normally. `vite preview` reports command
   * "serve", so it needs the isPreview check too, otherwise it serves at "/"
   * while the built HTML points at the subpath and nothing loads.
   * Override with VITE_BASE for a custom domain (then it's just "/").
   */
  base: command === "build" || isPreview ? (process.env.VITE_BASE ?? "/Portfolio-main/") : "/",
  plugins: [react(), tailwindcss(), pruneStrayGameAssets(), spaFallback()],
  // Honor an externally assigned port so multiple dev servers can coexist.
  server: {
    port: Number(process.env.PORT) || 5177,
    strictPort: Boolean(process.env.PORT),
  },
}));
