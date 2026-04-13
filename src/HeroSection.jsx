import { useEffect, useRef, useCallback } from 'react';
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const dnaAppRef = useRef(null);

  // Force DNA animation to play on load
  const onDnaLoad = useCallback((app) => {
    dnaAppRef.current = app;
    try { app.play?.(); } catch { /* no-op */ }
  }, []);

  // Initialize Spline Runtime
  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);
    app.load('https://prod.spline.design/UwzMplGP3XrUGNIF/scene.splinecode').then(() => {
      // Disable the "Built with Spline" watermark (rendered as a GPU overlay pass)
      try { app._renderer.pipeline.logoOverlayPass.enabled = false; } catch { /* no-op */ }
      onDnaLoad(app);
    });

    return () => {
      if (app && typeof app.dispose === 'function') app.dispose();
    };
  }, [onDnaLoad]);

  useEffect(() => {
    let ctx;
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.set(['.navbar', '.sdg-tag', '.headline-line',
          '.subheading', '.cta-btn'], { opacity: 0 });
        gsap.set('.headline-line', { y: 30 });
        gsap.set('.sdg-tag', { y: 12 });
        gsap.set('.subheading', { y: 16 });
        gsap.set('.cta-btn', { y: 12 });
        gsap.set('.scroll-pill', { x: 16 });
        gsap.set('.side-nav', { x: -12 });

        const tl = gsap.timeline({ delay: 0.3 });

        tl
          .to('.navbar', {
            opacity: 1, y: 0, duration: 0.7,
            ease: 'power2.out',
            from: { y: -20 }
          })
          .to('.sdg-tag', {
            opacity: 1, y: 0, duration: 0.5,
            ease: 'power2.out'
          }, '-=0.2')
          .fromTo('.headline-line',
            { opacity: 0, y: 30, skewX: -2 },
            {
              opacity: 1, y: 0, skewX: 0,
              duration: 0.8, stagger: 0.15,
              ease: 'power3.out'
            },
            '-=0.15'
          )
          .to('.subheading', {
            opacity: 1, y: 0, duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4')
          .to('.cta-btn', {
            opacity: 1, y: 0, duration: 0.5,
            ease: 'power2.out'
          }, '-=0.35')
          .to('.scroll-pill', {
            opacity: 1, x: 0, duration: 0.5,
            ease: 'power2.out'
          }, '-=0.4');

        // Mousemove parallax
        const onMouseMove = (e) => {
          const xPct = (e.clientX / window.innerWidth - 0.5);
          const yPct = (e.clientY / window.innerHeight - 0.5);
          gsap.to('.spline-container', {
            x: xPct * 32,
            y: yPct * 18,
            duration: 1.6,
            ease: 'power1.out'
          });
          gsap.to('.text-content', {
            x: xPct * -7,
            y: yPct * -5,
            duration: 1.6,
            ease: 'power1.out'
          });
        };
        window.addEventListener('mousemove', onMouseMove);
        // Return cleanup for the gsap context (called by ctx.revert())
        return () => window.removeEventListener('mousemove', onMouseMove);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');

        :root {
          --bg: #080808;
          --cyan: #00F5FF;
          --cyan-glow: rgba(0, 245, 255, 0.12);
          --magenta: #FF2D9B;
          --text-primary: #F0F0F0;
          --text-muted: rgba(240, 240, 240, 0.45);
          --text-faint: rgba(240, 240, 240, 0.18);
          --glass-bg: rgba(255, 255, 255, 0.04);
          --glass-border: 1px solid rgba(255, 255, 255, 0.08);
        }

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* ======================== NAVBAR ======================== */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          background: transparent;
          z-index: 10;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .navbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #F0F0F0;
          letter-spacing: 0.15em;
          text-decoration: none;
        }

        .navbar-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.15);
        }

        .navbar-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(240, 240, 240, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .navbar-center {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .navbar-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(240, 240, 240, 0.5);
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease;
          background: none;
          border: none;
          padding: 0;
        }

        .navbar-link:hover {
          color: #F0F0F0;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .navbar-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F0F0F0;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0 20px;
          height: 34px;
          border-radius: 3px;
          cursor: pointer;
          transition: border-color 150ms ease;
          display: inline-flex;
          align-items: center;
        }

        .navbar-login:hover {
          border-color: #F0F0F0;
        }

        /* ======================== HERO ======================== */
        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 700px;
          background: #080808;
          overflow: hidden;
        }

        /* LAYER 0 — Spline (full-bleed, immersive background) */
        .spline-container {
          position: absolute;
          top: -10%;
          left: 10%;
          width: 100%;
          height: 140%;
          z-index: 0;
          pointer-events: none;
        }

        .spline-container canvas {
          background: transparent !important;
          width: 100% !important;
          height: 100% !important;
          transform: scale(1.4) translateY(-14%);
          transform-origin: top center;
        }

        /* LAYER 1 — Gradient veils */
        .gradient-veil {
          position: absolute;
          top: 0; left: 0;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            to right,
            #080808 0%,
            #080808 20%,
            rgba(8, 8, 8, 0.95) 35%,
            rgba(8, 8, 8, 0.75) 50%,
            rgba(8, 8, 8, 0.3) 65%,
            transparent 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .top-veil {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 180px;
          background: linear-gradient(
            to bottom,
            rgba(8, 8, 8, 0.85) 0%,
            transparent 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* LAYER 2 — Text content (lower-left) */
        .text-content {
          position: absolute;
          left: 48px;
          bottom: 18%;
          max-width: 460px;
          z-index: 2;
        }

        .sdg-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(240, 240, 240, 0.5);
          margin-bottom: 14px;
        }

        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 3.8vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #F0F0F0;
          margin: 0;
        }

        .headline-line {
          display: block;
        }

        .headline-gradient {
          background: linear-gradient(90deg, #F0F0F0 30%, #00F5FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subheading {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: rgba(240, 240, 240, 0.45);
          line-height: 1.65;
          max-width: 360px;
          margin-top: 16px;
        }

        /* CTA pill button */
        .cta-btn {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #F0F0F0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0 24px;
          height: 44px;
          border-radius: 100px;
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease;
        }

        .cta-btn:hover {
          border-color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.05);
        }

        /* LAYER 3 — Floating elements */
        /* Scroll pill (bottom-right) */
        .scroll-pill {
          position: absolute;
          bottom: 36px;
          right: 40px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #F0F0F0;
          color: #080808;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 10px 20px;
          border-radius: 100px;
          cursor: pointer;
          z-index: 3;
          border: none;
          transition: background 150ms ease;
        }

        .scroll-pill:hover {
          background: #ffffff;
        }

        .scroll-pill svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        /* Side nav (left vertical) */
        .side-nav {
          position: absolute;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
        }

        .side-nav-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(240, 240, 240, 0.35);
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 150ms ease;
          writing-mode: horizontal-tb;
          background: none;
          border: none;
          padding: 4px 0;
          text-align: left;
        }

        .side-nav-item.active {
          color: #F0F0F0;
          border-left: 1px solid #F0F0F0;
          padding-left: 8px;
        }

        .side-nav-item:hover {
          color: rgba(240, 240, 240, 0.7);
        }

        /* NOISE OVERLAY */
        .noise-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          z-index: 9;
          pointer-events: none;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        /* ======================== MOBILE ======================== */
        @media (max-width: 768px) {
          .navbar {
            padding: 0 20px;
          }

          .navbar-center {
            display: none;
          }

          .navbar-tagline {
            display: none;
          }

          .text-content {
            left: 24px;
            right: 24px;
            bottom: 14%;
            max-width: 100%;
          }

          .hero-heading {
            font-size: clamp(28px, 7vw, 42px);
          }

          .gradient-veil {
            width: 85%;
          }

          .side-nav {
            display: none;
          }

          .scroll-pill {
            right: 20px;
            bottom: 24px;
          }
        }
      `}</style>

      {/* ======================== NAVBAR ======================== */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-logo">DVS</span>
          <div className="navbar-divider" />
          <span className="navbar-tagline">Diagnostic Vaccination System</span>
        </div>
        <div className="navbar-center">
          <button className="navbar-link">Home</button>
          <button className="navbar-link">Features</button>
          <button className="navbar-link">Centers</button>
          <button className="navbar-link">About</button>
        </div>
        <div className="navbar-right">
          <button className="navbar-login">Login</button>
        </div>
      </nav>

      {/* ======================== HERO ======================== */}
      <section className="hero">
        {/* LAYER 0 — Spline 3D (massive, dominant) */}
        <div className="spline-container">
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>

        {/* LAYER 1 — Gradient veils */}
        <div className="gradient-veil" />
        <div className="top-veil" />

        {/* LAYER 2 — Text content (lower-left quadrant) */}
        <div className="text-content">
          <p className="sdg-tag">Purpose of DVS</p>

          <h1 className="hero-heading">
            <span className="headline-line">One Platform. Every Vaccine.</span>
            <span className="headline-line headline-gradient">Every Life.</span>
          </h1>

          <p className="subheading">
            Health is the foundation of everything. DVS brings vaccination,
            diagnosis, and care into one unified platform.
          </p>

          <button className="cta-btn">Make an Appointment</button>
        </div>

        {/* LAYER 3 — Floating elements */}
        {/* Side nav (left, vertical center) */}


        {/* Scroll pill (bottom-right) */}
        <button className="scroll-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          Scroll for more
        </button>

        {/* NOISE OVERLAY */}
        <div className="noise-overlay" />
      </section>
    </>
  );
};

export default HeroSection;
