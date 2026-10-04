import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TurbineScene from './TurbineScene.jsx'
import ScanlineOverlay from './ScanlineOverlay.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const nameRef = useRef()
  const lineRef = useRef()
  const titleRef = useRef()
  const ctaRef = useRef()
  const gridRef = useRef()

  useEffect(() => {
    // Text entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2 },
      0
    )
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      0.8
    )
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
      1.5
    )
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.7
    )
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 },
      2.1
    )

    // Glowing CTA border pulse
    gsap.to(ctaRef.current, {
      boxShadow: '0 0 20px rgba(0,153,255,0.7), 0 0 40px rgba(0,153,255,0.3)',
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: 'sine.inOut',
      delay: 2.8,
    })

    return () => {
      tl.kill()
      gsap.killTweensOf(ctaRef.current)
    }
  }, [])

  return (
    <>
      {/* Scanline overlay (fixed, above everything) */}
      <ScanlineOverlay />

      {/* Hero wrapper — tall enough for scroll interactions */}
      <section
        style={{
          position: 'relative',
          minHeight: '220vh',
        }}
      >
        {/* Fixed canvas background */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
          }}
        >
          {/* Background grid */}
          <div
            ref={gridRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              backgroundImage: `
                linear-gradient(rgba(0,153,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,153,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              zIndex: 1,
            }}
          />

          {/* 3D Canvas */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <TurbineScene />
          </div>

          {/* Text overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(24px, 5vw, 64px)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              {/* Name */}
              <h1
                ref={nameRef}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#e8eaf0',
                  margin: 0,
                  opacity: 0,
                  textShadow: '0 0 40px rgba(0,153,255,0.2)',
                }}
              >
                Andrea Delfini
              </h1>

              {/* Glowing separator line + title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '18px',
                }}
              >
                <div
                  ref={lineRef}
                  style={{
                    width: '48px',
                    height: '2px',
                    background:
                      'linear-gradient(90deg, #0099ff, #00d4ff)',
                    boxShadow: '0 0 8px rgba(0,153,255,0.9)',
                    transformOrigin: 'left',
                    transform: 'scaleX(0)',
                    opacity: 0,
                    flexShrink: 0,
                  }}
                />
                <p
                  ref={titleRef}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#8b9bb4',
                    margin: 0,
                    opacity: 0,
                  }}
                >
                  Ingegnere di Turbine e Generatori
                </p>
              </div>

              {/* CTA Button */}
              <button
                ref={ctaRef}
                style={{
                  marginTop: '36px',
                  padding: '14px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  letterSpacing: '0.06em',
                  color: '#00d4ff',
                  background: 'transparent',
                  border: '1.5px solid rgba(0,153,255,0.6)',
                  borderRadius: '4px',
                  boxShadow: '0 0 12px rgba(0,153,255,0.3)',
                  cursor: 'pointer',
                  opacity: 0,
                  pointerEvents: 'all',
                  transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,153,255,0.12)'
                  e.currentTarget.style.borderColor = '#00d4ff'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(0,153,255,0.6)'
                  e.currentTarget.style.color = '#00d4ff'
                }}
              >
                Richiedi una consulenza
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: 0.45,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8b9bb4',
              }}
            >
              Scorri
            </span>
            <div
              style={{
                width: '1px',
                height: '40px',
                background:
                  'linear-gradient(to bottom, rgba(0,153,255,0.7), transparent)',
                animation: 'scrollPulse 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* Scroll pulse keyframe */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
      `}</style>
    </>
  )
}
