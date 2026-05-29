import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Vignette, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import Scene from './components/Scene'
import UI from './components/UI'
import LandingPage from './components/LandingPage'

export default function App() {
  const [vista, setVista] = useState('landing')
  const [filtro, setFiltro] = useState('TUTTI')

  if (vista === 'landing') {
    return <LandingPage onEnter={() => setVista('archivio')} />
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <UI
        filtroAttivo={filtro}
        onFiltro={setFiltro}
        onIndietro={() => setVista('landing')}
      />
      <Canvas
        shadows
        camera={{ position: [0, 12, 8], fov: 45 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <Scene filtro={filtro} />
        <EffectComposer>
          <Vignette offset={0.3} darkness={0.6} />
          <Noise opacity={0.04} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
