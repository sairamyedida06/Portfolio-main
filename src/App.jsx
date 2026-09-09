import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Monogram } from "./ui.jsx";
import { Icon } from "./icons.jsx";
import { profile } from "./data/links.js";
import Home from "./Home.jsx";
import ProjectDetail from "./ProjectDetail.jsx";

const NAV = [
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/* Section link that works from any route: scrolls when already home,
   otherwise navigates home and scrolls once mounted. */
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

/* Highlights whichever section is currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") {
      setActive(null);
      return;
    }
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, pathname]);
  return active;
}

function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" aria-label={`${profile.name} — home`}>
          <Monogram />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const on = active === item.id;
            return (
              <SectionLink
                key={item.id}
                id={item.id}
                className={`relative py-1 text-[15px] font-medium transition-colors ${
                  on ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
                {on && (
                  <span aria-hidden="true" className="absolute -bottom-[17px] left-0 right-0 h-[2px] rounded-full bg-accent" />
                )}
              </SectionLink>
            );
          })}
          <a
            href={profile.cv}
            className="inline-flex items-center gap-2 bg-accent-bright px-5 py-2.5 text-[15px] font-semibold text-on-accent shadow-[var(--shadow-card)] transition-all hover:brightness-110"
            style={{ borderRadius: "var(--radius-btn)" }}
          >
            Resume
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-line bg-surface text-text md:hidden"
          style={{ borderRadius: "var(--radius-btn)" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav aria-label="Main mobile" className="border-t border-line bg-bg px-6 pb-5 pt-2 md:hidden">
          {NAV.map((item) => (
            <SectionLink
              key={item.id}
              id={item.id}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 text-[16px] font-medium text-text"
            >
              {item.label}
            </SectionLink>
          ))}
          <a
            href={profile.cv}
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex items-center gap-2 bg-accent-bright px-5 py-3 text-[15px] font-semibold text-on-accent"
            style={{ borderRadius: "var(--radius-btn)" }}
          >
            Download resume
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Monogram />
          <p className="text-[14px] text-subtle">
            {profile.role} · {profile.location}
          </p>
        </div>

        {/* Social links live in the Contact section's cards — no need to repeat them here. */}
        <p className="text-[14px] text-subtle">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}

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
        href="#experience"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-5 focus:py-2.5 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
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
