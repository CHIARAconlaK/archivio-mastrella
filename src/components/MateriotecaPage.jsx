const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

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
        <button
          onClick={onBack}
          style={{
            fontFamily: archivo, fontSize: 9, fontWeight: 200,
            letterSpacing: '0.3em', color: marrone,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            opacity: 0.6, marginLeft: 'auto',
          }}
        >
          ← INDIETRO
        </button>
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
