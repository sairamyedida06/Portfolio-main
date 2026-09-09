/*
 * The shipping record — a real sequence, oldest to newest, then what's next.
 * Set `now: true` on the current moment and `next: true` on the upcoming one
 * (the next node gets a gently pulsing dot).
 */

export const timeline = [
  {
    date: "Mid 2025",
    title: "Started Rash Game Studios",
    accent: "var(--color-ink-soft)",
    note: "Decided to ship on a rhythm instead of chasing one perfect game.",
  },
  {
    date: "Aug 2025",
    title: "Sky Hoppers",
    accent: "var(--color-blue)",
    note: "First release. Learned more from shipping it than from a year of tutorials.",
  },
  {
    date: "Oct 2025",
    title: "Loop Frog",
    accent: "var(--color-sun)",
    note: "Second in two months. The cadence was real.",
  },
  {
    date: "Dec 2025",
    title: "Neon Nudge",
    accent: "var(--color-grape)",
    note: "Procedural levels, and a hard lesson about generation versus taste.",
  },
  {
    date: "Feb 2026",
    title: "Pocket Volley",
    accent: "var(--color-mint)",
    note: "One-thumb sport. Where I learned what input forgiveness really does.",
  },
  {
    date: "Apr 2026",
    title: "Brick Buddy",
    accent: "var(--color-punch)",
    note: "Fifth shipped title. Template paid for itself.",
  },
  {
    date: "Jun 2026",
    title: "Roast Racers — first multiplayer build",
    accent: "var(--color-coral)",
    note: "Eight players in one race for the first time.",
  },
  {
    date: "Aug 2026",
    title: "Fusion 2 migration",
    accent: "var(--color-coral)",
    note: "Rebuilding the netcode on Photon Fusion 2. Where I am right now.",
    now: true,
  },
  {
    date: "Oct 2026",
    title: "[insert next release]",
    accent: "var(--color-blue)",
    note: "The rhythm continues.",
    next: true,
  },
  {
    date: "2027",
    title: "Hold On Happy",
    accent: "var(--color-sun)",
    note: "The long one. The reason the studio exists.",
  },
];

/*
 * Tech stack, grouped and honest. No percentage bars, no star ratings —
 * a short truthful line per group instead.
 */
export const stack = [
  {
    group: "Engine & language",
    accent: "var(--color-blue)",
    items: ["Unity", "C#", "ScriptableObjects", "Cinemachine"],
    note: "My daily tools. Everything I've shipped is built here.",
  },
  {
    group: "Multiplayer",
    accent: "var(--color-coral)",
    items: ["Photon Fusion 2", "Photon PUN 2", "State authority", "Client prediction"],
    note: "Production experience on both. Currently migrating a live project from PUN 2 to Fusion 2.",
  },
  {
    group: "Shipping",
    accent: "var(--color-mint)",
    items: ["Google Play", "App Store", "Construct 3", "WebGL", "CrazyGames"],
    note: "Six titles taken from empty project to live store listing.",
  },
  {
    group: "Working with",
    accent: "var(--color-grape)",
    items: ["Git", "Unity Profiler", "[insert others]"],
    note: "Comfortable, still sharpening. I'd rather say that than overclaim.",
  },
];
