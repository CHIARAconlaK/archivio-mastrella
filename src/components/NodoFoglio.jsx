import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { MathUtils } from 'three'

function tronca(testo, max = 55) {
  if (!testo || testo.length <= max) return testo
  return testo.slice(0, max).trimEnd() + '…'
}

export default function NodoFoglio({ id, titolo, anno, descrizione, posizione, opacita = 0.9, onSeleziona }) {
  const outerRef = useRef()
  const hovered = useRef(false)

  const randomY = useMemo(() => (Math.random() - 0.5) * 0.3, [])

  useFrame(() => {
    if (!outerRef.current) return
    const target = hovered.current ? 0.3 : 0
    outerRef.current.position.y = MathUtils.lerp(outerRef.current.position.y, target, 0.1)
  })

  return (
    <group ref={outerRef} position={posizione}>
      <group rotation={[0, randomY, 0]}>
        <mesh
          castShadow
          receiveShadow
          onPointerEnter={(e) => { e.stopPropagation(); hovered.current = true }}
          onPointerLeave={(e) => { e.stopPropagation(); hovered.current = false }}
          onClick={(e) => { e.stopPropagation(); onSeleziona?.(id) }}
        >
          <boxGeometry args={[1.2, 0.012, 0.9]} />
          <meshStandardMaterial color="#F2C879" roughness={0.85} metalness={0} opacity={opacita} transparent />
        </mesh>

        <Text
          position={[0, 0.02, -0.18]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.08}
          color="#2F1F11"
          fillOpacity={opacita}
          maxWidth={1.0}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {titolo.toUpperCase()}
        </Text>

        <Text
          position={[0, 0.02, 0.06]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.055}
          color="#2F1F11"
          fillOpacity={opacita}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {String(anno)}
        </Text>

        <Text
          position={[0, 0.02, 0.26]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.042}
          color="#2F1F11"
          fillOpacity={opacita * 0.78}
          maxWidth={1.0}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {tronca(descrizione).toUpperCase()}
        </Text>
      </group>
    </group>
  )
}
