import { useState } from 'react'

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
      'Stadio di aspirazione dotato di ogiva aerodinamica a bassa turbolenza e schiera di pale direttrici a geometria variabile (IGV). Regolano con precisione micrometrica la portata massica durante i transitori di avviamento rapido e garantiscono il margine di stallo alle basse velocità di rotazione.',
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
      'Treno compressore assiale multistadio ad elevatissimo rendimento politropico. La corda e lo svergolamento delle pale sono ottimizzati secondo la legge del vortice libero per minimizzare le perdite secondarie e le onde d’urto supersoniche ai vertici delle prime schiere.',
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
      'Diagnostica e soppressione attiva delle instabilità termoacustiche (combustion rumble / screaming) e re-engineering dei miscelatori per la transizione verde a miscele ricche di idrogeno ad alta velocità di propagazione.',
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
      'Stima della vita a fatica oligociclica (LCF) e creep (rottura per scorrimento viscoso) secondo il modello Larson-Miller, con monitoraggio delle deformazioni plastiche e controllo non distruttivo (NDT) delle radici a pino.',
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
      'Diffusore anulare divergente che converte l’energia cinetica residua dei gas caldi in pressione statica, massimizzando il salto entalpico utile. Integra il supporto cuscinetto radiale/assiale e il massiccio giunto flangiato per l’accoppiamento con il generatore a 2 poli.',
    engineeringFocus:
      'Calcolo della rotodinamica su cuscinetti fluidodinamici lubrificati a film d’olio, allineamento termico del giunto albero-generatore e soppressione delle orbite ellittiche secondo standard API 670 e ISO 10816-4.',
  },
}

export default function TelemetryHud({
  mode,
  setMode,
  explosionAmount,
  setExplosionAmount,
  activeStage,
  setActiveStage,
}) {
  const currentStageInfo = activeStage ? STAGE_DATA[activeStage] : null

  return (
    <>
      {/* ─── TOP LEFT: ENGINEER CREDENTIAL & LIVE STATUS ──────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '380px',
        }}
      >
        <div
          className="hud-panel"
          style={{
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(255, 107, 43, 0.2))',
              border: '1px solid var(--border-active)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: '#f8fafc',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}
          >
            AD
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em', color: '#f1f5f9' }}>
                Andrea Delfini
              </span>
              <span
                className="pulse-indicator"
                style={{ background: '#38bdf8' }}
                title="Sistemi Online"
              />
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.02em' }}
            >
              Heavy Turbomachinery & Power Systems Specialist
            </div>
          </div>
        </div>
      </div>

      {/* ─── TOP RIGHT: LIVE TELEMETRY TELEMETER ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 20,
          display: 'flex',
          gap: '12px',
        }}
        className="hud-panel"
      >
        <div style={{ padding: '10px 16px', display: 'flex', gap: '20px' }}>
          <div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
              Rotore
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
              3,000 <span style={{ fontSize: '0.65rem', fontWeight: 400, color: '#94a3b8' }}>RPM</span>
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
          <div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
              Compressione
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9' }}>
              24.2 : 1
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
          <div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
              Temp. Ingresso (TIT)
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ff6b2b' }}>
              1,480 <span style={{ fontSize: '0.65rem', fontWeight: 400, color: '#94a3b8' }}>°C</span>
            </div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
          <div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
              Potenza
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b' }}>
              380 <span style={{ fontSize: '0.65rem', fontWeight: 400, color: '#94a3b8' }}>MW</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM CONTROLS & STAGE BAR ──────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '24px',
          right: '24px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          pointerEvents: 'none',
        }}
      >
        {/* Stage Selector Pills */}
        <div
          className="hud-panel"
          style={{
            padding: '6px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            pointerEvents: 'auto',
          }}
        >
          {[
            { id: 'igv', label: '01 Aspirazione & IGV' },
            { id: 'compressor', label: '02 Compressore Assiale' },
            { id: 'combustor', label: '03 Camera di Combustione' },
            { id: 'turbine', label: '04 Turbina di Espansione' },
            { id: 'exhaust', label: '05 Scarico & Generatore' },
          ].map((stage) => {
            const isActive = activeStage === stage.id
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className="font-mono"
                style={{
                  background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  border: isActive ? '1px solid #38bdf8' : '1px solid transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {stage.label}
              </button>
            )
          })}
        </div>

        {/* View Mode Switcher + Slider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'auto',
          }}
        >
          <div
            className="hud-panel"
            style={{
              padding: '6px',
              display: 'flex',
              gap: '6px',
            }}
          >
            <button
              onClick={() => setMode('nominal')}
              className={`tech-btn ${mode === 'nominal' ? 'tech-btn-primary' : 'tech-btn-secondary'}`}
            >
              <span className="pulse-indicator" style={{ background: mode === 'nominal' ? '#38bdf8' : '#64748b' }} />
              A Regime (3000 RPM)
            </button>
            <button
              onClick={() => setMode('exploded')}
              className={`tech-btn ${mode === 'exploded' ? 'tech-btn-primary' : 'tech-btn-secondary'}`}
            >
              Esploso Tecnico
            </button>
            <button
              onClick={() => setMode('thermal')}
              className={`tech-btn ${mode === 'thermal' ? 'tech-btn-flame' : 'tech-btn-secondary'}`}
            >
              Mappa Termica Brayton
            </button>
          </div>

          {/* Explosion Slider when in exploded mode */}
          {mode === 'exploded' && (
            <div
              className="hud-panel font-mono"
              style={{
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.75rem',
                color: '#94a3b8',
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
                style={{ width: '100px', cursor: 'ew-resize' }}
              />
              <span style={{ color: '#38bdf8', minWidth: '35px' }}>
                {Math.round(explosionAmount * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── STAGE INSPECTOR DRAWER / MODAL ──────────────────────────────── */}
      {currentStageInfo && (
        <div
          className="hud-panel"
          style={{
            position: 'absolute',
            bottom: '120px',
            left: '24px',
            maxWidth: '460px',
            zIndex: 30,
            padding: '24px',
            border: '1px solid var(--border-active)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.1)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                {currentStageInfo.tag}
              </span>
              <h3 style={{ margin: '8px 0 0', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {currentStageInfo.title}
              </h3>
            </div>
            <button
              onClick={() => setActiveStage(null)}
              style={{
                color: '#94a3b8',
                background: 'rgba(148, 163, 184, 0.1)',
                border: 'none',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55, margin: '10px 0 16px' }}>
            {currentStageInfo.description}
          </p>

          {/* Key Engineering Specs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '12px',
              background: 'rgba(7, 10, 15, 0.6)',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '16px',
            }}
          >
            {currentStageInfo.specs.map((item, i) => (
              <div key={i}>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: '#64748b' }}>
                  {item.label}
                </div>
                <div className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderLeft: '2px solid #ff6b2b',
              paddingLeft: '12px',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#ff6b2b', letterSpacing: '0.04em' }}>
              RUOLO & RISOLUZIONE INGEGNERISTICA DI ANDREA DELFINI
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px', lineHeight: 1.5 }}>
              {currentStageInfo.engineeringFocus}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
