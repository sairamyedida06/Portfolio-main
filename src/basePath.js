/*
 * Vite rewrites asset URLs it can see at build time (imports, CSS url()), but
 * NOT paths we build as strings at runtime. On GitHub Pages the site lives at
 * /Portfolio-main/, so "/games/foo.jpg" would 404. Route every runtime asset
 * path through this.
 *
 *   dev   → BASE_URL "/"                → /games/foo.jpg
 *   build → BASE_URL "/Portfolio-main/" → /Portfolio-main/games/foo.jpg
 */
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;
