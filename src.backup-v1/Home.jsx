import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "./data/projects.js";
import { timeline, stack } from "./data/timeline.js";
import { profile, socials } from "./data/links.js";
import { Media, Reveal, Eyebrow, Chip } from "./ui.jsx";
import HeroToy from "./HeroToy.jsx";

/* ----------------------------------- Hero ---------------------------------- */

function Hero() {
  const heroRef = useRef(null); // bounds for the drivable car
  // The car measures the hero once, on mount, to pick its parking spot. Wait
  // for webfonts so it measures the final layout instead of a pre-swap one.
  const [toyReady, setToyReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const arm = () => alive && setToyReady(true);
    // Whichever comes first: fonts settled, or a short fallback (covers
    // background tabs, where font loading can stall indefinitely).
    const t = setTimeout(arm, 400);
    document.fonts?.ready?.then(arm);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pt-14 sm:pt-20">
      {toyReady && <HeroToy boundsRef={heroRef} />}

      <div className="mx-auto max-w-6xl px-5 pb-16 text-center sm:pb-24">
        <p
          className="rise font-mono text-xs font-bold uppercase tracking-[0.24em] text-ink-soft"
          style={{ animationDelay: "0ms" }}
        >
          <span className="text-blue" aria-hidden="true">
            /
          </span>{" "}
          {profile.role} · Unity &amp; C# · {profile.location}
        </p>

        <h1
          className="rise mx-auto mt-5 max-w-4xl font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl sm:leading-[1.02] lg:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Six games shipped.
          <br className="hidden sm:block" /> Now I&apos;m building{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span aria-hidden="true" className="absolute inset-x-[-4%] inset-y-[8%] -skew-x-6 rounded-lg bg-blue" />
            <span className="relative text-on-accent">multiplayer.</span>
          </span>
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          I&apos;m {profile.name}, a game developer from {profile.location}. I run Rash Game
          Studios, where I&apos;ve shipped six mobile games in the last year. Right now
          I&apos;m deep in Photon Fusion 2, building an eight-player racer.
        </p>

        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "360ms" }}>
          <a
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 font-bold text-on-ink transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href={profile.cv}
            className="rounded-full border-2 border-ink/15 bg-surface px-7 py-3.5 font-bold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Download CV
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border-2 border-ink/15 bg-surface px-7 py-3.5 font-bold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Email me
          </a>
        </div>

        <p
          className="rise mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft"
          style={{ animationDelay: "480ms" }}
        >
          6 games shipped · 8-player netcode in production · Unity + C# · Available now
        </p>
      </div>
    </section>
  );
}

/* -------------------------------- Selected work ------------------------------- */

function FeaturedCard({ project }) {
  return (
    <Reveal
      as="article"
      className="game-card relative grid gap-6 rounded-3xl border-2 border-ink/10 bg-surface p-5 sm:p-7 lg:grid-cols-2"
      style={{ "--game": project.accent }}
    >
      <div>
        <Media label={project.thumb.label} ratio={project.thumb.ratio} color={project.accent} />
        <span className="slash-shine" aria-hidden="true" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-on-accent"
            style={{ background: project.accent }}
          >
            {project.status}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            {project.role} · {project.year}
          </span>
        </p>
        <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-2 font-display text-lg font-semibold" style={{ color: project.accent }}>
          {project.hook}
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">{project.pitch}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Chip key={t} color={project.accent}>
              {t}
            </Chip>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to={`/work/${project.slug}`}
            className="inline-block rounded-full px-7 py-3.5 font-bold text-on-accent transition-transform hover:-translate-y-0.5"
            style={{ background: project.accent }}
          >
            Read the breakdown →
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }) {
  return (
    <Reveal
      as="article"
      className="game-card relative flex flex-col rounded-3xl border-2 border-ink/10 bg-surface p-4"
      style={{ "--game": project.accent }}
    >
      <Media label={project.thumb.label} ratio="4/3" color={project.accent} />
      <span className="slash-shine" aria-hidden="true" />
      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="flex items-baseline justify-between gap-2">
          <span className="font-display text-xl font-bold">{project.title}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{project.year}</span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{project.hook}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{project.role}</span>
          <Link to={`/work/${project.slug}`} className="text-sm font-bold" style={{ color: project.accent }}>
            View project →
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function Work() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 id="work-heading" className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Things I built and shipped.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
            Every one of these is live or in active development. Each has a full breakdown —
            what I built, what broke, and what I&apos;d do differently.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {featured && <FeaturedCard project={featured} />}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Stack ---------------------------------- */

function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-20 border-y border-ink/8 bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow color="var(--color-coral)">What I work with</Eyebrow>
          <h2 id="stack-heading" className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            The tools, honestly rated.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
            No percentage bars — nobody believes those. Here&apos;s what I actually use,
            and how far I&apos;ve taken each one.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stack.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 80}
              className="rounded-2xl border-2 border-ink/8 bg-base p-6"
              style={{ borderLeftColor: group.accent, borderLeftWidth: "6px" }}
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: group.accent }}>
                {group.group}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item} color={group.accent}>
                    {item}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{group.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Journey --------------------------------- */

function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow color="var(--color-mint)">The shipping record</Eyebrow>
          <h2 id="journey-heading" className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            A game every two months.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
            Not a plan — a track record. This is every release since I started, in order,
            and what&apos;s coming next.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 overflow-x-auto pb-4" tabIndex={0} aria-label="Release timeline, scrollable">
          <ol className="relative flex min-w-max gap-0 pt-1">
            <span aria-hidden="true" className="absolute left-6 right-6 top-[42px] h-0.5 bg-ink/10" />
            {timeline.map((item) => (
              <li key={item.date + item.title} className="relative w-52 shrink-0 px-3 first:pl-0">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">{item.date}</p>
                <span
                  aria-hidden="true"
                  className={`mt-3 block h-4 w-4 rounded-full border-4 border-base ${item.next ? "pulse-dot" : ""}`}
                  style={{ "--game": item.accent, background: item.accent, boxShadow: "0 0 0 1px rgba(16,24,40,.08)" }}
                />
                <p className="mt-3 font-display text-base font-bold leading-tight">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.note}</p>
                {(item.now || item.next) && (
                  <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: item.accent }}>
                    {item.now ? "You are here" : "Up next"}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft sm:hidden">
          ← swipe the timeline →
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------- About ---------------------------------- */

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-ink/8 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Eyebrow color="var(--color-sun)">About me</Eyebrow>
          <h2 id="about-heading" className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            I finish things.
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              I started making games the way most people do — a pile of half-finished
              projects and a lot of tutorials. What changed was setting a rule: ship
              something real every two months, whether or not it&apos;s perfect. Six games
              later, that rule is the most useful thing I&apos;ve ever done for my craft.
            </p>
            <p>
              Right now the interesting work is multiplayer. Building Roast Racers meant
              learning that networked games break in ways single-player games never do,
              and that most of the job is deciding who is allowed to be right when two
              players disagree. I migrated the whole project from Photon PUN 2 to Fusion 2
              to get that foundation right.
            </p>
            <p>
              I&apos;m early in my career and I&apos;d rather say so than pretend otherwise.
              What I bring is a real shipping record, comfort with the unglamorous parts —
              store listings, crash reports, low-end devices — and the habit of finishing.
              I&apos;m looking for a team where I can learn from people who are better than
              me, and contribute from week one.
            </p>
            <p>And yes, the dog in Hold On Happy is based on a real one.</p>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <Media label="Photo — Sai Ram (drop file at /public/sai-ram.png)" ratio="4/5" color="var(--color-sun)" />
          <ul className="mt-5 grid gap-3">
            {[
              { k: "Based in", v: profile.location, c: "var(--color-blue)" },
              { k: "Games shipped", v: "6 and counting", c: "var(--color-coral)" },
              { k: "Focus", v: "Unity multiplayer (Fusion 2)", c: "var(--color-mint)" },
              { k: "Status", v: profile.availability, c: "var(--color-sun)" },
            ].map((fact) => (
              <li
                key={fact.k}
                className="rounded-2xl border-2 border-ink/8 bg-surface p-4"
                style={{ borderLeftColor: fact.c, borderLeftWidth: "6px" }}
              >
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">{fact.k}</p>
                <p className="mt-1 font-display text-lg font-bold">{fact.v}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Contact --------------------------------- */

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 bg-deep py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Eyebrow className="[&>span:last-child]:text-white/60">Get in touch</Eyebrow>
          <h2 id="contact-heading" className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let&apos;s talk.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-white/70">
            {profile.availability} If you&apos;re building something with Unity — especially
            anything networked — I&apos;d like to hear about it. No form, just email me.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-blue px-7 py-3.5 font-bold text-on-accent transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
          </a>
          <a
            href={profile.cv}
            className="rounded-full border-2 border-white/20 px-7 py-3.5 font-bold text-white transition-colors hover:border-white"
          >
            Download CV
          </a>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {socials.map((s, i) => (
            <Reveal
              key={s.name}
              as="a"
              href={s.url}
              delay={i * 70}
              className="game-card flex flex-col rounded-2xl border-2 border-white/12 bg-white/5 p-5"
              style={{ "--game": "var(--color-blue)" }}
            >
              <span className="font-display text-lg font-bold">{s.name}</span>
              <span className="mt-1 font-mono text-[11px] text-white/50">{s.handle}</span>
              <span className="mt-3 text-sm font-bold text-blue">Visit →</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Stack />
      <Journey />
      <About />
      <Contact />
    </>
  );
}
