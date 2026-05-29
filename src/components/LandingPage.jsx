import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const progetti = [
  {
    nome: 'VILLA CEMENTO',
    materiale: 'Cemento armato a vista',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
  },
  {
    nome: 'RESIDENZA PIETRA',
    materiale: 'Pietra naturale locale',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
  {
    nome: 'CASA DEL LINO',
    materiale: 'Lino e materiali naturali',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    nome: 'STUDIO OTTONE',
    materiale: 'Ottone e vetro',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
  {
    nome: 'TORRE TRAVERTINO',
    materiale: 'Travertino romano',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  },
  {
    nome: 'PADIGLIONE LEGNO',
    materiale: 'Legno massello di rovere',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
  },
  {
    nome: 'CORTE CORTEN',
    materiale: 'Acciaio corten ossidato',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600585154526-990dced4db3d?w=800',
  },
  {
    nome: 'CASA MARMO',
    materiale: 'Marmo di Carrara',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    imgDestra: 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?w=800',
  },
]

const N = progetti.length

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    gsap.set(colonnaDxRef.current, { y: -(N - 1) * window.innerHeight })
  }, [])

  // Animazioni GSAP al cambio di progetto (salta il mount iniziale)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    const p = progetti[currentIndex]
    const vh = window.innerHeight

    nomeRef.current.textContent = p.nome
    nomeRef.current.style.color = p.accent
    materialeRef.current.textContent = p.materiale
    materialeRef.current.style.color = p.accent
    cardLogoRef.current.style.filter = p.logoFilter

    gsap.to(colonnaSxRef.current, { y: -currentIndex * vh, duration: 1.2, ease: 'power2.inOut' })
    gsap.to(colonnaDxRef.current, { y: -(N - 1 - currentIndex) * vh, duration: 1.2, ease: 'power2.inOut' })
    gsap.to(cardRef.current, { backgroundColor: p.cardBg, duration: 0.8, ease: 'power2.inOut' })
  }, [currentIndex])

  // Listener wheel e touch
  useEffect(() => {
    let isScrolling = false

    const handleWheel = (e) => {
      e.preventDefault()
      if (isScrolling) return

      isScrolling = true

      if (e.deltaY > 0) {
        setCurrentIndex(prev => Math.min(prev + 1, N - 1))
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
      }

      setTimeout(() => { isScrolling = false }, 1200)
    }

    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40 && !isScrolling) {
        isScrolling = true
        setCurrentIndex(prev => delta > 0 ? Math.min(prev + 1, N - 1) : Math.max(prev - 1, 0))
        setTimeout(() => { isScrolling = false }, 1200)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
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
      <div style={{ position: 'fixed', left: 0, top: 0, width: '50vw', height: '100vh', overflow: 'hidden' }}>
        <div ref={colonnaSxRef} style={{ willChange: 'transform' }}>
          {progetti.map((p, i) => (
            <div key={i} style={{ width: '100%', height: '100vh' }}>
              <img src={p.imgSinistra} alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonna destra (stack inverso) ── */}
      <div style={{ position: 'fixed', right: 0, top: 0, width: '50vw', height: '100vh', overflow: 'hidden' }}>
        <div ref={colonnaDxRef} style={{ willChange: 'transform' }}>
          {progettiInversi.map((p, i) => (
            <div key={i} style={{ width: '100%', height: '100vh' }}>
              <img src={p.imgDestra} alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
          backgroundColor: p0.cardBg,
          borderRadius: 0,
          display: 'flex', alignItems: 'center', gap: 28,
        }}
      >
        <img
          ref={cardLogoRef}
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{ height: 56, flexShrink: 0, filter: p0.logoFilter }}
        />
        <div>
          <div
            ref={nomeRef}
            style={{
              fontFamily: archivo, fontSize: 14, fontWeight: 200,
              letterSpacing: '0.4em', color: p0.accent,
            }}
          >
            {p0.nome}
          </div>
          <div
            ref={materialeRef}
            style={{
              fontFamily: archivo, fontSize: 11, fontStyle: 'italic',
              color: p0.accent, marginTop: 5,
            }}
          >
            {p0.materiale}
          </div>
        </div>
      </div>

    </div>
  )
}
