import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const progetti = [
  {
    nome: 'STUDIO MASTRELLA',
    materiale: 'mattoni a vista', luogo: 'Anzio, Italia', anno: '2013',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto1-materiale.png',
    imgDestra: '/immagini/progetto1-edificio.png',
  },
  {
    nome: 'UFFICIO AZIENDALE',
    materiale: 'marmo bardiglio nuvolato', luogo: 'SURAT, INDIA', anno: '2021',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto2-edificio.png',
    imgDestra: '/immagini/progetto2-materiale.png',
  },
  {
    nome: 'VILLA A PALM JUMEIRAH',
    materiale: 'travertino romano', luogo: 'Palm Jumeirah, Dubai', anno: '2019',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: '/immagini/progetto3-materiale.png',
    imgDestra: '/immagini/progetto3-edificio.png',
  },
  {
    nome: 'VILLA A PALM JUMEIRAH',
    materiale: 'cemento armato a vista', luogo: 'Palm Jumeirah, Dubai', anno: '2022',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: '/immagini/progetto4-edificio.png',
    imgDestra: '/immagini/progetto4-materiale.png',
  },
  {
    nome: 'VILLA A PALM JUMEIRAH',
    materiale: 'teak burma', luogo: 'Palm Jumeirah, Dubai', anno: '2022',
    cardBg: '#F2C879', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto5-materiale.png',
    imgDestra: '/immagini/progetto5-edificio.png',
  },
  {
    nome: 'VILLA IN ANZIO',
    materiale: 'mattoni faccia a vista', luogo: 'Anzio, Roma, Italia', anno: '2000',
    cardBg: '#2F1F11', accent: '#91B0D9', logoFilter: 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(800%) hue-rotate(180deg)',
    imgSinistra: '/immagini/progetto6-edificio.png',
    imgDestra: '/immagini/progetto6-materiale.png',
  },
  {
    nome: 'CORTE CORTEN',
    materiale: 'Acciaio corten ossidato', luogo: '', anno: '2021',
    cardBg: '#A64914', accent: '#F2C879', logoFilter: 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)',
    imgSinistra: '/immagini/progetto7-materiale.png',
    imgDestra: '/immagini/progetto7-edificio.png',
  },
  {
    nome: 'CASA MARMO',
    materiale: 'Marmo di Carrara', luogo: '', anno: '2024',
    cardBg: '#91B0D9', accent: '#2F1F11', logoFilter: 'none',
    imgSinistra: '/immagini/progetto8-edificio.png',
    imgDestra: '/immagini/progetto8-materiale.png',
  },
]

const N = progetti.length

const MENU = ['MATERIOTECA', 'ARCHIVIO', 'COLLABORATORI', 'LO STUDIO', 'CONTATTI', 'CALENDARIO']
const LINGUE = ['ITA', 'ENG', 'عربي']
const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function DropdownVoce({ label, onSelect }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={() => onSelect(label)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "'Archivo', sans-serif", fontSize: 10,
        fontWeight: 600,
        color: '#91B0D9',
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

export default function LandingPage({ onEnter, onOpenProgetti, onOpenStudio, onOpenMaterioteca, onOpenContatti, onOpenCalendario }) {
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
  const [cardAperta, setCardAperta] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const cardApertaRef = useRef(false)

  useLayoutEffect(() => {
    gsap.set(colonnaDxRef.current, { y: -(N - 1) * window.innerHeight })
    gsap.set(pannelloRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(contenutoEditorialeRef.current, { opacity: 0 })
    gsap.set(immagineMaterialeRef.current, { opacity: 0, scale: 1.2 })
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
  useEffect(() => { cardApertaRef.current = cardAperta }, [cardAperta])

  const apriCard = () => {
    setCardAperta(true)
    setTimeout(() => setCardVisible(true), 10)
  }

  const chiudiCard = () => {
    setCardVisible(false)
    setTimeout(() => setCardAperta(false), 400)
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

  // Listener wheel e touch
  const isScrolling = useRef(false)

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    if (isScrolling.current || editorialeRef.current || cardApertaRef.current) return
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
      if (Math.abs(delta) > 40 && !isScrolling.current && !editorialeRef.current && !cardApertaRef.current) {
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
            if (voce === 'ARCHIVIO') {
              return (
                <div key={voce} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setDropdownAperto(p => !p)}
                    onMouseEnter={() => setHoverVoce(voce)}
                    onMouseLeave={() => setHoverVoce(null)}
                    style={{
                      fontFamily: archivo, fontSize: 11, fontWeight: 600,
                      color: marrone,
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      borderBottom: hoverVoce === voce ? `0.5px solid ${marrone}` : '0.5px solid transparent',
                      transition: 'border-color 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    ARCHIVIO
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
                      {['MATERIALE', 'ANNO', 'LUOGO', 'TIPOLOGIA'].map((filtro) => (
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
                onClick={voce === 'LO STUDIO' ? onOpenStudio : voce === 'MATERIOTECA' ? onOpenMaterioteca : voce === 'CONTATTI' ? onOpenContatti : undefined}
                onMouseEnter={() => setHoverVoce(voce)}
                onMouseLeave={() => setHoverVoce(null)}
                style={{
                  fontFamily: archivo, fontSize: 11, fontWeight: 600,
                  color: marrone,
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
            onClick={onOpenCalendario}
            onMouseEnter={() => setHoverCalendario(true)}
            onMouseLeave={() => setHoverCalendario(false)}
            style={{
              fontFamily: archivo, fontSize: 11, fontWeight: 600,
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
        onClick={apriCard}
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
        onClick={apriCard}
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
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          width: 600, padding: '56px 72px',
          backgroundColor: p0.cardBg,
          borderRadius: 0,
          display: 'flex', alignItems: 'center', gap: 36,
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
              fontFamily: archivo, fontSize: 18, fontWeight: 600,
              color: p0.accent,
            }}
          >
            {p0.nome}
          </div>
          <div
            ref={materialeRef}
            style={{
              fontFamily: archivo, fontSize: 13, fontWeight: 300,
              color: p0.accent, marginTop: 5,
            }}
          >
            {p0.materiale}
          </div>
        </div>
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
              fontWeight: 600,
              color: progetti[currentIndex].accent,
              lineHeight: 1.1,
            }}>
              {progetti[currentIndex].nome}
            </div>
            <div style={{
              fontFamily: archivo, fontSize: 11, fontWeight: 300,
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
                fontFamily: archivo, fontSize: 9, fontWeight: 300,
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

      {/* ── ProjectCard overlay ── */}
      {cardAperta && (() => {
        const p = progetti[currentIndex]
        const edificioIsLeft = currentIndex % 2 !== 0
        const imgEdificio = edificioIsLeft ? p.imgSinistra : p.imgDestra
        const imgMateriale = edificioIsLeft ? p.imgDestra : p.imgSinistra
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex' }}>
            {/* Colonna sinistra: edificio */}
            <div style={{
              width: '60vw', height: '100vh', overflow: 'hidden', flexShrink: 0,
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? 'scale(1)' : 'scale(1.03)',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <img src={imgEdificio} alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'default' }} />
            </div>

            {/* Colonna destra: info */}
            <div style={{
              width: '40vw', height: '100vh', flexShrink: 0, boxSizing: 'border-box',
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? 'translateX(0)' : 'translateX(100%)',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: cardVisible ? 'all' : 'none',
              backgroundColor: p.cardBg,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              padding: '64px 48px',
            }}>
              {/* Top: logo */}
              <img src="/logo.png" alt="" style={{ width: 120, filter: p.logoFilter }} />

              {/* Centro: immagine materiale */}
              <div>
                <img src={imgMateriale} alt="" style={{
                  width: 220, height: 220, objectFit: 'cover', display: 'block',
                  border: `1px solid ${hexToRgba(marrone, 0.4)}`,
                }} />
                <div style={{
                  fontFamily: archivo, fontSize: 14, fontWeight: 300,
                  color: marrone, marginTop: 12,
                }}>MATERIALE</div>
              </div>

              {/* Basso: testi + chiudi */}
              <div>
                <div style={{
                  fontFamily: archivo, fontSize: 52, fontWeight: 600,
                  lineHeight: 1, color: marrone,
                }}>{p.nome}</div>
                <div style={{
                  fontFamily: archivo, fontSize: 14, fontWeight: 300,
                  color: marrone,
                  marginTop: 16, textTransform: 'uppercase',
                }}>{p.materiale}</div>
                <div style={{
                  fontFamily: archivo, fontSize: 14, fontWeight: 300,
                  color: marrone, marginTop: 8,
                }}>{p.anno}</div>
                {p.luogo ? (
                  <div style={{
                    fontFamily: archivo, fontSize: 14, fontWeight: 300,
                    color: marrone, marginTop: 8,
                  }}>{p.luogo}</div>
                ) : null}
                <button
                  onClick={chiudiCard}
                  style={{
                    marginTop: 32, fontFamily: archivo, fontSize: 11, fontWeight: 600,
                    color: marrone,
                    background: 'none', border: `1px solid ${marrone}`, cursor: 'pointer',
                    padding: '10px 24px',
                  }}
                >← CHIUDI</button>
              </div>
            </div>
          </div>
        )
      })()}

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
                fontWeight: 600,
                color: marrone,
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
