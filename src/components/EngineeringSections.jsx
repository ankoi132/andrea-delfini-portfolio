import { useState } from 'react'

export default function EngineeringSections({ onFocusTurbineStage }) {
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    email: '',
    impianto: 'classe-f',
    servizio: 'diagnostica-vibrazionale',
    messaggio: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
      {/* ─── SECTION 1: INGEGNERIA DI DOMINIO & COMPETENZE ────────────────── */}
      <section
        id="competenze"
        style={{
          padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '780px', marginBottom: '64px' }}>
          <div
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              marginBottom: '12px',
            }}
          >
            // AREE DI ALTA SPECIALIZZAZIONE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 20px',
            }}
          >
            Ingegneria di precisione per le macchine rotanti più critiche al mondo.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.65 }}>
            Dall’aerodinamica transcritica del compressore assiale al comportamento termoelastico delle superleghe monocristalline a 1,500 °C: un approccio analitico rigoroso basato su modellazione fisica, diagnostica avanzata e decenni di collaudi in centrale.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Pillar 1 */}
          <div
            className="hud-panel"
            style={{
              padding: '32px',
              borderTop: '3px solid #38bdf8',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '8px' }}>
              01 / DINAMICA ROTORICA
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Rotodinamica & Diagnostica Vibrazionale
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Analisi delle orbite e delle linee elastiche su cuscinetti fluidodinamici a pattini oscillanti (tilting-pad). Calcolo dei diagrammi di Campbell per la prevenzione di risonanze su modi flessionali e torsionali.
            </p>
            <div
              className="font-mono"
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: '#64748b',
              }}
            >
              API 670 // ISO 10816-4 // Bently Nevada System 1
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            className="hud-panel"
            style={{
              padding: '32px',
              borderTop: '3px solid #ff6b2b',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', color: '#ff6b2b', marginBottom: '8px' }}>
              02 / TERMODINAMICA & H2
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Combustione Avanzata & H2-Ready
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Messa a punto e retrofit di sistemi di combustione premiscelata secca (DLE/DLN). Mitigazione di instabilità termoacustiche e prevenzione di flashback per miscele ricche di idrogeno (fino al 100% H2) con emissioni NOx inferiori a 9 ppm.
            </p>
            <div
              className="font-mono"
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: '#64748b',
              }}
            >
              Zero-NOx Flame // Flashback Modeling // Can-Annular DLE
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            className="hud-panel"
            style={{
              padding: '32px',
              borderTop: '3px solid #f59e0b',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', color: '#f59e0b', marginBottom: '8px' }}>
              03 / AERODINAMICA CFD
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Fluidodinamica & Profilazione Pale
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Modellazione CFD tridimensionale di schiere rotanti e distributori statorici. Ottimizzazione delle perdite secondarie, del margine di stallo alle basse portate e del film-cooling interno con matrici di turbulatori 3D.
            </p>
            <div
              className="font-mono"
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: '#64748b',
              }}
            >
              ANSYS CFX // RANS/URANS // Aeroelastic Flutter
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            className="hud-panel"
            style={{
              padding: '32px',
              borderTop: '3px solid #10b981',
            }}
          >
            <div className="font-mono" style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '8px' }}>
              04 / VITA RESIDUA (RUL)
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Analisi Creep, LCF & Superleghe
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Valutazione della vita a fatica oligociclica (LCF) e rottura per scorrimento viscoso (creep) secondo il parametro Larson-Miller. Diagnostica non distruttiva (NDT) e monitoraggio dell'integrità strutturale dei rotori forgiati.
            </p>
            <div
              className="font-mono"
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: '#64748b',
              }}
            >
              CMSX-4 // Inconel 738LC // Creep Life Extrapolation
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CASI STUDIO INDUSTRIALI RISOLTI ───────────────────── */}
      <section
        id="casi-studio"
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 64px)',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ff6b2b',
                marginBottom: '12px',
              }}
            >
              // INTERVENTI SU GRANDI IMPIANTI
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Risultati tangibili dove il fermo impianto costa 150.000 € al giorno.
            </h2>
          </div>

          {/* Case Studies Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Case 1 */}
            <div
              className="hud-panel"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  CENTRALE TERMOELETTRICA // 840 MW CICLO COMBINATO
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', margin: '14px 0 10px' }}>
                  Eliminazione vibrazioni subsincrone su turbogas Classe F (330 MW)
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Durante i transitori estivi di carico parziale (50% nominale), la turbina sviluppava un picco di vibrazione radiale (0.43X subsincrono) al cuscinetto n°1, costringendo a frequenti sganci di emergenza. L’analisi rotodinamica con simulazione FEM del film d'olio ha evidenziato instabilità fluidodinamica (oil whip).
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                  <strong>Risoluzione di Andrea Delfini:</strong> Ricalcolo del pre-carico e riprofilatura idrodinamica dei pattini oscillanti; totale azzeramento del picco vibrazionale (&lt; 18 µm pk-pk) e disponibilità impianto riportata al 99.8%.
                </div>
              </div>

              {/* Data metrics box */}
              <div
                style={{
                  background: 'rgba(7, 10, 15, 0.7)',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '18px',
                }}
              >
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    RIDUZIONE VIBRAZIONI
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
                    -78%
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    TEMPO RISOLUZIONE
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f1f5f9' }}>
                    72 ore
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    DISPONIBILITÀ ANNUALE
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
                    99.8%
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    RISPARMIO STIMATO
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b' }}>
                    1.2M €
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div
              className="hud-panel"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: '#ff6b2b',
                    background: 'rgba(255, 107, 43, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 107, 43, 0.3)',
                  }}
                >
                  COGENERAZIONE INDUSTRIALE // RETROFIT H2-READY (45 MW)
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', margin: '14px 0 10px' }}>
                  Conversione camera di combustione per miscele 35% Idrogeno
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Un importante distretto cartario ha richiesto la decarbonizzazione del proprio gruppo turbogas industriale con immissione di idrogeno da elettrolizzatore fotovoltaico in loco. La criticità primaria riguardava l'elevata velocità di fiamma dell'idrogeno e il rischio di flashback con distruzione dei bruciatori.
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                  <strong>Risoluzione di Andrea Delfini:</strong> Ridisegno aero-meccanico degli swirlers di miscelazione, ricalibrazione del sistema di controllo combustibile e tuning acustico; emissioni NOx stabilizzate a 8.2 ppm con blend al 35% H2 in volume.
                </div>
              </div>

              {/* Data metrics box */}
              <div
                style={{
                  background: 'rgba(7, 10, 15, 0.7)',
                  padding: '24px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '18px',
                }}
              >
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    QUOTA BLEND H2
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ff6b2b' }}>
                    35% Vol
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    EMISSIONI NOX
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
                    &lt; 9 ppm
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    RIDUZIONE CO2
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
                    -14,000 t/a
                  </div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    RISCHIO FLASHBACK
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f1f5f9' }}>
                    Zero Eventi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: METODOLOGIA, STRUMENTI & STANDARD ────────────────── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 64px)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#38bdf8',
                marginBottom: '12px',
              }}
            >
              // RIGORE ANALITICO & STANDARD
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 16px',
              }}
            >
              Nessuna supposizione. Solo dati fisici, codici validati e norme internazionali.
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.65 }}>
              Ogni perizia e intervento di ottimizzazione viene convalidato secondo i più stringenti standard del settore energetico e petrolchimico mondiale. Dalla misura ad altissima frequenza di campionamento sul campo fino alla simulazione termofluidodinamica computazionale.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {[
              { code: 'ASME PTC 22', title: 'Gas Turbine Acceptance Tests' },
              { code: 'API 616', title: 'Gas Turbines for Petroleum Services' },
              { code: 'API 670', title: 'Machinery Protection Systems' },
              { code: 'ISO 10816-4', title: 'Mechanical Vibration Evaluation' },
              { code: 'ISO 21789', title: 'Gas Turbine Applications - Safety' },
              { code: 'ISO 7919-4', title: 'Shaft Vibration of Gas Turbines' },
            ].map((std, i) => (
              <div
                key={i}
                className="hud-panel"
                style={{
                  padding: '16px',
                }}
              >
                <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                  {std.code}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  {std.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: MODULO DI CONTATTO INGEGNERISTICO ─────────────────── */}
      <section
        id="contatto"
        style={{
          padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#38bdf8',
                marginBottom: '12px',
              }}
            >
              // DIRETTO CON L'INGEGNERE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 16px',
              }}
            >
              Richiedi una perizia o una consulenza specialistica
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Per supporto in sito su impianti di generazione, risoluzione di problematiche vibrazionali critiche o studi di conversione a Idrogeno.
            </p>
          </div>

          <div
            className="hud-panel"
            style={{
              padding: 'clamp(24px, 5vw, 48px)',
              border: '1px solid var(--border-active)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid #38bdf8',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    margin: '0 auto 20px',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  Richiesta inoltrata con successo
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', maxWidth: '460px', margin: '0 auto' }}>
                  Grazie per aver contattato Andrea Delfini. Riceverai un primo riscontro tecnico entro 24 ore lavorative con la disponibilità per un briefing preliminare.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label
                      className="font-mono"
                      style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}
                    >
                      NOME & COGNOME *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ing. Marco Rossi"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(7, 10, 15, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        color: '#f8fafc',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="font-mono"
                      style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}
                    >
                      AZIENDA / CENTRALE *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.azienda}
                      onChange={(e) => setFormData({ ...formData, azienda: e.target.value })}
                      placeholder="Enel Produzione / Ansaldo / IP"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(7, 10, 15, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        color: '#f8fafc',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label
                      className="font-mono"
                      style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}
                    >
                      INDIRIZZO EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marco.rossi@energy-power.it"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(7, 10, 15, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        color: '#f8fafc',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="font-mono"
                      style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}
                    >
                      TIPOLOGIA D’INTERVENTO *
                    </label>
                    <select
                      value={formData.servizio}
                      onChange={(e) => setFormData({ ...formData, servizio: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(7, 10, 15, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        color: '#f8fafc',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="diagnostica-vibrazionale">Diagnostica Vibrazionale & Rotodinamica</option>
                      <option value="test-asme-ptc22">Collaudo & Acceptance Test (ASME PTC 22)</option>
                      <option value="retrofit-idrogeno">Studio Retrofit H2 / Decarbonizzazione</option>
                      <option value="analisi-vita-residua">Stima Vita a Creep/LCF & NDT</option>
                      <option value="supervisione-overhaul">Supervisione Major Overhaul & Commissioning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="font-mono"
                    style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px' }}
                  >
                    DETTAGLI TECNICI O SINTOMATOLOGIA DELL’IMPIANTO *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                    placeholder="Specificare modello turbina (es. Ansaldo GT26, GE 9F, Siemens SGT5), potenza nominale, regime di funzionamento e criticità riscontrata..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(7, 10, 15, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: '#f8fafc',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="tech-btn tech-btn-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.9rem',
                    justifyContent: 'center',
                    marginTop: '8px',
                  }}
                >
                  Invia Richiesta di Perizia Ingegneristica →
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: '48px',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#64748b',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div className="font-mono">
              ANDREA DELFINI // ORDINE DEGLI INGEGNERI // SPECIALIZZAZIONE TURBOMACCHINE & POWER GENERATION
            </div>
            <div>
              Riservatezza garantita sotto accordo di non divulgazione (NDA) per documentazione industriale sensibile.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
