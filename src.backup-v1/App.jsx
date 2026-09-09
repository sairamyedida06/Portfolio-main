import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Wordmark, ThemeToggle } from "./ui.jsx";
import { profile, socials, studio } from "./data/links.js";
import Home from "./Home.jsx";
import ProjectDetail from "./ProjectDetail.jsx";

const NAV = [
  { label: "Work", id: "work" },
  { label: "Stack", id: "stack" },
  { label: "Journey", id: "journey" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/* A nav link to a homepage section that works from any route: scrolls when
   already home, otherwise navigates home and scrolls after mount. */
function SectionLink({ id, className, onClick, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const go = (e) => {
    e.preventDefault();
    onClick?.();
    if (pathname === "/") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else navigate("/", { state: { scrollTo: id } });
  };
  return (
    <a href={`/#${id}`} onClick={go} className={className}>
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" aria-label="Sai Ram — home" className="rounded-md">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <SectionLink
              key={item.id}
              id={item.id}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </SectionLink>
          ))}
          <ThemeToggle />
          <a
            href={profile.cv}
            className="rounded-full bg-blue px-5 py-2 text-sm font-bold text-on-accent transition-transform hover:-translate-y-0.5"
          >
            Download CV
          </a>
        </nav>

        <span className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md p-2"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-ink" fill="none" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </span>
      </div>

      {open && (
        <nav aria-label="Main mobile" className="border-t border-ink/8 bg-base px-5 pb-5 pt-2 md:hidden">
          {NAV.map((item) => (
            <SectionLink
              key={item.id}
              id={item.id}
              onClick={() => setOpen(false)}
              className="block rounded-md py-2.5 text-base font-semibold text-ink"
            >
              {item.label}
            </SectionLink>
          ))}
          <a
            href={profile.cv}
            onClick={() => setOpen(false)}
            className="mt-2 inline-block rounded-full bg-blue px-5 py-2.5 text-sm font-bold text-on-accent"
          >
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep pb-10 pt-12 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark dark />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Building mobile games from {profile.location} — and shipping them.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {NAV.map((item) => (
              <SectionLink key={item.id} id={item.id} className="text-sm font-semibold text-white/70 hover:text-white">
                {item.label}
              </SectionLink>
            ))}
            {socials.map((s) => (
              <a key={s.name} href={s.url} className="text-sm font-semibold text-white/70 hover:text-white">
                {s.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">© 2026 {profile.name}. All rights reserved.</p>
          <p className="text-sm text-white/70">
            <a href={studio.site} className="font-bold text-white underline decoration-blue decoration-2 underline-offset-2">
              Rash Game Studios
            </a>
            <span className="mx-2 text-white/30">·</span>
            <a href={studio.arcade} className="font-bold text-white underline decoration-blue decoration-2 underline-offset-2">
              Play the arcade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Reset scroll on route change, unless we were sent home to reach a section. */
function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);
  return null;
}

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue focus:px-5 focus:py-2.5 focus:font-bold focus:text-on-accent"
      >
        Skip to my work
      </a>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
