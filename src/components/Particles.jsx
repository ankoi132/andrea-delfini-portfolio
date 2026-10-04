import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 200

export default function Particles() {
  const pointsRef = useRef()

  // Generate random positions and velocities once
  const { positions, velocities, opacities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = []
    const opacities = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20   // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12   // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10   // z

      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() * 0.002) + 0.001,  // drift upward
        z: (Math.random() - 0.5) * 0.002,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        opacitySpeed: Math.random() * 0.005 + 0.002,
      })

      opacities[i] = Math.random()
    }

    return { positions, velocities, opacities }
  }, [])

  // Store mutable position state in a Float32Array ref
  const posRef = useRef(positions.slice())
  const opRef = useRef(opacities.slice())

  useFrame(() => {
    if (!pointsRef.current) return

    const pos = posRef.current
    const op = opRef.current

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = velocities[i]

      pos[i * 3 + 0] += v.x
      pos[i * 3 + 1] += v.y
      pos[i * 3 + 2] += v.z

      // Wrap particles that drift too far
      if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6
      if (pos[i * 3 + 0] > 10) pos[i * 3 + 0] = -10
      if (pos[i * 3 + 0] < -10) pos[i * 3 + 0] = 10

      // Pulse opacity
      op[i] += v.opacityDir * v.opacitySpeed
      if (op[i] > 1) { op[i] = 1; v.opacityDir = -1 }
      if (op[i] < 0.05) { op[i] = 0.05; v.opacityDir = 1 }
    }

    pointsRef.current.geometry.attributes.position.array.set(pos)
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posRef.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#0099ff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
