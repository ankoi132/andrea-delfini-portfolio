import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  createLoftedAirfoilGeometry,
  createRotorDiscGeometry,
} from './turbineGeometries.js'

// ─── Stage Configuration Along Longitudinal Z Axis ─────────────────────────────
const COMPRESSOR_STAGES = [
  { z: -2.0, rHub: 0.58, rTip: 1.45, count: 26, chordRoot: 0.22, chordTip: 0.14, twist: 16 },
  { z: -1.6, rHub: 0.63, rTip: 1.36, count: 30, chordRoot: 0.19, chordTip: 0.13, twist: 18 },
  { z: -1.2, rHub: 0.68, rTip: 1.28, count: 34, chordRoot: 0.16, chordTip: 0.12, twist: 20 },
  { z: -0.8, rHub: 0.72, rTip: 1.20, count: 38, chordRoot: 0.14, chordTip: 0.10, twist: 22 },
  { z: -0.4, rHub: 0.76, rTip: 1.12, count: 42, chordRoot: 0.12, chordTip: 0.09, twist: 24 },
]

const TURBINE_STAGES = [
  { z: 0.95, rHub: 0.72, rTip: 1.18, count: 30, chordRoot: 0.22, chordTip: 0.15, twist: 20, camber: 0.12 },
  { z: 1.35, rHub: 0.68, rTip: 1.30, count: 34, chordRoot: 0.20, chordTip: 0.14, twist: 22, camber: 0.11 },
  { z: 1.75, rHub: 0.64, rTip: 1.44, count: 38, chordRoot: 0.18, chordTip: 0.13, twist: 24, camber: 0.10 },
]

const COMBUSTOR_CANS_COUNT = 8
const COMBUSTOR_RADIUS = 0.96

export default function TurbineModel({
  mode = 'nominal', // 'nominal' | 'exploded' | 'thermal'
  explosionAmount = 0,
  activeStage = null,
  onSelectStage = () => {},
}) {
  const rootGroupRef = useRef()
  const rotorAssemblyRef = useRef()
  const animatedExplosionRef = useRef(1.0) // Starts exploded for initial assembly sequence

  // Subassembly Refs for Explosion Kinematics
  const igvGroupRef = useRef()
  const compressorStagesRefs = useRef([])
  const combustorCansRefs = useRef([])
  const turbineStagesRefs = useRef([])
  const exhaustGroupRef = useRef()
  const casingTopRef = useRef()
  const casingBottomRef = useRef()
  const flameCoresRef = useRef([])

  // ─── Materials ─────────────────────────────────────────────────────────────
  const materials = useMemo(() => {
    const isThermal = mode === 'thermal'

    return {
      // Titanium Alloy for Compressor
      titanium: new THREE.MeshStandardMaterial({
        color: isThermal ? '#38bdf8' : '#94a3b8',
        metalness: 0.9,
        roughness: 0.24,
        emissive: isThermal ? '#0369a1' : '#0f172a',
        emissiveIntensity: isThermal ? 0.45 : 0.05,
      }),
      // High-Strength Forged Rotor Steel
      shaftSteel: new THREE.MeshStandardMaterial({
        color: isThermal ? '#60a5fa' : '#cbd5e1',
        metalness: 0.94,
        roughness: 0.14,
        emissive: '#0b1320',
        emissiveIntensity: 0.1,
      }),
      // Inconel Superalloy for Turbine Blades
      inconel: new THREE.MeshStandardMaterial({
        color: isThermal ? '#f59e0b' : '#c8a876',
        metalness: 0.88,
        roughness: 0.2,
        emissive: isThermal ? '#b45309' : '#33200a',
        emissiveIntensity: isThermal ? 0.5 : 0.08,
      }),
      // Combustor Liner (Thermal Barrier Coating Ceramic)
      ceramicTBC: new THREE.MeshStandardMaterial({
        color: isThermal ? '#ff6b2b' : '#c2410c',
        metalness: 0.35,
        roughness: 0.45,
        emissive: isThermal ? '#ea580c' : '#7c2d12',
        emissiveIntensity: isThermal ? 0.7 : 0.2,
      }),
      // Combustion Plasma Core
      flamePlasma: new THREE.MeshStandardMaterial({
        color: '#ffedd5',
        emissive: '#ff4500',
        emissiveIntensity: 2.6,
        roughness: 0.1,
        transparent: true,
        opacity: 0.88,
      }),
      // Structural Industrial Casing
      casing: new THREE.MeshStandardMaterial({
        color: '#1a2332',
        metalness: 0.75,
        roughness: 0.35,
        transparent: true,
        opacity: mode === 'exploded' ? 0.65 : 0.85,
        side: THREE.DoubleSide,
      }),
      // Laser datum alignment lines
      datumLaser: new THREE.LineBasicMaterial({
        color: '#38bdf8',
        transparent: true,
        opacity: 0.6,
      }),
    }
  }, [mode])

  // ─── Precompute Airfoil Geometries for Compressor & Turbine ────────────────
  const compressorGeometries = useMemo(() => {
    return COMPRESSOR_STAGES.map((cfg) => {
      const span = cfg.rTip - cfg.rHub
      return {
        blade: createLoftedAirfoilGeometry({
          chordRoot: cfg.chordRoot,
          chordTip: cfg.chordTip,
          span: span,
          twistDeg: cfg.twist,
          camber: 0.06,
        }),
        disc: createRotorDiscGeometry(0.38, cfg.rHub, 0.16, 0.02),
        span: span,
        cfg,
      }
    })
  }, [])

  const turbineGeometries = useMemo(() => {
    return TURBINE_STAGES.map((cfg) => {
      const span = cfg.rTip - cfg.rHub
      return {
        blade: createLoftedAirfoilGeometry({
          chordRoot: cfg.chordRoot,
          chordTip: cfg.chordTip,
          span: span,
          twistDeg: cfg.twist,
          camber: cfg.camber,
          rootThickness: 0.18,
          tipThickness: 0.09,
        }),
        disc: createRotorDiscGeometry(0.42, cfg.rHub, 0.20, 0.025),
        span: span,
        cfg,
      }
    })
  }, [])

  // ─── IGV Blade Geometry ────────────────────────────────────────────────────
  const igvBladeGeom = useMemo(() => {
    return createLoftedAirfoilGeometry({
      chordRoot: 0.24,
      chordTip: 0.18,
      span: 0.88,
      twistDeg: 12,
      camber: 0.05,
    })
  }, [])

  // ─── Initial Cinematic Assembly Animation ──────────────────────────────────
  useEffect(() => {
    const obj = { val: 1.0 }
    // Smoothly assemble from 1.0 down to 0.0 over 2.4s
    const tween = gsap.to(obj, {
      val: 0.0,
      duration: 2.4,
      ease: 'power3.out',
      delay: 0.2,
      onUpdate: () => {
        if (mode === 'nominal') {
          animatedExplosionRef.current = obj.val
        }
      },
    })

    return () => tween.kill()
  }, [])

  // When mode or explosionAmount changes, smoothly transition
  useEffect(() => {
    let target = 0
    if (mode === 'exploded') {
      target = explosionAmount > 0 ? explosionAmount : 1.0
    } else if (mode === 'nominal') {
      target = 0.0
    } else if (mode === 'thermal') {
      target = 0.18
    }

    gsap.to(animatedExplosionRef, {
      current: target,
      duration: 1.1,
      ease: 'power2.out',
    })
  }, [mode, explosionAmount])

  // ─── Continuous Frame Update: Rotation & Precision Kinematic Explosion ──────
  useFrame((state, delta) => {
    const exp = animatedExplosionRef.current
    const isNominal = mode === 'nominal'

    // 1. Continuous Rotation of Rotor Core Assembly along Z axis
    if (rotorAssemblyRef.current) {
      const rotSpeed = isNominal ? 1.5 : 0.35
      rotorAssemblyRef.current.rotation.z += delta * rotSpeed
    }

    // 2. Pulse Combustor Flame Intensity
    if (flameCoresRef.current.length) {
      const time = state.clock.getElapsedTime() * 7
      const pulse = 2.4 + Math.sin(time) * 0.5 + Math.cos(time * 2.2) * 0.3
      materials.flamePlasma.emissiveIntensity = pulse
    }

    // 3. Precision Exploded View Separation along Thermodynamic Axes
    // IGV & Nosecone slides forward (-Z)
    if (igvGroupRef.current) {
      igvGroupRef.current.position.z = -2.6 - exp * 1.5
    }

    // Compressor Stages space out progressively along -Z
    compressorStagesRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const baseZ = COMPRESSOR_STAGES[idx].z
      const zOffset = -exp * (1.1 - idx * 0.22)
      mesh.position.z = baseZ + zOffset
    })

    // Combustor Cans expand radially outward along their pitch circle
    combustorCansRefs.current.forEach((can, idx) => {
      if (!can) return
      const angle = (idx / COMBUSTOR_CANS_COUNT) * Math.PI * 2
      const radialOffset = exp * 0.85
      const rx = Math.cos(angle) * (COMBUSTOR_RADIUS + radialOffset)
      const ry = Math.sin(angle) * (COMBUSTOR_RADIUS + radialOffset)
      can.position.x = rx
      can.position.y = ry
      can.position.z = 0.2 + exp * 0.1
    })

    // Turbine Stages space out aft (+Z)
    turbineStagesRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const baseZ = TURBINE_STAGES[idx].z
      const zOffset = exp * (0.35 + idx * 0.35)
      mesh.position.z = baseZ + zOffset
    })

    // Exhaust Diffuser & Tailcone slides further aft (+Z)
    if (exhaustGroupRef.current) {
      exhaustGroupRef.current.position.z = 2.3 + exp * 1.7
    }

    // Split Casing Halves separate radially upward (+Y) and downward (-Y)
    if (casingTopRef.current) {
      casingTopRef.current.position.y = exp * 1.3
    }
    if (casingBottomRef.current) {
      casingBottomRef.current.position.y = -exp * 1.3
    }
  })

  return (
    <group ref={rootGroupRef} rotation={[0.12, -0.42, 0]}>
      {/* ─── CENTRAL SHAFT & TIE-ROD (ROTATING CORE ALONG Z) ────────────────── */}
      <group ref={rotorAssemblyRef}>
        {/* Main stepped forged rotor shaft */}
        <mesh
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.shaftSteel}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.34, 0.34, 4.8, 48]} />
        </mesh>

        {/* Tie-bolt tensioner cap at forward shaft end */}
        <mesh
          position={[0, 0, -2.45]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.titanium}
        >
          <cylinderGeometry args={[0.38, 0.38, 0.16, 12]} />
        </mesh>

        {/* Synchronous Generator Coupling Flange at aft shaft end */}
        <mesh
          position={[0, 0, 2.45]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.shaftSteel}
        >
          <cylinderGeometry args={[0.55, 0.55, 0.18, 48]} />
        </mesh>

        {/* Generator Flange Bolt Circle */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh
              key={`gen-bolt-${i}`}
              position={[Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 2.45]}
              rotation={[Math.PI / 2, 0, 0]}
              material={materials.titanium}
            >
              <cylinderGeometry args={[0.026, 0.026, 0.22, 12]} />
            </mesh>
          )
        })}

        {/* ─── COMPRESSOR ROTOR STAGES (ATTACHED TO SHAFT) ──────────────────── */}
        {compressorGeometries.map(({ blade, disc, span, cfg }, stageIdx) => (
          <group
            key={`comp-stage-${stageIdx}`}
            ref={(el) => (compressorStagesRefs.current[stageIdx] = el)}
            position={[0, 0, cfg.z]}
            onClick={(e) => {
              e.stopPropagation()
              onSelectStage('compressor')
            }}
          >
            {/* Rotor Disc Rim with fir-tree slots (aligned in XY plane, depth along Z) */}
            <mesh geometry={disc} material={materials.titanium} position={[0, 0, -0.08]} castShadow />

            {/* Aerodynamic Airfoil Blades distributed around the circumference */}
            {Array.from({ length: cfg.count }, (_, bIdx) => {
              const angle = (bIdx / cfg.count) * Math.PI * 2
              const stagger = (35 * Math.PI) / 180
              return (
                <group
                  key={`cblade-${stageIdx}-${bIdx}`}
                  position={[Math.cos(angle) * cfg.rHub, Math.sin(angle) * cfg.rHub, 0]}
                  rotation={[0, 0, angle - Math.PI / 2]}
                >
                  <group rotation={[0, stagger, 0]}>
                    <mesh geometry={blade} material={materials.titanium} castShadow />
                  </group>
                </group>
              )
            })}
          </group>
        ))}

        {/* ─── TURBINE ROTOR STAGES (SUPERALLOY SINGLE CRYSTAL) ─────────────── */}
        {turbineGeometries.map(({ blade, disc, span, cfg }, stageIdx) => (
          <group
            key={`turb-stage-${stageIdx}`}
            ref={(el) => (turbineStagesRefs.current[stageIdx] = el)}
            position={[0, 0, cfg.z]}
            onClick={(e) => {
              e.stopPropagation()
              onSelectStage('turbine')
            }}
          >
            {/* Turbine Rotor Disc Rim */}
            <mesh geometry={disc} material={materials.inconel} position={[0, 0, -0.1]} castShadow />

            {/* Inconel Blades with Camber and Twist */}
            {Array.from({ length: cfg.count }, (_, bIdx) => {
              const angle = (bIdx / cfg.count) * Math.PI * 2
              const stagger = (48 * Math.PI) / 180
              return (
                <group
                  key={`tblade-${stageIdx}-${bIdx}`}
                  position={[Math.cos(angle) * cfg.rHub, Math.sin(angle) * cfg.rHub, 0]}
                  rotation={[0, 0, angle - Math.PI / 2]}
                >
                  <group rotation={[0, stagger, 0]}>
                    <mesh geometry={blade} material={materials.inconel} castShadow />
                  </group>
                </group>
              )
            })}
          </group>
        ))}
      </group>

      {/* ─── INLET & VARIABLE GUIDE VANES (IGV) ──────────────────────────────── */}
      <group
        ref={igvGroupRef}
        position={[0, 0, -2.6]}
        onClick={(e) => {
          e.stopPropagation()
          onSelectStage('igv')
        }}
      >
        {/* Aerodynamic Intake Bullet Nosecone pointing along -Z */}
        <mesh
          position={[0, 0, -0.45]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.titanium}
          castShadow
        >
          <coneGeometry args={[0.54, 0.9, 32]} />
        </mesh>
        {/* Intake Cowl Outer Ring */}
        <mesh material={materials.casing}>
          <torusGeometry args={[1.52, 0.08, 16, 64]} />
        </mesh>
        {/* 16 Inlet Guide Vanes (Stationary / Variable Actuated) */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <group
              key={`igv-${i}`}
              position={[Math.cos(angle) * 0.54, Math.sin(angle) * 0.54, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
            >
              <mesh geometry={igvBladeGeom} material={materials.titanium} />
            </group>
          )
        })}
      </group>

      {/* ─── CAN-ANNULAR COMBUSTOR SECTION (8 CANS WITH FLAME) ───────────────── */}
      <group
        onClick={(e) => {
          e.stopPropagation()
          onSelectStage('combustor')
        }}
      >
        {Array.from({ length: COMBUSTOR_CANS_COUNT }, (_, idx) => {
          const angle = (idx / COMBUSTOR_CANS_COUNT) * Math.PI * 2
          const cx = Math.cos(angle) * COMBUSTOR_RADIUS
          const cy = Math.sin(angle) * COMBUSTOR_RADIUS

          return (
            <group
              key={`can-${idx}`}
              ref={(el) => (combustorCansRefs.current[idx] = el)}
              position={[cx, cy, 0.2]}
            >
              {/* Outer Perforated Flame Tube Liner (running along Z axis) */}
              <mesh
                rotation={[Math.PI / 2, 0, 0]}
                material={materials.ceramicTBC}
                castShadow
              >
                <cylinderGeometry args={[0.18, 0.21, 0.9, 24, 1, true]} />
              </mesh>
              {/* Swirler / Fuel Injector Nozzle Head at Can Entrance */}
              <mesh
                position={[0, 0, -0.48]}
                rotation={[Math.PI / 2, 0, 0]}
                material={materials.titanium}
              >
                <cylinderGeometry args={[0.14, 0.17, 0.12, 16]} />
              </mesh>
              {/* Fuel Delivery Supply Tube */}
              <mesh
                position={[0, 0, -0.6]}
                rotation={[Math.PI / 2, 0, 0]}
                material={materials.shaftSteel}
              >
                <cylinderGeometry args={[0.035, 0.035, 0.16, 12]} />
              </mesh>
              {/* Glowing Incandescent Combustion Plasma Core */}
              <mesh
                ref={(el) => (flameCoresRef.current[idx] = el)}
                position={[0, 0, 0.05]}
                material={materials.flamePlasma}
              >
                <sphereGeometry args={[0.13, 16, 16]} />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* ─── EXHAUST DIFFUSER & BEARING HOUSING ──────────────────────────────── */}
      <group
        ref={exhaustGroupRef}
        position={[0, 0, 2.3]}
        onClick={(e) => {
          e.stopPropagation()
          onSelectStage('exhaust')
        }}
      >
        {/* Central Aerodynamic Exhaust Tailcone pointing aft (+Z) */}
        <mesh
          position={[0, 0, 0.4]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.casing}
          castShadow
        >
          <coneGeometry args={[0.62, 1.3, 32]} />
        </mesh>
        {/* Outer Diverging Exhaust Casing (along Z) */}
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.casing}
        >
          <cylinderGeometry args={[1.65, 1.48, 0.9, 48, 1, true]} />
        </mesh>
        {/* 4 Structural Aerodynamic Support Struts */}
        {Array.from({ length: 4 }, (_, i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <mesh
              key={`exhaust-strut-${i}`}
              position={[Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
              material={materials.casing}
            >
              <boxGeometry args={[0.08, 0.88, 0.35]} />
            </mesh>
          )
        })}
      </group>

      {/* ─── CUTAWAY CASING (TOP & BOTTOM SPLIT HALF-SHELLS) ────────────────── */}
      <group>
        {/* Upper Casing Half-Shell (lifts in exploded mode) */}
        <group ref={casingTopRef}>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.1]}
            material={materials.casing}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[1.56, 1.62, 3.8, 36, 1, true, 0, Math.PI * 0.75]} />
          </mesh>
          {/* Stiffening Ribs on Upper Shell */}
          {[-1.2, 0, 1.2].map((zPos, rIdx) => (
            <mesh key={`rib-top-${rIdx}`} position={[0, 0, zPos]} material={materials.titanium}>
              <torusGeometry args={[1.6, 0.045, 12, 32, Math.PI * 0.75]} />
            </mesh>
          ))}
        </group>

        {/* Lower Casing Half-Shell (descends in exploded mode) */}
        <group ref={casingBottomRef}>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.1]}
            material={materials.casing}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[1.56, 1.62, 3.8, 36, 1, true, Math.PI, Math.PI * 0.75]} />
          </mesh>
          {/* Stiffening Ribs on Lower Shell */}
          {[-1.2, 0, 1.2].map((zPos, rIdx) => (
            <mesh key={`rib-bot-${rIdx}`} position={[0, 0, zPos]} material={materials.titanium}>
              <torusGeometry args={[1.6, 0.045, 12, 32, Math.PI * 0.75]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ─── LASER DATUM ALIGNMENT GUIDE LINE (SHOWN IN EXPLODED MODE) ─────── */}
      {mode === 'exploded' && (
        <mesh
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.titanium}
        >
          <cylinderGeometry args={[0.008, 0.008, 9.5, 8]} />
        </mesh>
      )}
    </group>
  )
}
