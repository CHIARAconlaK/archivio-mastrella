import { useState } from 'react'

const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

const TRANSFORMS = [
  { rotateY: 0,   rotateX: 0, translateZ: 0,    translateX: 0,   translateY: 0,    opacity: 1    },
  { rotateY: -4,  rotateX: 1, translateZ: -40,   translateX: 40,  translateY: -15,  opacity: 0.98 },
  { rotateY: -8,  rotateX: 3, translateZ: -100,  translateX: 100, translateY: -40,  opacity: 0.95 },
  { rotateY: -12, rotateX: 4, translateZ: -180,  translateX: 180, translateY: -80,  opacity: 0.9  },
  { rotateY: -16, rotateX: 5, translateZ: -280,  translateX: 280, translateY: -120, opacity: 0.85 },
  { rotateY: -19, rotateX: 6, translateZ: -420,  translateX: 420, translateY: -180, opacity: 0.8  },
  { rotateY: -22, rotateX: 7, translateZ: -560,  translateX: 560, translateY: -240, opacity: 0.7  },
  { rotateY: -25, rotateX: 8, translateZ: -700,  translateX: 700, translateY: -300, opacity: 0.6  },
]

const LOGO_FILTERS = {
  '#F2C879': 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
  '#2F1F11': 'brightness(0)',
  '#91B0D9': 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(500%) hue-rotate(180deg)',
  '#A64914': 'brightness(0) saturate(100%) invert(40%) sepia(80%) saturate(700%) hue-rotate(355deg)',
}

const POSTERS = [
  { bg: '#2F1F11', testo: '#F2C879', titolo: 'MATERIA\nE LUCE',          tipo: 'MOSTRA',            data: 'GEN 2026', luogo: 'ROMA',    categoria: 'MOSTRE'   },
  { bg: '#91B0D9', testo: '#2F1F11', titolo: 'ARCHIVIO\nAPERTO',          tipo: 'OPEN DAY',          data: 'FEB 2026', luogo: 'ANZIO',   categoria: 'OPEN DAY' },
  { bg: '#F2C879', testo: '#2F1F11', titolo: 'DIALOGHI\nSUL\nPROGETTO',   tipo: 'TALK',              data: 'MAR 2026', luogo: 'MILANO',  categoria: 'TALK'     },
  { bg: '#A64914', testo: '#F2C879', titolo: 'TEXTURE',                   tipo: 'MOSTRA MATERIALI',  data: 'APR 2026', luogo: 'DUBAI',   categoria: 'MOSTRE'   },
  { bg: '#2F1F11', testo: '#91B0D9', titolo: 'MADE IN\nITALY',            tipo: 'CONFERENZA',        data: 'MAG 2026', luogo: 'FIRENZE', categoria: 'TALK'     },
  { bg: '#F2C879', testo: '#A64914', titolo: 'SPAZIO\nE TEMPO',           tipo: 'INSTALLAZIONE',     data: 'GIU 2026', luogo: 'MUMBAI',  categoria: 'MOSTRE'   },
  { bg: '#91B0D9', testo: '#A64914', titolo: 'WORKSHOP\nMATERICO',        tipo: 'WORKSHOP',          data: 'LUG 2026', luogo: 'ROMA',    categoria: 'WORKSHOP' },
  { bg: '#A64914', testo: '#91B0D9', titolo: 'ARCHI-\nTETTURA\nVIVA',     tipo: 'MOSTRA',            data: 'SET 2026', luogo: 'VENEZIA', categoria: 'MOSTRE'   },
]

const FILTRI = [
  { label: 'TUTTI',    count: 8 },
  { label: 'MOSTRE',   count: 4 },
  { label: 'TALK',     count: 2 },
  { label: 'WORKSHOP', count: 1 },
  { label: 'OPEN DAY', count: 1 },
]

function buildTransform(t, hover = false) {
  const base = `rotateY(${t.rotateY}deg) rotateX(${t.rotateX}deg) translateZ(${t.translateZ}px) translateX(${t.translateX}px) translateY(${t.translateY}px)`
  return hover ? `${base} scale(1.02)` : base
}

function BotoneIndietro({ onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: archivo, fontSize: 12, fontWeight: 600,
        letterSpacing: '0.3em',
        color: hover ? '#F5F0E8' : marrone,
        background: hover ? marrone : 'transparent',
        border: `1px solid ${marrone}`,
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      ← INDIETRO
    </button>
  )
}

export default function CalendarioPage({ onBack }) {
  const [stack, setStack] = useState([0, 1, 2, 3, 4, 5, 6, 7])
  const [hoverFront, setHoverFront] = useState(false)
  const [filtro, setFiltro] = useState('TUTTI')

  const handleClickFront = () => {
    setHoverFront(false)
    setStack(prev => [...prev.slice(1), prev[0]])
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: '#F5F0E8',
      overflow: 'hidden',
    }}>

      {/* ── Header ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        background: 'transparent',
        boxSizing: 'border-box',
      }}>
        <img src="/logo.png" alt="Archivio Mastrella" style={{ width: 160, filter: 'brightness(0)' }} />
        <BotoneIndietro onClick={onBack} />
      </div>

      {/* ── Stack 3D ── */}
      <div style={{
        position: 'absolute',
        left: '15%',
        top: '50%',
        transform: 'translateY(-50%)',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        width: 320,
        height: 420,
      }}>
        {stack.map((posterIdx, stackPos) => {
          const t = TRANSFORMS[stackPos]
          const poster = POSTERS[posterIdx]
          const isFront = stackPos === 0

          return (
            <div
              key={posterIdx}
              onClick={isFront ? handleClickFront : undefined}
              onMouseEnter={isFront ? () => setHoverFront(true) : undefined}
              onMouseLeave={isFront ? () => setHoverFront(false) : undefined}
              style={{
                position: 'absolute',
                width: 320, height: 420,
                background: poster.bg,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: isFront ? 'pointer' : 'default',
                transition: 'transform 0.6s ease, opacity 0.6s ease, box-shadow 0.3s ease',
                transform: buildTransform(t, isFront && hoverFront),
                opacity: t.opacity,
                boxShadow: isFront && hoverFront
                  ? '8px 12px 40px rgba(0,0,0,0.4)'
                  : '4px 6px 20px rgba(0,0,0,0.25)',
                zIndex: 8 - stackPos,
                padding: '28px 24px',
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
            >
              {/* Logo */}
              <img
                src="/logo.png"
                alt=""
                style={{ width: 80, filter: LOGO_FILTERS[poster.testo] || 'brightness(0)' }}
              />

              {/* Titolo evento */}
              <div style={{
                fontFamily: archivo,
                fontSize: 48,
                fontWeight: 100,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: poster.testo,
                whiteSpace: 'pre-line',
              }}>
                {poster.titolo}
              </div>

              {/* Data, luogo e tipo */}
              <div>
                <div style={{
                  fontFamily: archivo, fontSize: 11, fontWeight: 300,
                  color: poster.testo, marginBottom: 8,
                }}>
                  {poster.data} · {poster.luogo}
                </div>
                <div style={{
                  fontFamily: archivo, fontSize: 9, fontWeight: 200,
                  letterSpacing: '0.3em', color: poster.testo, opacity: 0.6,
                  textTransform: 'uppercase',
                }}>
                  {poster.tipo}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Filtri verticali (destra) ── */}
      <div style={{
        position: 'fixed',
        right: 40, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 36,
        alignItems: 'center',
        zIndex: 100,
      }}>
        {FILTRI.map(({ label, count }) => {
          const isActive = filtro === label
          return (
            <div
              key={label}
              onClick={() => setFiltro(label)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.35,
                transition: 'opacity 0.2s ease',
              }}
            >
              <span style={{
                fontFamily: archivo, fontSize: 9,
                fontWeight: 600, color: marrone, lineHeight: 1,
              }}>
                {count}
              </span>
              <div style={{
                fontFamily: archivo,
                fontSize: 10,
                fontWeight: isActive ? 600 : 200,
                color: marrone,
                writingMode: 'vertical-lr',
                textOrientation: 'mixed',
                letterSpacing: '0.2em',
              }}>
                {label}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
