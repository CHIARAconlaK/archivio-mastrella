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

const timelineImmagini = [
  '/timeline/IMG_7589.JPG',  // 0  mattone
  '/timeline/IMG_7580.JPG',  // 1  legno noce
  '/timeline/IMG_7570.JPG',  // 2  marmo rosso
  '/timeline/IMG_7604.JPG',  // 3  zinco
  '/timeline/IMG_7619.JPG',  // 4  intonaco
  '/timeline/IMG_7581.JPG',  // 5  teak
  '/timeline/IMG_7571.JPG',  // 6  marmo verde
  '/timeline/IMG_7605.JPG',  // 7  corten
  '/timeline/IMG_7621.JPG',  // 8  lino
  '/timeline/IMG_7607.JPG',  // 9  rovere
  '/timeline/IMG_7572.JPG',  // 10 onice
  '/timeline/IMG_7601.JPG',  // 11 rame
  '/timeline/IMG_7620.JPG',  // 12 stucco
  '/timeline/IMG_7608.JPG',  // 13 wenge
  '/timeline/IMG_7573.JPG',  // 14 marmo nero
  '/timeline/IMG_7599.JPG',  // 15 vetro satinato
  '/timeline/IMG_7623.JPG',  // 16 rafia
  '/timeline/IMG_7609.JPG',  // 17 iroko
  '/timeline/IMG_7574.JPG',  // 18 agata
  '/timeline/IMG_7602.JPG',  // 19 ottone brunito
  '/timeline/IMG_7618.JPG',  // 20 pietra grigia
  '/timeline/IMG_7610.JPG',  // 21 mogano
  '/timeline/IMG_7575.JPG',  // 22 marmo arabescato
  '/timeline/IMG_7582.JPG',  // 23 acciaio
  '/timeline/IMG_7624.JPG',  // 24 pietra bianca
  '/timeline/IMG_7611.JPG',  // 25 ciliegio
  '/timeline/IMG_7576.JPG',  // 26 lapislazzuli
  '/timeline/IMG_7603.JPG',  // 27 rame ossidato
  '/timeline/IMG_7625.JPG',  // 28 travertino
  '/timeline/IMG_7612.JPG',  // 29 pino
  '/timeline/IMG_7577.JPG',  // 30 malachite
  '/timeline/IMG_7586.JPG',  // 31 vetro
  '/timeline/IMG_7626.JPG',  // 32 stucco 2
  '/timeline/IMG_7613.JPG',  // 33 bambù
  '/timeline/IMG_7578.JPG',  // 34 quarzo rosa
  '/timeline/IMG_7584.JPG',  // 35 pietra grigia
  '/timeline/IMG_7627.JPG',  // 36 pietra
  '/timeline/IMG_7616.JPG',  // 37 pietra lavica
  '/timeline/IMG_7579.JPG',  // 38 ametista
  '/timeline/IMG_7585.JPG',  // 39 ottone
  '/timeline/IMG_7628.JPG',  // 40 calcestruzzo
  '/timeline/IMG_7617.JPG',  // 41 pietra basaltina
  '/timeline/IMG_7590.JPG',  // 42 ardesia
  '/timeline/IMG_7600.JPG',  // 43 cristallo
  '/timeline/IMG_7629.JPG',  // 44 pietra
  '/timeline/IMG_7594.JPG',  // 45 travertino
  '/timeline/IMG_7591.JPG',  // 46 basalto
  '/timeline/IMG_7587.JPG',  // 47 cemento
  '/timeline/IMG_7630.JPG',  // 48 pietra
  '/timeline/IMG_7595.JPG',  // 49 pietra bianca
  '/timeline/IMG_7592.JPG',  // 50 granito
  '/timeline/IMG_7588.JPG',  // 51 pietra calcarea
  '/timeline/IMG_7631.JPG',  // 52 ardesia 2
  '/timeline/IMG_7596.JPG',  // 53 calcestruzzo
  '/timeline/IMG_7606.JPG',  // 54 legno scuro
  '/timeline/IMG_7632.JPG',  // 55 basalto 2
  '/timeline/IMG_7597.JPG',  // 56 corten
  '/timeline/IMG_7622.JPG',  // 57 bambù 2
  '/timeline/IMG_7583.AVIF', // 58 texture
  '/timeline/IMG_7593.AVIF', // 59 texture
  '/timeline/IMG_7598.AVIF', // 60 texture
  '/timeline/IMG_7614.AVIF', // 61 texture
  '/timeline/IMG_7615.AVIF', // 62 texture
  '/timeline/IMG_7633.AVIF', // 63 texture
]

// 64 immagini, 42 anni — 4×3 + 14×2 + 24×1 = 64 ✓
const T = timelineImmagini
const immaginiPerAnno = {
  1985: [T[0],  T[1]],
  1986: [T[2]],
  1987: [T[3],  T[4]],
  1988: [T[5]],
  1989: [T[6],  T[7]],
  1990: [T[8]],
  1991: [T[9],  T[10]],
  1992: [T[11]],
  1993: [T[12]],
  1994: [T[13]],
  1995: [T[14], T[15], T[16]], // 3 imgs
  1996: [T[17]],
  1997: [T[18], T[19]],
  1998: [T[20]],
  1999: [T[21], T[22]],
  2000: [T[23], T[24], T[25]], // 3 imgs
  2001: [T[26]],
  2002: [T[27], T[28]],
  2003: [T[29]],
  2004: [T[30], T[31]],
  2005: [T[32]],
  2006: [T[33], T[34]],
  2007: [T[35]],
  2008: [T[36], T[37]],
  2009: [T[38]],
  2010: [T[39], T[40], T[41]], // 3 imgs
  2011: [T[42]],
  2012: [T[43], T[44]],
  2013: [T[45]],
  2014: [T[46], T[47]],
  2015: [T[48]],
  2016: [T[49], T[50]],
  2017: [T[51]],
  2018: [T[52]],
  2019: [T[53]],
  2020: [T[54], T[55], T[56]], // 3 imgs
  2021: [T[57]],
  2022: [T[58], T[59]],
  2023: [T[60]],
  2024: [T[61]],
  2025: [T[62]],
  2026: [T[63]],
}

const materialiReali = [
  { nome: 'MARMO ROSSO',      img: '/timeline/IMG_7570.JPG', progetto: 'VILLA ROMANA',        anno: '2018', categoria: 'MARMI'   },
  { nome: 'MARMO VERDE',      img: '/timeline/IMG_7571.JPG', progetto: 'RESIDENZA TOSCANA',   anno: '2015', categoria: 'MARMI'   },
  { nome: 'ONICE',            img: '/timeline/IMG_7572.JPG', progetto: 'SUITE DUBAI',         anno: '2021', categoria: 'MARMI'   },
  { nome: 'MARMO NERO',       img: '/timeline/IMG_7573.JPG', progetto: 'SHOWROOM MILANO',     anno: '2019', categoria: 'MARMI'   },
  { nome: 'AGATA',            img: '/timeline/IMG_7574.JPG', progetto: 'VILLA CAPRI',         anno: '2022', categoria: 'MARMI'   },
  { nome: 'MARMO ARABESCATO', img: '/timeline/IMG_7575.JPG', progetto: 'HOTEL AMALFI',        anno: '2017', categoria: 'MARMI'   },
  { nome: 'LAPISLAZZULI',     img: '/timeline/IMG_7576.JPG', progetto: 'PALAZZO VENEZIA',     anno: '2016', categoria: 'MARMI'   },
  { nome: 'MALACHITE',        img: '/timeline/IMG_7577.JPG', progetto: 'VILLA MUMBAI',        anno: '2023', categoria: 'MARMI'   },
  { nome: 'QUARZO ROSA',      img: '/timeline/IMG_7578.JPG', progetto: 'RESIDENZA ANZIO',     anno: '2020', categoria: 'MARMI'   },
  { nome: 'AMETISTA',         img: '/timeline/IMG_7579.JPG', progetto: 'SUITE ABU DHABI',     anno: '2022', categoria: 'MARMI'   },
  { nome: 'LEGNO NOCE',       img: '/timeline/IMG_7580.JPG', progetto: 'VILLA CORTINA',       anno: '2014', categoria: 'LEGNI'   },
  { nome: 'TEAK BURMA',       img: '/timeline/IMG_7581.JPG', progetto: 'VILLA PALM JUMEIRAH', anno: '2022', categoria: 'LEGNI'   },
  { nome: 'ACCIAIO',          img: '/timeline/IMG_7582.JPG', progetto: 'UFFICIO ROMA',        anno: '2018', categoria: 'METALLI' },
  { nome: 'PIETRA GRIGIA',    img: '/timeline/IMG_7584.JPG', progetto: 'CASA SUL MARE',       anno: '2016', categoria: 'PIETRE'  },
  { nome: 'OTTONE',           img: '/timeline/IMG_7585.JPG', progetto: 'HOTEL FIRENZE',       anno: '2019', categoria: 'METALLI' },
  { nome: 'VETRO',            img: '/timeline/IMG_7586.JPG', progetto: 'TORRE UFFICI',        anno: '2021', categoria: 'METALLI' },
  { nome: 'CEMENTO',          img: '/timeline/IMG_7587.JPG', progetto: 'VILLA AHMEDABAD',     anno: '2022', categoria: 'PIETRE'  },
  { nome: 'PIETRA CALCAREA',  img: '/timeline/IMG_7588.JPG', progetto: 'MASSERIA PUGLIA',     anno: '2015', categoria: 'PIETRE'  },
  { nome: 'MATTONE',          img: '/timeline/IMG_7589.JPG', progetto: 'STUDIO MASTRELLA',    anno: '2013', categoria: 'PIETRE'  },
  { nome: 'ARDESIA',          img: '/timeline/IMG_7590.JPG', progetto: 'CASA LAGO COMO',      anno: '2017', categoria: 'PIETRE'  },
  { nome: 'BASALTO',          img: '/timeline/IMG_7591.JPG', progetto: 'VILLA SICILIA',       anno: '2014', categoria: 'PIETRE'  },
  { nome: 'GRANITO',          img: '/timeline/IMG_7592.JPG', progetto: 'PALAZZO GENOVA',      anno: '2016', categoria: 'PIETRE'  },
  { nome: 'TRAVERTINO',       img: '/timeline/IMG_7594.JPG', progetto: 'VILLA PALM JUMEIRAH', anno: '2019', categoria: 'PIETRE'  },
  { nome: 'PIETRA BIANCA',    img: '/timeline/IMG_7595.JPG', progetto: 'RESIDENZA GRECIA',    anno: '2020', categoria: 'PIETRE'  },
  { nome: 'CALCESTRUZZO',     img: '/timeline/IMG_7596.JPG', progetto: 'MUSEO CONTEMPORANEO', anno: '2018', categoria: 'PIETRE'  },
  { nome: 'CORTEN',           img: '/timeline/IMG_7597.JPG', progetto: 'PADIGLIONE DUBAI',    anno: '2021', categoria: 'METALLI' },
  { nome: 'VETRO SATINATO',   img: '/timeline/IMG_7599.JPG', progetto: 'SHOWROOM TORINO',     anno: '2023', categoria: 'METALLI' },
  { nome: 'CRISTALLO',        img: '/timeline/IMG_7600.JPG', progetto: 'SUITE BEVERLY HILLS', anno: '2019', categoria: 'METALLI' },
  { nome: 'RAME',             img: '/timeline/IMG_7601.JPG', progetto: 'VILLA UMBRIA',        anno: '2015', categoria: 'METALLI' },
  { nome: 'OTTONE BRUNITO',   img: '/timeline/IMG_7602.JPG', progetto: 'UFFICIO AZIENDALE',   anno: '2021', categoria: 'METALLI' },
  { nome: 'RAME OSSIDATO',    img: '/timeline/IMG_7603.JPG', progetto: 'CASA COLONICA',       anno: '2016', categoria: 'METALLI' },
  { nome: 'ZINCO',            img: '/timeline/IMG_7604.JPG', progetto: 'VILLA NORDICA',       anno: '2020', categoria: 'METALLI' },
  { nome: 'ACCIAIO CORTEN',   img: '/timeline/IMG_7605.JPG', progetto: 'PADIGLIONE EXPO',     anno: '2022', categoria: 'METALLI' },
  { nome: 'LEGNO SCURO',      img: '/timeline/IMG_7606.JPG', progetto: 'CHALET CORTINA',      anno: '2018', categoria: 'LEGNI'   },
  { nome: 'ROVERE',           img: '/timeline/IMG_7607.JPG', progetto: 'VILLA TOSCANA',       anno: '2017', categoria: 'LEGNI'   },
  { nome: 'WENGE',            img: '/timeline/IMG_7608.JPG', progetto: 'PENTHOUSE DUBAI',     anno: '2023', categoria: 'LEGNI'   },
  { nome: 'IROKO',            img: '/timeline/IMG_7609.JPG', progetto: 'VILLA SARDEGNA',      anno: '2014', categoria: 'LEGNI'   },
  { nome: 'MOGANO',           img: '/timeline/IMG_7610.JPG', progetto: 'YACHT CLUB',          anno: '2016', categoria: 'LEGNI'   },
  { nome: 'CILIEGIO',         img: '/timeline/IMG_7611.JPG', progetto: 'STUDIO PRIVATO',      anno: '2019', categoria: 'LEGNI'   },
  { nome: 'PINO',             img: '/timeline/IMG_7612.JPG', progetto: 'RIFUGIO MONTAGNA',    anno: '2020', categoria: 'LEGNI'   },
  { nome: 'BAMBÙ',            img: '/timeline/IMG_7613.JPG', progetto: 'RESORT INDIA',        anno: '2022', categoria: 'LEGNI'   },
  { nome: 'PIETRA LAVICA',    img: '/timeline/IMG_7616.JPG', progetto: 'VILLA ETNA',          anno: '2018', categoria: 'PIETRE'  },
  { nome: 'PIETRA BASALTINA', img: '/timeline/IMG_7617.JPG', progetto: 'SPA LUXURY',          anno: '2021', categoria: 'PIETRE'  },
  { nome: 'PIETRA GRIGIA 2',  img: '/timeline/IMG_7618.JPG', progetto: 'CASA LAGO',           anno: '2015', categoria: 'PIETRE'  },
  { nome: 'INTONACO',         img: '/timeline/IMG_7619.JPG', progetto: 'MASSERIA SALENTO',    anno: '2017', categoria: 'PIETRE'  },
  { nome: 'STUCCO',           img: '/timeline/IMG_7620.JPG', progetto: 'PALAZZO STORICO',     anno: '2013', categoria: 'PIETRE'  },
  { nome: 'LINO',             img: '/timeline/IMG_7621.JPG', progetto: 'VILLA PROVENZA',      anno: '2019', categoria: 'TESSUTI' },
  { nome: 'BAMBÙ 2',          img: '/timeline/IMG_7622.JPG', progetto: 'RESORT MUMBAI',       anno: '2023', categoria: 'LEGNI'   },
  { nome: 'RAFIA',            img: '/timeline/IMG_7623.JPG', progetto: 'VILLA MAROCCO',       anno: '2020', categoria: 'TESSUTI' },
  { nome: 'PIETRA BIANCA 2',  img: '/timeline/IMG_7624.JPG', progetto: 'VILLA GRECIA',        anno: '2016', categoria: 'PIETRE'  },
  { nome: 'TRAVERTINO 2',     img: '/timeline/IMG_7625.JPG', progetto: 'RESIDENZA ROMANA',    anno: '2014', categoria: 'PIETRE'  },
  { nome: 'STUCCO 2',         img: '/timeline/IMG_7626.JPG', progetto: 'VILLA VENEZIANA',     anno: '2018', categoria: 'PIETRE'  },
  { nome: 'PIETRA 3',         img: '/timeline/IMG_7627.JPG', progetto: 'CASA LIGURIA',        anno: '2021', categoria: 'PIETRE'  },
  { nome: 'CALCESTRUZZO 2',   img: '/timeline/IMG_7628.JPG', progetto: 'GALLERIA ARTE',       anno: '2022', categoria: 'PIETRE'  },
  { nome: 'PIETRA 4',         img: '/timeline/IMG_7629.JPG', progetto: 'VILLA COSTIERA',      anno: '2017', categoria: 'PIETRE'  },
  { nome: 'PIETRA 5',         img: '/timeline/IMG_7630.JPG', progetto: 'CASA CAMPAGNA',       anno: '2015', categoria: 'PIETRE'  },
  { nome: 'ARDESIA 2',        img: '/timeline/IMG_7631.JPG', progetto: 'VILLA PIEMONTE',      anno: '2019', categoria: 'PIETRE'  },
  { nome: 'BASALTO 2',        img: '/timeline/IMG_7632.JPG', progetto: 'RESIDENZA ETNA',      anno: '2023', categoria: 'PIETRE'  },
]

const CAT_MATERIALI = ['TUTTI', 'PIETRE', 'MARMI', 'LEGNI', 'METALLI', 'TESSUTI']

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
        fontFamily: archivo, fontSize: 11, fontWeight: 500,
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

function CardMateriale({ materiale }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ overflow: 'hidden', cursor: 'default' }}
    >
      <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
        <img
          src={materiale.img}
          alt={materiale.nome}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: marrone,
          opacity: hover ? 0.7 : 0,
          transition: 'opacity 0.3s ease',
        }} />
      </div>
      <div style={{
        background: marrone,
        padding: '10px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 8,
      }}>
        <span style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 600,
          letterSpacing: '0.2em', color: celeste,
          textTransform: 'uppercase', flexShrink: 0,
        }}>
          {materiale.nome}
        </span>
        <span style={{
          fontFamily: archivo, fontSize: 9, fontWeight: 300,
          color: oro, opacity: 0.7,
          textAlign: 'center', flexGrow: 1,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {materiale.progetto}
        </span>
        <span style={{
          fontFamily: archivo, fontSize: 10, fontWeight: 300,
          color: celeste, opacity: 0.5, flexShrink: 0,
        }}>
          {materiale.anno}
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

function NodoAnno({ anno, progetto, imgs, isSelected, isAbove, visibile, delay, onClick }) {
  const isPlaceholder = !!progetto?.isPlaceholder
  const hasProject = !!progetto && !isPlaceholder
  const isFuturo = anno > 2028
  const imgsWidth = imgs.length * 180 + (imgs.length - 1) * 4
  const contentWidth = Math.max(imgsWidth, 200)
  const width = progetto ? contentWidth + 60 : 80
  const dotSize = isSelected ? 14 : (progetto ? 8 : 4)

  const imgBlock = progetto ? (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', gap: 4 }}>
      {imgs.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          className="timeline-img"
          style={{
            width: 180, height: 180, objectFit: 'cover', flexShrink: 0,
            display: 'block',
            border: isSelected && idx === 0 ? '1px solid rgba(145,176,217,0.5)' : 'none',
          }}
        />
      ))}
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

  const projectContent = progetto ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 600,
          color: celeste, textAlign: 'center',
          width: contentWidth, marginBottom: 8,
        }}>
          {progetto.titolo}
        </div>
      )}
      {imgBlock}
      {!isAbove && (
        <div style={{
          fontFamily: archivo, fontSize: 11, fontWeight: 600,
          color: celeste, textAlign: 'center',
          width: contentWidth, marginTop: 8,
        }}>
          {progetto.titolo}
        </div>
      )}
    </div>
  ) : null

  const annoEl = (
    <div style={{
      fontFamily: archivo,
      fontSize: progetto ? 58 : 10,
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
    background: celeste, border: 'none',
    color: marrone, fontSize: 18, fontWeight: 600, cursor: 'pointer', padding: '12px 16px', lineHeight: 1,
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
            const imgs = immaginiPerAnno[anno] || [timelineImmagini[i % timelineImmagini.length]]
            const progetto = hasRealProject
              ? progettiPerAnno[key][0]
              : { titolo: 'ARCHIVIO ' + anno, categoria: '', isPlaceholder: true }
            const isSelected = annoSelezionato === key
            const isAbove = i % 2 === 0

            return (
              <NodoAnno
                key={anno}
                anno={anno}
                progetto={progetto}
                imgs={imgs}
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
  const [filtroCategoriaMat, setFiltroCategoriaMat] = useState('TUTTI')

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {CAT_MATERIALI.map(v => (
              <FiltroMateriale
                key={v}
                label={v}
                attivo={filtroCategoriaMat === v}
                onClick={() => setFiltroCategoriaMat(v)}
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
      {tipoFiltro === 'materiale' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 2, padding: 2,
        }}>
          {materialiReali
            .filter(m => filtroCategoriaMat === 'TUTTI' || m.categoria === filtroCategoriaMat)
            .map(m => <CardMateriale key={m.nome} materiale={m} />)
          }
        </div>
      ) : tipoFiltro === 'anno' ? (
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
