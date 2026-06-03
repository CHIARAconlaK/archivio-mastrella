import { useState, useMemo, useRef, useEffect } from 'react'

const archivo = "'Archivo', sans-serif"
const oro = '#F2C879'
const marrone = '#2F1F11'
const logoFilter = 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)'

const CATEGORIE = ['TUTTI', 'ARCHITETTURA', 'INTERIOR DESIGN', 'EXHIBITION DESIGN', 'PRODUCT DESIGN', 'FORNITORI']

const ANNI = Array.from({ length: 2026 - 1985 + 1 }, (_, i) => 1985 + i)
const ANNO_CORRENTE = 2026

const TIPO_FILTRO_KEY = {
  ANNO: 'anno',
  LUOGO: 'luogo',
  MATERIALE: 'materiale',
  'STATO DI REALIZZAZIONE': 'stato',
  TIPOLOGIA: 'tipologia',
}

const tuttiProgetti = [
  { id: 1,  titolo: 'PROGETTO 1',          categoria: 'architettura',      anno: '2024', luogo: 'ITALIA',        materiale: 'Cemento',    stato: 'COMPLETATO', tipologia: 'Residenziale',  img: '/immagini/progetto1-edificio.png' },
  { id: 2,  titolo: 'PROGETTO 2',          categoria: 'architettura',      anno: '2024', luogo: 'ITALIA',        materiale: 'Pietra',     stato: 'COMPLETATO', tipologia: 'Residenziale',  img: '/immagini/progetto2-edificio.png' },
  { id: 3,  titolo: 'PROGETTO 3',          categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'Commerciale',   img: '/immagini/progetto3-edificio.png' },
  { id: 4,  titolo: 'PROGETTO 4',          categoria: 'architettura',      anno: '2023', luogo: 'EMIRATI ARABI', materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'Residenziale',  img: '/immagini/progetto4-edificio.png' },
  { id: 5,  titolo: 'PROGETTO 5',          categoria: 'interior design',   anno: '2022', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'Ufficio',       img: '/immagini/progetto5-edificio.png' },
  { id: 6,  titolo: 'PROGETTO 6',          categoria: 'architettura',      anno: '2022', luogo: 'EMIRATI ARABI', materiale: 'Corten',     stato: 'COMPLETATO', tipologia: 'Commerciale',   img: '/immagini/progetto6-edificio.png' },
  { id: 7,  titolo: 'PROGETTO 7',          categoria: 'exhibition design', anno: '2021', luogo: 'ITALIA',        materiale: 'Vetro',      stato: 'COMPLETATO', tipologia: 'Espositiva',    img: '/immagini/progetto7-edificio.png' },
  { id: 8,  titolo: 'PROGETTO 8',          categoria: 'architettura',      anno: '2021', luogo: 'INDIA',         materiale: 'Travertino', stato: 'COMPLETATO', tipologia: 'Residenziale',  img: '/immagini/progetto8-edificio.png' },
  { id: 9,  titolo: 'VILLA CEMENTO',       categoria: 'architettura',      anno: '2023', luogo: 'ITALIA',        materiale: 'Cemento',    stato: 'COMPLETATO', tipologia: 'Residenziale',  img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600' },
  { id: 10, titolo: 'RESIDENZA PIETRA',    categoria: 'architettura',      anno: '2022', luogo: 'EMIRATI ARABI', materiale: 'Pietra',     stato: 'COMPLETATO', tipologia: 'Residenziale',  img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  { id: 11, titolo: 'SHOWROOM OTTONE',     categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'Commerciale',   img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { id: 12, titolo: 'PADIGLIONE LEGNO',    categoria: 'exhibition design', anno: '2021', luogo: 'EMIRATI ARABI', materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'Espositiva',    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600' },
  { id: 13, titolo: 'TAVOLO MARMO',        categoria: 'product design',    anno: '2024', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'Arredo',        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
  { id: 14, titolo: 'CORTE CORTEN',        categoria: 'architettura',      anno: '2022', luogo: 'INDIA',         materiale: 'Corten',     stato: 'COMPLETATO', tipologia: 'Commerciale',   img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
  { id: 15, titolo: 'STUDIO LINO',         categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Lino',       stato: 'IN CORSO',   tipologia: 'Ufficio',       img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { id: 16, titolo: 'INSTALLAZIONE VETRO', categoria: 'exhibition design', anno: '2024', luogo: 'EMIRATI ARABI', materiale: 'Vetro',      stato: 'CONCEPT',    tipologia: 'Espositiva',    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600' },
  { id: 17, titolo: 'LAMPADA OTTONE',      categoria: 'product design',    anno: '2021', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'Illuminazione', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600' },
  { id: 18, titolo: 'VILLA TRAVERTINO',    categoria: 'architettura',      anno: '2020', luogo: 'ITALIA',        materiale: 'Travertino', stato: 'COMPLETATO', tipologia: 'Residenziale',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600' },
  { id: 19, titolo: 'NEGOZIO MARMO',       categoria: 'interior design',   anno: '2024', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'Commerciale',   img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600' },
  { id: 20, titolo: 'FORNITORE PIETRA',    categoria: 'fornitori',         anno: '2019', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'COMPLETATO', tipologia: 'Fornitura',     img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' },
  { id: 21, titolo: 'CASA LEGNO',          categoria: 'architettura',      anno: '2021', luogo: 'ITALIA',        materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'Residenziale',  img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600' },
  { id: 22, titolo: 'SEDIA CORTEN',        categoria: 'product design',    anno: '2023', luogo: 'ITALIA',        materiale: 'Corten',     stato: 'CONCEPT',    tipologia: 'Arredo',        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600' },
  { id: 23, titolo: 'MOSTRA CERAMICA',     categoria: 'exhibition design', anno: '2022', luogo: 'ITALIA',        materiale: 'Ceramica',   stato: 'COMPLETATO', tipologia: 'Espositiva',    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600' },
  { id: 24, titolo: 'FORNITORE OTTONE',    categoria: 'fornitori',         anno: '2020', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'Fornitura',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
]

function TimelineAnni({ annoSelezionato, onSelect }) {
  const scrollRef = useRef(null)
  const [visibili, setVisibili] = useState(false)
  const [hoverAnno, setHoverAnno] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setVisibili(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = el.scrollWidth
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft -= e.deltaY * 2
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const scorri = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 5 * 48, behavior: 'smooth' })
  }

  const handleSelect = (anno) => {
    onSelect(anno.toString())
    const el = scrollRef.current
    if (!el) return
    const idx = ANNI.indexOf(anno)
    const targetLeft = idx * 48 - el.clientWidth / 2 + 24
    el.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }

  const frecceStyle = {
    fontFamily: archivo, fontSize: 16, color: oro,
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '0 16px', flexShrink: 0, lineHeight: 1,
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Freccia sinistra — avanti (verso 2026) */}
      <button
        onClick={() => scorri(1)}
        onMouseEnter={e => e.target.style.opacity = 1}
        onMouseLeave={e => e.target.style.opacity = 0.5}
        style={{ ...frecceStyle, opacity: 0.5, transition: 'opacity 0.2s' }}
      >
        ›
      </button>

      {/* Contenitore scrollabile */}
      <div
        ref={scrollRef}
        style={{
          flex: 1, overflowX: 'hidden',
          position: 'relative',
          padding: '0 8px',
          cursor: 'ew-resize',
        }}
      >
        {/* Linea orizzontale */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 21,
          height: 1, background: 'rgba(242, 200, 121, 0.3)',
          pointerEvents: 'none',
        }} />

        {/* Anni */}
        <div style={{ display: 'flex', gap: 42, paddingBottom: 4 }}>
          {ANNI.map((anno, i) => {
            const isSelected = annoSelezionato === anno.toString()
            const isCurrent = anno === ANNO_CORRENTE
            const isHover = hoverAnno === anno
            const showActive = isSelected || isHover

            return (
              <div
                key={anno}
                onClick={() => handleSelect(anno)}
                onMouseEnter={() => setHoverAnno(anno)}
                onMouseLeave={() => setHoverAnno(null)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 8,
                  cursor: 'pointer', flexShrink: 0,
                  opacity: visibili ? 1 : 0,
                  transform: visibili ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.3s ease ${i * 20}ms, transform 0.3s ease ${i * 20}ms`,
                }}
              >
                {/* Punto */}
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', zIndex: 1,
                  background: isCurrent ? 'transparent' : oro,
                  border: isCurrent ? '1.5px solid #A64914' : 'none',
                  opacity: showActive ? 1 : 0.4,
                  transform: isSelected ? 'scale(2)' : isHover ? 'scale(1.5)' : 'scale(1)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }} />
                {/* Anno */}
                <div style={{
                  fontFamily: archivo, fontSize: 9, fontWeight: 200,
                  letterSpacing: '0.2em', color: oro,
                  opacity: showActive ? 1 : 0.4,
                  transition: 'opacity 0.2s ease',
                  userSelect: 'none',
                }}>
                  {anno}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Freccia destra — indietro (verso 1985) */}
      <button
        onClick={() => scorri(-1)}
        onMouseEnter={e => e.target.style.opacity = 1}
        onMouseLeave={e => e.target.style.opacity = 0.5}
        style={{ ...frecceStyle, opacity: 0.5, transition: 'opacity 0.2s' }}
      >
        ‹
      </button>
    </div>
  )
}

function FiltroVoce({ label, attivo, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: archivo, fontSize: 9, fontWeight: 200,
        letterSpacing: '0.3em', color: oro,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        opacity: attivo || hover ? 1 : 0.5,
        borderBottom: attivo ? `1px solid ${oro}` : '1px solid transparent',
        paddingBottom: 1,
        transition: 'opacity 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function ProgettoCard({ progetto }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
    >
      <img
        src={progetto.img}
        alt={progetto.titolo}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: marrone,
        opacity: hover ? 0.6 : 0,
        transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 300,
          letterSpacing: '0.3em', color: oro,
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s ease',
          textAlign: 'center', padding: '0 16px',
        }}>
          {progetto.titolo}
        </span>
      </div>
    </div>
  )
}

function FrecciaTLBtn({ direzione, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute',
        top: '50%', transform: 'translateY(-50%)',
        [direzione === -1 ? 'left' : 'right']: 16,
        zIndex: 10,
        background: hover ? marrone : 'rgba(47,31,17,0.8)',
        border: '1px solid rgba(242,200,121,0.3)',
        color: oro, fontSize: 18, cursor: 'pointer',
        padding: '12px 16px', lineHeight: 1,
        transition: 'background 0.2s ease',
      }}
    >
      {direzione === -1 ? '›' : '‹'}
    </button>
  )
}

function CardTimeline({ progetto, annoSelezionato }) {
  const isHighlighted = !annoSelezionato || annoSelezionato === 'tutti' || progetto.anno === annoSelezionato
  return (
    <div style={{
      width: 320, height: 420, flexShrink: 0,
      opacity: isHighlighted ? 1 : 0.3,
      transition: 'opacity 0.3s ease',
    }}>
      <img
        src={progetto.img}
        alt={progetto.titolo}
        style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        height: 140, background: marrone,
        borderTop: '1px solid rgba(242,200,121,0.2)',
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <div style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 300,
          letterSpacing: '0.3em', color: oro,
        }}>
          {progetto.titolo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 200,
          color: oro, opacity: 0.5, marginTop: 8,
        }}>
          {progetto.anno} · {progetto.luogo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 200,
          color: '#A64914', marginTop: 4,
        }}>
          {progetto.materiale.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

function TimelineProgetti({ progetti, annoSelezionato }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = el.scrollWidth
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft -= e.deltaY * 1.5
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    if (!annoSelezionato || annoSelezionato === 'tutti') return
    const el = scrollRef.current
    if (!el) return
    const idx = progetti.findIndex(p => p.anno === annoSelezionato)
    if (idx === -1) return
    el.scrollTo({ left: idx * 322 - 48, behavior: 'smooth' })
  }, [annoSelezionato, progetti])

  const scorri = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', height: 420 }}>
      <style>{`#tl-progetti::-webkit-scrollbar{display:none}`}</style>
      <FrecciaTLBtn direzione={-1} onClick={() => scorri(1)} />

      <div
        id="tl-progetti"
        ref={scrollRef}
        style={{
          display: 'flex', flexDirection: 'row', gap: 2,
          overflowX: 'auto', scrollbarWidth: 'none',
          padding: '0 48px', height: 420,
        }}
      >
        {progetti.map(p => (
          <CardTimeline key={p.id} progetto={p} annoSelezionato={annoSelezionato} />
        ))}
      </div>

      <FrecciaTLBtn direzione={1} onClick={() => scorri(-1)} />
    </div>
  )
}

function NodoAnno({ anno, progetto, isSelected, isAbove, visibile, delay, onClick }) {
  const hasProject = !!progetto
  const width = hasProject ? 340 : 80
  const dotSize = isSelected ? 14 : (hasProject ? 8 : 4)

  const projectContent = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={progetto.img}
        alt={progetto.titolo}
        style={{
          width: 280, height: 180, objectFit: 'cover', display: 'block',
          border: isSelected ? '1px solid rgba(242,200,121,0.5)' : 'none',
        }}
      />
      <div style={{
        fontFamily: archivo, fontSize: 9, fontWeight: 300,
        letterSpacing: '0.25em', color: oro, textAlign: 'center',
        marginTop: 8, width: 280,
      }}>
        {progetto.titolo}
      </div>
      <div style={{
        fontFamily: archivo, fontSize: 8, color: oro, opacity: 0.5,
        textAlign: 'center', marginTop: 4, width: 280,
      }}>
        {progetto.categoria}
      </div>
    </div>
  )

  return (
    <div
      onClick={onClick}
      style={{
        width, height: '100%', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: hasProject ? 'pointer' : 'default',
        opacity: visibile ? 1 : 0,
        transform: visibile ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      {/* TOP HALF */}
      <div style={{
        flex: 1, width: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 8, boxSizing: 'border-box',
      }}>
        {hasProject && isAbove && projectContent}
        <div style={{
          fontFamily: archivo,
          fontSize: hasProject ? 48 : 10,
          fontWeight: 100,
          color: oro,
          opacity: isSelected ? 1 : (hasProject ? 0.9 : 0.3),
          lineHeight: 1, textAlign: 'center',
          marginTop: hasProject && isAbove ? 8 : 0,
        }}>
          {anno}
        </div>
      </div>

      {/* PUNTO */}
      <div style={{
        width: dotSize, height: dotSize, borderRadius: '50%',
        background: isSelected ? '#A64914' : oro,
        flexShrink: 0, zIndex: 1,
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
      }} />

      {/* FRECCIA */}
      {hasProject && (
        <div style={{
          fontFamily: archivo, fontSize: 8, color: oro, opacity: 0.5,
          margin: '4px 0', flexShrink: 0, userSelect: 'none',
        }}>
          {isAbove ? '▲' : '▼'}
        </div>
      )}

      {/* BOTTOM HALF */}
      <div style={{
        flex: 1, width: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: 8, boxSizing: 'border-box',
      }}>
        {hasProject && !isAbove && projectContent}
      </div>
    </div>
  )
}

function TimelineLayout({ progetti, annoSelezionato, onSelectAnno }) {
  const scrollRef = useRef(null)
  const [visibili, setVisibili] = useState(false)

  const anniTL = useMemo(() => [...ANNI].reverse(), [])

  const progettiPerAnno = useMemo(() => {
    const map = {}
    progetti.forEach(p => {
      if (!map[p.anno]) map[p.anno] = []
      map[p.anno].push(p)
    })
    return map
  }, [progetti])

  const anniConProgetti = useMemo(() =>
    anniTL.filter(a => progettiPerAnno[String(a)]?.length > 0)
  , [anniTL, progettiPerAnno])

  useEffect(() => {
    const t = setTimeout(() => setVisibili(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft -= e.deltaY * 2
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    if (!annoSelezionato || annoSelezionato === 'tutti') return
    const el = scrollRef.current
    if (!el) return
    let left = 0
    for (const a of anniTL) {
      if (String(a) === annoSelezionato) break
      left += progettiPerAnno[String(a)]?.length > 0 ? 340 : 80
    }
    el.scrollTo({ left: Math.max(0, left - el.clientWidth / 2 + 170), behavior: 'smooth' })
  }, [annoSelezionato])

  const scorri = (dir) => scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  const btnStyle = (isLeft) => ({
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [isLeft ? 'left' : 'right']: 8, zIndex: 10,
    background: 'rgba(47,31,17,0.8)', border: '1px solid rgba(242,200,121,0.3)',
    color: oro, fontSize: 18, cursor: 'pointer', padding: '12px 16px', lineHeight: 1,
  })

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 180px)' }}>
      <style>{`#tl-layout::-webkit-scrollbar{display:none}`}</style>
      <button style={btnStyle(true)} onClick={() => scorri(-1)}>‹</button>

      <div
        id="tl-layout"
        ref={scrollRef}
        style={{
          height: '100%', overflowX: 'auto', overflowY: 'hidden',
          scrollbarWidth: 'none', display: 'flex', alignItems: 'stretch',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}>
          {/* Linea orizzontale */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
            background: 'linear-gradient(to right, transparent, rgba(242,200,121,0.5) 5%, rgba(242,200,121,0.5) 95%, transparent)',
            pointerEvents: 'none', zIndex: 0, transform: 'translateY(-0.5px)',
          }} />

          {anniTL.map((anno, i) => {
            const key = String(anno)
            const hasProject = !!progettiPerAnno[key]?.length
            const progetto = hasProject ? progettiPerAnno[key][0] : null
            const isSelected = annoSelezionato === key
            const orderIdx = anniConProgetti.indexOf(anno)
            const isAbove = orderIdx % 2 === 0

            return (
              <NodoAnno
                key={anno}
                anno={anno}
                progetto={progetto}
                isSelected={isSelected}
                isAbove={isAbove}
                visibile={visibili}
                delay={i * 30}
                onClick={() => hasProject && onSelectAnno(key)}
              />
            )
          })}
        </div>
      </div>

      <button style={btnStyle(false)} onClick={() => scorri(1)}>›</button>
    </div>
  )
}

export default function ProgettiPage({ filtroAttivo, onBack }) {
  const [categoria, setCategoria] = useState('TUTTI')
  const [filtroSec, setFiltroSec] = useState('tutti')

  const tipoFiltro = TIPO_FILTRO_KEY[filtroAttivo] ?? null

  const vociSecondarie = useMemo(() => {
    if (!tipoFiltro) return []
    if (tipoFiltro === 'stato') return ['IN CORSO', 'COMPLETATO', 'CONCEPT']
    if (tipoFiltro === 'luogo') return ['ITALIA', 'EMIRATI ARABI', 'INDIA']
    return [...new Set(tuttiProgetti.map(p => p[tipoFiltro]))].sort()
  }, [tipoFiltro])

  const progettiVisibili = useMemo(() => {
    return tuttiProgetti
      .filter(p => categoria === 'TUTTI' || p.categoria === categoria.toLowerCase())
      .filter(p => !tipoFiltro || filtroSec === 'tutti' || p[tipoFiltro] === filtroSec)
  }, [categoria, tipoFiltro, filtroSec])

  // Per la timeline anno: solo filtro categoria, l'anno è gestito via opacity
  const progettiPerTimeline = useMemo(() => {
    return tuttiProgetti.filter(p => categoria === 'TUTTI' || p.categoria === categoria.toLowerCase())
  }, [categoria])

  const handleCategoria = (c) => {
    setCategoria(c)
    setFiltroSec('tutti')
  }

  const handleFiltroSec = (v) => {
    setFiltroSec(prev => prev === v ? 'tutti' : v)
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: marrone, overflowY: 'auto',
    }}>

      {/* ── Header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: marrone,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: `1px solid rgba(242, 200, 121, 0.1)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: archivo, fontSize: 9, fontWeight: 200,
              letterSpacing: '0.3em', color: oro,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              opacity: 0.7,
            }}
          >
            ← INDIETRO
          </button>
          <img src="/logo.png" alt="Archivio Mastrella" style={{ width: 140, filter: logoFilter }} />
        </div>
      </div>

      {/* ── Barra filtri ── */}
      <div style={{
        position: 'sticky', top: 65, zIndex: 90,
        background: marrone,
        padding: '20px 40px',
        display: 'flex', flexDirection: 'column', gap: 14,
        borderBottom: `1px solid rgba(242, 200, 121, 0.1)`,
      }}>
        {/* Riga 1 — categorie */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {CATEGORIE.map(c => (
            <FiltroVoce
              key={c}
              label={c}
              attivo={categoria === c}
              onClick={() => handleCategoria(c)}
            />
          ))}
        </div>

        {/* Riga 2 — timeline anni o filtro secondario */}
        {tipoFiltro === 'anno' && (
          <div style={{
            background: marrone,
            padding: '12px 0',
            borderTop: `1px solid rgba(242, 200, 121, 0.08)`,
          }}>
            <TimelineAnni
              annoSelezionato={filtroSec}
              onSelect={(v) => setFiltroSec(prev => prev === v ? 'tutti' : v)}
            />
          </div>
        )}

        {tipoFiltro !== 'anno' && vociSecondarie.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {vociSecondarie.map(v => (
              <FiltroVoce
                key={v}
                label={v.toUpperCase()}
                attivo={filtroSec === v}
                onClick={() => handleFiltroSec(v)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Timeline layout o griglia ── */}
      {tipoFiltro === 'anno' ? (
        <TimelineLayout
          progetti={progettiPerTimeline}
          annoSelezionato={filtroSec}
          onSelectAnno={(v) => setFiltroSec(prev => prev === v ? 'tutti' : v)}
        />
      ) : progettiVisibili.length === 0 ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '40vh',
          fontFamily: archivo, fontSize: 11, fontWeight: 200,
          letterSpacing: '0.3em', color: oro, opacity: 0.4,
        }}>
          NESSUN PROGETTO TROVATO
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          padding: 2,
        }}>
          {progettiVisibili.map(p => (
            <ProgettoCard key={p.id} progetto={p} />
          ))}
        </div>
      )}

    </div>
  )
}
