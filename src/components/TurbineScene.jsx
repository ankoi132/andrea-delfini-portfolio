import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useMemo } from 'react'
import TurbineModel from './TurbineModel.jsx'
import Particles from './Particles.jsx'

function Lights({ mode }) {
  const isThermal = mode === 'thermal'

  return (
    <>
      {/* Cool industrial ambient fill */}
      <ambientLight intensity={0.55} color="#0c1524" />

      {/* Primary key light: Crisp titanium white from upper left */}
      <directionalLight
        position={[-5, 7, 5]}
        intensity={2.0}
        color="#e2e8f0"
        castShadow
      />

      {/* Fill light from lower right */}
      <directionalLight
        position={[4, -4, 3]}
        intensity={0.8}
        color="#64748b"
      />

      {/* Precision aerodynamic rim light from rear */}
      <pointLight
        position={[0, 4, -5]}
        intensity={2.8}
        color="#38bdf8"
        distance={14}
      />

      {/* Internal combustion glow inside the combustor baskets */}
      <pointLight
        position={[0, 0, 0.2]}
        intensity={isThermal ? 4.5 : 2.5}
        color="#ff6b2b"
        distance={6}
      />

      {/* Aft exhaust hot gas glow */}
      <pointLight
        position={[0, 0, 2.6]}
        intensity={1.8}
        color="#f59e0b"
        distance={8}
      />
    </>
  )
}

export default function TurbineScene({
  mode = 'nominal',
  explosionAmount = 0,
  activeStage = null,
  onSelectStage = () => {},
}) {
  const isMobile = useMemo(() => {
    return (
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window)
    )
  }, [])

  return (
    <Canvas
      camera={{
        position: isMobile ? [-4.5, 2.5, 6.2] : [-3.8, 2.2, 5.2],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 4, // ACESFilmic
        toneMappingExposure: 1.1,
      }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Lights mode={mode} />

      <Suspense fallback={null}>
        <TurbineModel
          mode={mode}
          explosionAmount={explosionAmount}
          activeStage={activeStage}
          onSelectStage={onSelectStage}
        />
        <Particles mode={mode} />

        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.8}
            radius={0.65}
          />
        </EffectComposer>
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        dampingFactor={0.06}
        enableDamping
        minDistance={3.2}
        maxDistance={11.0}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  )
}
