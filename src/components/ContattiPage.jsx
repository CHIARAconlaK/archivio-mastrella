const archivo = "'Archivo', sans-serif"
const marrone = '#2F1F11'
const oro = '#F2C879'

function TitoloSezione({ children, marginTop }) {
  return (
    <div style={{
      fontFamily: archivo, fontSize: 10, fontWeight: 200,
      letterSpacing: '0.4em', color: oro, opacity: 0.5,
      marginBottom: 24, marginTop: marginTop ?? 0,
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

function TestoContatto({ children }) {
  return (
    <div style={{
      fontFamily: archivo, fontSize: 14, fontWeight: 200,
      lineHeight: 2, color: oro,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>
      {children}
    </div>
  )
}

export default function ContattiPage({ onBack }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: marrone, overflowY: 'auto',
    }}>

      {/* ── Header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: marrone,
        display: 'flex', alignItems: 'center', gap: 32,
        padding: '20px 40px',
        borderBottom: `1px solid rgba(242, 200, 121, 0.1)`,
        boxSizing: 'border-box',
      }}>
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
        <img
          src="/logo.png"
          alt="Archivio Mastrella"
          style={{ width: 140, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      {/* ── Contenuto ── */}
      <div style={{
        padding: '80px 40px',
        display: 'flex', flexDirection: 'column',
        minHeight: 'calc(100vh - 65px)',
        boxSizing: 'border-box',
      }}>

        {/* Due colonne */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 120,
          flex: 1,
        }}>

          {/* Colonna sinistra */}
          <div>
            <TitoloSezione>Sede Principale</TitoloSezione>
            <TestoContatto>
              <div>VIA DI VILLA NERONIANA 8</div>
              <div>00042 ANZIO RM ITALY</div>
              <div style={{ marginTop: 16 }}>&nbsp;</div>
              <div>LUNEDÌ — VENERDÌ</div>
              <div>8.30 — 16.30</div>
              <div style={{ marginTop: 16 }}>&nbsp;</div>
              <div>MAIL: INFO@STUDIO-MASTRELLA.IT</div>
              <div>TEL: 0039 06 9848126</div>
              <div>PEC: STUDIO-MASTRELLA@PEC.IT</div>
            </TestoContatto>

            <TitoloSezione marginTop={48}>Sede Rappresentativa</TitoloSezione>
            <TestoContatto>
              <div>VIA MARGUTTA 53 B</div>
              <div>00182 ROMA ITALY</div>
              <div style={{ marginTop: 16 }}>&nbsp;</div>
              <div>SOLO SU APPUNTAMENTO</div>
            </TestoContatto>
          </div>

          {/* Colonna destra */}
          <div>
            <TitoloSezione>Dati Fiscali</TitoloSezione>
            <div style={{
              fontFamily: archivo, fontSize: 13, fontWeight: 200,
              lineHeight: 2.2, color: oro,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <div>STUDIO MASTRELLA S.N.C</div>
              <div>DI ROMANO MASTRELLA & C.</div>
              <div style={{ marginTop: 8 }}>&nbsp;</div>
              <div>REGISTRO DELLE IMPRESE DI ROMA</div>
              <div style={{ marginTop: 8 }}>&nbsp;</div>
              <div>NUMERO REA: RM - 635247</div>
              <div>CODICE FISCALE: 07958720588</div>
              <div>PARTITA IVA: 01918201003</div>
              <div>CUU: BA6ET11</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: 64 }}>
          <div style={{
            height: 1, background: oro, opacity: 0.2, marginBottom: 24,
          }} />
          <div style={{
            fontFamily: archivo, fontSize: 9, fontWeight: 200,
            letterSpacing: '0.3em', color: oro, opacity: 0.3,
            textTransform: 'uppercase',
          }}>
            © 2026 ARCHIVIO MASTRELLA — TUTTI I DIRITTI RISERVATI
          </div>
        </div>

      </div>
    </div>
  )
}
