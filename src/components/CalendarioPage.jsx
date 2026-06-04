import { useState, useEffect, useRef, useCallback } from 'react'

const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

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

function PosterContent({ poster, size }) {
  const isLarge = size === 'large'
  return (
    <>
      <img
        src="/logo.png"
        alt=""
        style={{ width: isLarge ? 100 : 60, filter: LOGO_FILTERS[poster.testo] || 'brightness(0)' }}
      />
      <div style={{
        fontFamily: archivo,
        fontSize: isLarge ? 56 : 30,
        fontWeight: 100,
        letterSpacing: '0.02em',
        lineHeight: 1,
        color: poster.testo,
        whiteSpace: 'pre-line',
      }}>
        {poster.titolo}
      </div>
      <div>
        <div style={{
          fontFamily: archivo, fontSize: isLarge ? 13 : 9, fontWeight: 300,
          color: poster.testo, marginBottom: 6,
        }}>
          {poster.data} · {poster.luogo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: isLarge ? 10 : 8, fontWeight: 200,
          letterSpacing: '0.3em', color: poster.testo, opacity: 0.6,
          textTransform: 'uppercase',
        }}>
          {poster.tipo}
        </div>
      </div>
    </>
  )
}

function OverlayPoster({ poster, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 420, height: 560,
          background: poster.bg,
          borderRadius: 2,
          padding: '36px 32px',
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          transform: visible ? 'scale(1)' : 'scale(0.8)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none',
            fontSize: 20, cursor: 'pointer',
            color: poster.testo, lineHeight: 1, padding: 4,
          }}
        >
          ✕
        </button>
        <PosterContent poster={poster} size="large" />
      </div>
    </div>
  )
}

export default function CalendarioPage({ onBack }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [posterAperto, setPosterAperto] = useState(null)
  const [filtro, setFiltro] = useState('TUTTI')
  const [scrollIndex, setScrollIndex] = useState(0)
  const scrollAccumulator = useRef(0)
  const isScrolling = useRef(false)

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    scrollAccumulator.current += e.deltaY
    const steps = Math.floor(Math.abs(scrollAccumulator.current) / 200)
    if (steps > 0) {
      if (isScrolling.current) return
      isScrolling.current = true
      setTimeout(() => { isScrolling.current = false }, 500)
      const direction = scrollAccumulator.current > 0 ? 1 : -1
      scrollAccumulator.current -= steps * 200 * direction
      setScrollIndex(prev => {
        const next = prev + (steps * direction)
        return ((next % 8) + 8) % 8
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const posterOrdinati = [
    ...POSTERS.slice(scrollIndex),
    ...POSTERS.slice(0, scrollIndex),
  ]

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
        <img src="/logo.png" alt="Archivio Mastrella" style={{ width: 160 }} />
        <BotoneIndietro onClick={onBack} />
      </div>

      {/* ── Stack 3D ── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '42%',
        transform: 'translateX(calc(-50% - 280px)) translateY(calc(-50% + 227px))',
        perspective: '1800px',
        transformStyle: 'preserve-3d',
        width: 260,
        height: 340,
      }}>
        {posterOrdinati.map((poster, stackPos) => {
          const isHovered = hoveredIndex === stackPos
          const tx = stackPos * 80
          const ty = stackPos * -65
          const tz = stackPos * -80
          const baseTransform = `translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateY(-20deg) rotateX(6deg)`
          const transform = isHovered ? `${baseTransform} scale(1.08)` : baseTransform

          return (
            <div
              key={poster.titolo}
              onClick={() => setPosterAperto(poster)}
              onMouseEnter={() => setHoveredIndex(stackPos)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'absolute',
                transformStyle: 'preserve-3d',
                width: 260, height: 340,
                background: poster.bg,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                transform,
                opacity: 1,
                boxShadow: isHovered
                  ? '12px 12px 40px rgba(0,0,0,0.5)'
                  : '4px 6px 20px rgba(0,0,0,0.25)',
                zIndex: isHovered ? 100 : 8 - stackPos,
                padding: '20px 16px',
                boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
            >
              <PosterContent poster={poster} size="small" />
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

      {/* ── Overlay poster aperto ── */}
      {posterAperto !== null && (
        <OverlayPoster
          poster={posterAperto}
          onClose={() => setPosterAperto(null)}
        />
      )}

    </div>
  )
}
