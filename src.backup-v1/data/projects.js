/*
 * Every project on the site. Adding, removing, or reordering an entry here is
 * the ONLY change needed — the homepage grid and the /work/:slug detail pages
 * both read from this array, and routes generate from it.
 *
 * Order = display order (newest / most important first).
 * `featured: true` gets the large spotlight card. Keep it to one.
 * `accent` must be one of the palette CSS variables so it themes correctly.
 */

export const projects = [
  {
    slug: "roast-racers",
    title: "Roast Racers",
    accent: "var(--color-coral)",
    year: "2026",
    role: "Solo developer",
    status: "In development",
    hook: "A 4–8 player mobile racer where the loser gets roasted, automatically.",
    stack: ["Unity", "C#", "Photon Fusion 2", "Photon PUN 2"],
    platforms: ["iOS", "Android", "Web"],
    featured: true,
    thumb: { label: "Roast Racers — key art", ratio: "16/10" },
    pitch:
      "Two-minute races built for group chats: 4–8 players, ridiculous power-ups, and an automatic roast for whoever finishes last. It's the biggest thing I've built and the first time I've had to make a game feel fair to eight people on eight different phone networks at once.",
    built: [
      "Full multiplayer racing loop on Photon Fusion 2 — room creation, matchmaking, countdown, race state, and results, for up to 8 concurrent players.",
      "Migrated the entire networking layer from Photon PUN 2 to Fusion 2, on a separate branch, keeping the PUN build shippable the whole time as a fallback.",
      "Single-player progression and economy: currency, rewards, and unlock pacing, with every tuning knob exposed in a ProgressionConfig ScriptableObject so balance changes don't need a rebuild.",
      "The roast system — the game's actual hook — that picks and delivers a line to whoever finishes last.",
      "Vehicle handling and drift feel: the part I've iterated on more than anything else, because a racer lives or dies on how the car feels in the first ten seconds.",
      "[insert: UI work, audio, store setup, or anything else you want credited]",
    ],
    challenges: [
      {
        problem:
          "PUN 2 was the wrong long-term foundation. Its room-based model made authoritative race state awkward, and I could feel the ceiling coming as player counts went up.",
        solution:
          "I moved to Fusion 2 on a dedicated branch rather than in place, so main stayed shippable throughout. Working through Fusion's tick-based simulation and network-object authority model rather than PUN's RPC-first approach meant re-thinking who owns race state, not just swapping an API. Keeping a working fallback branch turned a risky rewrite into a reversible one.",
      },
      {
        problem:
          "Eight players on mobile networks means jitter, packet loss, and players who genuinely disagree about where the cars are.",
        solution:
          "Leaning on Fusion's prediction and state authority so each client simulates locally and reconciles against the authoritative tick, rather than waiting on round-trips. The goal is not perfect accuracy — it's that no player ever feels cheated by something they couldn't see coming. [insert your specific interpolation / rollback details]",
      },
      {
        problem:
          "Balancing progression meant rebuilding and redeploying for every number tweak, which made iteration painfully slow.",
        solution:
          "Pulled every reward value, cost, and unlock threshold into a ProgressionConfig ScriptableObject loaded from Resources, with starting balances centralized in one utility. Tuning the economy became editing values instead of editing code — the kind of change that sounds small and saves entire evenings.",
      },
    ],
    learned:
      "I should have moved to Fusion earlier. I spent weeks working around PUN's limits before admitting the foundation was wrong, and the migration itself was faster than the workarounds had been. Next time I'll prototype the networking model before building content on top of it. I'd also write the economy config layer on day one rather than retrofitting it.",
    media: [
      { label: "Roast Racers — looping gameplay clip", ratio: "16/9", video: true },
      { label: "Screenshot — eight-player start line", ratio: "9/16" },
      { label: "Screenshot — the roast screen", ratio: "9/16" },
      { label: "Screenshot — drift through a corner", ratio: "9/16" },
    ],
    links: { play: "[insert store link]", source: "", devlog: "" },
  },

  {
    slug: "hold-on-happy",
    title: "Hold On Happy",
    accent: "var(--color-sun)",
    year: "2027",
    role: "Solo developer",
    status: "In development",
    hook: "A man, his golden labrador, and one long walk across a city.",
    stack: ["Unity", "C#", "Cinemachine"],
    platforms: ["[insert target platforms]"],
    thumb: { label: "Hold On Happy — key art", ratio: "16/10" },
    pitch:
      "A third-person narrative adventure about the kind of friendship that doesn't need words. It's the slowest, most personal thing I'm making — the game I started the studio to build — and the small games fund the time it takes.",
    built: [
      "Third-person character controller and camera work for a game that's about walking, not fighting — which turns out to be harder to make feel good.",
      "Companion AI for Happy: pathing, follow behavior, and the small idle moments that make a dog read as alive rather than as a navmesh agent.",
      "Environment and scene structure for a continuous city walk.",
      "[insert: narrative system, dialogue, audio, animation pipeline]",
    ],
    challenges: [
      {
        problem:
          "A companion character that follows you is easy to build and very easy to make annoying — clipping through geometry, blocking doorways, breaking the emotional read in one bad frame.",
        solution:
          "Treating Happy's believability as a bug class of its own rather than a polish task. Most of the work is in the idle and recovery states — what he does when he's waiting, and how he gets un-stuck without the player noticing. [insert your specific approach]",
      },
      {
        problem:
          "Building an emotional, cinematic game solo, alongside shipping an arcade title every two months.",
        solution:
          "Deliberately structuring it as the long project: the fast games pay for the studio and sharpen the craft, and this one gets the slow, careful hours. Scoping it as a walk rather than an open world is what makes it finishable by one person.",
      },
    ],
    learned:
      "Restraint is a feature. Every system I've cut from this game has made it better, and the parts people react to are the quiet ones — the dog sitting down when you stop walking, not anything clever I built.",
    media: [
      { label: "Hold On Happy — cinematic trailer", ratio: "16/9", video: true },
      { label: "Screenshot — city rooftops at dusk", ratio: "3/4" },
      { label: "Screenshot — rainy crosswalk", ratio: "3/4" },
      { label: "Screenshot — the park scene", ratio: "3/4" },
    ],
    links: { play: "", source: "", devlog: "" },
  },

  {
    slug: "rash-arcade",
    title: "Rash Arcade",
    accent: "var(--color-blue)",
    year: "2025 – 2026",
    role: "Developer & publisher",
    status: "Live",
    hook: "Six shipped games in a year, on a two-month release rhythm.",
    stack: ["Unity", "Construct 3", "C#", "WebGL"],
    platforms: ["iOS", "Android", "Web"],
    thumb: { label: "Rash Arcade — collection grid", ratio: "16/10" },
    pitch:
      "Rather than disappear for three years building one perfect game, I set a rhythm: ship something real every two months. Six games later, that constraint has taught me more about finishing than any tutorial ever did.",
    built: [
      "Six complete games shipped end to end — design, build, store listing, and release — between August 2025 and June 2026.",
      "A reusable project template that got each new game from empty repo to playable prototype in days rather than weeks.",
      "The browser arcade that hosts the web builds, so anything can be played instantly without an install.",
      "Store presence and release process across Google Play and the App Store.",
    ],
    challenges: [
      {
        problem:
          "A two-month cadence means there is no time to rebuild the same systems every project.",
        solution:
          "Everything shared — menus, audio management, save handling, analytics hookup — moved into a template I start from. Each game only contains what makes it that game. The cadence is only sustainable because the boring 60% is already solved.",
      },
      {
        problem:
          "Shipping fast makes it tempting to ship badly, and a bad release costs more than a late one.",
        solution:
          "A fixed pre-release checklist: it runs on a low-end device, it survives a backgrounded app, first-time users understand it without a tutorial, and I've played it myself for an hour without getting bored. If it fails the list, the date moves.",
      },
    ],
    learned:
      "Finishing is a skill, and it's trainable. The sixth game took a fraction of the effort of the first, not because the games got simpler, but because I stopped re-solving solved problems and got much better at cutting scope early.",
    media: [
      { label: "Arcade — collection screenshot", ratio: "16/9" },
      { label: "Screenshot — a selection of shipped titles", ratio: "16/9" },
    ],
    links: { play: "[insert arcade URL]", source: "", devlog: "" },
  },

  {
    slug: "pocket-volley",
    title: "Pocket Volley",
    accent: "var(--color-mint)",
    year: "2026",
    role: "Solo developer",
    status: "Shipped Feb 2026",
    hook: "One-thumb volleyball with a nasty spike.",
    stack: ["Unity", "C#"],
    platforms: ["iOS", "Android"],
    thumb: { label: "Pocket Volley — key art", ratio: "16/10" },
    pitch:
      "A whole sport compressed into one thumb and one button. The design problem was making timing feel skilful rather than random when the player only has a single input.",
    built: [
      "Physics-driven ball and hit system tuned so that timing, not luck, decides a rally.",
      "Single-input control scheme with an input buffer, so a slightly-early tap still reads as the shot the player intended.",
      "Opponent AI with difficulty that ramps by making believable mistakes rather than by getting arbitrarily faster.",
    ],
    challenges: [
      {
        problem:
          "With one button, a miss by 50 milliseconds feels like the game cheated rather than like the player was late.",
        solution:
          "An input buffer plus a small forgiveness window on the hit timing. It's technically 'easier', but it made the game feel harder in the right way — players started blaming their own timing instead of the controls, which is exactly the feeling a skill game needs.",
      },
    ],
    learned:
      "Generosity in input handling reads as responsiveness, not as easiness. Almost every 'this feels unfair' complaint in a fast game is really a forgiveness-window problem.",
    media: [
      { label: "Pocket Volley — gameplay clip", ratio: "9/16", video: true },
      { label: "Screenshot — mid-rally", ratio: "9/16" },
    ],
    links: { play: "[insert store link]", source: "", devlog: "" },
  },

  {
    slug: "neon-nudge",
    title: "Neon Nudge",
    accent: "var(--color-grape)",
    year: "2025",
    role: "Solo developer",
    status: "Shipped Dec 2025",
    hook: "Nudge the block. Miss. Nudge again.",
    stack: ["Construct 3", "Unity", "WebGL"],
    platforms: ["Web", "Android"],
    thumb: { label: "Neon Nudge — key art", ratio: "16/10" },
    pitch:
      "A precision puzzle-arcade game about small, deliberate pushes. Built quickly to test how fast I could take an idea from prototype to store listing without cutting corners on feel.",
    built: [
      "Complete game built and shipped inside a single release cycle.",
      "Procedural level pacing so difficulty climbs without hand-authoring hundreds of layouts.",
      "Web build deployed to the arcade alongside the mobile release.",
    ],
    challenges: [
      {
        problem:
          "Procedurally generated levels kept producing layouts that were technically solvable but felt unfair.",
        solution:
          "Added a solvability pass with constraints on how tight a generated layout may be, and a difficulty curve that widens tolerances after a failure streak. The generator got less clever and the game got much better.",
      },
    ],
    learned:
      "Procedural generation needs a taste filter. Generating valid content is the easy half; rejecting content that's valid but unpleasant is where the actual design work lives.",
    media: [
      { label: "Neon Nudge — gameplay clip", ratio: "9/16", video: true },
      { label: "Screenshot — later levels", ratio: "9/16" },
    ],
    links: { play: "[insert store link]", source: "", devlog: "" },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const featuredProject = () => projects.find((p) => p.featured);
