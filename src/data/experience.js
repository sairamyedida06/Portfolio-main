/*
 * Career history, skills, education and community — from the résumé.
 * Editing this file is the only change needed to update those sections.
 */

/* Headline numbers. Every one of these is defensible from the résumé —
   if you want a "players worldwide" figure here, add it once you can back it. */
export const stats = [
  { icon: "gamepad", value: "6", caption: "Games shipped" },
  { icon: "briefcase", value: "4", caption: "Commercial titles" },
  { icon: "bolt", value: "60 FPS", caption: "On web & mobile" },
  { icon: "cap", value: "Unity", caption: "Instructor (Telugu)" },
];

export const quote = {
  text: "I enjoy turning ideas into playable experiences and seeing people actually play them.",
  by: "Sai Ram",
};

export const experience = [
  {
    role: "Unity / C# Developer",
    company: "7Seas Entertainment Ltd.",
    location: "Hyderabad, India",
    period: "May 2026 — Present",
    current: true,
    summary:
      "Shipped multiple WebGL / HTML5 titles live on the company platform, all holding 40+ FPS with 60 locked across mobile and desktop. Worked on gameplay systems, AI, multiplayer and optimisation across a range of genres.",
    tags: ["Unity", "C#", "WebGL", "Photon PUN2", "Gameplay Systems", "Optimisation"],
  },
  {
    role: "Freelance Contract Unity Developer",
    company: "Remote",
    location: "Remote",
    period: "Dec 2025 — Mar 2026",
    summary:
      "Contract gameplay and architecture work: a modular manager architecture using the Singleton pattern to handle game state, UI and gameplay flow across scenes, plus dynamic difficulty-scaling systems to improve retention and smooth out pacing.",
    tags: ["Unity", "C#", "Architecture", "Game Feel"],
  },
  {
    role: "Unreal Game Programmer Intern",
    company: "Arcanion",
    location: "Remote",
    period: "May 2025 — Aug 2025",
    summary:
      "Built a three-level Unreal prototype with obstacle-based level design and enemy combat systems using Blueprints and C++. Implemented and refined UI elements and helped integrate the in-game dialogue system.",
    tags: ["Unreal Engine 5", "C++", "Blueprints", "UI"],
  },
];

export const skills = [
  {
    icon: "cube",
    group: "Engines",
    note: "I work primarily in Unity, and have Unreal Engine 5 experience from an internship and personal projects.",
    items: ["Unity (2D & 3D)", "URP", "WebGL", "Unreal Engine 5"],
    art: "Engines — Unity / Unreal",
  },
  {
    icon: "code",
    group: "Languages",
    note: "C# is where I live. C++ comes from Unreal Engine work.",
    items: ["C#", "C++"],
    art: "Code sample",
  },
  {
    icon: "gamepad",
    group: "Gameplay systems",
    note: "I enjoy building the core systems that make games fun and feel good to play.",
    items: ["Enemy AI (NavMesh, FSM)", "Character controllers", "Procedural spawning", "Game economy"],
    art: "Gameplay systems",
  },
  {
    icon: "network",
    group: "Multiplayer & networking",
    note: "Shipped a real-time multiplayer FPS on Photon PUN2 — rooms, matchmaking, state sync and gameplay networking.",
    items: ["Photon PUN2", "Room management", "Matchmaking", "State synchronisation"],
    art: "Multiplayer",
  },
  {
    icon: "chart",
    group: "Performance & optimisation",
    note: "I care about games running well on a wide range of devices, especially WebGL and mid-range mobile.",
    items: ["Unity Profiler", "Object pooling", "WebGL optimisation", "Mobile performance"],
    art: "Profiler / FPS",
  },
  {
    icon: "wrench",
    group: "Tools & workflow",
    note: "Architecture and tooling are what keep a project shippable as it grows.",
    items: ["Git", "VS Code", "Unity Input System", "ScriptableObjects", "Interfaces", "H5 ads"],
    art: "Tools",
  },
];

export const education = [
  {
    title: "B.Tech, Computer Science",
    org: "Ideal Institute of Technology, Kakinada",
    period: "2022 — 2025",
  },
];

export const certifications = [
  { title: "Unreal Engine 5 Blueprints — The Ultimate Developer Course", org: "Udemy", year: "2025" },
  { title: "The Ultimate Git Course — with Applications in Unreal Engine", org: "Udemy", year: "2025" },
];

/* The three-up strip at the foot of About. */
export const personal = [
  {
    icon: "gamepad",
    title: "When I'm not coding",
    detail:
      "I play games, explore new tools, and work on personal projects. Racing games, strategy games, and anything with interesting mechanics.",
  },
  {
    icon: "users",
    title: "Game Dev Telugu",
    detail:
      "I create Unity and C# content in Telugu to help beginners get started — 700+ subscribers, with a top video at 6.7K views. Teaching has made me a better developer and communicator.",
  },
  {
    icon: "bulb",
    title: "Always learning",
    detail:
      "I spoke at Ideal Institute of Technology on “Game Development & Careers in Games” in October 2026, and I'm constantly picking up new tools and techniques.",
  },
];
