import { useState, useMemo, useRef, useEffect } from 'react'

const archivo = "'Archivo', sans-serif"
const oro = '#F2C879'
const marrone = '#2F1F11'
const celeste = '#91B0D9'
const logoFilter = 'brightness(0) saturate(100%) invert(72%) sepia(23%) saturate(500%) hue-rotate(180deg)'

const CATEGORIE = ['TUTTI', 'ARCHITETTURA', 'INTERIOR DESIGN', 'EXHIBITION DESIGN', 'PRODUCT DESIGN', 'FORNITORI']

const TIPOLOGIE = ['TUTTI', 'RESIDENZIALE', 'HOSPITALITY', 'UFFICI', 'CULTURALE', 'PUBBLICO']

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
  { id: 1,  titolo: 'PROGETTO 1',          categoria: 'architettura',      anno: '2024', luogo: 'ITALIA',        materiale: 'Cemento',    stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: '/immagini/progetto1-edificio.png' },
  { id: 2,  titolo: 'PROGETTO 2',          categoria: 'architettura',      anno: '2024', luogo: 'ITALIA',        materiale: 'Pietra',     stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: '/immagini/progetto2-edificio.png' },
  { id: 3,  titolo: 'PROGETTO 3',          categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'HOSPITALITY',   img: '/immagini/progetto3-edificio.png' },
  { id: 4,  titolo: 'PROGETTO 4',          categoria: 'architettura',      anno: '2023', luogo: 'EMIRATI ARABI', materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'RESIDENZIALE',  img: '/immagini/progetto4-edificio.png' },
  { id: 5,  titolo: 'PROGETTO 5',          categoria: 'interior design',   anno: '2022', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'UFFICI',       img: '/immagini/progetto5-edificio.png' },
  { id: 6,  titolo: 'PROGETTO 6',          categoria: 'architettura',      anno: '2022', luogo: 'EMIRATI ARABI', materiale: 'Corten',     stato: 'COMPLETATO', tipologia: 'HOSPITALITY',   img: '/immagini/progetto6-edificio.png' },
  { id: 7,  titolo: 'PROGETTO 7',          categoria: 'exhibition design', anno: '2021', luogo: 'ITALIA',        materiale: 'Vetro',      stato: 'COMPLETATO', tipologia: 'CULTURALE',    img: '/immagini/progetto7-edificio.png' },
  { id: 8,  titolo: 'PROGETTO 8',          categoria: 'architettura',      anno: '2021', luogo: 'INDIA',         materiale: 'Travertino', stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: '/immagini/progetto8-edificio.png' },
  { id: 9,  titolo: 'VILLA CEMENTO',       categoria: 'architettura',      anno: '2023', luogo: 'ITALIA',        materiale: 'Cemento',    stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600' },
  { id: 10, titolo: 'RESIDENZA PIETRA',    categoria: 'architettura',      anno: '2022', luogo: 'EMIRATI ARABI', materiale: 'Pietra',     stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  { id: 11, titolo: 'SHOWROOM OTTONE',     categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'HOSPITALITY',   img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { id: 12, titolo: 'PADIGLIONE LEGNO',    categoria: 'exhibition design', anno: '2021', luogo: 'EMIRATI ARABI', materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'CULTURALE',    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600' },
  { id: 13, titolo: 'TAVOLO MARMO',        categoria: 'product design',    anno: '2024', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'RESIDENZIALE',        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
  { id: 14, titolo: 'CORTE CORTEN',        categoria: 'architettura',      anno: '2022', luogo: 'INDIA',         materiale: 'Corten',     stato: 'COMPLETATO', tipologia: 'HOSPITALITY',   img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
  { id: 15, titolo: 'STUDIO LINO',         categoria: 'interior design',   anno: '2023', luogo: 'ITALIA',        materiale: 'Lino',       stato: 'IN CORSO',   tipologia: 'UFFICI',       img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { id: 16, titolo: 'INSTALLAZIONE VETRO', categoria: 'exhibition design', anno: '2024', luogo: 'EMIRATI ARABI', materiale: 'Vetro',      stato: 'CONCEPT',    tipologia: 'CULTURALE',    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600' },
  { id: 17, titolo: 'LAMPADA OTTONE',      categoria: 'product design',    anno: '2021', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'RESIDENZIALE', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600' },
  { id: 18, titolo: 'VILLA TRAVERTINO',    categoria: 'architettura',      anno: '2020', luogo: 'ITALIA',        materiale: 'Travertino', stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600' },
  { id: 19, titolo: 'NEGOZIO MARMO',       categoria: 'interior design',   anno: '2024', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'IN CORSO',   tipologia: 'HOSPITALITY',   img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600' },
  { id: 20, titolo: 'FORNITORE PIETRA',    categoria: 'fornitori',         anno: '2019', luogo: 'ITALIA',        materiale: 'Marmo',      stato: 'COMPLETATO', tipologia: 'PUBBLICO',     img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600' },
  { id: 21, titolo: 'CASA LEGNO',          categoria: 'architettura',      anno: '2021', luogo: 'ITALIA',        materiale: 'Legno',      stato: 'COMPLETATO', tipologia: 'RESIDENZIALE',  img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600' },
  { id: 22, titolo: 'SEDIA CORTEN',        categoria: 'product design',    anno: '2023', luogo: 'ITALIA',        materiale: 'Corten',     stato: 'CONCEPT',    tipologia: 'RESIDENZIALE',        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600' },
  { id: 23, titolo: 'MOSTRA CERAMICA',     categoria: 'exhibition design', anno: '2022', luogo: 'ITALIA',        materiale: 'Ceramica',   stato: 'COMPLETATO', tipologia: 'CULTURALE',    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600' },
  { id: 24, titolo: 'FORNITORE OTTONE',    categoria: 'fornitori',         anno: '2020', luogo: 'ITALIA',        materiale: 'Ottone',     stato: 'COMPLETATO', tipologia: 'PUBBLICO',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
]

function FiltroMateriale({ label, attivo, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: archivo, fontSize: 10, fontWeight: 300,
        color: celeste,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        opacity: attivo || hover ? 1 : 0.6,
        borderBottom: attivo ? `1px solid ${celeste}` : '1px solid transparent',
        paddingBottom: 1,
        transition: 'opacity 0.2s ease',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
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
        fontFamily: archivo, fontSize: 9, fontWeight: 600,
        color: celeste,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        opacity: attivo || hover ? 1 : 0.5,
        borderBottom: attivo ? `1px solid ${celeste}` : '1px solid transparent',
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
          fontFamily: archivo, fontSize: 11, fontWeight: 600,
          color: celeste,
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

function CardLuogo({ progetto }) {
  return (
    <div style={{
      background: '#2F1F11',
      border: '1px solid rgba(145,176,217,0.2)',
      overflow: 'hidden',
    }}>
      <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={progetto.img}
          alt={progetto.titolo}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 600,
          color: '#91B0D9',
        }}>
          {progetto.titolo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 300,
          color: '#91B0D9', opacity: 0.5, marginTop: 6,
        }}>
          {progetto.anno} · {progetto.luogo}
        </div>
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
        border: `1px solid rgba(145,176,217,0.3)`,
        color: celeste, fontSize: 18, cursor: 'pointer',
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
        borderTop: `1px solid rgba(145,176,217,0.2)`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <div style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 600,
          color: celeste,
        }}>
          {progetto.titolo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 300,
          color: celeste, opacity: 0.5, marginTop: 8,
        }}>
          {progetto.anno} · {progetto.luogo}
        </div>
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 300,
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

  const imgBlock = progetto ? (
    <div style={{ width: 280, height: 180, overflow: 'hidden', position: 'relative' }}>
      <img
        src={progetto.img}
        alt={progetto.titolo}
        className="timeline-img"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          border: isSelected ? '1px solid rgba(145,176,217,0.5)' : 'none',
        }}
      />
      {isFuturo && isPlaceholder && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(47,31,17,0.5)',
        }}>
          <span style={{
            fontFamily: archivo, fontSize: 9, fontWeight: 300,
            color: celeste, opacity: 0.5,
          }}>
            IN ARRIVO
          </span>
        </div>
      )}
    </div>
  ) : null

  // isAbove:  [categoria] → [titolo] → [immagine] (immagine più vicina alla linea)
  // !isAbove: [immagine] → [titolo] → [categoria] (immagine più vicina alla linea)
  const projectContent = progetto ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 8, fontWeight: 300, color: celeste, opacity: 0.6,
          textAlign: 'center', width: 280, marginBottom: 4,
        }}>
          {progetto.categoria}
        </div>
      )}
      {isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 600,
          color: celeste, textAlign: 'center',
          width: 280, marginBottom: 8,
        }}>
          {progetto.titolo}
        </div>
      )}
      {imgBlock}
      {!isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 600,
          color: celeste, textAlign: 'center',
          width: 280, marginTop: 8,
        }}>
          {progetto.titolo}
        </div>
      )}
      {!isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 8, fontWeight: 300, color: celeste, opacity: 0.6,
          textAlign: 'center', width: 280, marginTop: 4,
        }}>
          {progetto.categoria}
        </div>
      )}
    </div>
  ) : null

  const annoEl = (
    <div style={{
      fontFamily: archivo,
      fontSize: progetto ? 48 : 10,
      fontWeight: progetto ? 600 : 300,
      color: celeste,
      opacity: progetto ? 1 : 0.3,
      lineHeight: 1, textAlign: 'center',
    }}>
      {anno}
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
      {/* TOP HALF — isAbove: contenuto progetto; !isAbove o vuoto: anno */}
      <div style={{
        flex: 1, width: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 8, boxSizing: 'border-box',
      }}>
        {(progetto && isAbove) ? projectContent : annoEl}
      </div>

      {/* PUNTO */}
      <div style={{
        width: dotSize, height: dotSize, borderRadius: '50%',
        background: isSelected ? '#A64914' : celeste,
        flexShrink: 0, zIndex: 1,
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
      }} />

      {/* FRECCIA */}
      {hasProject && (
        <div style={{
          fontFamily: archivo, fontSize: 8, color: celeste, opacity: 0.5,
          margin: '4px 0', flexShrink: 0, userSelect: 'none',
        }}>
          {isAbove ? '▲' : '▼'}
        </div>
      )}

      {/* BOTTOM HALF — isAbove: anno; !isAbove: contenuto progetto */}
      <div style={{
        flex: 1, width: '100%', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: 8, boxSizing: 'border-box',
      }}>
        {progetto && (isAbove ? annoEl : projectContent)}
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
    background: marrone, border: `1px solid rgba(145,176,217,0.3)`,
    color: celeste, fontSize: 18, cursor: 'pointer', padding: '12px 16px', lineHeight: 1,
  })

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 130px)', background: marrone, border: 'none', width: '100%' }}>
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
          background: marrone,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'stretch', background: marrone }}>
          {/* Linea orizzontale */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
            background: 'linear-gradient(to right, transparent, rgba(145,176,217,0.25) 5%, rgba(145,176,217,0.25) 95%, transparent)',
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

function BubbleMappa({ progetti, onSelectLocation, locationSelezionata }) {
  const [countryPaths, setCountryPaths] = useState([])
  const [hovered, setHovered] = useState(null)
  const W = 960
  const H = 500

  // coordinate pre-calcolate per geoNaturalEarth1 scale=153 translate=[480,250]
  const locations = [
    { nome: 'ITALIA',        x: 510, y: 165, count: progetti.filter(p => p.luogo === 'ITALIA').length },
    { nome: 'EMIRATI ARABI', x: 618, y: 210, count: progetti.filter(p => p.luogo === 'EMIRATI ARABI').length },
    { nome: 'INDIA',         x: 660, y: 240, count: progetti.filter(p => p.luogo === 'INDIA').length },
  ]

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(async data => {
        const [{ feature }, d3] = await Promise.all([
          import('topojson-client'),
          import('d3'),
        ])
        const countries = feature(data, data.objects.countries)
        const projection = d3.geoNaturalEarth1()
          .scale(153)
          .translate([W / 2, H / 2])
        const pathGen = d3.geoPath().projection(projection)
        setCountryPaths(countries.features.map(f => ({ id: f.id, d: pathGen(f) })))
      })
      .catch(err => console.error('BubbleMappa fetch error:', err))
  }, [])

  return (
    <div style={{ width: '100%', height: '65vh', background: '#2F1F11', position: 'relative' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width={W} height={H} fill="#2F1F11" />

        {countryPaths.map((c, i) => (
          <path key={c.id ?? i} d={c.d}
            fill="#2F1F11" stroke="#91B0D9" strokeWidth={0.5} strokeOpacity={0.6} />
        ))}

        {locations.map(loc => {
          const r = Math.max(18, Math.min(45, loc.count * 7))
          const isSelected = locationSelezionata === loc.nome
          const isHover = hovered === loc.nome
          const rEff = isHover ? r * 1.15 : r

          return (
            <g key={loc.nome} style={{ cursor: 'pointer' }}
               onClick={() => onSelectLocation(loc.nome)}
               onMouseEnter={() => setHovered(loc.nome)}
               onMouseLeave={() => setHovered(null)}>
              <circle cx={loc.x} cy={loc.y} r={rEff + 10}
                fill="none" stroke="#91B0D9" strokeWidth={0.5} strokeOpacity={0.2} />
              <circle cx={loc.x} cy={loc.y} r={rEff}
                fill={isSelected ? '#A64914' : '#91B0D9'}
                fillOpacity={isSelected || isHover ? 1 : 0.75}
                stroke="#91B0D9" strokeWidth={1.5}
                style={{ transition: 'all 0.3s ease' }} />
              <text x={loc.x} y={loc.y + 1}
                textAnchor="middle" dominantBaseline="middle"
                fill="#2F1F11" fontSize={28} fontFamily="Archivo" fontWeight="600"
                dominantBaseline="middle" textAnchor="middle"
                style={{ pointerEvents: 'none' }}>
                {loc.count}
              </text>
              <text x={loc.x} y={loc.y - rEff - 10}
                textAnchor="middle" fill="#91B0D9"
                fontSize={8} fontFamily="Archivo" fontWeight="300"
                style={{ pointerEvents: 'none' }}>
                {loc.nome}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

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

export default function ProgettiPage({ filtroAttivo, onBack }) {
  const [categoria, setCategoria] = useState('TUTTI')
  const [filtroSec, setFiltroSec] = useState('tutti')

  const tipoFiltro = TIPO_FILTRO_KEY[filtroAttivo] ?? null
  console.log('[ProgettiPage] filtroAttivo:', filtroAttivo, '→ tipoFiltro:', tipoFiltro)

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
        borderBottom: `1px solid rgba(145,176,217,0.2)`,
      }}>
        <img src="/logo.png" alt="Archivio Mastrella" style={{ width: 140, filter: logoFilter }} />
        <BotoneIndietro onClick={onBack} color={celeste} colorBg={marrone} />
      </div>

      {/* ── Barra filtri ── */}
      <div style={{
        position: 'sticky', top: 65, zIndex: 90,
        background: marrone,
        padding: '20px 40px',
        display: 'flex', flexDirection: 'column', gap: 14,
        borderBottom: `1px solid rgba(145,176,217,0.2)`,
      }}>
        {tipoFiltro === 'materiale' ? (
          /* Filtro materiale: solo voci materiali, nessuna barra categorie */
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {vociSecondarie.map(v => (
              <FiltroMateriale
                key={v}
                label={v}
                attivo={filtroSec === v}
                onClick={() => handleFiltroSec(v)}
              />
            ))}
          </div>
        ) : tipoFiltro === 'tipologia' ? (
          /* Filtro tipologia: voci fisse, nessuna barra categorie */
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {TIPOLOGIE.map(v => (
              <FiltroMateriale
                key={v}
                label={v}
                attivo={filtroSec === (v === 'TUTTI' ? 'tutti' : v)}
                onClick={() => setFiltroSec(v === 'TUTTI' ? 'tutti' : v)}
              />
            ))}
          </div>
        ) : (
          <>
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

            {/* Riga 2 — filtro secondario (non per luogo/anno: gestiti altrove) */}
            {tipoFiltro !== 'anno' && tipoFiltro !== 'luogo' && vociSecondarie.length > 0 && (
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
          </>
        )}
      </div>

      {/* ── Contenuto principale ── */}
      {tipoFiltro === 'anno' ? (
        <div style={{ background: marrone, width: '100%', minHeight: 'calc(100vh - 130px)', border: 'none' }}>
          <TimelineLayout
            progetti={progettiPerTimeline}
            annoSelezionato={filtroSec}
            onSelectAnno={(v) => setFiltroSec(prev => prev === v ? 'tutti' : v)}
          />
        </div>
      ) : tipoFiltro === 'luogo' ? (
        <>
          <BubbleMappa
            progetti={progettiPerTimeline}
            locationSelezionata={filtroSec}
            onSelectLocation={(v) => setFiltroSec(prev => prev === v ? 'tutti' : v)}
          />
          {progettiVisibili.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              padding: 2,
            }}>
              {progettiVisibili.map(p => (
                <CardLuogo key={p.id} progetto={p} />
              ))}
            </div>
          )}
        </>
      ) : progettiVisibili.length === 0 ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '40vh',
          fontFamily: archivo, fontSize: 11, fontWeight: 300,
          color: celeste, opacity: 0.4,
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
