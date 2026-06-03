import { useState } from 'react'

const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'
const azzurro = '#91B0D9'
const oro = '#F2C879'

const MENU = ['LO STUDIO', 'PROGETTI', 'MATERIOTECA', 'COLLABORATORI', 'CALENDARIO', 'CONTATTI']

const TIMELINE = [
  { anno: '1985', testo: 'Fondazione dello studio ad Anzio' },
  { anno: '1990', testo: 'Progetti per musei e mostre temporanee' },
  { anno: '2013', testo: 'Ristrutturazione della sede storica' },
  { anno: '2026', testo: 'Lancio Archivio Mastrella' },
]

function TimelineVoce({ anno, testo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <div style={{
        width: 4, height: 4, borderRadius: '50%',
        background: oro, opacity: 0.6, flexShrink: 0, marginTop: 5,
      }} />
      <div>
        <div style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 200,
          letterSpacing: '0.3em', color: oro, opacity: 0.5,
        }}>
          {anno}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 200,
          letterSpacing: '0.3em', color: oro, marginTop: 2,
        }}>
          {testo.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default function StudioPage({ onBack }) {
  const [hoverVoce, setHoverVoce] = useState(null)

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: azzurro, overflowY: 'auto',
    }}>

      {/* ── Header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px',
        background: 'rgba(145, 176, 217, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: archivo, fontSize: 9, fontWeight: 200,
              letterSpacing: '0.3em', color: marrone,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              opacity: 0.6,
            }}
          >
            ← INDIETRO
          </button>
          <img src="/logo.png" alt="Archivio Mastrella" style={{ width: 140 }} />
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {MENU.map(voce => (
            <button
              key={voce}
              onMouseEnter={() => setHoverVoce(voce)}
              onMouseLeave={() => setHoverVoce(null)}
              style={{
                fontFamily: archivo, fontSize: 11, fontWeight: 400,
                letterSpacing: '0.25em', color: marrone,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                borderBottom: hoverVoce === voce ? `0.5px solid ${marrone}` : '0.5px solid transparent',
                transition: 'border-color 0.2s ease',
              }}
            >
              {voce}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Sezione 1 — CHI SIAMO ── */}
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Colonna sinistra — immagine */}
        <div style={{ width: '55%', flexShrink: 0, overflow: 'hidden' }}>
          <img
            src="/immagini/sede.png"
            alt="Sede Studio Mastrella"
            onError={(e) => console.error('Immagine non trovata:', e.target.src)}
            style={{ width: '100%', height: '100vh', objectFit: 'contain', background: '#91B0D9', display: 'block' }}
          />
        </div>

        {/* Colonna destra — testo */}
        <div style={{
          width: '45%',
          background: azzurro,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 60px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            fontFamily: archivo, fontSize: 10, fontWeight: 200,
            letterSpacing: '0.5em', color: marrone, opacity: 0.5,
            marginBottom: 48,
          }}>
            CHI SIAMO
          </div>
          <p style={{
            fontFamily: archivo, fontSize: 22, fontWeight: 300,
            lineHeight: 1.7, color: marrone, margin: 0,
          }}>
            Lo Studio Mastrella è stato fondato da Leopoldo e Romano Mastrella nel 1985 ad Anzio.
            La sede principale si trova nella residenza progettata da Leopoldo Mastrella per sé stesso,
            una casa affacciata sul mare, costruita sui resti di una Villa Romana.
          </p>
        </div>
      </div>

      {/* ── Sezione 2 — LA NOSTRA STORIA ── */}
      <div style={{
        minHeight: '100vh',
        background: marrone,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        padding: '80px 40px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 200,
          letterSpacing: '0.5em', color: oro, opacity: 0.5,
          marginBottom: 64,
        }}>
          LA NOSTRA STORIA
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 96,
          maxWidth: 900, width: '100%',
        }}>
          {/* Testo sinistra */}
          <p style={{
            fontFamily: archivo, fontSize: 15, fontWeight: 300,
            lineHeight: 1.8, color: oro,
            maxWidth: 480, margin: 0, flex: '1 1 auto',
          }}>
            Un gusto contemporaneo e raffinato è in continuo dialogo con il passato,
            senza mai oscurarlo. Cuore dello Studio Mastrella per quasi trent'anni,
            la casa è stata completamente ristrutturata nel 2013 da Romano per renderla
            più funzionale alle esigenze del team di progettazione.
          </p>

          {/* Timeline destra */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 32,
            flexShrink: 0,
            borderLeft: `1px solid rgba(242, 200, 121, 0.2)`,
            paddingLeft: 40,
          }}>
            {TIMELINE.map(item => (
              <TimelineVoce key={item.anno} anno={item.anno} testo={item.testo} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Sezione 3 — STUDIO MASTRELLA ── */}
      <div style={{
        minHeight: '100vh',
        background: oro,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        padding: '80px 40px',
        boxSizing: 'border-box',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Anno di sfondo */}
        <div style={{
          position: 'absolute',
          fontFamily: archivo, fontSize: 180, fontWeight: 100,
          color: marrone, opacity: 0.15,
          userSelect: 'none', lineHeight: 1,
          pointerEvents: 'none',
        }}>
          1985
        </div>

        <div style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 200,
          letterSpacing: '0.5em', color: marrone, opacity: 0.5,
          marginBottom: 48, position: 'relative',
        }}>
          STUDIO MASTRELLA
        </div>

        <p style={{
          fontFamily: archivo, fontSize: 15, fontWeight: 300,
          lineHeight: 1.8, color: marrone,
          maxWidth: 580, textAlign: 'center', margin: 0,
          position: 'relative',
        }}>
          Nel corso degli anni lo studio ha ampliato i propri interessi: architettura,
          interior design, product design e consulenza artistica. I progetti dello studio
          si trovano in tutto il mondo, dall'Italia e dall'Europa agli Stati Uniti,
          da Dubai a Mumbai.
        </p>

        <div style={{
          marginTop: 72, position: 'relative',
          fontFamily: archivo, fontSize: 11, fontWeight: 200,
          letterSpacing: '0.4em', color: marrone,
        }}>
          40 ANNI · 4 DISCIPLINE · WORLDWIDE
        </div>
      </div>

    </div>
  )
}
