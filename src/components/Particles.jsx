import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 320

export default function Particles({ mode = 'nominal' }) {
  const pointsRef = useRef()

  const { initialPositions, speeds, radii, angles, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const cols = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const radii = new Float32Array(PARTICLE_COUNT)
    const angles = new Float32Array(PARTICLE_COUNT)

    const colorCold = new THREE.Color('#38bdf8')
    const colorHot = new THREE.Color('#ff6b2b')
    const colorExhaust = new THREE.Color('#fbbf24')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const z = -3.8 + Math.random() * 7.5
      const angle = Math.random() * Math.PI * 2
      // Compress in middle, expand at exhaust
      const baseRadius = 0.5 + Math.random() * 0.8
      const r = z > 0.8 ? baseRadius * 1.3 : z > -0.5 ? baseRadius * 0.9 : baseRadius

      pos[i * 3 + 0] = Math.cos(angle) * r
      pos[i * 3 + 1] = Math.sin(angle) * r
      pos[i * 3 + 2] = z

      speeds[i] = 1.8 + Math.random() * 2.2
      radii[i] = baseRadius
      angles[i] = angle

      // Color based on Z position
      let c = colorCold
      if (z > -0.5 && z < 0.9) {
        c = colorHot
      } else if (z >= 0.9) {
        c = colorExhaust
      }

      cols[i * 3 + 0] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }

    return { initialPositions: pos, speeds, radii, angles, colors: cols }
  }, [])

  const posArray = useRef(initialPositions.slice())

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = posArray.current
    const activeSpeed = mode === 'nominal' ? 1.0 : 0.25

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Advance along Z axis (airflow from intake to exhaust)
      pos[i * 3 + 2] += speeds[i] * delta * activeSpeed

      // Swirl around central axis
      angles[i] += delta * 1.2 * activeSpeed
      const z = pos[i * 3 + 2]

      // Aerodynamic stream tube radius contraction and expansion
      let r = radii[i]
      if (z < -0.5) {
        // Contraction in compressor
        r = radii[i] * (1.1 - (z + 3.8) * 0.05)
      } else if (z >= -0.5 && z < 0.9) {
        // High-density combustor basket zone
        r = radii[i] * 0.88
      } else {
        // Expansion in turbine & diffuser
        r = radii[i] * (0.88 + (z - 0.9) * 0.18)
      }

      pos[i * 3 + 0] = Math.cos(angles[i]) * r
      pos[i * 3 + 1] = Math.sin(angles[i]) * r

      // Recycle particle when reaching exhaust exit
      if (pos[i * 3 + 2] > 3.8) {
        pos[i * 3 + 2] = -3.8 - Math.random() * 0.5
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posArray.current, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
