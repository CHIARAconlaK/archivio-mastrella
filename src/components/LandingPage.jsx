import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const progetti = [
  {
    nome: 'VILLA CEMENTO',
    materiale: 'Cemento armato a vista',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto1-materiale.png',
    imgDestra: '/immagini/progetto1-edificio.png',
  },
  {
    nome: 'RESIDENZA PIETRA',
    materiale: 'Pietra naturale locale',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto2-edificio.png',
    imgDestra: '/immagini/progetto2-materiale.png',
  },
  {
    nome: 'CASA DEL LINO',
    materiale: 'Lino e materiali naturali',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: '/immagini/progetto3-materiale.png',
    imgDestra: '/immagini/progetto3-edificio.png',
  },
  {
    nome: 'STUDIO OTTONE',
    materiale: 'Ottone e vetro',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: '/immagini/progetto4-edificio.png',
    imgDestra: '/immagini/progetto4-materiale.png',
  },
  {
    nome: 'TORRE TRAVERTINO',
    materiale: 'Travertino romano',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto5-materiale.png',
    imgDestra: '/immagini/progetto5-edificio.png',
  },
  {
    nome: 'PADIGLIONE LEGNO',
    materiale: 'Legno massello di rovere',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: '/immagini/progetto6-edificio.png',
    imgDestra: '/immagini/progetto6-materiale.png',
  },
  {
    nome: 'CORTE CORTEN',
    materiale: 'Acciaio corten ossidato',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: '/immagini/progetto7-materiale.png',
    imgDestra: '/immagini/progetto7-edificio.png',
  },
  {
    nome: 'CASA MARMO',
    materiale: 'Marmo di Carrara',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto8-edificio.png',
    imgDestra: '/immagini/progetto8-materiale.png',
  },
]

const N = progetti.length

const MENU = ['LO STUDIO', 'PROGETTI', 'MATERIOTECA', 'COLLABORATORI', 'CALENDARIO', 'CONTATTI']
const LINGUE = ['ITA', 'ENG', 'عربي']
const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

function DropdownVoce({ label, onSelect }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={() => onSelect(label)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "'Archivo', sans-serif", fontSize: 10,
        fontWeight: hover ? 400 : 300,
        letterSpacing: '0.35em', color: '#F2C879',
        textTransform: 'uppercase',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 0, textAlign: 'left',
        opacity: hover ? 1 : 0.85,
        transition: 'opacity 0.2s ease, font-weight 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

export default function LandingPage({ onEnter, onOpenProgetti, onOpenStudio, onOpenContatti }) {
  const colonnaSxRef = useRef()
  const colonnaDxRef = useRef()
  const cardRef = useRef()
  const nomeRef = useRef()
  const materialeRef = useRef()
  const cardLogoRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lingua, setLingua] = useState('IT')
  const [hoverVoce, setHoverVoce] = useState(null)
  const [hoverCalendario, setHoverCalendario] = useState(false)
  const [dropdownAperto, setDropdownAperto] = useState(false)
  const dropdownRef = useRef(null)
  const hasMounted = useRef(false)
  const editorialeRef = useRef(false)
  const pannelloRef = useRef()
  const contenutoEditorialeRef = useRef()
  const immagineMaterialeRef = useRef()
  const [editoriale, setEditoriale] = useState(false)
  const containerSxRef = useRef()
  const containerDxRef = useRef()
  const overlayImgRef = useRef()
  const immagineModeRef = useRef(false)
  const colonnaClickataRef = useRef(null)
  const [immagineMode, setImmagineMode] = useState(false)

  useLayoutEffect(() => {
    gsap.set(colonnaDxRef.current, { y: -(N - 1) * window.innerHeight })
    gsap.set(pannelloRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(contenutoEditorialeRef.current, { opacity: 0 })
    gsap.set(immagineMaterialeRef.current, { opacity: 0, scale: 1.2 })
    gsap.set(overlayImgRef.current, { opacity: 0 })
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

  useEffect(() => { editorialeRef.current = editoriale }, [editoriale])

  const handleCardClick = () => {
    handleImmagineClick()
  }

  const handleChiudi = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setEditoriale(false)
        gsap.to(cardRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      },
    })
    tl.to(contenutoEditorialeRef.current, { opacity: 0, y: 10, duration: 0.3 })
    tl.to(pannelloRef.current, {
      scaleX: 0, transformOrigin: 'left center',
      duration: 0.4, ease: 'power2.inOut',
    })
  }

  const handleImmagineClick = () => {
    if (immagineModeRef.current || editorialeRef.current) return
    immagineModeRef.current = true
    setImmagineMode(true)

    // Indice PARI  → sinistra=materiale, destra=edificio
    // Indice DISPARI → sinistra=edificio, destra=materiale
    const edificioIsLeft = currentIndex % 2 !== 0
    colonnaClickataRef.current = edificioIsLeft ? 'sx' : 'dx'

    const vw = window.innerWidth
    const vh = window.innerHeight
    const cEdificio = edificioIsLeft ? containerSxRef.current : containerDxRef.current
    const cMateriale = edificioIsLeft ? containerDxRef.current : containerSxRef.current
    const p = progetti[currentIndex]

    // Normalizza entrambe a left-based prima di animare
    gsap.set(cEdificio, { left: edificioIsLeft ? 0 : vw / 2, right: 'auto', top: 0, width: vw / 2, height: vh })
    gsap.set(cMateriale, { left: edificioIsLeft ? vw / 2 : 0, right: 'auto', top: 0, width: vw / 2, height: vh, zIndex: 'auto' })
    gsap.set(cMateriale, { padding: 8, boxSizing: 'border-box', backgroundColor: p.cardBg, outline: `1px solid ${p.cardBg}` })

    const tl = gsap.timeline()
    tl.to(cardRef.current, { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
    tl.to(cEdificio, { left: 0, width: vw, duration: 0.7, ease: 'power2.inOut' }, '<')
    tl.to(cMateriale, {
      left: 48, top: vh - 280 - 48,
      width: 280, height: 280, zIndex: 50,
      duration: 0.7, ease: 'power2.inOut',
    }, '<')
    tl.fromTo(overlayImgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  }

  const handleChiudiImmagine = () => {
    const isLeft = colonnaClickataRef.current === 'sx'
    const vw = window.innerWidth
    const vh = window.innerHeight
    const cEdificio = isLeft ? containerSxRef.current : containerDxRef.current
    const cMateriale = isLeft ? containerDxRef.current : containerSxRef.current

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([containerSxRef.current, containerDxRef.current], { clearProps: 'all' })
        gsap.to(cardRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
        setImmagineMode(false)
        immagineModeRef.current = false
      },
    })
    tl.to(overlayImgRef.current, { opacity: 0, duration: 0.25 })
    tl.to(cMateriale, {
      left: isLeft ? vw / 2 : 0, top: 0,
      width: vw / 2, height: vh, zIndex: 0,
      duration: 0.6, ease: 'power2.inOut',
    })
    tl.to(cEdificio, { left: isLeft ? 0 : vw / 2, width: vw / 2, duration: 0.6, ease: 'power2.inOut' }, '<')
  }

  // Listener wheel e touch
  const isScrolling = useRef(false)

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    if (isScrolling.current || editorialeRef.current || immagineModeRef.current) return
    isScrolling.current = true
    if (e.deltaY > 0) {
      setCurrentIndex(prev => Math.min(prev + 1, progetti.length - 1))
    } else {
      setCurrentIndex(prev => Math.max(prev - 1, 0))
    }
    setTimeout(() => { isScrolling.current = false }, 1400)
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  useEffect(() => {
    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40 && !isScrolling.current && !editorialeRef.current && !immagineModeRef.current) {
        isScrolling.current = true
        setCurrentIndex(prev => delta > 0 ? Math.min(prev + 1, progetti.length - 1) : Math.max(prev - 1, 0))
        setTimeout(() => { isScrolling.current = false }, 1200)
      }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAperto(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const p0 = progetti[0]
  const progettiInversi = [...progetti].reverse()

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px',
        background: 'rgba(145, 176, 217, 0.15)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxSizing: 'border-box',
      }}>
        <img
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{ width: 160 }}
        />

        <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {MENU.filter(v => v !== 'CALENDARIO').map((voce) => {
            if (voce === 'PROGETTI') {
              return (
                <div key={voce} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setDropdownAperto(p => !p)}
                    onMouseEnter={() => setHoverVoce(voce)}
                    onMouseLeave={() => setHoverVoce(null)}
                    style={{
                      fontFamily: archivo, fontSize: 11, fontWeight: 400,
                      letterSpacing: '0.25em', color: marrone,
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      borderBottom: hoverVoce === voce ? `0.5px solid ${marrone}` : '0.5px solid transparent',
                      transition: 'border-color 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    PROGETTI
                    <span style={{ fontSize: 8, lineHeight: 1 }}>
                      {dropdownAperto ? '▴' : '▾'}
                    </span>
                  </button>

                  {dropdownAperto && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 16px)', left: 0,
                      background: '#2F1F11',
                      padding: '20px 28px',
                      display: 'flex', flexDirection: 'column', gap: 14,
                      minWidth: 220,
                      zIndex: 300,
                    }}>
                      {['ANNO', 'LUOGO', 'MATERIALE', 'STATO DI REALIZZAZIONE', 'TIPOLOGIA'].map((filtro) => (
                        <DropdownVoce
                          key={filtro}
                          label={filtro}
                          onSelect={(f) => { setDropdownAperto(false); onOpenProgetti(f) }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <button
                key={voce}
                onClick={voce === 'LO STUDIO' ? onOpenStudio : voce === 'CONTATTI' ? onOpenContatti : undefined}
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
            )
          })}

          {/* CALENDARIO — voce distinta */}
          <button
            onClick={onEnter}
            onMouseEnter={() => setHoverCalendario(true)}
            onMouseLeave={() => setHoverCalendario(false)}
            style={{
              fontFamily: archivo, fontSize: 11, fontWeight: 400,
              letterSpacing: '0.25em',
              color: hoverCalendario ? '#91B0D9' : marrone,
              background: hoverCalendario ? marrone : 'transparent',
              border: `1.5px solid ${marrone}`,
              cursor: 'pointer', padding: '9px 22px',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            CALENDARIO
          </button>

        </nav>
      </div>

      {/* ── Colonna sinistra ── */}
      <div
        ref={containerSxRef}
        onClick={handleImmagineClick}
        style={{ position: 'fixed', left: 0, top: 0, width: '50vw', height: '100vh', overflow: 'hidden', cursor: 'pointer' }}
      >
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
      <div
        ref={containerDxRef}
        onClick={handleImmagineClick}
        style={{ position: 'fixed', right: 0, top: 0, width: '50vw', height: '100vh', overflow: 'hidden', cursor: 'pointer' }}
      >
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
        onClick={handleCardClick}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          width: 600, padding: '56px 72px',
          backgroundColor: p0.cardBg,
          borderRadius: 0,
          display: 'flex', alignItems: 'center', gap: 36,
          cursor: 'pointer',
        }}
      >
        <img
          ref={cardLogoRef}
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{ height: 72, flexShrink: 0, filter: p0.logoFilter }}
        />
        <div>
          <div
            ref={nomeRef}
            style={{
              fontFamily: archivo, fontSize: 18, fontWeight: 200,
              letterSpacing: '0.5em', color: p0.accent,
            }}
          >
            {p0.nome}
          </div>
          <div
            ref={materialeRef}
            style={{
              fontFamily: archivo, fontSize: 13, fontStyle: 'italic',
              letterSpacing: '0.3em', color: p0.accent, marginTop: 5,
            }}
          >
            {p0.materiale}
          </div>
        </div>
      </div>

      {/* ── Overlay immagine: testi + chiudi ── */}
      <div
        ref={overlayImgRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 155,
          pointerEvents: 'none',
        }}
      >
        {/* Testi bottom-right */}
        <div style={{
          position: 'absolute', bottom: 80, right: 48,
          textAlign: 'right',
        }}>
          <div style={{
            fontFamily: archivo, fontSize: 72, fontWeight: 100,
            letterSpacing: '0.05em', color: 'white', opacity: 0.9,
            lineHeight: 1,
          }}>
            {progetti[currentIndex].nome}
          </div>
          <div style={{
            fontFamily: archivo, fontSize: 12, fontWeight: 200,
            letterSpacing: '0.3em', color: 'white', opacity: 0.6,
            marginTop: 14, textTransform: 'uppercase',
          }}>
            {progetti[currentIndex].materiale}
          </div>
        </div>

        {/* Bottone chiudi X */}
        <button
          onClick={handleChiudiImmagine}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
          style={{
            position: 'absolute', top: 32, right: 32,
            pointerEvents: 'auto',
            fontFamily: archivo, fontSize: 24, fontWeight: 100,
            color: 'white', background: 'none', border: 'none',
            cursor: 'pointer', opacity: 0.7,
            lineHeight: 1, padding: '4px 8px',
            transition: 'opacity 0.2s ease',
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Pannello editoriale (split-screen wipe) ── */}
      <div
        ref={pannelloRef}
        style={{
          position: 'fixed', top: 0, left: '50vw',
          width: '50vw', height: '100vh',
          backgroundColor: progetti[currentIndex].cardBg,
          zIndex: 150,
        }}
      >
        <div
          ref={contenutoEditorialeRef}
          style={{
            height: '100%',
            display: 'flex', flexDirection: 'column',
            padding: '96px 40px 48px',
            boxSizing: 'border-box',
          }}
        >
          {/* Immagine materiale come card */}
          <div style={{ overflow: 'hidden', width: '80%', margin: '0 auto' }}>
            <img
              ref={immagineMaterialeRef}
              src={progetti[currentIndex].imgSinistra}
              alt=""
              style={{
                width: '100%', aspectRatio: '4/3',
                objectFit: 'cover', display: 'block',
              }}
            />
          </div>

          {/* Testi */}
          <div style={{ marginTop: 40, paddingLeft: 4 }}>
            <div style={{
              fontFamily: archivo,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 100,
              letterSpacing: '0.1em',
              color: progetti[currentIndex].accent,
              lineHeight: 1.1,
            }}>
              {progetti[currentIndex].nome}
            </div>
            <div style={{
              fontFamily: archivo, fontSize: 11, fontWeight: 200,
              letterSpacing: '0.3em',
              color: progetti[currentIndex].accent,
              opacity: 0.6,
              marginTop: 16,
              textTransform: 'uppercase',
            }}>
              {progetti[currentIndex].materiale}
            </div>
          </div>

          {/* Bottone CHIUDI */}
          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={handleChiudi}
              style={{
                fontFamily: archivo, fontSize: 9, fontWeight: 200,
                letterSpacing: '0.3em',
                color: progetti[currentIndex].accent,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                opacity: 0.7,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
            >
              ← CHIUDI
            </button>
          </div>
        </div>
      </div>

      {/* ── Selettore lingua ── */}
      <div style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 200,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        {LINGUE.map((l) => {
          const isArabo = l === 'عربي'
          const isAttiva = l === lingua
          return (
            <button
              key={l}
              onClick={() => setLingua(l)}
              dir={isArabo ? 'rtl' : undefined}
              style={{
                fontFamily: archivo,
                fontSize: isArabo ? 13 : 11,
                fontWeight: 400,
                letterSpacing: '0.2em', color: marrone,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                borderBottom: isAttiva ? `1px solid ${marrone}` : '1px solid transparent',
                paddingBottom: 1,
                transition: 'border-color 0.2s ease',
              }}
            >
              {l}
            </button>
          )
        })}
      </div>

    </div>
  )
}
