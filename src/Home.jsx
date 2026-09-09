import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { companyProjects, personalProjects } from "./data/projects.js";
import { experience, skills, education, personal, stats, quote } from "./data/experience.js";
import { profile, socials } from "./data/links.js";
import { Frame, Reveal, Label, Note, Stat, SpecRow, Chip, Button, Card, IconBadge } from "./ui.jsx";
import { Icon } from "./icons.jsx";
import HeroToy from "./HeroToy.jsx";
import { asset } from "./basePath.js";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

/* ----------------------------------- Hero ---------------------------------- */

function Hero() {
  const heroRef = useRef(null);
  const laneRef = useRef(null);
  // The car takes its parking spot from the element it's handed: an empty lane
  // in the lower half of the hero on desktop (never over the CTAs), and the
  // whole hero as a drag area on touch.
  const [roams] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [toyReady, setToyReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const arm = () => alive && setToyReady(true);
    const t = setTimeout(arm, 400);
    document.fonts?.ready?.then(arm);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden border-b border-line">
      {/* Lane sits well clear of the bottom so the car starts higher up. */}
      <span ref={laneRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[80px] h-[300px]" />
      {toyReady && <HeroToy boundsRef={roams ? laneRef : heroRef} />}

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)]">
        {/* ---- Left: the claim ---- */}
        <div className="order-2 px-6 pb-20 pt-12 lg:order-1 lg:pb-64 lg:pl-10 lg:pr-12 lg:pt-24 xl:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
          <div className="mx-auto max-w-[620px] lg:mx-0 lg:ml-auto lg:max-w-[640px]">
            <Label className="rise">{profile.role}</Label>

            {/* The name gets its own line so it registers before the pitch does. */}
            <p className="rise mt-6 text-[19px] text-muted" style={{ animationDelay: "40ms" }}>
              Hi, I&apos;m{" "}
              <span className="font-display text-[26px] font-bold tracking-tight text-text">
                {profile.name}
              </span>
            </p>

            <h1
              className="rise mt-3 font-display text-[clamp(2.4rem,5vw,3.9rem)] font-bold leading-[1.05] tracking-[-0.025em]"
              style={{ animationDelay: "100ms" }}
            >
              I build and ship <span className="text-accent">Unity games</span> — commercially, and
              on my own.
            </h1>

            <p
              className="rise measure mt-6 text-[17px] leading-relaxed text-muted"
              style={{ animationDelay: "180ms" }}
            >
              At 7Seas Entertainment I&apos;ve shipped racing, tower defence, FPS and real-time
              multiplayer titles that run at a locked 60 FPS on web and mobile. I also release my
              own games on Google Play, itch.io and Amazon Appstore, and teach Unity in Telugu to a
              growing audience.
            </p>

            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
              <Button href="#work" icon="gamepad" trailing="arrowRight">
                See my work
              </Button>
              <Button href={profile.cv} variant="ghost" icon="download">
                Download résumé
              </Button>
              <Button href={`mailto:${profile.email}`} variant="ghost" icon="mail">
                Email me
              </Button>
            </div>

            <div
              className="rise mt-12 grid grid-cols-2 gap-x-8 gap-y-6 2xl:grid-cols-4"
              style={{ animationDelay: "340ms" }}
            >
              {stats.map((s) => (
                <Stat key={s.caption} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* ---- Right: angled collage + floating spec card ---- */}
        <div className="relative order-1 min-h-[340px] lg:order-2 lg:min-h-[620px]">
          <div className="collage-cut absolute inset-0 bg-raise">
            <div className="grid h-full grid-rows-2 gap-1 p-1">
              {/* Key art, not gameplay captures — this is the shop window. */}
              <Frame label="Key art — FPS title" src={asset("hero/keyart-1.jpg")} ratio="auto" rounded="0" className="h-full" centerCaption />
              <Frame label="Key art — racing title" src={asset("hero/keyart-2.jpg")} ratio="auto" rounded="0" className="h-full" centerCaption />
            </div>
          </div>

          <Note className="absolute left-6 top-6 z-20 hidden xl:block">
            Turning ideas into playable experiences.
          </Note>

          {/* Spec card — the one dark surface on the page, so it reads as a HUD. */}
          <div
            className="rise relative z-10 mx-6 my-8 bg-ink p-6 shadow-[var(--shadow-lift)] lg:absolute lg:bottom-10 lg:left-auto lg:right-8 lg:my-0 lg:w-[330px]"
            style={{ borderRadius: "var(--radius-card)", animationDelay: "400ms" }}
          >
            <div className="grid gap-4">
              <SpecRow icon="building" k="Currently" v="7Seas Entertainment" />
              <SpecRow icon="gamepad" k="Engines" v="Unity · Unreal Engine 5" />
              <SpecRow icon="code" k="Languages" v="C# · C++" />
              <SpecRow icon="network" k="Multiplayer" v="Photon PUN2 · Fusion 2" />
              <SpecRow icon="chart" k="Performance" v="60 FPS locked, WebGL" />
              <SpecRow icon="pin" k="Based in" v={profile.location} />
              <SpecRow icon="briefcase" k="Status" v="Open to roles" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Experience ------------------------------- */

function ProjectRow({ project, index }) {
  return (
    <Reveal as="li" delay={index * 60}>
      <Card as={Link} to={`/work/${project.slug}`} className="game-card grid gap-5 p-4 sm:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <Frame label={project.thumb.label} src={project.thumb.src} ratio="16/10" rounded="10px" />
          {/* Provenance sits with the art, so each card says where it was made. */}
          <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-subtle">
            <Icon name="building" className="h-3.5 w-3.5 text-accent" />
            Made at 7Seas Entertainment
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="rec-title flex items-center gap-2 font-display text-[19px] font-bold tracking-tight">
              {project.title}
              <Icon name="external" className="h-4 w-4 text-subtle" />
            </h4>
            <p className="text-[13px] text-subtle">
              {project.year} · {project.status}
            </p>
          </div>

          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{project.hook}</p>

          <ul className="mt-3 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-[10px] h-[2px] w-2.5 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent">
              View project
              <Icon name="arrowRight" className="rec-arrow h-4 w-4" />
            </span>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-h" className="scroll-mt-16 border-y border-line bg-raise py-20 lg:py-24">
      <div className={WRAP}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Label>Experience</Label>
            <h2
              id="exp-h"
              className="dot mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-tight tracking-[-0.02em]"
            >
              Where I&apos;ve worked
            </h2>
            <p className="measure mt-4 text-[16px] leading-relaxed text-muted">
              I&apos;ve spent the last few years building and shipping games at 7Seas
              Entertainment, working on racing, tower defence, FPS and real-time multiplayer
              titles.
            </p>
          </Reveal>

          <Reveal delay={80} className="grid grid-cols-3 gap-6 self-start lg:col-span-4 lg:pt-4">
            {stats.slice(0, 3).map((s) => (
              <div key={s.caption} className="text-center">
                <span className="mx-auto mb-2 flex justify-center text-accent" aria-hidden="true">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="block font-display text-[22px] font-bold leading-tight text-text">{s.value}</span>
                <span className="block text-[13px] leading-snug text-subtle">{s.caption}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={140} className="lg:col-span-2">
            <div className="h-full bg-accent-soft p-5" style={{ borderRadius: "var(--radius-card)" }}>
              <Icon name="quote" className="h-5 w-5 text-accent/50" />
              <p className="mt-2 text-[14px] italic leading-relaxed text-muted">“{quote.text}”</p>
              <p className="mt-3 text-right text-[13px] font-semibold text-text">— {quote.by}</p>
            </div>
          </Reveal>
        </div>

        {/* timeline + the titles shipped there */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ol className="relative border-l-2 border-line pl-7">
              {experience.map((job, i) => (
                <Reveal as="li" key={job.role + job.company} delay={i * 70} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-2 ${
                      job.current ? "border-accent bg-accent" : "border-line-strong bg-bg"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-subtle">{job.period}</p>
                    {job.current && (
                      <span className="bg-accent-soft px-2.5 py-1 text-[12px] font-semibold text-accent" style={{ borderRadius: "999px" }}>
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-[21px] font-bold leading-tight tracking-tight">{job.role}</h3>
                  <p className="mt-1 text-[16px] font-semibold text-accent">{job.company}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-subtle">
                    <Icon name="pin" className="h-4 w-4" />
                    {job.location}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </Reveal>
              ))}
              <li className="relative">
                <span aria-hidden="true" className="absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-2 border-line-strong bg-bg" />
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-subtle">And more…</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  My own games — the ones I design, build and release myself — live in the next
                  section.
                </p>
                <a href="#work" className="group mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-accent">
                  See my own games
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            </ol>
          </div>

          <ul className="space-y-4 lg:col-span-8">
            {companyProjects.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Games I built ------------------------------- */

/*
 * In-progress project. No thumbnail and no detail link — there's nothing real
 * to show yet, and a fake screenshot or an empty page would both read worse
 * than plainly saying what's being built and why.
 */
function ComingSoonCard({ project }) {
  return (
    <div
      className="flex h-full flex-col border-2 border-dashed border-line-strong bg-accent-soft/50 p-6 sm:p-7"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 bg-surface px-3 py-1 text-[12px] font-semibold text-accent shadow-[var(--shadow-card)]" style={{ borderRadius: "999px" }}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
        <span className="text-[13px] text-subtle">{project.year}</span>
      </div>

      <h3 className="mt-4 font-display text-[24px] font-bold leading-tight tracking-tight">
        {project.title}
      </h3>
      {project.workingTitle && (
        <p className="mt-1 text-[13px] italic text-subtle">Working title</p>
      )}

      <p className="mt-3 text-[16px] leading-relaxed text-muted">{project.hook}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.pitch}</p>

      {project.goals?.length > 0 && (
        <>
          <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-subtle">
            What it has to solve
          </p>
          <ul className="mt-2.5 space-y-2">
            {project.goals.map((g) => (
              <li key={g} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-[11px] h-[2px] w-2.5 shrink-0 rounded-full bg-accent" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {project.why && (
        <p className="mt-5 border-l-[3px] border-accent pl-4 text-[15px] leading-relaxed text-muted">
          {project.why}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {project.stack.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className={`${WRAP} scroll-mt-16 py-20 lg:py-24`}>
      <Reveal>
        <Label>My own games</Label>
        <h2
          id="work-h"
          className="dot mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-tight tracking-[-0.02em]"
        >
          Games I built
        </h2>
        <p className="measure mt-4 text-[17px] leading-relaxed text-muted">
          Not client work — these are mine end to end: design, code, art direction, store listing
          and release.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {personalProjects.map((p, i) =>
          p.comingSoon ? (
            <Reveal key={p.slug} delay={i * 70}>
              <ComingSoonCard project={p} />
            </Reveal>
          ) : (
          <Reveal key={p.slug} delay={i * 70}>
            <Card as={Link} to={`/work/${p.slug}`} className="game-card block h-full p-4">
              <div className="relative">
                <Frame label={p.thumb.label} src={p.thumb.src} ratio="16/9" rounded="10px" />
                <span
                  className="absolute left-3 top-3 bg-surface/95 px-3 py-1 text-[12px] font-semibold text-accent shadow-[var(--shadow-card)]"
                  style={{ borderRadius: "999px" }}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-2 pt-4">
                <h3 className="rec-title font-display text-[24px] font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.hook}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-accent">
                  Read the breakdown
                  <Icon name="arrowRight" className="rec-arrow h-4 w-4" />
                </span>
              </div>
            </Card>
          </Reveal>
          )
        )}
      </div>
    </section>
  );
}

/* ---------------------------------- Skills --------------------------------- */

/*
 * Redesigned for reading: no chip grids. Each area is one card with a plain
 * comma-separated list set in near-black at a comfortable size, so the eye
 * reads a line instead of hopping between boxes.
 */
function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="scroll-mt-16 border-y border-line bg-raise py-20 lg:py-24">
      <div className={WRAP}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Label>Skills</Label>
            <h2
              id="skills-h"
              className="dot mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-tight tracking-[-0.02em]"
            >
              What I work with
            </h2>
            <p className="measure mt-4 text-[17px] leading-relaxed text-muted">
              The tools and systems I use to build and ship games, and how far I&apos;ve taken each
              one.
            </p>
          </Reveal>
          <Note className="mb-2 hidden lg:block" flip>
            Tools are great, but games are better.
          </Note>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 50} className="h-full">
              <Card className="flex h-full gap-5 p-6 sm:p-7">
                <span className="mt-1 shrink-0 text-accent" aria-hidden="true">
                  <Icon name={group.icon} className="h-7 w-7" />
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-[20px] font-bold leading-tight tracking-tight">
                    {group.group}
                  </h3>

                  {/* The list itself, set as readable running text. Separators carry
                      real spaces so lines can break between items on narrow screens. */}
                  <p className="mt-2.5 text-[17px] font-medium leading-[1.65] text-text [overflow-wrap:anywhere]">
                    {group.items.map((item, idx) => (
                      <span key={item}>
                        {item}
                        {idx < group.items.length - 1 && (
                          <span aria-hidden="true" className="text-line-strong">
                            {" / "}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>

                  <p className="mt-3 text-[15px] leading-relaxed text-subtle">{group.note}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-6">
          <Card className="flex flex-wrap items-center justify-between gap-5 p-6">
            <div className="flex items-center gap-4">
              <IconBadge name="bulb" />
              <div>
                <p className="dot font-display text-[18px] font-bold tracking-tight">Always learning</p>
                <p className="text-[15px] text-muted">
                  I&apos;m constantly exploring new tools and techniques to build better games.
                </p>
              </div>
            </div>
            <Button href="#work" variant="ghost" trailing="arrowRight">
              View my projects
            </Button>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- About ---------------------------------- */

function About() {
  return (
    <section id="about" aria-labelledby="about-h" className={`${WRAP} scroll-mt-16 py-20 lg:py-24`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <Label>About</Label>
          <h2
            id="about-h"
            className="mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-tight tracking-[-0.02em]"
          >
            I ship things,
            <br />
            <span className="dot text-accent">end to end</span>
          </h2>
          <div className="measure mt-6 space-y-5 text-[16px] leading-relaxed text-muted">
            <p>
              I&apos;m a Unity and C# developer based in {profile.location}. At 7Seas Entertainment
              I&apos;ve worked across four very different games — a racer, a tower defence, a
              single-player FPS, and a real-time multiplayer shooter — and in each one I owned the
              systems players actually touch: the AI, the economy, the objectives, the netcode.
            </p>
            <p>
              What I care about most is code that survives contact with the next feature. Interfaces
              so new things can take damage without touching old code. ScriptableObjects and data
              instead of hard-coded values. A Scene Initializer so a missing inspector reference
              can&apos;t break a build. None of it is glamorous, but it&apos;s the difference
              between a prototype and a game that ships.
            </p>
            <p>
              Outside work I release my own games and run{" "}
              <a
                href="https://youtube.com/@GameDevTeluguOffl"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Game Dev Telugu
              </a>
              , teaching Unity and C# in Telugu. Explaining things to beginners has made me a
              noticeably better engineer — you can&apos;t hand-wave a concept to someone learning it
              for the first time.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#work" icon="gamepad" trailing="arrowRight">
              See my work
            </Button>
            <Button href={`mailto:${profile.email}`} variant="ghost" icon="mail">
              Get in touch
            </Button>
          </div>
        </Reveal>

        <Reveal delay={110} className="lg:col-span-6">
          <Frame label="Photo — /public/about/portrait.jpg" src={asset("about/portrait.jpg")} ratio="4/3" />

          <Card className="mt-5 grid grid-cols-3 divide-x divide-line p-5">
            {stats.slice(0, 3).map((s) => (
              <div key={s.caption} className="px-3 first:pl-0 last:pr-0">
                <span className="mb-1.5 flex text-accent" aria-hidden="true">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="block font-display text-[19px] font-bold leading-tight">{s.value}</span>
                <span className="block text-[13px] leading-snug text-subtle">{s.caption}</span>
              </div>
            ))}
          </Card>

          <h3 className="mt-8 flex items-center gap-3 font-display text-[19px] font-bold tracking-tight">
            <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-accent" />
            Education
          </h3>
          {education.map((e) => (
            <Card key={e.title} className="mt-3 flex items-start gap-4 p-5">
              <IconBadge name="cap" />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[16px] font-semibold text-text">{e.title}</p>
                  <p className="text-[14px] text-subtle">{e.period}</p>
                </div>
                <p className="mt-0.5 text-[15px] text-muted">{e.org}</p>
              </div>
            </Card>
          ))}
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 bg-accent-soft p-8 sm:grid-cols-3" style={{ borderRadius: "var(--radius-card)" }}>
        {personal.map((p, i) => (
          <Reveal key={p.title} delay={i * 70} className="flex gap-4">
            <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
              <Icon name={p.icon} className="h-7 w-7" />
            </span>
            <div>
              <h3 className="font-display text-[17px] font-bold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Contact --------------------------------- */

const SOCIAL_ICON = {
  GitHub: "github",
  LinkedIn: "linkedin",
  YouTube: "youtube",
  "Google Play": "play",
  "itch.io": "itch",
};

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-16 border-t border-line bg-raise py-20 lg:py-24">
      <div className={WRAP}>
        <Reveal>
          <Label>Contact</Label>
          <h2
            id="contact-h"
            className="dot measure mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-tight tracking-[-0.02em]"
          >
            If you&apos;re hiring a Unity developer, let&apos;s talk
          </h2>
          <p className="measure mt-4 text-[17px] leading-relaxed text-muted">
            {profile.availability} Based in {profile.location.split(",")[0]} and{" "}
            {profile.relocation.toLowerCase()}. No contact form — just email or call, I answer
            everything.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap gap-3">
          <Button href={`mailto:${profile.email}`} icon="mail" trailing="arrowRight">
            {profile.email}
          </Button>
          <Button href={`tel:${profile.phone.replace(/\s/g, "")}`} variant="ghost" icon="phone">
            {profile.phone}
          </Button>
          <Button href={profile.cv} variant="ghost" icon="download">
            Résumé
          </Button>
        </Reveal>

        <Reveal delay={130} className="mt-12">
          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
              <div>
                <p className="dot font-display text-[19px] font-bold tracking-tight">Find me online</p>
                <p className="mt-1 text-[15px] text-subtle">Games, code, devlogs and more.</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="flex h-full flex-col gap-2 border border-line bg-bg p-4 transition-colors hover:border-accent"
                      style={{ borderRadius: "var(--radius-btn)" }}
                    >
                      <Icon name={SOCIAL_ICON[s.name] ?? "external"} className="h-6 w-6 text-text" />
                      <span className="text-[15px] font-semibold leading-tight text-text">{s.name}</span>
                      <span className="inline-flex items-center gap-1 text-[13px] leading-tight text-subtle">
                        {s.handle}
                        <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={180} className="mt-6">
          <div
            className="flex flex-wrap items-center justify-between gap-6 bg-accent-soft p-7"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-accent" aria-hidden="true">
                <Icon name="gamepad" className="h-9 w-9" />
              </span>
              <div>
                <p className="dot font-display text-[19px] font-bold tracking-tight">Have a project in mind</p>
                <p className="text-[15px] text-muted">
                  I&apos;m always open to opportunities, collaborations, or just a chat about games.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`} icon="mail" trailing="arrowRight">
                Send me an email
              </Button>
              <Button href={socials.find((s) => s.name === "LinkedIn")?.url} variant="ghost" trailing="arrowRight">
                Let&apos;s connect
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Work />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
