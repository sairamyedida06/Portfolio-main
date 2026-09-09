import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/*
 * HeroToy — the Roast Racers car.
 *
 * Desktop (fine pointer + hover): the car can roam the whole page.
 *  - It is a real focusable element (tabindex=0). Arrow keys drive it ONLY
 *    while it has focus — listeners live on the element, never on window —
 *    so wheel/trackpad/spacebar/PageDown/scrollbar scrolling always works.
 *    Escape (or clicking anywhere else) blurs it and arrows go back to
 *    scrolling the page.
 *  - Positioned in PAGE coordinates via a portal on <body>: parked, it stays
 *    where you left it while the page scrolls past. Driving toward the top or
 *    bottom of the viewport scrolls the page to follow, platformer-style.
 *  - transform-only movement (outer translate3d + inner rotate). The physics
 *    loop only runs while focused or coasting; a parked car costs nothing.
 *
 * Mobile / touch: roaming is disabled entirely — the car stays inside the
 * hero as a drag-and-fling toy, and touch-action is disabled only on the
 * car itself, so page scroll is never interfered with.
 *
 * prefers-reduced-motion: nothing renders at all.
 * No score, no goal, no fail state. A toy.
 */

const ARROWS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const CAR_W = 52;
const CAR_H = 32;

// Shared feel: thrust/brake, forward damping, lateral grip (the drift), bounce.
const THRUST = 0.4;
const BRAKE = -0.24;
const DAMP_FWD = 0.985;
const DAMP_LAT = 0.9;
const BOUNCE = 0.45;
const TURN = 0.065;

function CarSvg() {
  return (
    <svg viewBox="0 0 52 32" width={CAR_W} height={CAR_H}>
      <g fill="var(--color-deep)" opacity="0.85">
        <rect x="8" y="0" width="10" height="6" rx="2" />
        <rect x="8" y="26" width="10" height="6" rx="2" />
        <rect x="34" y="0" width="10" height="6" rx="2" />
        <rect x="34" y="26" width="10" height="6" rx="2" />
      </g>
      <path
        d="M4 8 Q4 4 10 4 L40 4 Q50 4 50 12 L50 20 Q50 28 40 28 L10 28 Q4 28 4 24 Z"
        fill="var(--color-coral)"
      />
      <rect x="24" y="7" width="9" height="18" rx="3" fill="var(--color-deep)" opacity="0.35" />
      <rect x="2" y="9" width="4" height="14" rx="1.5" fill="var(--color-coral)" />
      <circle cx="45" cy="11" r="1.8" fill="#fff" opacity="0.9" />
      <circle cx="45" cy="21" r="1.8" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/* One physics step shared by both modes. Mutates s in place. */
function stepPhysics(s, thrust, steer) {
  const speed = Math.hypot(s.vx, s.vy);
  // Steering authority grows with speed — you can't spin a parked car fast.
  s.heading += steer * TURN * Math.min(1, speed / 2.4 + (thrust ? 0.5 : 0.12));
  s.vx += Math.cos(s.heading) * thrust;
  s.vy += Math.sin(s.heading) * thrust;
  // Drift: damp lateral velocity harder than forward, so momentum carries
  // through corners instead of turning on rails.
  const fx = Math.cos(s.heading);
  const fy = Math.sin(s.heading);
  let vf = s.vx * fx + s.vy * fy;
  let vl = -s.vx * fy + s.vy * fx;
  vf *= DAMP_FWD;
  vl *= DAMP_LAT;
  s.vx = fx * vf - fy * vl;
  s.vy = fy * vf + fx * vl;
  s.x += s.vx;
  s.y += s.vy;
}

/* ------------------- Desktop: focus-driven, roams the page ------------------- */

function RoamingCar({ boundsRef }) {
  const wrapRef = useRef(null);
  const rotRef = useRef(null);
  const hintRef = useRef(null);

  const s = useRef({
    x: 24,
    y: 320,
    vx: 0,
    vy: 0,
    heading: 0.35,
    keys: {},
    raf: 0,
    docH: 0,
    started: false,
    cards: [], // cached page-space rects of .game-card elements
    hit: null, // card currently lifted by the car
    tick: 0,
  }).current;

  // Cache card rects in page coordinates so the per-frame hit test is pure
  // math — no layout reads in the loop. Marquee cards are skipped (they
  // move constantly, so a cached rect would be wrong).
  const refreshCards = () => {
    s.cards = [...document.querySelectorAll(".game-card")]
      .filter((el) => !el.closest(".marquee"))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height };
      });
  };

  const apply = () => {
    if (!wrapRef.current || !rotRef.current) return;
    wrapRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px,0)`;
    rotRef.current.style.transform = `rotate(${s.heading}rad)`;
  };

  useLayoutEffect(() => {
    const hero = boundsRef.current;

    if (hero) {
      const r = hero.getBoundingClientRect();

      s.x = Math.max(16, r.left + 50);
      s.y = r.top + window.scrollY + Math.max(140, r.height * 0.52);
    }

    apply();

    return () => {
      cancelAnimationFrame(s.raf);
      if (s.hit) s.hit.classList.remove("car-bump");
    };
  }, []);

  const loop = () => {
    const thrust = s.keys.ArrowUp
      ? THRUST
      : s.keys.ArrowDown
      ? BRAKE
      : 0;

    const steer =
      (s.keys.ArrowRight ? 1 : 0) -
      (s.keys.ArrowLeft ? 1 : 0);

    stepPhysics(s, thrust, steer);

    const maxX =
      document.documentElement.clientWidth - CAR_W - 4;

    const maxY =
      s.docH - CAR_H - 4;

    if (s.x < 4) {
      s.x = 4;
      s.vx = -s.vx * BOUNCE;
    }

    if (s.x > maxX) {
      s.x = maxX;
      s.vx = -s.vx * BOUNCE;
    }

    if (s.y < 4) {
      s.y = 4;
      s.vy = -s.vy * BOUNCE;
    }

    if (s.y > maxY) {
      s.y = maxY;
      s.vy = -s.vy * BOUNCE;
    }

    const vpY = s.y - window.scrollY;
    const vh = window.innerHeight;

    if (vpY > vh - 180 && s.vy > 0)
      window.scrollBy({
        top: s.vy,
        behavior: "instant",
      });

    else if (vpY < 140 && s.vy < 0)
      window.scrollBy({
        top: s.vy,
        behavior: "instant",
      });

    // Card bump: lift whichever card the car's nose is over, using the
    // cached rects. Class toggles happen only on enter/leave, and the
    // cache refreshes about once a second while driving.
    if (++s.tick % 60 === 0) refreshCards();
    const cx = s.x + CAR_W / 2;
    const cy = s.y + CAR_H / 2;
    let hit = null;
    for (const c of s.cards) {
      if (cx >= c.x && cx <= c.x + c.w && cy >= c.y && cy <= c.y + c.h) {
        hit = c.el;
        break;
      }
    }
    if (hit !== s.hit) {
      if (s.hit) s.hit.classList.remove("car-bump");
      if (hit) hit.classList.add("car-bump");
      s.hit = hit;
    }

    apply();

    const anyKey = ARROWS.some((k) => s.keys[k]);

    if (anyKey || Math.hypot(s.vx, s.vy) > 0.05)
      s.raf = requestAnimationFrame(loop);
    else s.raf = 0;
  };

  const ensureLoop = () => {
    if (!s.raf) {
      s.docH = document.documentElement.scrollHeight;
      refreshCards();
      s.raf = requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!ARROWS.includes(e.key)) return;

      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (!s.started) {
        s.started = true;

        if (hintRef.current)
          hintRef.current.style.display = "none";
      }

      e.preventDefault();

      s.keys[e.key] = true;

      ensureLoop();
    };

    const onKeyUp = (e) => {
      if (ARROWS.includes(e.key))
        s.keys[e.key] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
      window.removeEventListener(
        "keyup",
        onKeyUp
      );
    };
  }, []);

  return createPortal(
    <div
      ref={wrapRef}
      className="absolute left-0 top-0 z-30 select-none"
      style={{
        width: CAR_W,
        height: CAR_H,
        willChange: "transform",
      }}
    >
      <div
        ref={rotRef}
        className="h-full w-full"
        style={{
          willChange: "transform",
        }}
      >
        <CarSvg />
      </div>

      <span
        ref={hintRef}
        className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft"
      >
        ← ↑ ↓ → Drive
      </span>
    </div>,
    document.body
  );
}

/* --------------- Mobile / touch: drag-and-fling, hero only --------------- */

function HeroDragCar({ boundsRef }) {
  const carRef = useRef(null);
  const [hintGone, setHintGone] = useState(false);

  useEffect(() => {
    const car = carRef.current;
    const host = boundsRef.current;
    if (!car || !host) return;

    const s = { x: 24, y: Math.max(120, host.offsetHeight * 0.52), vx: 0, vy: 0, heading: 0.35 };
    let dragging = false;
    let raf = 0;
    const trail = [];

    const apply = () => {
      car.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.heading}rad)`;
    };
    apply();

    const step = () => {
      if (!dragging) {
        stepPhysics(s, 0, 0); // coasting: momentum + drift damping only
        const maxX = host.offsetWidth - CAR_W;
        const maxY = host.offsetHeight - CAR_H;
        if (s.x < 0) { s.x = 0; s.vx = -s.vx * BOUNCE; }
        if (s.x > maxX) { s.x = maxX; s.vx = -s.vx * BOUNCE; }
        if (s.y < 0) { s.y = 0; s.vy = -s.vy * BOUNCE; }
        if (s.y > maxY) { s.y = maxY; s.vy = -s.vy * BOUNCE; }
      }
      apply();
      if (dragging || Math.hypot(s.vx, s.vy) > 0.05) raf = requestAnimationFrame(step);
      else raf = 0;
    };
    const ensure = () => { if (!raf) raf = requestAnimationFrame(step); };

    const toLocal = (e) => {
      const r = host.getBoundingClientRect();
      return { px: e.clientX - r.left, py: e.clientY - r.top };
    };
    const onPointerDown = (e) => {
      dragging = true;
      setHintGone(true);
      car.setPointerCapture(e.pointerId);
      trail.length = 0;
      ensure();
      e.preventDefault();
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const { px, py } = toLocal(e);
      const nx = px - CAR_W / 2;
      const ny = py - CAR_H / 2;

      
      const dx = nx - s.x;
      const dy = ny - s.y;
      if (Math.hypot(dx, dy) > 2) s.heading = Math.atan2(dy, dx);
      s.x = nx;
      s.y = ny;
      trail.push({ dx, dy, t: performance.now() });
      if (trail.length > 6) trail.shift();
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      const recent = trail.filter((p) => performance.now() - p.t < 120);
      if (recent.length) {
        s.vx = Math.max(-18, Math.min(18, (recent.reduce((a, p) => a + p.dx, 0) / recent.length) * 1.4));
        s.vy = Math.max(-18, Math.min(18, (recent.reduce((a, p) => a + p.dy, 0) / recent.length) * 1.4));
      }
      ensure();
    };

    car.addEventListener("pointerdown", onPointerDown);
    car.addEventListener("pointermove", onPointerMove);
    car.addEventListener("pointerup", onPointerUp);
    car.addEventListener("pointercancel", onPointerUp);
    return () => {
      cancelAnimationFrame(raf);
      car.removeEventListener("pointerdown", onPointerDown);
      car.removeEventListener("pointermove", onPointerMove);
      car.removeEventListener("pointerup", onPointerUp);
      car.removeEventListener("pointercancel", onPointerUp);
    };
  }, [boundsRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {!hintGone && (
        <p
          className="absolute left-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft"
          style={{ top: "44%" }}
        >
          ↓ Throw me
        </p>
      )}
      <div
        ref={carRef}
        className="pointer-events-auto absolute left-0 top-0 cursor-grab active:cursor-grabbing"
        style={{ width: CAR_W, height: CAR_H, touchAction: "none", willChange: "transform" }}
      >
        <CarSvg />
      </div>
    </div>
  );
}

export default function HeroToy({ boundsRef }) {
  const [reduced] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [roams] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  if (reduced) return null;
  return roams ? <RoamingCar boundsRef={boundsRef} /> : <HeroDragCar boundsRef={boundsRef} />;
}
