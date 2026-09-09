import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { detailProjects, getProject } from "./data/projects.js";
import { profile } from "./data/links.js";
import { Frame, Reveal, Label, Chip, Button, Card, IconBadge } from "./ui.jsx";
import { Icon } from "./icons.jsx";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";
const COL = "mx-auto max-w-[760px]";

/*
 * /work/:slug — the page that earns interviews.
 * Fixed structure; all content comes from src/data/projects.js.
 */

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    const base = `${profile.name} — ${profile.role}`;
    document.title = `${project.title} — ${profile.shortName}`;
    const meta = document.querySelector('meta[name="description"]');
    const original = meta?.getAttribute("content");
    meta?.setAttribute("content", `${project.title}: ${project.hook}`);
    return () => {
      document.title = base;
      if (original) meta?.setAttribute("content", original);
    };
  }, [project]);

  // Hidden and coming-soon entries have no page — send them home.
  if (!project || project.hidden || project.comingSoon) return <Navigate to="/" replace />;

  // Prev/next walks only the projects that are actually linked from the homepage.
  const index = detailProjects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? detailProjects[index - 1] : null;
  const next = index >= 0 ? detailProjects[index + 1] : null;

  return (
    <article className="pb-24">
      {/* ---------------------------- Header ---------------------------- */}
      <header className="border-b border-line bg-raise py-12 lg:py-16">
        <div className={WRAP}>
          <Link
            to="/"
            state={{ scrollTo: "work" }}
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-muted transition-colors hover:text-accent"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Label className="rise">{project.context}</Label>
              <h1
                className="rise mt-4 font-display text-[clamp(2.1rem,4.6vw,3.3rem)] font-bold leading-[1.06] tracking-[-0.025em]"
                style={{ animationDelay: "60ms" }}
              >
                {project.title}
              </h1>
              <p
                className="rise measure mt-4 text-[18px] leading-relaxed text-muted"
                style={{ animationDelay: "120ms" }}
              >
                {project.hook}
              </p>
              <div className="rise mt-6 flex flex-wrap gap-2" style={{ animationDelay: "180ms" }}>
                {project.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {(project.links?.play || project.links?.source) && (
                <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
                  {project.links.play && (
                    <Button
                      href={project.links.play}
                      icon="gamepad"
                      trailing="arrowUpRight"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Play {project.title}
                    </Button>
                  )}
                  {project.links.source && (
                    <Button
                      href={project.links.source}
                      variant="ghost"
                      icon="github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                    </Button>
                  )}
                </div>
              )}
            </div>

            <Reveal className="lg:col-span-5">
              <Card className="p-6">
                <dl className="grid gap-4">
                  {[
                    ["briefcase", "Role", project.role],
                    ["check", "Status", project.status],
                    ["monitor", "Platforms", project.platforms.join(" · ")],
                    ["bolt", "Year", project.year],
                  ].map(([icon, k, v]) => (
                    <div key={k} className="flex items-start gap-3.5">
                      <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
                        <Icon name={icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <dt className="text-[13px] leading-tight text-subtle">{k}</dt>
                        <dd className="text-[15px] font-semibold leading-snug text-text">{v}</dd>
                      </span>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------------------------- Hero media ---------------------------- */}
      <div className={`${WRAP} mt-10`}>
        <Reveal>
          <Frame
            label={project.media[0].label}
            src={project.media[0].src}
            poster={project.thumb.src}
            ratio={project.media[0].ratio}
            video={project.media[0].video}
          />
        </Reveal>
      </div>

      <div className={WRAP}>
        <div className={COL}>
          {/* ------------------------------ Overview ------------------------------ */}
          <Reveal className="mt-14">
            <Label>Overview</Label>
            <p className="mt-5 text-[18px] leading-relaxed text-muted">{project.pitch}</p>
          </Reveal>

          {/* ---------------------------- What I built ---------------------------- */}
          <Reveal className="mt-14">
            <Label>What I built</Label>
            <h2 className="dot mt-4 font-display text-[clamp(1.6rem,2.8vw,2.1rem)] font-bold leading-tight tracking-[-0.02em]">
              My actual contribution
            </h2>
          </Reveal>
          <Card className="mt-6 p-6 sm:p-7">
            <ul className="space-y-3.5">
              {project.built.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span aria-hidden="true" className="mt-[11px] h-[2px] w-3 shrink-0 rounded-full bg-accent" />
                  <span className="text-[16px] leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* -------------------------- Technical deep dive ------------------------- */}
          {project.challenges?.length > 0 && (
            <>
              <Reveal className="mt-14">
                <Label>Technical</Label>
                <h2 className="dot mt-4 font-display text-[clamp(1.6rem,2.8vw,2.1rem)] font-bold leading-tight tracking-[-0.02em]">
                  What was hard, and what I did
                </h2>
              </Reveal>
              <div className="mt-6 space-y-5">
                {project.challenges.map((c, i) => (
                  <Reveal key={c.problem} delay={i * 60}>
                    <Card className="p-6 sm:p-7">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-subtle">
                        The problem
                      </p>
                      <p className="mt-2.5 text-[17px] font-medium leading-relaxed text-text">{c.problem}</p>
                      <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent">
                        What I did
                      </p>
                      <p className="mt-2.5 text-[16px] leading-relaxed text-muted">{c.solution}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {/* -------------------------------- Retro ------------------------------- */}
          {project.learned && (
            <Reveal className="mt-14">
              <div className="flex gap-5 bg-accent-soft p-6 sm:p-7" style={{ borderRadius: "var(--radius-card)" }}>
                <IconBadge name="bulb" className="bg-surface" />
                <div>
                  <p className="dot font-display text-[18px] font-bold tracking-tight">
                    What I&apos;d do differently
                  </p>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{project.learned}</p>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* ------------------------------- Gallery ------------------------------- */}
        {project.media.length > 1 && (
          <div className="mt-16">
            <Reveal>
              <Label>Gallery</Label>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {project.media.slice(1).map((m, i) => (
                <Reveal key={m.label} delay={i * 55}>
                  <Frame label={m.label} src={m.src} ratio={m.ratio} video={m.video} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------- Prev / next ----------------------------- */}
        <nav aria-label="More projects" className="mt-16 grid gap-5 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? (
            <Card as={Link} to={`/work/${prev.slug}`} className="game-card block p-6">
              <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-subtle">
                <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
                Previous
              </p>
              <p className="rec-title mt-2 font-display text-[20px] font-bold tracking-tight">{prev.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{prev.hook}</p>
            </Card>
          ) : (
            <span />
          )}
          {next && (
            <Card as={Link} to={`/work/${next.slug}`} className="game-card block p-6 sm:text-right">
              <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-subtle sm:justify-end">
                Next
                <Icon name="arrowRight" className="rec-arrow h-4 w-4" />
              </p>
              <p className="rec-title mt-2 font-display text-[20px] font-bold tracking-tight">{next.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{next.hook}</p>
            </Card>
          )}
        </nav>
      </div>
    </article>
  );
}
