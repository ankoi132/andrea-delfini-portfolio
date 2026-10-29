import { useState, useEffect } from 'react'

export const STAGE_DATA = {
  igv: {
    title: 'Aspirazione & Pale IGV (Inlet Guide Vanes)',
    tag: 'STADIO 01 // INTAKE DYNAMICS',
    specs: [
      { label: 'Portata d’aria', value: '640 kg/s' },
      { label: 'Numero pale IGV', value: '16 a calettamento variabile' },
      { label: 'Attuazione angolare', value: 'da -12° a +38° servoidraulica' },
      { label: 'Materiale', value: 'Acciaio inossidabile martensitico 17-4 PH' },
    ],
    description:
      'Stadio di aspirazione dotato di ogiva aerodinamica a bassa turbolenza e schiera di pale direttrici a geometria variabile (IGV). Regolano la portata massica durante i transitori di avviamento rapido e garantiscono il margine di stallo alle basse velocità di rotazione.',
    engineeringFocus:
      'Ottimizzazione della profilatura aerodinamica per la prevenzione del distacco di vena in condizioni di carico parziale e calcolo della risposta aeroelastica sotto raffiche di vento (CFD transient).',
  },
  compressor: {
    title: 'Compressore Assiale a 5 Stadi',
    tag: 'STADIO 02 // COMPRESSION TRAIN',
    specs: [
      { label: 'Rapporto di compressione', value: '24.2 : 1' },
      { label: 'Rendimento politropico', value: '91.8%' },
      { label: 'Pressione di mandata', value: '24.8 bar' },
      { label: 'Materiale dischi e pale', value: 'Lega di Titanio forgiata Ti-6Al-4V' },
    ],
    description:
      'Treno compressore assiale multistadio ad elevatissimo rendimento politropico. La corda e lo svergolamento delle pale sono ottimizzati secondo la legge del vortice libero per minimizzare le perdite secondarie e le onde d’urto supersoniche ai vertici.',
    engineeringFocus:
      'Analisi modale avanzata per prevenire fenomeni di risonanza armonica e flutter subsonico; modellazione delle tolleranze di gioco all’apice (blade-tip clearance) per azzerare i ricircoli perimetrali.',
  },
  combustor: {
    title: 'Camera di Combustione Can-Annulare (DLE)',
    tag: 'STADIO 03 // THERMAL COMBUSTION',
    specs: [
      { label: 'Architettura', value: '8 Cestelli Can-Annulari premiscelati' },
      { label: 'Temperatura di fiamma', value: '1,520 °C' },
      { label: 'Compatibilità Idrogeno', value: 'Fino al 100% H2 (Dry Low NOx)' },
      { label: 'Emissioni NOx', value: '< 9 ppm @ 15% O2' },
    ],
    description:
      'Sistema di combustione premiscelata secca (DLE) ripartito su 8 cestelli isolati con iniettori a doppio stadio. I liner interni presentano foratura per raffreddamento a effusione e rivestimento ceramico barriera termica (TBC) all’ossido di zirconio yttriato.',
    engineeringFocus:
      'Diagnostica e soppressione attiva delle instabilità termoacustiche (combustion rumble / screaming) e re-engineering dei miscelatori per la transizione a miscele ricche di idrogeno.',
  },
  turbine: {
    title: 'Turbina ad Alta & Bassa Pressione (3 Stadi)',
    tag: 'STADIO 04 // EXPANSION & WORK',
    specs: [
      { label: 'Temp. Ingresso Turbina (TIT)', value: '1,480 °C' },
      { label: 'Materiale 1° stadio', value: 'Superlega monocristallina CMSX-4' },
      { label: 'Raffreddamento pale', value: 'Film cooling interno a serpentina 3D' },
      { label: 'Potenza interna generata', value: '540 MW lordi' },
    ],
    description:
      'Espansore assiale a 3 stadi in superlega monocristallina al Nichel, progettato per sopportare temperature superiori al punto di fusione del metallo base grazie a condotti interni con turbulatori e fori di film-cooling laser.',
    engineeringFocus:
      'Stima della vita a fatica oligociclica (LCF) e creep (rottura per scorrimento viscoso) secondo il modello Larson-Miller, con monitoraggio delle deformazioni plastiche e controlli non distruttivi (NDT).',
  },
  exhaust: {
    title: 'Diffusore di Scarico & Giunto Generatore',
    tag: 'STADIO 05 // EXHAUST & GENERATOR',
    specs: [
      { label: 'Recupero di pressione statica', value: 'Cp = 0.58' },
      { label: 'Velocità nominale all’albero', value: '3,000 RPM (50 Hz sincrono)' },
      { label: 'Potenza elettrica resa', value: '380 MW (Ciclo Semplice)' },
      { label: 'Cuscinetto posteriore', value: 'Idrodinamico a pattini oscillanti (Tilting-Pad)' },
    ],
    description:
      'Diffusore anulare divergente che converte l’energia cinetica residua dei gas caldi in pressione statica, massimizzando il salto entalpico utile. Integra il supporto cuscinetto e il giunto flangiato per il generatore sincrono a 3000 RPM.',
    engineeringFocus:
      'Calcolo della rotodinamica su cuscinetti fluidodinamici a film d’olio, allineamento termico del giunto albero-generatore e soppressione delle orbite ellittiche secondo standard API 670 e ISO 10816-4.',
  },
}

export default function TelemetryHud({
  mode,
  setMode,
  explosionAmount,
  setExplosionAmount,
  activeStage,
  setActiveStage,
  zoomDelta,
  setZoomDelta,
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentStageInfo = activeStage ? STAGE_DATA[activeStage] : null

  return (
    <>
      {/* ─── BOTTOM 3D WORKBENCH CONTROLS (NON-OVERLAPPING DOCKED BAR) ─────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '820px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {/* Mode Switcher + Zoom + Explosion Slider Row */}
        <div
          className="hud-panel"
          style={{
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            pointerEvents: 'auto',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          {/* View Modes */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setMode('nominal')}
              className={`tech-btn ${mode === 'nominal' ? 'tech-btn-primary' : 'tech-btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: isMobile ? '0.68rem' : '0.75rem' }}
            >
              <span className="pulse-indicator" style={{ background: mode === 'nominal' ? '#38bdf8' : '#64748b' }} />
              A Regime
            </button>
            <button
              onClick={() => setMode('exploded')}
              className={`tech-btn ${mode === 'exploded' ? 'tech-btn-primary' : 'tech-btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: isMobile ? '0.68rem' : '0.75rem' }}
            >
              Esploso 3D
            </button>
            <button
              onClick={() => setMode('thermal')}
              className={`tech-btn ${mode === 'thermal' ? 'tech-btn-flame' : 'tech-btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: isMobile ? '0.68rem' : '0.75rem' }}
            >
              Mappa Termica
            </button>
          </div>

          {/* Zoom In / Out Buttons (Allows zoom on demand without mouse wheel trapping) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderLeft: '1px solid var(--border-subtle)',
              paddingLeft: '8px',
            }}
          >
            <button
              onClick={() => setZoomDelta((z) => Math.max(-2.5, z - 0.75))}
              className="tech-btn tech-btn-secondary"
              style={{ padding: '4px 8px', fontSize: '0.8rem', minWidth: '28px' }}
              title="Ingrandisci Turbina"
            >
              +
            </button>
            <button
              onClick={() => setZoomDelta((z) => Math.min(3.5, z + 0.75))}
              className="tech-btn tech-btn-secondary"
              style={{ padding: '4px 8px', fontSize: '0.8rem', minWidth: '28px' }}
              title="Riduci Turbina"
            >
              −
            </button>
          </div>

          {/* Explosion Slider when in exploded mode */}
          {mode === 'exploded' && (
            <div
              className="font-mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.7rem',
                color: '#94a3b8',
                borderLeft: '1px solid var(--border-subtle)',
                paddingLeft: '8px',
              }}
            >
              <span>Separazione:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explosionAmount}
                onChange={(e) => setExplosionAmount(parseFloat(e.target.value))}
                style={{ width: isMobile ? '60px' : '90px', cursor: 'ew-resize' }}
              />
              <span style={{ color: '#38bdf8', minWidth: '28px' }}>
                {Math.round(explosionAmount * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Stage Selector Pills (Horizontally Scrollable on Mobile) */}
        <div
          className="hud-panel"
          style={{
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'auto',
            maxWidth: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.62rem',
              color: '#64748b',
              padding: '0 6px',
              textTransform: 'uppercase',
              display: isMobile ? 'none' : 'inline',
            }}
          >
            Specifiche Stadi:
          </span>
          {[
            { id: 'igv', label: '01 Aspirazione' },
            { id: 'compressor', label: '02 Compressore' },
            { id: 'combustor', label: '03 Combustione' },
            { id: 'turbine', label: '04 Turbina' },
            { id: 'exhaust', label: '05 Scarico' },
          ].map((stage) => {
            const isActive = activeStage === stage.id
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className="font-mono"
                style={{
                  background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  border: isActive ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{stage.label}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>ℹ</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── STAGE SPECIFICATIONS MODAL / DRAWER (OPENS ONLY ON EXPLICIT CLICK) ─ */}
      {currentStageInfo && (
        <div
          className="hud-panel"
          style={
            isMobile
              ? {
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  maxHeight: '75vh',
                  zIndex: 50,
                  padding: '24px 20px',
                  borderRadius: '16px 16px 0 0',
                  borderTop: '1px solid var(--border-active)',
                  boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.8)',
                  overflowY: 'auto',
                }
              : {
                  position: 'absolute',
                  top: '90px',
                  right: '28px',
                  width: '420px',
                  zIndex: 35,
                  padding: '24px',
                  border: '1px solid var(--border-active)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
                  maxHeight: 'calc(100vh - 190px)',
                  overflowY: 'auto',
                }
          }
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                {currentStageInfo.tag}
              </span>
              <h3 style={{ margin: '8px 0 0', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                {currentStageInfo.title}
              </h3>
            </div>
            <button
              onClick={() => setActiveStage(null)}
              style={{
                color: '#94a3b8',
                background: 'rgba(148, 163, 184, 0.1)',
                border: '1px solid var(--border-subtle)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
              title="Chiudi scheda"
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: '8px 0 14px' }}>
            {currentStageInfo.description}
          </p>

          {/* Specs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '12px',
              background: 'rgba(7, 10, 15, 0.6)',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '14px',
            }}
          >
            {currentStageInfo.specs.map((item, i) => (
              <div key={i}>
                <div className="font-mono" style={{ fontSize: '0.62rem', color: '#64748b' }}>
                  {item.label}
                </div>
                <div className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Contribution */}
          <div
            style={{
              borderLeft: '2px solid #ff6b2b',
              paddingLeft: '10px',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#ff6b2b', letterSpacing: '0.04em' }}>
              RUOLO INGEGNERISTICO DI ANDREA DELFINI
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px', lineHeight: 1.45 }}>
              {currentStageInfo.engineeringFocus}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
