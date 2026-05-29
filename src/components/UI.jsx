import { nodi } from '../data/archivio'

const conta = nodi.reduce((acc, n) => {
  acc[n.tipo] = (acc[n.tipo] || 0) + 1
  return acc
}, {})

const contatore = [
  `${nodi.length} ELEMENTI`,
  `${conta.progetto} PROGETTI`,
  `${conta.persona} PERSONE`,
  `${conta.materiale} MATERIALI`,
].join(' · ')

const FILTRI = ['TUTTI', 'PROGETTI', 'RELAZIONI', 'MATERIALI']

const archivo = "'Archivo', sans-serif"
const oro = '#F2C879'

export default function UI({ filtroAttivo = 'TUTTI', onFiltro, onIndietro }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}>

      {/* Alto sinistra — torna alla landing */}
      <div style={{ position: 'absolute', top: 32, left: 32, pointerEvents: 'auto' }}>
        <button
          onClick={onIndietro}
          style={{
            fontFamily: archivo,
            fontSize: 9,
            fontWeight: 200,
            letterSpacing: '0.3em',
            color: oro,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            opacity: 0.7,
          }}
        >
          ← INDIETRO
        </button>
      </div>

      {/* Alto destra — filtri */}
      <div style={{
        position: 'absolute',
        top: 28,
        right: 32,
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        pointerEvents: 'auto',
      }}>
        {FILTRI.map((f) => (
          <button
            key={f}
            onClick={() => onFiltro?.(f)}
            style={{
              fontFamily: archivo,
              fontSize: 9,
              fontWeight: 200,
              letterSpacing: '0.3em',
              color: oro,
              background: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              border: `0.5px solid ${filtroAttivo === f ? oro : 'transparent'}`,
              opacity: filtroAttivo === f ? 1 : 0.55,
              transition: 'opacity 0.2s, border-color 0.2s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Basso sinistra — contatore */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: 32,
        fontFamily: archivo,
        fontSize: 9,
        fontWeight: 200,
        letterSpacing: '0.15em',
        color: oro,
        opacity: 0.5,
      }}>
        {contatore}
      </div>

      {/* Basso destra — hint navigazione */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 32,
        fontFamily: archivo,
        fontSize: 9,
        fontWeight: 200,
        letterSpacing: '0.15em',
        color: oro,
        opacity: 0.3,
      }}>
        SCROLL PER NAVIGARE · CLICK PER APRIRE
      </div>

    </div>
  )
}
