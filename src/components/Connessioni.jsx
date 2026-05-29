import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { QuadraticBezierCurve3, Vector3 } from 'three'

function ConnessioneArco({ posA, posB, opacita }) {
  const points = useMemo(() => {
    const start = new Vector3(posA[0], 0.02, posA[2])
    const end   = new Vector3(posB[0], 0.02, posB[2])
    const mid   = new Vector3(
      (posA[0] + posB[0]) / 2,
      0.17,
      (posA[2] + posB[2]) / 2,
    )
    return new QuadraticBezierCurve3(start, mid, end).getPoints(20)
  }, [posA, posB])

  return (
    <Line
      points={points}
      color="#A64914"
      lineWidth={0.8}
      opacity={opacita}
      transparent
    />
  )
}

export default function Connessioni({ nodi, coppie, nodiAttivi }) {
  const mappa = useMemo(
    () => Object.fromEntries(nodi.map((n) => [n.id, n])),
    [nodi],
  )

  return (
    <>
      {coppie.map(([idA, idB]) => {
        const a = mappa[idA]
        const b = mappa[idB]
        if (!a || !b) return null
        // se nodiAttivi è null tutti sono attivi; altrimenti entrambi i nodi devono essere attivi
        const attiva = nodiAttivi === null || (nodiAttivi.has(idA) && nodiAttivi.has(idB))
        return (
          <ConnessioneArco
            key={`${idA}--${idB}`}
            posA={a.posizione}
            posB={b.posizione}
            opacita={attiva ? 0.5 : 0.05}
          />
        )
      })}
    </>
  )
}
