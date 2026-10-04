import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useMemo } from 'react'
import TurbineModel from './TurbineModel.jsx'
import Particles from './Particles.jsx'

function isMobile() {
  return (
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || 'ontouchstart' in window)
  )
}

function Lights() {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.15} color="#0a1a2e" />
      {/* Key light: cool white from upper left */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={1.8}
        color="#c8d8ff"
        castShadow
      />
      {/* Electric blue rim from right */}
      <pointLight position={[4, 2, -2]} intensity={3} color="#0099ff" distance={12} />
      {/* Back glow */}
      <pointLight position={[0, -3, -4]} intensity={2} color="#00d4ff" distance={10} />
      {/* Warm front fill */}
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" distance={8} />
      {/* Under glow */}
      <pointLight position={[0, -2, 0]} intensity={1.5} color="#003388" distance={6} />
    </>
  )
}

export default function TurbineScene() {
  const mobile = useMemo(() => isMobile(), [])
  const cameraZ = mobile ? 7 : 5

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: 4, // ACESFilmic
        toneMappingExposure: 1.2,
      }}
      shadows
      style={{ background: '#0a0a0a' }}
    >
      <Lights />

      <Suspense fallback={null}>
        <TurbineModel />
        <Particles />

        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Suspense>

      {/* OrbitControls: disabled on mobile, subtle damping on desktop */}
      {!mobile && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          dampingFactor={0.05}
          enableDamping
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      )}
    </Canvas>
  )
}
