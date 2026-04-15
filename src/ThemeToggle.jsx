import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        /* ═══ Theme Toggle — Celestial Sun/Moon ═══ */
        .theme-toggle {
          position: relative;
          width: 56px;
          height: 28px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-right: 14px;
          background: var(--toggle-track-bg);
          box-shadow: var(--toggle-track-shadow);
          transition: background 400ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          flex-shrink: 0;
          overflow: hidden;
        }

        .theme-toggle:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 2px;
        }

        /* Track background states */
        [data-theme="light"] .theme-toggle {
          --toggle-track-bg: linear-gradient(135deg, #E8F0FE 0%, #C2D9FF 100%);
          --toggle-track-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        [data-theme="dark"] .theme-toggle {
          --toggle-track-bg: linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%);
          --toggle-track-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 200, 255, 0.05);
        }

        /* ═══ Thumb / Celestial body ═══ */
        .toggle-thumb {
          position: absolute;
          top: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      background 400ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        /* Sun (light mode) */
        [data-theme="light"] .toggle-thumb {
          transform: translateX(4px);
          background: linear-gradient(135deg, #FDB813 0%, #FF8C00 100%);
          box-shadow: 0 0 8px rgba(253, 184, 19, 0.5),
                      0 0 20px rgba(253, 184, 19, 0.2);
        }

        /* Moon (dark mode) */
        [data-theme="dark"] .toggle-thumb {
          transform: translateX(28px);
          background: linear-gradient(135deg, #E8E8F0 0%, #C0C0D0 100%);
          box-shadow: 0 0 8px rgba(200, 200, 255, 0.3),
                      0 0 20px rgba(200, 200, 255, 0.1);
        }

        /* Moon crater marks */
        .toggle-crater {
          position: absolute;
          border-radius: 50%;
          background: rgba(160, 160, 190, 0.3);
          transition: opacity 400ms ease;
        }
        [data-theme="light"] .toggle-crater { opacity: 0; }
        [data-theme="dark"] .toggle-crater { opacity: 1; }

        .toggle-crater-1 { width: 5px; height: 5px; top: 4px; left: 5px; }
        .toggle-crater-2 { width: 3px; height: 3px; top: 12px; left: 10px; }
        .toggle-crater-3 { width: 4px; height: 4px; top: 8px; left: 14px; }

        /* ═══ Sun rays ═══ */
        .toggle-rays {
          position: absolute;
          top: 3px;
          width: 22px;
          height: 22px;
          transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 300ms ease;
          z-index: 1;
        }

        [data-theme="light"] .toggle-rays {
          transform: translateX(4px) rotate(0deg);
          opacity: 1;
        }
        [data-theme="dark"] .toggle-rays {
          transform: translateX(28px) rotate(180deg);
          opacity: 0;
        }

        .toggle-ray {
          position: absolute;
          width: 2px;
          height: 4px;
          background: rgba(253, 184, 19, 0.6);
          border-radius: 1px;
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }
        .toggle-ray:nth-child(1) { transform: translate(-50%, -15px); }
        .toggle-ray:nth-child(2) { transform: translate(-50%, -15px) rotate(45deg) translateY(0); transform: rotate(45deg) translate(10px, -10px); }
        .toggle-ray:nth-child(3) { transform: translate(10px, -1px); }
        .toggle-ray:nth-child(4) { transform: rotate(135deg) translate(10px, -10px); }
        .toggle-ray:nth-child(5) { transform: translate(-50%, 11px); }
        .toggle-ray:nth-child(6) { transform: rotate(225deg) translate(10px, -10px); }
        .toggle-ray:nth-child(7) { transform: translate(-14px, -1px); }
        .toggle-ray:nth-child(8) { transform: rotate(315deg) translate(10px, -10px); }

        /* ═══ Stars (visible in dark mode track) ═══ */
        .toggle-stars {
          position: absolute;
          inset: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
        }
        [data-theme="light"] .toggle-stars { opacity: 0; }
        [data-theme="dark"] .toggle-stars { opacity: 1; }

        .toggle-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          animation: twinkle 2s ease-in-out infinite;
        }
        .toggle-star:nth-child(1) { top: 6px; left: 8px; animation-delay: 0s; }
        .toggle-star:nth-child(2) { top: 16px; left: 14px; animation-delay: 0.5s; width: 1.5px; height: 1.5px; }
        .toggle-star:nth-child(3) { top: 10px; left: 20px; animation-delay: 1s; }
        .toggle-star:nth-child(4) { top: 20px; left: 6px; animation-delay: 0.3s; width: 1px; height: 1px; }
        .toggle-star:nth-child(5) { top: 5px; left: 16px; animation-delay: 0.8s; width: 1.5px; height: 1.5px; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* ═══ Clouds (visible in light mode track) ═══ */
        .toggle-clouds {
          position: absolute;
          inset: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
        }
        [data-theme="light"] .toggle-clouds { opacity: 1; }
        [data-theme="dark"] .toggle-clouds { opacity: 0; }

        .toggle-cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.65);
          border-radius: 10px;
          height: 4px;
        }
        .toggle-cloud:nth-child(1) { width: 10px; top: 18px; right: 8px; }
        .toggle-cloud:nth-child(2) { width: 7px; top: 10px; right: 12px; }
        .toggle-cloud:nth-child(3) { width: 5px; top: 14px; right: 20px; }

        /* ═══ Hover glow ═══ */
        .theme-toggle::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 100px;
          opacity: 0;
          transition: opacity 200ms ease;
          pointer-events: none;
        }
        [data-theme="light"] .theme-toggle::after {
          background: radial-gradient(circle at 30%, rgba(253, 184, 19, 0.15), transparent 60%);
        }
        [data-theme="dark"] .theme-toggle::after {
          background: radial-gradient(circle at 70%, rgba(0, 200, 255, 0.1), transparent 60%);
        }
        .theme-toggle:hover::after {
          opacity: 1;
        }

        /* ═══ Mobile ═══ */
        @media (max-width: 768px) {
          .theme-toggle {
            width: 48px;
            height: 24px;
            margin-right: 10px;
          }
          .toggle-thumb {
            width: 18px;
            height: 18px;
          }
          [data-theme="light"] .toggle-thumb { transform: translateX(4px); }
          [data-theme="dark"] .toggle-thumb { transform: translateX(24px); }
          .toggle-rays {
            width: 18px;
            height: 18px;
          }
          [data-theme="light"] .toggle-rays { transform: translateX(4px) rotate(0deg); }
          [data-theme="dark"] .toggle-rays { transform: translateX(24px) rotate(180deg); }
        }
      `}</style>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        id="theme-toggle-btn"
      >
        {/* Stars (dark mode background) */}
        <div className="toggle-stars">
          <div className="toggle-star" />
          <div className="toggle-star" />
          <div className="toggle-star" />
          <div className="toggle-star" />
          <div className="toggle-star" />
        </div>

        {/* Clouds (light mode background) */}
        <div className="toggle-clouds">
          <div className="toggle-cloud" />
          <div className="toggle-cloud" />
          <div className="toggle-cloud" />
        </div>

        {/* Sun rays */}
        <div className="toggle-rays">
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
          <div className="toggle-ray" />
        </div>

        {/* Celestial body (sun/moon) */}
        <div className="toggle-thumb">
          <div className="toggle-crater toggle-crater-1" />
          <div className="toggle-crater toggle-crater-2" />
          <div className="toggle-crater toggle-crater-3" />
        </div>
      </button>
    </>
  );
}
