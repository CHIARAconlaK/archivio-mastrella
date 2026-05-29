import { useMemo } from 'react'
import { nodi } from '../data/archivio'
import NodoFoglio from './NodoFoglio'
import Connessioni from './Connessioni'

const TIPO_PER_FILTRO = {
  PROGETTI: 'progetto',
  RELAZIONI: 'persona',
  MATERIALI: 'materiale',
}

function estraiCoppie(nodi) {
  const seen = new Set()
  const result = []
  nodi.forEach((nodo) => {
    nodo.connessioni.forEach((targetId) => {
      const key = [nodo.id, targetId].sort().join('--')
      if (!seen.has(key)) {
        seen.add(key)
        result.push([nodo.id, targetId])
      }
    })
  })
  return result
}

export default function NodeGraph({ onSeleziona, filtro = 'TUTTI' }) {
  const coppie = useMemo(() => estraiCoppie(nodi), [])

  const nodiAttivi = useMemo(() => {
    if (filtro === 'TUTTI') return null  // null = tutti attivi
    const tipo = TIPO_PER_FILTRO[filtro]
    return new Set(nodi.filter((n) => n.tipo === tipo).map((n) => n.id))
  }, [filtro])

  return (
    <group>
      <Connessioni nodi={nodi} coppie={coppie} nodiAttivi={nodiAttivi} />
      {nodi.map((nodo) => (
        <NodoFoglio
          key={nodo.id}
          {...nodo}
          opacita={nodiAttivi === null || nodiAttivi.has(nodo.id) ? 0.9 : 0.15}
          onSeleziona={onSeleziona}
        />
      ))}
    </group>
  )
}
