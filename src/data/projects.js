import { asset } from "../basePath.js";

/*
 * Every project on the site, newest / most important first.
 * Adding, removing or reordering an entry here is the ONLY change needed —
 * the homepage list, the /work/:slug detail pages, and the prev/next
 * navigation all read from this array.
 *
 * `built` bullets come straight from the résumé and are accurate.
 * `challenges` and `learned` are drafted from those facts — review them and
 * replace anything marked [insert ...] with your own specifics.
 */

export const projects = [
  {
    slug: "cross-fire-rush",
    title: "Cross Fire Rush",
    context: "7Seas Entertainment",
    year: "2026",
    role: "Gameplay & networking developer",
    status: "Releasing 2026",
    featured: true,
    hook: "Real-time multiplayer FPS built on Photon PUN2.",
    stack: ["Unity", "C#", "Photon PUN2", "WebGL"],
    platforms: ["Web", "Mobile"],
    thumb: { label: "Cross Fire Rush — key art" },
    pitch:
      "A real-time multiplayer shooter where I built most of the gameplay and the entire networking layer on top of a base FPS controller. It is the project that taught me how differently networked games break compared to single-player ones.",
    built: [
      "Room creation and matchmaking on Photon PUN2, so players can find and join a live match.",
      "Player movement and shooting synchronisation across clients.",
      "Networked health, damage, and death handling.",
      "Spawn and respawn logic for multiple concurrent players.",
      "Adapted and extended a base FPS controller to fit the game design.",
    ],
    challenges: [
      {
        problem:
          "In single-player, the game state is simply true. In multiplayer, every client has its own opinion of where players are and who shot first — and on mobile networks those opinions drift apart.",
        solution:
          "Building on PUN2 meant being deliberate about which client owns which piece of state, and syncing intent rather than trying to sync everything. Shooting and health had to agree across clients without waiting on a round-trip for every frame. [insert the specific approach you took — e.g. ownership per player object, RPC vs. serialised state, how you handled hit registration]",
      },
      {
        problem:
          "The game had to run in WebGL alongside the rest of the platform's titles, where the frame budget is much tighter than on native builds.",
        solution:
          "Kept the networked update rate and the amount of serialised data deliberately small, and profiled the build rather than assuming. [insert what you measured and what you cut]",
      },
    ],
    learned:
      "Multiplayer is mostly an authority problem, not a code problem. The hardest bugs were never syntax — they were two clients that each believed something reasonable. Next time I would decide the authority model on paper before writing the first networked script. [review and make this yours]",
    media: [
      { label: "Cross Fire Rush — gameplay clip", ratio: "16/9", video: true },
      { label: "Cross Fire Rush — screenshot 1", ratio: "16/9" },
      { label: "Cross Fire Rush — screenshot 2", ratio: "16/9" },
      { label: "Cross Fire Rush — screenshot 3", ratio: "16/9" },
      { label: "Cross Fire Rush — screenshot 4", ratio: "16/9" },
    ],
    links: { play: "", source: "", devlog: "" },
  },

  {
    slug: "water-car-simulator",
    title: "Water Car Simulator",
    context: "7Seas Entertainment",
    year: "2026",
    role: "Gameplay developer",
    status: "Live on platform",
    hook: "A racing game with a full garage economy, career mode, and AI opponents.",
    stack: ["Unity", "C#", "WebGL", "H5 ads"],
    platforms: ["Web", "Mobile"],
    thumb: { label: "Water Car Simulator — key art" },
    pitch:
      "I built the entire game around the base vehicle controller — everything a player actually interacts with, from the race itself to the economy that keeps them coming back.",
    built: [
      "Garage and upgrade economy covering speed, fuel, and handling.",
      "Career mode and free mode, including progression between events.",
      "AI opponent racers.",
      "Lap and race logic, including race state and results.",
      "The in-game HUD.",
      "HTML5 (H5) ad integration.",
    ],
    challenges: [
      {
        problem:
          "An upgrade economy is easy to build and very easy to get wrong — too generous and progression evaporates, too tight and players quit early.",
        solution:
          "Kept upgrade costs and effects as data rather than hard-coded values, so balance could be tuned without rebuilding the game. [insert how you tuned it — playtesting, analytics, or a specific curve]",
      },
      {
        problem:
          "AI opponents need to feel like rivals, not obstacles. Cars that are perfect are boring, and cars that are random feel broken.",
        solution:
          "Tuned opponent behaviour so races stay close enough to feel winnable. [insert your approach — waypoints, rubber-banding, difficulty tiers]",
      },
    ],
    learned:
      "Putting the economy values in data instead of in code paid for itself within the first week of balancing. [review and make this yours]",
    media: [
      { label: "Water Car Simulator — gameplay clip", ratio: "16/9", video: true },
      { label: "Water Car Simulator — screenshot 1", ratio: "16/9" },
      { label: "Water Car Simulator — screenshot 2", ratio: "16/9" },
      { label: "Water Car Simulator — screenshot 3", ratio: "16/9" },
      { label: "Water Car Simulator — screenshot 4", ratio: "16/9" },
    ],
    links: { play: "[insert platform link]", source: "", devlog: "" },
  },

  {
    slug: "tower-war-defense",
    title: "Tower War Defense",
    context: "7Seas Entertainment",
    year: "2026",
    role: "Gameplay developer",
    status: "Live on platform",
    hook: "3D tower defence with power-ups, wave progression, and a coin economy.",
    stack: ["Unity", "C#", "WebGL"],
    platforms: ["Web", "Mobile"],
    thumb: { label: "Tower War Defense — key art" },
    pitch:
      "A 3D tower defence game where I built the systems that carry the whole loop: what the player places, what they earn, and what comes at them next.",
    built: [
      "Power-up system, including the meteor and tornado abilities.",
      "Sub-levels and wave progression.",
      "Tower placement and the coin economy behind it.",
      "Waypoint-based enemy pathing.",
    ],
    challenges: [
      {
        problem:
          "Wave progression has to keep climbing without turning into a wall — the difficulty curve is the game.",
        solution:
          "Structured waves and sub-levels so difficulty steps up in readable increments rather than spiking. [insert how you tuned wave pacing]",
      },
    ],
    learned:
      "Tower defence lives or dies on pacing. The code was straightforward; getting the wave curve to feel fair took the most iteration. [review and make this yours]",
    media: [
      { label: "Tower War Defense — gameplay clip", ratio: "16/9", video: true },
      { label: "Tower War Defense — screenshot 1", ratio: "16/9" },
      { label: "Tower War Defense — screenshot 2", ratio: "16/9" },
      { label: "Tower War Defense — screenshot 3", ratio: "16/9" },
    ],
    links: { play: "[insert platform link]", source: "", devlog: "" },
  },

  {
    slug: "operation-secure",
    title: "Operation Secure",
    context: "7Seas Entertainment",
    year: "2026",
    role: "Gameplay developer",
    status: "Live on platform",
    hook: "A 3D FPS with objective-driven missions and enemy AI.",
    stack: ["Unity", "C#", "WebGL"],
    platforms: ["Web", "Mobile"],
    thumb: { label: "Operation Secure — key art" },
    pitch:
      "A single-player 3D shooter built around objectives rather than just combat. I built the AI the player fights and the mission structure that gives the fighting a point.",
    built: [
      "Enemy AI.",
      "Mission and objective system, including clear-zone and secure-the-cards objective types.",
      "The minimap.",
      "Weapon selection and weapon stats.",
      "Adapted the base FPS controller to the game design.",
    ],
    challenges: [
      {
        problem:
          "Two different objective types — clearing a zone and securing cards — need to share one system, or the code turns into two games glued together.",
        solution:
          "Built the mission layer so objective types plug into a common structure rather than each one being special-cased. [insert the specific pattern you used]",
      },
    ],
    learned:
      "Designing the objective system as a general structure instead of hard-coding the first mission type saved real time when the second one arrived. [review and make this yours]",
    media: [
      { label: "Operation Secure — gameplay clip", ratio: "16/9", video: true },
      { label: "Operation Secure — screenshot 1", ratio: "16/9" },
      { label: "Operation Secure — screenshot 2", ratio: "16/9" },
      { label: "Operation Secure — screenshot 3", ratio: "16/9" },
    ],
    links: { play: "[insert platform link]", source: "", devlog: "" },
  },

  {
    slug: "roast-racers",
    hidden: true, // pulled from the site for now — flip to false to bring it back
    title: "Roast Racers",
    context: "Personal project",
    year: "2026",
    role: "Solo developer",
    status: "In closed testing",
    featuredPersonal: true,
    hook: "A 4–8 player mobile racer where the loser gets roasted, automatically.",
    stack: ["Unity", "C#", "Photon Fusion 2", "Mobile"],
    platforms: ["Android", "iOS"],
    thumb: { label: "Roast Racers — key art" },
    pitch:
      "My own multiplayer racer, built end to end: short races for 4–8 players, a single-player progression loop to keep people coming back, and an automatic roast for whoever finishes last. Currently in closed testing ahead of release.",
    built: [
      "Real-time racing for 4–8 players, including room flow, race state and results.",
      "Migrated the networking layer from Photon PUN2 to Photon Fusion 2 on a separate branch, keeping the PUN build shippable throughout as a fallback.",
      "Single-player progression and economy — currency, rewards and unlock pacing — with every tuning value exposed in a ProgressionConfig ScriptableObject so balance changes never need a rebuild.",
      "The roast system that picks and delivers a line to whoever finishes last.",
      "Vehicle handling and drift feel, iterated on more than any other part of the game.",
      "[insert: UI, audio, store setup, or anything else you want credited]",
    ],
    challenges: [
      {
        problem:
          "PUN2's room-based, RPC-first model made authoritative race state awkward, and the ceiling was visible as player counts went up.",
        solution:
          "Moved to Fusion 2 on a dedicated branch rather than in place, so the working build stayed shippable throughout. Fusion's tick-based simulation and network-object authority meant rethinking who owns race state rather than just swapping an API — and keeping a fallback branch turned a risky rewrite into a reversible one.",
      },
      {
        problem:
          "Balancing progression meant rebuilding and redeploying for every number tweak, which made iteration painfully slow.",
        solution:
          "Pulled every reward value, cost and unlock threshold into a ProgressionConfig ScriptableObject loaded from Resources, with starting balances centralised in one utility. Tuning the economy became editing values instead of editing code.",
      },
    ],
    learned:
      "I should have moved to Fusion earlier. I spent weeks working around PUN's limits before admitting the foundation was wrong, and the migration itself was faster than the workarounds had been. Next time I'll prototype the networking model before building content on top of it. [review and make this yours]",
    media: [
      { label: "Roast Racers — gameplay clip", ratio: "16/9", video: true },
      { label: "Screenshot — race start", ratio: "9/16" },
      { label: "Screenshot — the roast screen", ratio: "9/16" },
      { label: "Screenshot — garage / progression", ratio: "9/16" },
    ],
    links: { play: "[insert store link once live]", source: "", devlog: "" },
  },

  {
    slug: "fracture-run",
    title: "FractureRun",
    context: "Personal project",
    year: "2025",
    role: "Solo developer",
    status: "Shipped — Amazon Appstore, itch.io, Google Play",
    hook: "An endless runner built on object pooling, locked at 60 FPS on mid-range Android.",
    stack: ["Unity", "C#", "Mobile"],
    platforms: ["Android", "Web"],
    thumb: { label: "FractureRun — key art" },
    pitch:
      "An endless runner I took all the way from idea to three storefronts on my own. The interesting part was not the running — it was keeping the frame rate flat on cheap phones while platforms spawn forever.",
    built: [
      "Procedural platform spawning built on object pooling for stable performance.",
      "High-score persistence via PlayerPrefs, with clean save and load handling.",
      "Optimised to a consistent 60 FPS on mid-range Android.",
      "Shipped on Amazon Appstore, itch.io, and Google Play (closed testing).",
      "Wrote a full README documenting the architecture and design decisions.",
    ],
    challenges: [
      {
        problem:
          "An endless runner instantiates and destroys geometry forever. Done naively, garbage collection spikes and the game stutters exactly when the player is going fastest.",
        solution:
          "Built the spawner on an object pool so platforms are recycled rather than created and destroyed. Verified the result in the Unity Profiler on a mid-range device rather than trusting the editor, and held a consistent 60 FPS.",
      },
    ],
    learned:
      "Profiling on the actual target device changed what I thought the problem was. The editor is a comfortable lie. [review and make this yours]",
    media: [
      { label: "FractureRun — gameplay clip", ratio: "9/16", video: true },
      { label: "FractureRun — screenshot 1", ratio: "9/16" },
      { label: "FractureRun — screenshot 2", ratio: "9/16" },
    ],
    links: {
      play: "https://play.google.com/store/apps/developer?id=Rash+Gaming+Studios",
      source: "https://github.com/sairamyedida06",
      devlog: "",
    },
  },

  {
    /*
     * In-progress project. `comingSoon` renders a distinct card with no detail
     * page — nothing to link to yet, and a hollow page would read worse than
     * an honest "building this now". Give it a real page once there's a clip.
     */
    slug: "coop-zombie-survival",
    comingSoon: true,
    title: "Co-op Zombie Survival",
    workingTitle: true,
    context: "Personal project",
    year: "In progress",
    role: "Solo developer",
    status: "Building now",
    hook: "Two friends, one room code, and a lot of zombies.",
    stack: ["Unity", "C#", "Photon Fusion 2"],
    platforms: ["PC", "Mobile"],
    thumb: { label: "Co-op Zombie Survival — early build" },
    pitch:
      "A small co-op survival game I'm building to learn Photon Fusion 2 properly: join a friend with a room code, fight off waves of zombies together, and collect loot. Deliberately tiny in scope so the networking gets the attention, not the content.",
    goals: [
      "Room codes — one player hosts, the other joins with a short code. No lobbies, no accounts.",
      "Server-authoritative zombie AI, so both players see the same horde in the same place.",
      "Networked combat: shooting, damage and death that agree across clients.",
      "Shared loot and pickups — the hard part, because two players can grab the same thing on the same tick.",
      "A wave loop with a clear win/lose state, so it's a finished game rather than a demo.",
    ],
    why:
      "My production multiplayer experience is on PUN2, and Fusion 2 is where the industry is heading. Rather than read about the difference, I'm building something small enough to actually finish on it.",
    media: [],
    links: { play: "", source: "", devlog: "" },
  },

  {
    slug: "virus-escape",
    hidden: true, // real project from the résumé — flip to false to show it again
    title: "Virus Escape",
    context: "Personal project",
    year: "2025",
    role: "Solo developer",
    status: "Released",
    hook: "3D top-down action with NavMesh enemy AI and a patrol / chase / attack FSM.",
    stack: ["Unity", "C#", "NavMesh", "Input System"],
    platforms: ["Android"],
    thumb: { label: "Virus Escape — key art" },
    pitch:
      "A 3D top-down action game about collecting cores to unlock portals. It is the project where I built enemy AI properly for the first time, and where I got serious about architecture.",
    built: [
      "Core-collection loop: gather cores to unlock portals and progress through levels.",
      "Enemy AI on Unity NavMesh with a distinct Patrol / Chase / Attack finite state machine.",
      "Health and stamina systems built on C# interfaces.",
      "A Scene Initializer that auto-instantiates managers at runtime, eliminating missing-reference bugs.",
      "Mobile joystick controls via Unity's new Input System.",
      "Event-driven SFX system for footsteps, damage, and interactions.",
    ],
    challenges: [
      {
        problem:
          "Managers that live in the scene are a constant source of missing-reference bugs — one unassigned field in one scene and the build breaks somewhere unrelated.",
        solution:
          "Wrote a Scene Initializer that instantiates the managers at runtime, so no scene depends on someone remembering to drag a reference into the inspector. It removed an entire category of bug.",
      },
      {
        problem:
          "Enemies that only chase feel mindless, and enemies that constantly re-evaluate feel twitchy.",
        solution:
          "Gave enemies an explicit Patrol / Chase / Attack finite state machine on top of NavMesh pathing, so each behaviour has clear entry and exit conditions instead of tangled conditionals.",
      },
    ],
    learned:
      "Interfaces for health and stamina meant new things could take damage without touching existing code. That was the first time architecture actively made me faster instead of feeling like extra work. [review and make this yours]",
    media: [
      { label: "Virus Escape — gameplay clip", ratio: "16/9", video: true },
      { label: "Screenshot — enemy encounter", ratio: "16/9" },
      { label: "Screenshot — portal / level progression", ratio: "16/9" },
    ],
    links: { play: "", source: "https://github.com/sairamyedida06", devlog: "" },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

/*
 * Short, scannable bullets for the compact cards in the Experience section.
 * (The long-form `built` list is what the detail pages use.)
 */
const HIGHLIGHTS = {
  "cross-fire-rush": [
    "Built core gameplay systems and networking on Photon PUN2",
    "Rooms, matchmaking, player and shooting sync",
    "Health, spawns and multiplayer game flow",
    "Releasing 2026",
  ],
  "water-car-simulator": [
    "Built the full game around the base vehicle controller",
    "Garage and upgrade economy (speed, fuel, handling)",
    "Career and free modes, AI opponent racers, lap and race logic",
    "Integrated HTML5 (H5) ads and optimised for WebGL",
  ],
  "tower-war-defense": [
    "Built the power-up system (meteor, tornado)",
    "Sub-levels and wave progression",
    "Tower placement and coin economy",
    "Waypoint-based enemy pathing",
  ],
  "operation-secure": [
    "Built enemy AI and combat behaviours",
    "Mission and objective system (clear-zone, secure-the-cards)",
    "Minimap, weapon selection and player stats",
    "Adapted the base FPS controller to the game design",
  ],
  "fracture-run": [
    "Procedural platform spawning built on object pooling",
    "High-score persistence with clean save / load",
    "Locked 60 FPS on mid-range Android",
    "Shipped on Amazon Appstore, itch.io and Google Play",
  ],
  "virus-escape": [
    "Enemy AI on NavMesh with a Patrol / Chase / Attack FSM",
    "Health and stamina systems built on C# interfaces",
    "Scene Initializer that auto-instantiates managers at runtime",
    "Mobile joystick controls via the new Input System",
  ],
};

projects.forEach((p) => {
  p.highlights = HIGHLIGHTS[p.slug] ?? p.built?.slice(0, 4) ?? [];
});

/* The four titles shipped at 7Seas, in résumé order. */
/* Only non-hidden entries are linked from the homepage. */
export const visibleProjects = projects.filter((p) => !p.hidden);
/* Projects that have a real /work/:slug page (coming-soon entries do not). */
export const detailProjects = visibleProjects.filter((p) => !p.comingSoon);
export const companyProjects = visibleProjects.filter((p) => p.context === "7Seas Entertainment");
export const personalProjects = visibleProjects.filter((p) => p.context === "Personal project");

/*
 * Asset paths follow one convention, so dropping correctly-named files into
 * public/games/<slug>/ is all that's needed — no code change.
 *
 *   cover.jpg   key art / thumbnail        (16:9)
 *   clip.mp4    gameplay clip              (matches the game's orientation)
 *   shot-1.jpg  first screenshot           (matches media[1].ratio)
 *   shot-2.jpg  second screenshot
 *   shot-3.jpg  third screenshot
 *
 * Anything missing simply falls back to the labelled placeholder box.
 */
const gameAsset = (slug, file) => asset(`games/${slug}/${file}`);

projects.forEach((p) => {
  p.thumb.src = gameAsset(p.slug, "cover.jpg");
  p.media.forEach((m, i) => {
    m.src = m.video ? gameAsset(p.slug, "clip.mp4") : gameAsset(p.slug, `shot-${i}.jpg`);
  });
});
