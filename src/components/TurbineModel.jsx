import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Blade geometry helper ───────────────────────────────────────────────────
function createBladeGeometry() {
  // Tapered blade: wider at root, narrower at tip
  const shape = new THREE.Shape()
  shape.moveTo(-0.04, 0)
  shape.lineTo(0.04, 0)
  shape.lineTo(0.025, 1.1)
  shape.lineTo(-0.025, 1.1)
  shape.closePath()

  const extrudeSettings = {
    depth: 0.022,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  }
  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

// ─── Materials ────────────────────────────────────────────────────────────────
function useHubMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a1a2e'),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color('#003366'),
        emissiveIntensity: 0.5,
      }),
    []
  )
}

function useBladeMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8b9bb4'),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color('#001a33'),
        emissiveIntensity: 0.1,
      }),
    []
  )
}

function useRingMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a2233'),
        metalness: 0.95,
        roughness: 0.1,
        emissive: new THREE.Color('#0033aa'),
        emissiveIntensity: 0.15,
      }),
    []
  )
}

function useDiscMaterial() {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2a3a55'),
        metalness: 0.85,
        roughness: 0.3,
        emissive: new THREE.Color('#001155'),
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      }),
    []
  )
}

// ─── Blade count & angles ─────────────────────────────────────────────────────
const BLADE_COUNT = 8
const bladeAngles = Array.from({ length: BLADE_COUNT }, (_, i) =>
  (i / BLADE_COUNT) * Math.PI * 2
)
const bladeGeometry = createBladeGeometry()

// ─── Blade component ──────────────────────────────────────────────────────────
function Blade({ angle, material, bladeRef }) {
  return (
    <group
      ref={bladeRef}
      rotation={[0, angle, 0]}
    >
      {/* pitch the blade slightly for realism */}
      <group rotation={[Math.PI * 0.12, 0, 0]} position={[0, 0.3, 0]}>
        <mesh geometry={bladeGeometry} material={material} castShadow />
      </group>
    </group>
  )
}

// ─── Main turbine model ───────────────────────────────────────────────────────
export default function TurbineModel() {
  const groupRef = useRef()
  const hubRef = useRef()
  const outerRingRef = useRef()
  const outerRing2Ref = useRef()
  const discRef = useRef()
  const bladeRefs = useRef(bladeAngles.map(() => ({ current: null })))

  const hubMat = useHubMaterial()
  const bladeMat = useBladeMaterial()
  const ringMat = useRingMaterial()
  const discMat = useDiscMaterial()

  // ── Assembly animation on mount ────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Hub: scale from 0
    if (hubRef.current) {
      hubRef.current.scale.set(0, 0, 0)
      tl.to(hubRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.7 }, 0.3)
    }

    // Blades: fly in from random distances around the turbine
    bladeRefs.current.forEach((ref, i) => {
      if (!ref.current) return
      const angle = bladeAngles[i]
      const dist = 4 + Math.random() * 3
      const startX = Math.sin(angle) * dist
      const startZ = Math.cos(angle) * dist
      const startY = (Math.random() - 0.5) * 5

      ref.current.position.set(startX, startY, startZ)
      ref.current.scale.set(0.3, 0.3, 0.3)

      const delay = 0.5 + i * 0.08

      tl.to(
        ref.current.position,
        { x: 0, y: 0, z: 0, duration: 0.9 },
        delay
      )
      tl.to(
        ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.7 },
        delay
      )
    })

    // Disc: scale from 0 after blades arrive
    if (discRef.current) {
      discRef.current.scale.set(0, 0, 0)
      tl.to(discRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.6 }, 1.3)
    }

    // Outer rings: drop in from above
    ;[outerRingRef, outerRing2Ref].forEach((ref, i) => {
      if (!ref.current) return
      ref.current.position.y = 5
      ref.current.scale.set(0, 0, 0)
      tl.to(
        ref.current.position,
        { y: 0, duration: 0.7, ease: 'back.out(1.4)' },
        1.4 + i * 0.15
      )
      tl.to(
        ref.current.scale,
        { x: 1, y: 1, z: 1, duration: 0.6 },
        1.4 + i * 0.15
      )
    })

    // Gentle entrance: whole group fades in from bottom
    if (groupRef.current) {
      groupRef.current.position.y = -1.5
      tl.to(groupRef.current.position, { y: 0, duration: 1.2, ease: 'power2.out' }, 0)
    }

    return () => tl.kill()
  }, [])

  // ── Scroll animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!groupRef.current) return
        const p = self.progress
        // Rotate on Y axis as page scrolls
        groupRef.current.rotation.y = p * Math.PI * 4
        // Slight tilt
        groupRef.current.rotation.x = p * 0.3
        // Scale up slightly mid-scroll then back
        const s = 1 + Math.sin(p * Math.PI) * 0.25
        groupRef.current.scale.set(s, s, s)
      },
    })

    return () => trigger.kill()
  }, [])

  // ── Continuous slow spin (ambient) ─────────────────────────────────────────
  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Only add ambient spin when not being driven by ScrollTrigger
    // ScrollTrigger overrides rotation.y above, so we just add a tiny constant
    // rotation to the inner spinning parts for life
    if (hubRef.current) {
      hubRef.current.rotation.y += delta * 0.6
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central hub */}
      <mesh ref={hubRef} material={hubMat} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.5, 32]} />
      </mesh>

      {/* Hub front cap glow ring */}
      <mesh material={ringMat} position={[0, 0.26, 0]}>
        <torusGeometry args={[0.28, 0.04, 16, 64]} />
      </mesh>
      <mesh material={ringMat} position={[0, -0.26, 0]}>
        <torusGeometry args={[0.28, 0.04, 16, 64]} />
      </mesh>

      {/* Blades */}
      {bladeAngles.map((angle, i) => (
        <Blade
          key={i}
          angle={angle}
          material={bladeMat}
          bladeRef={bladeRefs.current[i]}
        />
      ))}

      {/* Front disc / spinner plate */}
      <mesh ref={discRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={discMat}>
        <ringGeometry args={[0.32, 0.55, 64]} />
      </mesh>

      {/* Inner structural ring */}
      <mesh ref={outerRingRef} material={ringMat}>
        <torusGeometry args={[1.0, 0.055, 16, 128]} />
      </mesh>

      {/* Outer casing ring */}
      <mesh ref={outerRing2Ref} material={ringMat}>
        <torusGeometry args={[1.35, 0.08, 16, 128]} />
      </mesh>

      {/* Structural spokes connecting hub to rings */}
      {Array.from({ length: 4 }, (_, i) => {
        const spokeAngle = (i / 4) * Math.PI * 2
        return (
          <mesh
            key={`spoke-${i}`}
            rotation={[0, spokeAngle, Math.PI / 2]}
            position={[
              Math.sin(spokeAngle) * 0.65,
              0,
              Math.cos(spokeAngle) * 0.65,
            ]}
            material={bladeMat}
          >
            <cylinderGeometry args={[0.018, 0.018, 1.3, 8]} />
          </mesh>
        )
      })}
    </group>
  )
}
