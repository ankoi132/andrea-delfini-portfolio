import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import TurbineScene from './TurbineScene.jsx'
import TelemetryHud from './TelemetryHud.jsx'

export default function Hero() {
  const [mode, setMode] = useState('nominal')
  const [explosionAmount, setExplosionAmount] = useState(0.85)
  const [activeStage, setActiveStage] = useState(null)

  const nameRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const ctaGroupRef = useRef()
  const navRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.1
    )
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      0.4
    )
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.7
    )
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.0
    )
    tl.fromTo(
      ctaGroupRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.2
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '750px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 40%, #0d1624 0%, #070a0f 70%)',
      }}
    >
      {/* ─── TOP NAVIGATION BAR ───────────────────────────────────────────── */}
      <nav
        ref={navRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          padding: '24px clamp(20px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.06em',
            }}
          >
            ANDREA DELFINI // TURBOMACHINERY
          </span>
        </div>

        <div
          className="hud-panel"
          style={{
            pointerEvents: 'auto',
            padding: '6px 14px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <a
            href="#competenze"
            className="font-mono"
            style={{ fontSize: '0.75rem', color: '#94a3b8', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            Competenze
          </a>
          <a
            href="#casi-studio"
            className="font-mono"
            style={{ fontSize: '0.75rem', color: '#94a3b8', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            Casi Studio
          </a>
          <a
            href="#contatto"
            className="tech-btn tech-btn-primary"
            style={{ padding: '6px 12px', fontSize: '0.72rem' }}
          >
            Consulenza
          </a>
        </div>
      </nav>

      {/* ─── 3D TURBINE CANVAS CENTERPIECE ───────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <TurbineScene
          mode={mode}
          explosionAmount={explosionAmount}
          activeStage={activeStage}
          onSelectStage={(stageId) => setActiveStage(stageId)}
        />
      </div>

      {/* ─── FLOATING TELEMETRY & CONTROLS HUD ───────────────────────────── */}
      <TelemetryHud
        mode={mode}
        setMode={setMode}
        explosionAmount={explosionAmount}
        setExplosionAmount={setExplosionAmount}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
      />

      {/* ─── HERO EDITORIAL OVERLAY (BOTTOM-LEFT / CENTER-LEFT) ──────────── */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: 'clamp(20px, 4vw, 48px)',
          zIndex: 10,
          maxWidth: '560px',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={nameRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(7, 10, 15, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '14px',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              color: '#38bdf8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Senior Power Plant & Turbomachinery Specialist
          </span>
        </div>

        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            margin: '0 0 16px',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
          }}
        >
          Andrea Delfini
        </h1>

        <p
          ref={descRef}
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.12rem)',
            color: '#cbd5e1',
            lineHeight: 1.6,
            marginBottom: '28px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            background: 'rgba(7, 10, 15, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '12px 16px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          Progettazione aerotermica, diagnostica rotodinamica su cuscinetti fluidodinamici e transizione H2-Ready per grandi gruppi turbo-generatori industriali.
        </p>

        <div
          ref={ctaGroupRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            pointerEvents: 'auto',
          }}
        >
          <a
            href="#contatto"
            className="tech-btn tech-btn-flame"
            style={{ padding: '12px 24px', fontSize: '0.85rem' }}
          >
            Richiedi Perizia Tecnica →
          </a>
          <button
            onClick={() => {
              setMode('exploded')
              setExplosionAmount(0.9)
            }}
            className="tech-btn tech-btn-secondary"
            style={{ padding: '12px 20px', fontSize: '0.85rem' }}
          >
            Esploso Scientifico 3D
          </button>
        </div>
      </div>
    </section>
  )
}
