import { ContactShadows, OrbitControls } from '@react-three/drei'
import NodeGraph from './NodeGraph'

export default function Scene({ filtro }) {
  return (
    <>
      <color attach="background" args={['#91B0D9']} />
      <fogExp2 attach="fog" color="#91B0D9" density={0.035} />

      <ambientLight intensity={0.6} color="#FFF5E4" />
      <directionalLight
        position={[8, 12, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7A9DC4" roughness={0.9} metalness={0} />
      </mesh>

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.5}
        scale={20}
        blur={2}
        far={10}
      />

      <NodeGraph filtro={filtro} />

      <OrbitControls
        maxPolarAngle={Math.PI / 3}
        minDistance={3}
        maxDistance={25}
        target={[0, 0, 0]}
      />
    </>
  )
}
