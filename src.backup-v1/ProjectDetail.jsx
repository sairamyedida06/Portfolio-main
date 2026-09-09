import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { projects, getProject } from "./data/projects.js";
import { profile } from "./data/links.js";
import { Media, Reveal, Eyebrow, Chip } from "./ui.jsx";

/*
 * /work/:slug — the page that actually gets you interviews.
 * Structure is fixed; all content comes from src/data/projects.js.
 */

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  // Per-page title and description, so shared links read properly.
  useEffect(() => {
    if (!project) return;
    const base = `${profile.name} — ${profile.role}`;
    document.title = `${project.title} — ${profile.name}`;
    const meta = document.querySelector('meta[name="description"]');
    const original = meta?.getAttribute("content");
    meta?.setAttribute("content", `${project.title}: ${project.hook} — ${project.pitch.slice(0, 120)}`);
    return () => {
      document.title = base;
      if (original) meta?.setAttribute("content", original);
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const accent = project.accent;

  return (
    <article className="pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-4xl px-5">
        {/* ---- Header ---- */}
        <Link
          to="/"
          state={{ scrollTo: "work" }}
          className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
        >
          ← All work
        </Link>

        <h1 className="rise mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="rise mt-3 font-display text-xl font-semibold sm:text-2xl" style={{ animationDelay: "80ms", color: accent }}>
          {project.hook}
        </p>

        <dl className="rise mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-wider" style={{ animationDelay: "160ms" }}>
          {[
            ["Role", project.role],
            ["Year", project.year],
            ["Status", project.status],
            ["Platforms", project.platforms.join(" · ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-ink-soft">{k}</dt>
              <dd className="mt-0.5 font-bold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="rise mt-5 flex flex-wrap gap-1.5" style={{ animationDelay: "240ms" }}>
          {project.stack.map((t) => (
            <Chip key={t} color={accent}>
              {t}
            </Chip>
          ))}
        </div>

        {project.links?.play && (
          <a
            href={project.links.play}
            className="rise mt-6 inline-block rounded-full px-7 py-3.5 font-bold text-on-accent transition-transform hover:-translate-y-0.5"
            style={{ animationDelay: "320ms", background: accent }}
          >
            Play {project.title}
          </a>
        )}
      </div>

      {/* ---- Hero media ---- */}
      <div className="mx-auto mt-10 max-w-5xl px-5">
        <Reveal>
          <Media label={project.media[0].label} ratio={project.media[0].ratio} color={accent} video={project.media[0].video} />
        </Reveal>
      </div>

      <div className="mx-auto max-w-4xl px-5">
        {/* ---- Pitch ---- */}
        <Reveal className="mt-14">
          <Eyebrow color={accent}>What it is</Eyebrow>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft sm:text-xl">{project.pitch}</p>
        </Reveal>

        {/* ---- What I built ---- */}
        <Reveal className="mt-14">
          <Eyebrow color={accent}>What I built</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">My actual contribution.</h2>
          <ul className="mt-6 space-y-3">
            {project.built.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Technical deep dive ---- */}
        <Reveal className="mt-14">
          <Eyebrow color={accent}>Technical deep dive</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            What broke, and what I did about it.
          </h2>
        </Reveal>
        <div className="mt-6 space-y-5">
          {project.challenges.map((c, i) => (
            <Reveal
              key={c.problem}
              delay={i * 90}
              className="rounded-3xl border-2 border-ink/8 bg-surface p-6 sm:p-7"
              style={{ borderLeftColor: accent, borderLeftWidth: "6px" }}
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
                The problem
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug">{c.problem}</p>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                What I did
              </p>
              <p className="mt-2 leading-relaxed text-ink-soft">{c.solution}</p>
            </Reveal>
          ))}
        </div>

        {/* ---- What I'd do differently ---- */}
        <Reveal className="mt-14 rounded-3xl border-2 border-dashed border-ink/15 bg-surface p-7 sm:p-9">
          <Eyebrow color={accent}>What I&apos;d do differently</Eyebrow>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{project.learned}</p>
        </Reveal>

        {/* ---- Gallery ---- */}
        {project.media.length > 1 && (
          <>
            <Reveal className="mt-14">
              <Eyebrow color={accent}>Gallery</Eyebrow>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.media.slice(1).map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <Media label={m.label} ratio={m.ratio} color={accent} video={m.video} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ---- Prev / next ---- */}
        <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-ink/8 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="game-card rounded-2xl border-2 border-ink/10 bg-surface p-5"
              style={{ "--game": prev.accent }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">← Previous</p>
              <p className="mt-1 font-display text-xl font-bold">{prev.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{prev.hook}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="game-card rounded-2xl border-2 border-ink/10 bg-surface p-5 sm:text-right"
              style={{ "--game": next.accent }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">Next →</p>
              <p className="mt-1 font-display text-xl font-bold">{next.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{next.hook}</p>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
