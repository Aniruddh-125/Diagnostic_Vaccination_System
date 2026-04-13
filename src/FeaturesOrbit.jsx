import { useEffect, useRef, useState, useCallback } from 'react';
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Feature node definitions
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const NODES = [
  { label: 'Vaccine Tracking', desc: 'Real-time dose history across every patient, every visit.', color: '#06b6d4', angle: -90 },
  { label: 'Smart Scheduling', desc: 'AI-optimized appointment slots that reduce wait times by 60%.', color: '#8b5cf6', angle: -30 },
  { label: 'Center Locator', desc: 'Find certified vaccination centers within your location radius.', color: '#10b981', angle: 30 },
  { label: 'AI Diagnostics', desc: 'Symptom analysis and preliminary triage before your appointment.', color: '#f59e0b', angle: 90 },
  { label: 'Health Records', desc: 'Unified medical history accessible to authorized providers.', color: '#ef4444', angle: 150 },
  { label: 'Alerts & Notify', desc: 'Automated reminders, adverse event alerts, and broadcast notices.', color: '#3b82f6', angle: 210 },
];

const R = 320;            // orbit radius (px)
const BOX = 800;          // orbit container size (px)
const C = BOX / 2;        // center coordinate

/** Convert angle → (x, y) offset from center */
const pos = (deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: Math.cos(rad) * R, y: Math.sin(rad) * R };
};

/* ━━━ Inline SVG icons — 24×24, stroke-based, monochrome ━━━ */
const ICONS = [
  /* Shield + checkmark — Vaccine Tracking */
  <svg key="i0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  /* Clock — Smart Scheduling */
  <svg key="i1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  /* Map pin — Center Locator */
  <svg key="i2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  /* Activity pulse — AI Diagnostics */
  <svg key="i3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  /* File text — Health Records */
  <svg key="i4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>,
  /* Bell — Alerts & Notify */
  <svg key="i5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
];

/* ━━━ Pulsing skeleton while Spline loads ━━━ */
function BrainSkeleton() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        animation: 'foPulse 2s ease-in-out infinite',
      }} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FeaturesOrbit
   Scroll-triggered radial brain interface with six orbital nodes
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function FeaturesOrbit() {
  const sectionRef = useRef(null);
  const brainRef = useRef(null);
  const canvasRef = useRef(null);
  const nodeRefs = useRef([]);
  const splineApp = useRef(null);
  const rafId = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [brainInView, setBrainInView] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  /* ── Defer Spline brain loading until section approaches viewport ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBrainInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Initialize Spline Runtime when in view ── */
  const onSplineLoad = useCallback((app) => { splineApp.current = app; }, []);

  useEffect(() => {
    if (!brainInView || !canvasRef.current) return;

    const app = new Application(canvasRef.current);
    app.load('https://prod.spline.design/RmrvNpmmThZTUR8Z/scene.splinecode').then(() => {
      // Disable the "Built with Spline" watermark (rendered as a GPU overlay pass)
      try { app._renderer.pipeline.logoOverlayPass.enabled = false; } catch { /* no-op */ }
      onSplineLoad(app);
      setSplineLoaded(true);
    });

    return () => {
      if (app && typeof app.dispose === 'function') app.dispose();
    };
  }, [brainInView, onSplineLoad]);

  /* ── Load Inter font without blocking CSS ── */
  useEffect(() => {
    if (!document.querySelector('link[href*="family=Inter"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  /* ── GSAP: brain idle float + scroll-triggered entrance ── */
  useEffect(() => {
    const section = sectionRef.current;
    const brain = brainRef.current;
    if (!section || !brain) return;

    let ctx;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
      /* Continuous subtle brain float */
      gsap.to(brain, {
        y: 8, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      /* Scroll-triggered entrance timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      /* 1 — Heading word-by-word stagger */
      tl.fromTo('.fo-word',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
      );

      /* 2 — Subheading fade up */
      tl.fromTo('.fo-sub',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.25',
      );

      /* 3 — Brain scales in */
      tl.fromTo(brain,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.35',
      );

      /* 4 — Nodes scatter from center to orbit positions */
      NODES.forEach((node, i) => {
        const p = pos(node.angle);
        const el = nodeRefs.current[i];
        if (!el) return;
        tl.fromTo(el,
          { x: 0, y: 0, scale: 0, opacity: 0 },
          { x: p.x, y: p.y, scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.5)' },
          `-=${i === 0 ? 0.45 : 0.48}`,
        );
      });

      /* 5 — Connecting lines fade in */
      tl.fromTo('.fo-bg-line',
        { opacity: 0 },
        { opacity: 1, stagger: 0.04, duration: 0.3 },
        '-=0.35',
      );
      }, section);
    });

    return () => { cancelAnimationFrame(raf); ctx?.revert(); };
  }, []);

  /* ── Brain tilt toward hovered node ── */
  useEffect(() => {
    const brain = brainRef.current;
    if (!brain) return;

    if (hovered !== null) {
      const p = pos(NODES[hovered].angle);
      gsap.to(brain, {
        rotateX: -(p.y / R) * 8,
        rotateY: (p.x / R) * 8,
        duration: 0.5,
        ease: 'back.out(1.7)',
        overwrite: 'auto',
      });
    } else {
      gsap.to(brain, {
        rotateX: 0, rotateY: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        overwrite: 'auto',
      });
    }
  }, [hovered]);

  /* ── Forward mouse to Spline scene variables (window-level for full coverage) ── */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const app = splineApp.current;
        const section = sectionRef.current;
        if (!app || !section) return;
        const rect = section.getBoundingClientRect();
        // Only track when mouse is within the section's vertical bounds
        if (e.clientY < rect.top || e.clientY > rect.bottom) return;
        // Boosted sensitivity: multiplier 5 (was 2)
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
        try {
          app.setVariable?.('mouseX', nx);
          app.setVariable?.('mouseY', ny);
        } catch { /* scene may not expose these variables */ }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ── Cleanup RAF on unmount ── */
  useEffect(() => {
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  /* ── Heading words for stagger animation ── */
  const HEADING = ['Intelligence', 'at', 'the', 'center.'];

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Render ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        /* ━━ Section ━━ */
        .fo-section {
          contain: layout style;
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.04) 0%, transparent 50%),
            #080808;
          overflow: visible;
          padding: 100px 20px 80px;
        }

        /* Gradient transition from hero */
        .fo-fade {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 180px;
          background: linear-gradient(to bottom, #080808 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* ━━ Typography ━━ */
        .fo-heading {
          font-family: 'Inter', 'DM Sans', system-ui, sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 300;
          color: #F0F0F0;
          letter-spacing: -0.03em;
          text-align: center;
          margin: 0 0 16px;
          line-height: 1.15;
          position: relative;
          z-index: 3;
          pointer-events: none;
        }

        .fo-word {
          display: inline-block;
          margin-right: 0.25em;
          opacity: 0;              /* GSAP reveals on scroll */
        }
        .fo-word:last-child { margin-right: 0; }

        .fo-word-accent {
          background: linear-gradient(135deg, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fo-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 18px;
          color: #6b7280;
          max-width: 480px;
          text-align: center;
          margin: 0 auto 48px;
          line-height: 1.6;
          position: relative;
          z-index: 3;
          opacity: 0;             /* GSAP reveals on scroll */
          pointer-events: none;
        }

        /* ━━ Orbit container ━━ */
        .fo-orbit {
          position: relative;
          width: ${BOX}px;
          height: ${BOX}px;
          flex-shrink: 0;
        }

        /* ━━ Spline brain ━━ */
        .fo-brain {
          position: absolute;
          top: 50%; left: 50%;
          width: 500px; height: 500px;
          margin: -250px 0 0 -250px;
          will-change: transform;
          z-index: 1;
        }
        .fo-brain canvas { background: transparent !important; }

        /* ━━ SVG connecting lines overlay ━━ */
        .fo-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .fo-bg-line {
          stroke: rgba(255,255,255,0.04);
          stroke-width: 1;
          stroke-dasharray: 4 4;
          fill: none;
        }

        .fo-draw-line {
          fill: none;
          stroke-width: 1.5;
          stroke-dasharray: ${R};
          stroke-dashoffset: ${R};
          transition: stroke-dashoffset 0.4s ease-out, opacity 0.3s ease;
          opacity: 0;
        }
        .fo-draw-line.fo-line-on {
          stroke-dashoffset: 0;
          opacity: 0.4;
        }

        /* ━━ Node wrapper — GSAP animates (x, y) on this ━━ */
        .fo-nw {
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          z-index: 3;
          will-change: transform;
        }

        /* ━━ Node inner — centered on wrapper ━━ */
        .fo-node {
          position: absolute;
          top: -40px;            /* vertically center the 80px circle */
          left: -80px;           /* horizontally center the 160px node */
          width: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }

        /* ━━ Glass circle ━━ */
        .fo-circ {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition:
            transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            color 0.3s ease;
          position: relative;
          will-change: transform;
          flex-shrink: 0;
        }
        .fo-node:hover .fo-circ { transform: scale(1.1); }

        /* ━━ Ripple ring ━━ */
        .fo-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          pointer-events: none;
          opacity: 0;
        }
        .fo-ripple-go {
          animation: foRipple 0.6s ease-out forwards;
        }
        @keyframes foRipple {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* ━━ Label (always visible) ━━ */
        .fo-lbl {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #94a3b8;
          margin-top: 12px;
          white-space: nowrap;
          transition: color 0.3s ease;
          text-align: center;
        }

        /* ━━ Description (reveals on hover) ━━ */
        .fo-dsc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
          max-width: 200px;
          text-align: center;
          margin-top: 6px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .fo-node:hover .fo-dsc {
          opacity: 1;
          transform: translateY(0);
        }

        /* ━━ Noise texture ━━ */
        .fo-noise {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px;
        }

        /* ━━ Skeleton pulse ━━ */
        @keyframes foPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.03); }
        }

        /* ━━ Responsive scaling ━━ */
        @media (max-width: 1100px) {
          .fo-orbit {
            transform: scale(0.72);
            transform-origin: center center;
            margin: -80px 0;
          }
        }
        @media (max-width: 768px) {
          .fo-orbit {
            transform: scale(0.48);
            margin: -180px 0;
          }
          .fo-heading { font-size: clamp(28px, 7vw, 42px); }
          .fo-sub { font-size: 16px; max-width: 340px; }
        }
        @media (max-width: 480px) {
          .fo-orbit {
            transform: scale(0.36);
            margin: -240px 0;
          }
          .fo-section { padding: 60px 16px 40px; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="fo-section"
      >
        {/* Hero → section gradient seam */}
        <div className="fo-fade" />

        {/* ── Section heading ── */}
        <h2 className="fo-heading">
          {HEADING.map((word, i) => (
            <span
              key={i}
              className={`fo-word${word === 'center.' ? ' fo-word-accent' : ''}`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="fo-sub">
          Six integrated modules orbiting a single intelligent core —
          built for modern healthcare at scale.
        </p>

        {/* ── Orbit container ── */}
        <div className="fo-orbit">

          {/* Spline brain — central 3D element */}
          <div ref={brainRef} className="fo-brain">
            {brainInView ? (
              <>
                {!splineLoaded && <BrainSkeleton />}
                <canvas
                  ref={canvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    opacity: splineLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              </>
            ) : (
              <BrainSkeleton />
            )}
          </div>

          {/* SVG connecting lines */}
          <svg
            className="fo-lines"
            viewBox={`0 0 ${BOX} ${BOX}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {NODES.map((n, i) => {
              const p = pos(n.angle);
              return (
                <g key={i}>
                  {/* Subtle dashed line (always visible) */}
                  <line
                    className="fo-bg-line"
                    x1={C + p.x} y1={C + p.y}
                    x2={C} y2={C}
                  />
                  {/* Accent draw-in line (hover only) */}
                  <line
                    className={`fo-draw-line${hovered === i ? ' fo-line-on' : ''}`}
                    x1={C + p.x} y1={C + p.y}
                    x2={C} y2={C}
                    stroke={n.color}
                  />
                </g>
              );
            })}
          </svg>

          {/* Orbital nodes */}
          {NODES.map((n, i) => (
            <div
              key={i}
              className="fo-nw"
              ref={(el) => { nodeRefs.current[i] = el; }}
            >
              <div
                className="fo-node"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glass circle with icon */}
                <div
                  className="fo-circ"
                  style={hovered === i ? {
                    borderColor: n.color,
                    boxShadow: `0 0 30px ${n.color}40, 0 0 60px ${n.color}20`,
                    color: n.color,
                  } : undefined}
                >
                  {/* Ripple ring (plays once on hover) */}
                  <div
                    className={`fo-ripple${hovered === i ? ' fo-ripple-go' : ''}`}
                    style={{ color: n.color }}
                  />
                  {ICONS[i]}
                </div>

                {/* Label */}
                <span
                  className="fo-lbl"
                  style={hovered === i ? { color: n.color } : undefined}
                >
                  {n.label}
                </span>

                {/* Description (slides up on hover) */}
                <p className="fo-dsc">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Noise texture overlay */}
        <div className="fo-noise" />
      </section>
    </>
  );
}
