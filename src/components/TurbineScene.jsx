import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
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

function ResponsiveCamera({ zoomDelta = 0 }) {
  const { camera } = useThree()

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 768) {
        // Mobile: centered, farther away to fit entire machine vertically
        camera.position.set(-4.6, 2.6, 7.8 + zoomDelta)
        camera.fov = 48
      } else if (w < 1024) {
        // Tablet
        camera.position.set(-4.0, 2.2, 6.2 + zoomDelta)
        camera.fov = 44
      } else {
        // Desktop: offset slightly to the right to leave space for left hero text
        camera.position.set(-3.5, 1.9, 5.2 + zoomDelta)
        camera.fov = 42
      }
      camera.updateProjectionMatrix()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [camera, zoomDelta])

  return null
}

export default function TurbineScene({
  mode = 'nominal',
  explosionAmount = 0,
  activeStage = null,
  zoomDelta = 0,
}) {
  const [isMobile, setIsMobile] = useState(false)
  const controlsRef = useRef()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Canvas
      camera={{
        position: [-3.8, 2.2, 5.4],
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
      style={{
        background: 'transparent',
        width: '100%',
        height: '100%',
        touchAction: 'pan-y', // Allows native vertical page scrolling on touch devices!
      }}
    >
      <ResponsiveCamera zoomDelta={zoomDelta} />
      <Lights mode={mode} />

      <Suspense fallback={null}>
        <TurbineModel
          mode={mode}
          explosionAmount={explosionAmount}
          activeStage={activeStage}
        />
        <Particles mode={mode} />

        <EffectComposer>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.48}
            luminanceSmoothing={0.8}
            radius={0.65}
          />
        </EffectComposer>
      </Suspense>

      {/* OrbitControls:
          CRITICAL FIX: enableZoom={false} prevents wheel hijack!
          Rolling mouse wheel scrolls the page down smoothly without getting trapped.
          Left-click drag rotates the turbine freely.
      */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        dampingFactor={0.06}
        enableDamping
        target={isMobile ? [0, 0, 0] : [0.5, 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  )
}
