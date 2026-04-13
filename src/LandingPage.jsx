import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ─── SVG ICONS ─── */
const IconBrain = ({ size = 48, color = '#00F5FF' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4c-4 0-7 3-7 7 0-3-3-5-6-5s-5 3-5 6c0 4 3 7 7 7h1" />
    <path d="M24 4c4 0 7 3 7 7 0-3 3-5 6-5s5 3 5 6c0 4-3 7-7 7h-1" />
    <path d="M14 19c-3 1-5 4-5 8s3 7 7 8" />
    <path d="M34 19c3 1 5 4 5 8s-3 7-7 8" />
    <path d="M16 35c0 4 3 9 8 9s8-5 8-9" />
    <path d="M24 4v40" />
    <circle cx="18" cy="16" r="1.5" fill={color} stroke="none" />
    <circle cx="30" cy="16" r="1.5" fill={color} stroke="none" />
    <circle cx="15" cy="26" r="1" fill={color} stroke="none" />
    <circle cx="33" cy="26" r="1" fill={color} stroke="none" />
  </svg>
)

const IconSyringe = ({ size = 48, color = '#F0F0F0' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M34 4l6 6-4 4-6-6z" />
    <path d="M30 14L16 28" />
    <path d="M28 12L14 26l-4 12 12-4L36 20" />
    <path d="M20 20l4 4" />
    <path d="M16 24l4 4" />
    <path d="M6 42l4-4" />
  </svg>
)

const IconShield = ({ size = 48, color = '#FF2D9B' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4L6 12v12c0 11 8 18 18 22 10-4 18-11 18-22V12L24 4z" />
    <path d="M18 24l4 4 8-8" />
    <circle cx="24" cy="16" r="2" fill="none" />
  </svg>
)

/* Small 24px icons for feature grid */
const IconShieldSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="12" cy="15" r="1.5" fill="rgba(240,240,240,0.5)" stroke="none" />
  </svg>
)
const IconBrainSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-2 0-3.5 1.5-3.5 3.5 0-1.5-1.5-2.5-3-2.5S3 4.5 3 6c0 2 1.5 3.5 3.5 3.5" />
    <path d="M12 2c2 0 3.5 1.5 3.5 3.5 0-1.5 1.5-2.5 3-2.5S21 4.5 21 6c0 2-1.5 3.5-3.5 3.5" />
    <path d="M7 9.5C5.5 10 4.5 12 4.5 13.5S6 17 8 17.5" />
    <path d="M17 9.5c1.5.5 2.5 2.5 2.5 4S18 17 16 17.5" />
    <path d="M8 17.5c0 2 1.5 4.5 4 4.5s4-2.5 4-4.5" />
    <path d="M12 2v20" />
  </svg>
)
const IconVideo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="14" height="14" rx="2" />
    <path d="M16 10l5-3v10l-5-3" />
  </svg>
)
const IconFolder = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
)
const IconPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

/* Social icons */
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
)
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function LandingPage() {
  const containerRef = useRef(null)


  useEffect(() => {
    if (!containerRef.current) return

    // Helper: observe elements and animate on intersection
    const observers = []

    const animateOnScroll = (selector, fromVars, toVars, triggerSelector) => {
      const elements = containerRef.current.querySelectorAll(selector)
      if (!elements.length) return

      // Set initial state
      elements.forEach(el => {
        Object.assign(el.style, {
          opacity: '0.01',
          transform: fromVars.y ? `translateY(${fromVars.y}px)` : fromVars.x ? `translateX(${fromVars.x}px)` : 'none',
          transition: 'none',
        })
      })

      const triggerEl = triggerSelector
        ? containerRef.current.querySelector(triggerSelector)
        : elements[0]

      if (!triggerEl) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            elements.forEach((el, i) => {
              const delay = (toVars.staggerDelay || 0) * i
              gsap.to(el, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: toVars.duration || 0.7,
                delay: delay,
                ease: toVars.ease || 'power2.out',
              })
            })
            observer.disconnect()
          }
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })

      observer.observe(triggerEl)
      observers.push(observer)
    }

    // Small delay for DOM paint
    const timer = setTimeout(() => {
      /* ── Section 1: Problem ── */
      animateOnScroll('.problem-heading-block',
        { y: 40 },
        { duration: 0.9, ease: 'power2.out' }
      )
      animateOnScroll('.problem-stat',
        { x: 60 },
        { duration: 0.7, ease: 'power2.out', staggerDelay: 0.15 },
        '.problem-stats'
      )

      /* ── Section 2: Pillars ── */
      animateOnScroll('.pillar-card',
        { y: 40 },
        { duration: 0.7, ease: 'power2.out', staggerDelay: 0.12 },
        '.pillars-grid'
      )

      /* ── Section 3: Features Grid ── */
      animateOnScroll('.feature-card',
        { y: 30 },
        { duration: 0.6, ease: 'power2.out', staggerDelay: 0.08 },
        '.features-grid'
      )

      /* ── Section 5: Roles ── */
      animateOnScroll('.role-card',
        { y: 40 },
        { duration: 0.7, ease: 'power2.out', staggerDelay: 0.12 },
        '.roles-grid'
      )

      /* ── Section 6: CTA ── */
      animateOnScroll('.cta-content > *',
        { y: 30 },
        { duration: 0.7, ease: 'power2.out', staggerDelay: 0.12 },
        '.cta-content'
      )
    }, 100)

    return () => {
      clearTimeout(timer)
      observers.forEach(obs => obs.disconnect())
    }
  }, [])

  const features = [
    { num: '01', name: 'Aadhaar-Verified Login', desc: 'OTP citizen auth + doctor license verification', icon: <IconShieldSmall />, accent: 'cyan' },
    { num: '02', name: 'Vaccination Booking', desc: 'Book doses, track Dose 1 → 2 → Booster status', icon: <IconCalendar />, accent: 'cyan' },
    { num: '03', name: 'AI Symptom Chatbot', desc: 'Preliminary diagnosis with doctor escalation', icon: <IconBrainSmall />, accent: 'magenta' },
    { num: '04', name: 'Telemedicine via Agora', desc: 'Live encrypted video consultations', icon: <IconVideo />, accent: 'magenta' },
    { num: '05', name: 'Medical Records Vault', desc: 'Full history, notes, PDF export', icon: <IconFolder />, accent: 'cyan' },
    { num: '06', name: 'Centers Proximity Map', desc: 'Find centers within 10km in real time', icon: <IconPin />, accent: 'cyan' },
  ]

  const tickerItems = [
    { number: '12,400+', label: 'Doses Tracked' },
    { number: '340', label: 'Centers Mapped' },
    { number: '6,200', label: 'Citizens Registered' },
    { number: '98.7%', label: 'Uptime' },
    { number: '3,100+', label: 'AI Diagnoses' },
    { number: '820', label: 'Video Consultations' },
  ]

  const tickerContent = tickerItems.map((item, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginRight: 48 }}>
      <span style={{ color: '#F0F0F0', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{item.number}</span>
      <span style={{ color: 'rgba(240,240,240,0.4)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{item.label}</span>
      <span style={{ color: '#00F5FF', fontSize: 8, marginLeft: 40 }}>◆</span>
    </span>
  ))

  return (
    <div ref={containerRef}>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 25s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }

        .lp-glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          backdrop-filter: blur(16px);
          transition: transform 300ms ease, border-color 300ms ease;
        }

        .pillar-card:hover { transform: translateY(-8px); }
        .pillar-card[data-accent="cyan"]:hover { border-color: #00F5FF; }
        .pillar-card[data-accent="white"]:hover { border-color: rgba(255,255,255,0.4); }
        .pillar-card[data-accent="magenta"]:hover { border-color: #FF2D9B; }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 32px;
          transition: border-color 300ms ease, background 300ms ease, transform 300ms ease;
          position: relative;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
        }
        .feature-card[data-accent="cyan"]:hover {
          border-top: 2px solid #00F5FF;
        }
        .feature-card[data-accent="magenta"]:hover {
          border-top: 2px solid #FF2D9B;
        }
        .feature-card:hover .feature-icon {
          transform: translateY(-4px);
        }
        .feature-icon {
          transition: transform 300ms ease;
        }

        .role-card:hover { transform: translateY(-6px); }

        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(240,240,240,0.45);
          text-decoration: none;
          transition: color 150ms ease;
          display: block;
          margin-bottom: 10px;
        }
        .footer-link:hover { color: #F0F0F0; }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(240,240,240,0.45);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease;
        }
        .social-btn:hover {
          color: #00F5FF;
          border-color: #00F5FF;
        }

        .cta-primary {
          height: 52px;
          padding: 0 36px;
          border-radius: 4px;
          background: #00F5FF;
          color: #080808;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .cta-primary:hover {
          background: #33f7ff;
          transform: translateY(-2px);
        }

        .cta-secondary {
          height: 52px;
          padding: 0 36px;
          border-radius: 4px;
          background: transparent;
          color: #F0F0F0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          transition: border-color 200ms ease, transform 200ms ease;
        }
        .cta-secondary:hover {
          border-color: #F0F0F0;
          transform: translateY(-2px);
        }

        .role-cta {
          height: 44px;
          padding: 0 28px;
          border-radius: 4px;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .role-cta:hover {
          transform: translateY(-2px);
        }
        .role-cta[data-accent="cyan"] {
          color: #00F5FF;
          border: 1px solid #00F5FF;
        }
        .role-cta[data-accent="cyan"]:hover {
          background: rgba(0,245,255,0.08);
        }
        .role-cta[data-accent="white"] {
          color: #F0F0F0;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .role-cta[data-accent="white"]:hover {
          background: rgba(255,255,255,0.05);
        }
        .role-cta[data-accent="magenta"] {
          color: #FF2D9B;
          border: 1px solid #FF2D9B;
        }
        .role-cta[data-accent="magenta"]:hover {
          background: rgba(255,45,155,0.08);
        }

        @media (max-width: 900px) {
          .lp-two-col, .pillars-grid, .features-grid, .roles-grid {
            grid-template-columns: 1fr !important;
          }
          .lp-section {
            padding: 64px 24px !important;
          }
          .footer-cols {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — THE PROBLEM
         ══════════════════════════════════════════════════════ */}
      <section className="lp-section" style={{
        position: 'relative', zIndex: 1,
        padding: '100px 72px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="lp-two-col" style={{
          display: 'grid', gridTemplateColumns: '55% 45%', gap: 48, alignItems: 'start',
        }}>
          {/* Left column */}
          <div className="problem-heading-block" style={{
            borderLeft: '1px solid rgba(0,245,255,0.3)',
            paddingLeft: 24,
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase',
              color: '#00F5FF', letterSpacing: '0.3em', display: 'block', marginBottom: 20,
            }}>THE CHALLENGE</span>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(36px, 4vw, 64px)', lineHeight: 1.1,
              color: '#F0F0F0', margin: 0,
            }}>
              Millions miss vaccines every year.
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 18,
              color: 'rgba(240,240,240,0.45)', maxWidth: 480, marginTop: 24, lineHeight: 1.65,
            }}>
              Healthcare is fragmented. Vaccination records live in paper files.
              Doctors and patients use different systems. Appointments get missed.
              Doses get forgotten. DVS fixes this.
            </p>
          </div>

          {/* Right column — stats */}
          <div className="problem-stats" style={{
            display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 16,
          }}>
            {[
              { number: '1.5M+', label: 'VACCINE DOSES MISSED ANNUALLY IN INDIA' },
              { number: '67%', label: 'PATIENTS USE MULTIPLE DISCONNECTED PLATFORMS' },
              { number: '10 min', label: 'AVERAGE TIME SAVED PER BOOKING WITH DVS' },
            ].map((stat, i) => (
              <div className="problem-stat" key={i}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(40px, 4vw, 64px)',
                  color: '#00F5FF', display: 'block', lineHeight: 1.1,
                }}>{stat.number}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: 'rgba(240,240,240,0.45)', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginTop: 8, display: 'block',
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — THREE PILLARS
         ══════════════════════════════════════════════════════ */}
      <section className="lp-section" style={{
        position: 'relative', zIndex: 1,
        padding: '100px 72px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase',
            color: '#00F5FF', letterSpacing: '0.3em',
          }}>HOW DVS WORKS</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 56px)', color: '#F0F0F0',
            lineHeight: 1.1, marginTop: 16,
          }}>
            Diagnose. Vaccinate. Protect.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
            color: 'rgba(240,240,240,0.45)', maxWidth: 560,
            margin: '16px auto 0',
            lineHeight: 1.6,
          }}>
            Three interconnected systems working as one unified platform.
          </p>
        </div>

        <div className="pillars-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {/* Card 1 — Diagnose */}
          <div className="pillar-card lp-glass-card" data-accent="cyan" style={{ padding: '40px 36px' }}>
            <IconBrain size={48} color="#00F5FF" />
            <div style={{ width: 40, height: 3, background: '#00F5FF', margin: '20px 0' }} />
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28,
              color: '#F0F0F0', margin: 0,
            }}>AI-Powered Diagnosis</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', marginTop: 12, lineHeight: 1.6,
            }}>
              Describe your symptoms to our AI. Get instant preliminary guidance.
              Escalate to a real doctor in one tap.
            </p>
            <span style={{
              display: 'inline-block', marginTop: 24,
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              color: '#00F5FF', letterSpacing: '0.05em',
            }}>● SYMPTOM CHECKER</span>
          </div>

          {/* Card 2 — Vaccinate */}
          <div className="pillar-card lp-glass-card" data-accent="white" style={{ padding: '40px 36px' }}>
            <IconSyringe size={48} color="#F0F0F0" />
            <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,0.4)', margin: '20px 0' }} />
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28,
              color: '#F0F0F0', margin: 0,
            }}>Smart Booking</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', marginTop: 12, lineHeight: 1.6,
            }}>
              Find vaccination centers near you, pick a time slot, track Dose 1,
              Dose 2 and Booster status in one place.
            </p>
            <span style={{
              display: 'inline-block', marginTop: 24,
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              color: 'rgba(240,240,240,0.45)', letterSpacing: '0.05em',
            }}>● APPOINTMENT BOOKING</span>
          </div>

          {/* Card 3 — Protect */}
          <div className="pillar-card lp-glass-card" data-accent="magenta" style={{ padding: '40px 36px' }}>
            <IconShield size={48} color="#FF2D9B" />
            <div style={{ width: 40, height: 3, background: '#FF2D9B', margin: '20px 0' }} />
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28,
              color: '#F0F0F0', margin: 0,
            }}>Secure Records</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', marginTop: 12, lineHeight: 1.6,
            }}>
              Your complete medical history, consultation notes and vaccination
              certificates. Exportable, encrypted, always accessible.
            </p>
            <span style={{
              display: 'inline-block', marginTop: 24,
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              color: '#FF2D9B', letterSpacing: '0.05em',
            }}>● MEDICAL RECORDS</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — FEATURES GRID
         ══════════════════════════════════════════════════════ */}
      <section className="lp-section" style={{
        position: 'relative', zIndex: 1,
        padding: '100px 72px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase',
            color: '#00F5FF', letterSpacing: '0.3em',
          }}>CORE CAPABILITIES</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 56px)', color: '#F0F0F0',
            lineHeight: 1.1, marginTop: 16,
          }}>
            Everything you need in one platform.
          </h2>
        </div>

        <div className="features-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
        }}>
          {features.map((f, i) => (
            <div className="feature-card" data-accent={f.accent} key={i}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00F5FF',
                }}>{f.num}</span>
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20,
                color: '#F0F0F0', marginTop: 40, marginBottom: 0,
              }}>{f.name}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: 'rgba(240,240,240,0.45)', marginTop: 8, lineHeight: 1.6,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — STATS TICKER
         ══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: 64,
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="ticker-track">
          {tickerContent}
          {tickerContent}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — WHO IS THIS FOR
         ══════════════════════════════════════════════════════ */}
      <section className="lp-section" style={{
        position: 'relative', zIndex: 1,
        padding: '100px 72px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase',
            color: '#00F5FF', letterSpacing: '0.3em',
          }}>BUILT FOR EVERYONE</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 'clamp(32px, 4vw, 56px)', color: '#F0F0F0',
            lineHeight: 1.1, marginTop: 16,
          }}>
            Your role in the DVS ecosystem.
          </h2>
        </div>

        <div className="roles-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {/* CITIZEN */}
          <div className="role-card lp-glass-card" style={{
            padding: '40px 36px', borderTop: '4px solid #00F5FF',
            transition: 'transform 300ms ease',
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: '0.2em', color: '#00F5FF',
              display: 'block', marginBottom: 16,
            }}>CITIZEN</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24,
              color: '#F0F0F0', margin: '0 0 12px',
            }}>Take control of your health</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', lineHeight: 1.6, marginBottom: 20,
            }}>
              Book vaccines, chat with AI, consult doctors, access your records — all in one place.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {['OTP-verified login', 'Vaccination booking & tracking', 'AI symptom checker', 'Medical records & certificates'].map((f, i) => (
                <li key={i} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: 'rgba(240,240,240,0.45)', marginBottom: 6,
                }}>
                  <span style={{ color: '#00F5FF', marginRight: 8 }}>→</span>{f}
                </li>
              ))}
            </ul>
            <button className="role-cta" data-accent="cyan">GET STARTED AS CITIZEN</button>
          </div>

          {/* DOCTOR */}
          <div className="role-card lp-glass-card" style={{
            padding: '40px 36px', borderTop: '4px solid rgba(255,255,255,0.3)',
            transition: 'transform 300ms ease',
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F0F0F0',
              display: 'block', marginBottom: 16,
            }}>DOCTOR</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24,
              color: '#F0F0F0', margin: '0 0 12px',
            }}>Streamline your practice</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', lineHeight: 1.6, marginBottom: 20,
            }}>
              Manage consultations, review patient history, save post-call notes — all connected to patient records.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {['License-verified login', 'Video consultation queue', 'Patient history viewer', 'Auto-saved consultation notes'].map((f, i) => (
                <li key={i} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: 'rgba(240,240,240,0.45)', marginBottom: 6,
                }}>
                  <span style={{ color: '#F0F0F0', marginRight: 8 }}>→</span>{f}
                </li>
              ))}
            </ul>
            <button className="role-cta" data-accent="white">JOIN AS DOCTOR</button>
          </div>

          {/* ADMIN */}
          <div className="role-card lp-glass-card" style={{
            padding: '40px 36px', borderTop: '4px solid #FF2D9B',
            transition: 'transform 300ms ease',
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
              textTransform: 'uppercase', letterSpacing: '0.2em', color: '#FF2D9B',
              display: 'block', marginBottom: 16,
            }}>ADMIN</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24,
              color: '#F0F0F0', margin: '0 0 12px',
            }}>Oversee the ecosystem</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: 'rgba(240,240,240,0.45)', lineHeight: 1.6, marginBottom: 20,
            }}>
              Monitor center capacity, track vaccination rates, manage users, broadcast notifications.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {['Real-time center dashboard', 'User management', 'Vaccination analytics', 'Notification broadcast'].map((f, i) => (
                <li key={i} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: 'rgba(240,240,240,0.45)', marginBottom: 6,
                }}>
                  <span style={{ color: '#FF2D9B', marginRight: 8 }}>→</span>{f}
                </li>
              ))}
            </ul>
            <button className="role-cta" data-accent="magenta">ADMIN ACCESS</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA BANNER
         ══════════════════════════════════════════════════════ */}
      <section className="lp-section" style={{
        position: 'relative', zIndex: 1,
        padding: '120px 72px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* Blurred blobs */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(0,245,255,0.05)', filter: 'blur(80px)',
          left: '10%', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,45,155,0.05)', filter: 'blur(80px)',
          right: '15%', top: '30%', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }} />

        <div className="cta-content" style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center', maxWidth: 640, margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 60px)', color: '#F0F0F0',
            lineHeight: 1.1, margin: 0,
          }}>
            Your health journey starts here.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
            color: 'rgba(240,240,240,0.45)', marginTop: 16, lineHeight: 1.6,
          }}>
            Join thousands of citizens managing vaccination and healthcare on DVS.
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 16, marginTop: 40,
            flexWrap: 'wrap',
          }}>
            <button className="cta-primary">GET STARTED FREE</button>
            <button className="cta-secondary">LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — FOOTER
         ══════════════════════════════════════════════════════ */}
      <footer style={{
        position: 'relative', zIndex: 1,
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 72px 32px',
      }}>
        <div className="footer-cols" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48,
        }}>
          {/* Col 1 — Brand */}
          <div>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20,
              color: '#F0F0F0', display: 'block', marginBottom: 8,
            }}>DVS</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: 'rgba(240,240,240,0.45)', display: 'block', marginBottom: 12,
            }}>Diagnostic Vaccination System</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              color: '#00F5FF', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>SDG Goal 3 — Good Health & Well-Being</span>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'rgba(240,240,240,0.2)', display: 'block', marginBottom: 20,
            }}>PLATFORM</span>
            <a href="#" className="footer-link">Home</a>
            <a href="#" className="footer-link">Features</a>
            <a href="#" className="footer-link">Centers</a>
            <a href="#" className="footer-link">About</a>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'rgba(240,240,240,0.2)', display: 'block', marginBottom: 20,
            }}>LEGAL</span>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Use</a>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: 'rgba(240,240,240,0.2)', display: 'block', marginBottom: 20,
            }}>CONTACT</span>
            <a href="mailto:team@dvs.health" className="footer-link">team@dvs.health</a>
            <span className="footer-link" style={{ cursor: 'default' }}>KLE Technological University</span>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: 48,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12,
            color: 'rgba(240,240,240,0.3)',
          }}>
            © 2025 Diagnostic Vaccination System — Team 2, SDG Goal 3
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="social-btn" aria-label="Twitter"><IconTwitter /></button>
            <button className="social-btn" aria-label="GitHub"><IconGithub /></button>
            <button className="social-btn" aria-label="LinkedIn"><IconLinkedin /></button>
          </div>
        </div>
      </footer>
    </div>
  )
}
