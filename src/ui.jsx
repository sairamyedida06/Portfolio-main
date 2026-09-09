import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons.jsx";

/* ---------------------------------------------------------------------------
 * Shared primitives: rounded cards, soft shadows, icons, one orange accent.
 * ------------------------------------------------------------------------- */

export function Monogram() {
  return (
    <span className="flex items-baseline gap-2.5">
      <span aria-hidden="true" className="h-4 w-[5px] shrink-0 translate-y-px rounded-sm bg-accent" />
      <span className="font-display text-[17px] font-bold tracking-tight text-text">Sai Ram</span>
    </span>
  );
}

/* Section eyebrow — short orange rule, then an orange label. */
export function Label({ children, className = "" }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-accent" />
      <span>{children}</span>
    </p>
  );
}

/* Handwritten margin note with a curving arrow, as in the mock. */
export function Note({ children, className = "", flip = false }) {
  return (
    <p className={`hand relative max-w-[220px] ${className}`}>
      {children}
      <svg
        viewBox="0 0 60 50"
        aria-hidden="true"
        className={`absolute -bottom-9 h-10 w-12 text-line-strong ${flip ? "left-2 -scale-x-100" : "right-2"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M6 2c14 6 26 16 30 34" />
        <path d="M28 34h9M36 28l1 8" />
      </svg>
    </p>
  );
}

/* Media placeholder — rounded frame with a legible caption.
   Swap for a real <img> when art lands; the wrapper holds the ratio. */
/*
 * Shows the real asset when one exists at `src`, and falls back to a labelled
 * placeholder box when the file isn't there yet — so the site never looks
 * broken while art is still being produced.
 */
export function Frame({
  label,
  ratio = "16/9",
  video = false,
  src,
  poster,
  className = "",
  rounded = "var(--radius-card)",
  centerCaption = false,
  fit = "cover",
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const showMedia = Boolean(src) && !failed;

  return (
    <div
      role={showMedia ? undefined : "img"}
      aria-label={showMedia ? undefined : `Placeholder — ${label}`}
      className={`relative overflow-hidden border border-line bg-raise ${className}`}
      style={{ aspectRatio: ratio, borderRadius: rounded }}
    >
      {showMedia &&
        (video ? (
          /* Click-to-play: a gameplay clip is tens of megabytes, so it stays
             unfetched (preload="none") behind the poster until someone asks. */
          playing ? (
            <video
              src={src}
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: fit }}
              autoPlay
              loop
              controls
              playsInline
              aria-label={label}
              onError={() => setFailed(true)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label={`Play ${label}`}
            >
              {poster ? (
                <img
                  src={poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full"
                  style={{ objectFit: fit }}
                />
              ) : (
                <span className="absolute inset-0 bg-raise" />
              )}
              <span className="absolute inset-0 bg-[#17161a]/25 transition-colors group-hover:bg-[#17161a]/40" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-bright text-on-accent shadow-[var(--shadow-lift)] transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )
        ) : (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: fit }}
            onError={() => setFailed(true)}
          />
        ))}

      {!showMedia && (
        <>
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-line-strong">
            <Icon name={video ? "gamepad" : "cube"} className="h-8 w-8" />
            {/* Centred caption for frames whose corners get clipped (the hero collage). */}
            {centerCaption && (
              <span className="px-4 text-center text-[12px] font-medium text-subtle">{label}</span>
            )}
          </span>
          {!centerCaption && (
            <span className="absolute bottom-2.5 left-3 right-3 truncate text-[12px] font-medium text-subtle">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* Stat with an icon — the hero / about strips. */
export function Stat({ icon, value, caption }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-accent" aria-hidden="true">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-display text-[20px] font-bold leading-tight tracking-tight text-text">{value}</span>
        <span className="block text-[14px] leading-snug text-subtle">{caption}</span>
      </span>
    </div>
  );
}

/* Key/value row for the dark spec card. */
export function SpecRow({ icon, k, v, accent = false }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5 shrink-0 text-white/45" aria-hidden="true">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] leading-tight text-white/55">{k}</span>
        <span className={`block text-[15px] font-semibold leading-snug ${accent ? "text-[#ff8a5c]" : "text-white"}`}>
          {v}
        </span>
      </span>
    </div>
  );
}

export function Chip({ children }) {
  return (
    <span
      className="border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-muted"
      style={{ borderRadius: "var(--radius-chip)" }}
    >
      {children}
    </span>
  );
}

/* Scroll-triggered reveal; settles instantly under reduced motion (CSS). */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content must never be trapped behind a missing API — show it instead.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Actions. solid = filled orange, ghost = white with border. */
export function Button({ href, children, variant = "solid", icon, trailing, className = "", ...rest }) {
  const base =
    "group inline-flex items-center gap-2.5 px-5 py-3 text-[15px] font-semibold transition-all";
  const styles =
    variant === "solid"
      ? "bg-accent-bright text-on-accent shadow-[var(--shadow-card)] hover:brightness-110"
      : "border border-line bg-surface text-text hover:border-accent hover:text-accent";
  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      style={{ borderRadius: "var(--radius-btn)" }}
      {...rest}
    >
      {icon && <Icon name={icon} className="h-[18px] w-[18px]" />}
      <span>{children}</span>
      {trailing && (
        <Icon
          name={trailing}
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1"
        />
      )}
    </a>
  );
}

/* Rounded white surface used across the site. */
export function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag
      className={`border border-line bg-surface shadow-[var(--shadow-card)] ${className}`}
      style={{ borderRadius: "var(--radius-card)" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Tinted square badge holding a section icon. */
export function IconBadge({ name, className = "" }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center bg-accent-soft text-accent ${className}`}
      style={{ borderRadius: "var(--radius-btn)" }}
      aria-hidden="true"
    >
      <Icon name={name} className="h-[22px] w-[22px]" />
    </span>
  );
}
