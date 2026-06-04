import { useState } from 'react'

const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'
const celeste = '#91B0D9'

function BotoneIndietro({ onClick, color, colorBg, style }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: archivo, fontSize: 12, fontWeight: 600,
        letterSpacing: '0.3em',
        color: hover ? colorBg : color,
        background: hover ? color : 'transparent',
        border: `1px solid ${color}`,
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      ← INDIETRO
    </button>
  )
}

export default function MateriotecaPage({ onBack }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>

      {/* ── Header ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 32px',
        boxSizing: 'border-box',
      }}>
        <img
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{ width: 140 }}
        />
        <BotoneIndietro onClick={onBack} color={marrone} colorBg={celeste} />
      </div>

      {/* ── Immagine fullscreen ── */}
      <img
        src="/materioteca/01.jpeg"
        alt=""
        style={{ width: '100vw', height: '100vh', objectFit: 'cover', display: 'block' }}
      />

    </div>
  )
}
