import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const progetti = [
  {
    nome: 'VILLA CEMENTO',
    materiale: 'Cemento armato a vista',
    cardColor: '#91B0D9',
    imgSinistra: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
  },
  {
    nome: 'RESIDENZA PIETRA',
    materiale: 'Pietra naturale locale',
    cardColor: '#C4B49A',
    imgSinistra: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
  {
    nome: 'CASA DEL LINO',
    materiale: 'Lino e materiali naturali',
    cardColor: '#D4C9A8',
    imgSinistra: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    nome: 'STUDIO OTTONE',
    materiale: 'Ottone e vetro',
    cardColor: '#B8956A',
    imgSinistra: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
]

const N = progetti.length

// Luminanza relativa: se < 0.35 il colore è "scuro"
function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35
}

const MENU = ['PROGETTI', 'MATERIOTECA', 'LO STUDIO', 'CONTATTI']
const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

export default function LandingPage({ onEnter }) {
  const colonnaSxRef = useRef()
  const colonnaDxRef = useRef()
  const cardRef = useRef()
  const nomeRef = useRef()
  const materialeRef = useRef()
  const cardLogoRef = useRef()
  const isAnimating = useRef(false)
  const indice = useRef(0)

  // Imposta la posizione iniziale della colonna destra PRIMA del primo paint
  useLayoutEffect(() => {
    gsap.set(colonnaDxRef.current, { y: -(N - 1) * window.innerHeight })
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return

      const delta = e.deltaY > 0 ? 1 : -1
      const next = Math.max(0, Math.min(N - 1, indice.current + delta))
      if (next === indice.current) return
      indice.current = next

      const p = progetti[next]
      const vh = window.innerHeight

      isAnimating.current = true

      // Aggiorna testo e filtro logo immediatamente (fuori da GSAP)
      nomeRef.current.textContent = p.nome
      materialeRef.current.textContent = p.materiale
      if (cardLogoRef.current) {
        cardLogoRef.current.style.filter = isColorDark(p.cardColor) ? 'invert(1)' : 'none'
      }

      // Colonna sinistra: scorre VERSO L'ALTO (y negativo)
      gsap.to(colonnaSxRef.current, {
        y: -next * vh,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => { isAnimating.current = false },
      })

      // Colonna destra: scorre VERSO IL BASSO (immagini in ordine inverso,
      // y va da -(N-1)*vh verso 0 → container si muove in giù)
      gsap.to(colonnaDxRef.current, {
        y: -(N - 1 - next) * vh,
        duration: 1.2,
        ease: 'power2.inOut',
      })

      // Card: anima il colore di sfondo
      gsap.to(cardRef.current, {
        backgroundColor: p.cardColor,
        duration: 0.8,
        ease: 'power2.inOut',
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const p0 = progetti[0]
  const progettiInversi = [...progetti].reverse()

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <img
        src="/logo.png"
        alt="Archivio Mastrella"
        style={{ position: 'fixed', top: 24, left: 32, width: 120, zIndex: 200 }}
      />

      <nav style={{
        position: 'fixed', top: 28, right: 32, zIndex: 200,
        display: 'flex', alignItems: 'center', gap: 40,
      }}>
        {MENU.map((voce) => (
          <button
            key={voce}
            style={{
              fontFamily: archivo, fontSize: 9, fontWeight: 200,
              letterSpacing: '0.3em', color: marrone,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            {voce}
          </button>
        ))}
        <button
          onClick={onEnter}
          style={{
            fontFamily: archivo, fontSize: 9, fontWeight: 200,
            letterSpacing: '0.3em', color: marrone,
            background: 'none',
            border: `0.5px solid ${marrone}`,
            cursor: 'pointer', padding: '5px 12px',
          }}
        >
          NAVIGAZIONE INTERATTIVA
        </button>
      </nav>

      {/* ── Colonna sinistra ── */}
      <div style={{
        position: 'fixed', left: 0, top: 0,
        width: '50vw', height: '100vh', overflow: 'hidden',
      }}>
        <div ref={colonnaSxRef} style={{ willChange: 'transform' }}>
          {progetti.map((p, i) => (
            <div key={i} style={{ width: '100%', height: '100vh' }}>
              <img
                src={p.imgSinistra}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonna destra (immagini in ordine inverso) ── */}
      <div style={{
        position: 'fixed', right: 0, top: 0,
        width: '50vw', height: '100vh', overflow: 'hidden',
      }}>
        <div ref={colonnaDxRef} style={{ willChange: 'transform' }}>
          {progettiInversi.map((p, i) => (
            <div key={i} style={{ width: '100%', height: '100vh' }}>
              <img
                src={p.imgDestra}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Card centrale ── */}
      <div
        ref={cardRef}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          width: 480, padding: '48px 56px',
          backgroundColor: p0.cardColor,
          borderRadius: 0,
          display: 'flex', alignItems: 'center', gap: 28,
        }}
      >
        <img
          ref={cardLogoRef}
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{
            height: 56,
            flexShrink: 0,
            filter: isColorDark(p0.cardColor) ? 'invert(1)' : 'none',
          }}
        />
        <div>
          <div
            ref={nomeRef}
            style={{
              fontFamily: archivo, fontSize: 14, fontWeight: 200,
              letterSpacing: '0.4em', color: marrone,
            }}
          >
            {p0.nome}
          </div>
          <div
            ref={materialeRef}
            style={{
              fontFamily: archivo, fontSize: 11, fontStyle: 'italic',
              color: marrone, opacity: 0.6, marginTop: 5,
            }}
          >
            {p0.materiale}
          </div>
        </div>
      </div>

    </div>
  )
}
