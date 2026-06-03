import { useState, useMemo, useRef, useEffect } from 'react'

const archivo = "'Archivo', sans-serif"
const oro = '#F2C879'
const marrone = '#2F1F11'
const logoFilter = 'brightness(0) saturate(100%) invert(83%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(1.05)'

const CATEGORIE = ['TUTTI', 'ARCHITETTURA', 'INTERIOR DESIGN', 'EXHIBITION DESIGN', 'PRODUCT DESIGN', 'FORNITORI']

const ANNI = Array.from({ length: 2026 - 1985 + 1 }, (_, i) => 1985 + i)
const ANNO_CORRENTE = 2026

const placeholders = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
  "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
]

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
      {direzione === -1 ? '‹' : '›'}
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
    el.scrollLeft = 0
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY * 1.5
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
      <FrecciaTLBtn direzione={-1} onClick={() => scorri(-1)} />

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

      <FrecciaTLBtn direzione={1} onClick={() => scorri(1)} />
    </div>
  )
}

function NodoAnno({ anno, progetto, isSelected, isAbove, visibile, delay, onClick }) {
  const isPlaceholder = !!progetto?.isPlaceholder
  const hasProject = !!progetto && !isPlaceholder
  const isFuturo = anno > 2028
  const width = progetto ? 340 : 80
  const dotSize = isSelected ? 14 : (progetto ? 8 : 4)

  const projectContent = progetto ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 280, height: 180, overflow: 'hidden', position: 'relative' }}>
        <img
          src={progetto.img}
          alt={progetto.titolo}
          className="timeline-img"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            border: isSelected ? '1px solid rgba(242,200,121,0.5)' : 'none',
          }}
        />
      </div>
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
  ) : null

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
        {progetto && isAbove && projectContent}
        <div style={{
          fontFamily: archivo,
          fontSize: progetto ? 48 : 10,
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
        {progetto && !isAbove && projectContent}
      </div>
    </div>
  )
}

function TimelineLayout({ progetti, annoSelezionato, onSelectAnno }) {
  const timelineRef = useRef(null)
  const [visibili, setVisibili] = useState(false)

  const anniTL = useMemo(() => [...ANNI], [])

  const progettiPerAnno = useMemo(() => {
    const map = {}
    progetti.forEach(p => {
      if (!map[p.anno]) map[p.anno] = []
      map[p.anno].push(p)
    })
    return map
  }, [progetti])


  useEffect(() => {
    const t = setTimeout(() => setVisibili(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return

    const handleWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()
      el.scrollLeft += e.deltaY + e.deltaX
    }

    el.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [])

  useEffect(() => {
    if (!annoSelezionato || annoSelezionato === 'tutti') return
    const el = timelineRef.current
    if (!el) return
    const idx = anniTL.indexOf(Number(annoSelezionato))
    if (idx === -1) return
    el.scrollTo({ left: Math.max(0, idx * 340 - el.clientWidth / 2 + 170), behavior: 'smooth' })
  }, [annoSelezionato])

  const scorri = (dir) => timelineRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  const btnStyle = (isLeft) => ({
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [isLeft ? 'left' : 'right']: 8, zIndex: 10,
    background: 'rgba(47,31,17,0.8)', border: '1px solid rgba(242,200,121,0.3)',
    color: oro, fontSize: 18, cursor: 'pointer', padding: '12px 16px', lineHeight: 1,
  })

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 180px)' }}>
      <style>{`
        #tl-layout::-webkit-scrollbar { display: none }
        .timeline-img {
          transform: scale(1);
          filter: brightness(1) saturate(1);
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .timeline-img:hover {
          transform: scale(1.08);
          filter: brightness(1.05) saturate(1);
        }
      `}</style>
      <button style={btnStyle(true)} onClick={() => scorri(-1)}>‹</button>

      <div
        id="tl-layout"
        ref={timelineRef}
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
            const hasRealProject = !!progettiPerAnno[key]?.length
            const progetto = hasRealProject
              ? progettiPerAnno[key][0]
              : { img: placeholders[anno % placeholders.length], titolo: 'ARCHIVIO ' + anno, categoria: 'archivio', isPlaceholder: true }
            const isSelected = annoSelezionato === key
            const isAbove = i % 2 === 0

            return (
              <NodoAnno
                key={anno}
                anno={anno}
                progetto={progetto}
                isSelected={isSelected}
                isAbove={isAbove}
                visibile={visibili}
                delay={i * 30}
                onClick={() => hasRealProject && onSelectAnno(key)}
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

        {/* Riga 2 — filtro secondario */}
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
