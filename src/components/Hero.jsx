import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import TurbineScene from './TurbineScene.jsx'
import TelemetryHud from './TelemetryHud.jsx'

export default function Hero() {
  const [mode, setMode] = useState('nominal')
  const [explosionAmount, setExplosionAmount] = useState(0.85)
  const [activeStage, setActiveStage] = useState(null)
  const [zoomDelta, setZoomDelta] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const heroCardRef = useRef()
  const navRef = useRef()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      navRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.1
    )
    tl.fromTo(
      heroCardRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.3
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: isMobile ? '640px' : '720px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 65% 45%, #0e1726 0%, #070a0f 75%)',
      }}
    >
      {/* ─── TOP NAVIGATION BAR (CLEAN, NO OVERLAPPING ELEMENTS) ───────────── */}
      <header
        ref={navRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          height: '64px',
          padding: '0 clamp(16px, 4vw, 36px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Brand Monogram + Title */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(255, 107, 43, 0.2))',
              border: '1px solid var(--border-active)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#f8fafc',
              flexShrink: 0,
            }}
          >
            AD
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f1f5f9' }}>
                Andrea Delfini
              </span>
              <span
                className="pulse-indicator"
                style={{ background: '#38bdf8' }}
                title="Disponibile per Consulenze"
              />
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                color: '#94a3b8',
                display: window.innerWidth < 480 ? 'none' : 'block',
              }}
            >
              Turbomacchine & Generatori di Potenza
            </div>
          </div>
        </div>

        {/* Navigation Links + CTA */}
        <div
          className="hud-panel"
          style={{
            pointerEvents: 'auto',
            padding: '5px 12px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <a
            href="#competenze"
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: '#94a3b8',
              display: isMobile ? 'none' : 'inline',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            Competenze
          </a>
          <a
            href="#casi-studio"
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: '#94a3b8',
              display: isMobile ? 'none' : 'inline',
              transition: 'color 0.2s',
            }}
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
            Contatto
          </a>
        </div>
      </header>

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
          zoomDelta={zoomDelta}
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
        zoomDelta={zoomDelta}
        setZoomDelta={setZoomDelta}
      />

      {/* ─── HERO EDITORIAL CARD (DESKTOP: LEFT COLUMN | MOBILE: TOP ANCHOR) */}
      <div
        ref={heroCardRef}
        style={
          isMobile
            ? {
                position: 'absolute',
                top: '72px',
                left: '16px',
                right: '16px',
                zIndex: 10,
                pointerEvents: 'none',
              }
            : {
                position: 'absolute',
                top: '84px',
                left: 'clamp(24px, 4vw, 56px)',
                width: 'clamp(340px, 32vw, 460px)',
                zIndex: 10,
                pointerEvents: 'none',
              }
        }
      >
        {/* Category Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(7, 10, 15, 0.75)',
            backdropFilter: 'blur(10px)',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '10px',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.65rem',
              color: '#38bdf8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Heavy Turbomachinery Specialist
          </span>
        </div>

        {/* Name Title */}
        <h1
          style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2.4rem, 4vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            margin: '0 0 10px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          Andrea Delfini
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: isMobile ? '0.86rem' : '0.96rem',
            color: '#cbd5e1',
            lineHeight: 1.55,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            background: 'rgba(7, 10, 15, 0.55)',
            backdropFilter: 'blur(8px)',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            maxWidth: '100%',
          }}
        >
          Ingegnere specialista in progettazione aerotermica, diagnostica rotodinamica su cuscinetti fluidodinamici e transizione H2-Ready per gruppi turbo-generatori.
        </p>

        {/* Action CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '16px',
            pointerEvents: 'auto',
          }}
        >
          <a
            href="#contatto"
            className="tech-btn tech-btn-flame"
            style={{ padding: '9px 18px', fontSize: '0.8rem' }}
          >
            Richiedi Perizia Tecnica →
          </a>
          <button
            onClick={() => {
              setMode('exploded')
              setExplosionAmount(0.9)
            }}
            className="tech-btn tech-btn-secondary"
            style={{ padding: '9px 16px', fontSize: '0.8rem' }}
          >
            Esploso 3D
          </button>
        </div>

        {/* ─── LIVE TELEMETRY CARD (DOCKED IN THE HERO COLUMN - ZERO OVERLAP) ── */}
        <div
          className="hud-panel"
          style={{
            padding: '10px 14px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            pointerEvents: 'auto',
            background: 'rgba(10, 15, 23, 0.85)',
          }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase' }}>
              Rotore
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8' }}>
              3,000 <span style={{ fontSize: '0.58rem', fontWeight: 400, color: '#94a3b8' }}>RPM</span>
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase' }}>
              Rapporto
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f1f5f9' }}>
              24.2 : 1
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase' }}>
              Temp (TIT)
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ff6b2b' }}>
              1,480 <span style={{ fontSize: '0.58rem', fontWeight: 400, color: '#94a3b8' }}>°C</span>
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase' }}>
              Potenza
            </div>
            <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b' }}>
              380 <span style={{ fontSize: '0.58rem', fontWeight: 400, color: '#94a3b8' }}>MW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
