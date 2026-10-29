import * as THREE from 'three'

/**
 * Generates an aerodynamically contoured, twisted airfoil blade (NACA 4-digit based).
 * Supports spanwise chord taper, thickness variation, and aerodynamic twist angle.
 */
export function createLoftedAirfoilGeometry(options = {}) {
  const {
    chordRoot = 0.22,
    chordTip = 0.14,
    span = 0.45,
    rootThickness = 0.16,
    tipThickness = 0.08,
    twistDeg = 18,
    camber = 0.07,
    segmentsSpan = 10,
    pointsPerSection = 24,
  } = options

  const vertices = []
  const normals = []
  const uvs = []
  const indices = []

  // Pre-calculate profile points for each section along the span
  const sections = []

  for (let s = 0; s <= segmentsSpan; s++) {
    const frac = s / segmentsSpan // 0 at root, 1 at tip
    const currentSpan = frac * span
    const currentChord = chordRoot + frac * (chordTip - chordRoot)
    const currentThickness = rootThickness + frac * (tipThickness - rootThickness)
    const currentTwist = (frac * twistDeg * Math.PI) / 180

    const sectionPts = []

    // Airfoil points: suction side (upper) and pressure side (lower)
    const numSidePts = Math.floor(pointsPerSection / 2)
    for (let i = 0; i <= numSidePts; i++) {
      const xNorm = i / numSidePts // 0 to 1
      // NACA 4-digit thickness distribution
      const yt =
        5 *
        currentThickness *
        (0.2969 * Math.sqrt(xNorm) -
          0.126 * xNorm -
          0.3516 * xNorm * xNorm +
          0.2843 * xNorm * xNorm * xNorm -
          0.1015 * xNorm * xNorm * xNorm * xNorm)

      // Parabolic camber line
      const yc =
        camber *
        (xNorm < 0.4
          ? (2 * 0.4 * xNorm - xNorm * xNorm) / 0.16
          : (1 - 2 * 0.4 + 2 * 0.4 * xNorm - xNorm * xNorm) / 0.36)

      const x = (xNorm - 0.25) * currentChord // center around 25% aerodynamic center
      const y = (yc + yt) * currentChord

      // Apply twist rotation around the spanwise axis
      const cosT = Math.cos(currentTwist)
      const sinT = Math.sin(currentTwist)
      const xRot = x * cosT - y * sinT
      const yRot = x * sinT + y * cosT

      sectionPts.push(new THREE.Vector3(xRot, currentSpan, yRot))
    }

    // Pressure side (returning to leading edge)
    for (let i = numSidePts - 1; i > 0; i--) {
      const xNorm = i / numSidePts
      const yt =
        5 *
        currentThickness *
        (0.2969 * Math.sqrt(xNorm) -
          0.126 * xNorm -
          0.3516 * xNorm * xNorm +
          0.2843 * xNorm * xNorm * xNorm -
          0.1015 * xNorm * xNorm * xNorm * xNorm)
      const yc =
        camber *
        (xNorm < 0.4
          ? (2 * 0.4 * xNorm - xNorm * xNorm) / 0.16
          : (1 - 2 * 0.4 + 2 * 0.4 * xNorm - xNorm * xNorm) / 0.36)

      const x = (xNorm - 0.25) * currentChord
      const y = (yc - yt) * currentChord

      const cosT = Math.cos(currentTwist)
      const sinT = Math.sin(currentTwist)
      const xRot = x * cosT - y * sinT
      const yRot = x * sinT + y * cosT

      sectionPts.push(new THREE.Vector3(xRot, currentSpan, yRot))
    }

    sections.push(sectionPts)
  }

  const ptsCount = sections[0].length

  // Build vertices and UVs
  for (let s = 0; s <= segmentsSpan; s++) {
    const v = s / segmentsSpan
    for (let p = 0; p < ptsCount; p++) {
      const pt = sections[s][p]
      vertices.push(pt.x, pt.y, pt.z)
      const u = p / ptsCount
      uvs.push(u, v)
    }
  }

  // Connect adjacent sections with quads (two triangles)
  for (let s = 0; s < segmentsSpan; s++) {
    for (let p = 0; p < ptsCount; p++) {
      const nextP = (p + 1) % ptsCount
      const i0 = s * ptsCount + p
      const i1 = s * ptsCount + nextP
      const i2 = (s + 1) * ptsCount + p
      const i3 = (s + 1) * ptsCount + nextP

      indices.push(i0, i2, i1)
      indices.push(i1, i2, i3)
    }
  }

  // Cap root and tip
  const rootCenterIdx = vertices.length / 3
  vertices.push(0, 0, 0)
  uvs.push(0.5, 0.5)
  for (let p = 0; p < ptsCount; p++) {
    const nextP = (p + 1) % ptsCount
    indices.push(rootCenterIdx, nextP, p)
  }

  const tipCenterIdx = vertices.length / 3
  vertices.push(0, span, 0)
  uvs.push(0.5, 0.5)
  const tipOffset = segmentsSpan * ptsCount
  for (let p = 0; p < ptsCount; p++) {
    const nextP = (p + 1) % ptsCount
    indices.push(tipCenterIdx, tipOffset + p, tipOffset + nextP)
  }

  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geom.setIndex(indices)
  geom.computeVertexNormals()

  return geom
}

/**
 * Creates a flanged industrial rotor disc with fir-tree rim rim detailing.
 */
export function createRotorDiscGeometry(innerRadius, outerRadius, thickness, lip = 0.03) {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false)

  const hole = new THREE.Path()
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true)
  shape.holes.push(hole)

  const extrudeSettings = {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: lip,
    bevelSize: lip,
    bevelSegments: 2,
    curveSegments: 48,
  }

  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

/**
 * Creates a split casing cutaway shell (e.g. 200° or 220° arc) with flanges.
 */
export function createSplitCasingGeometry(radiusStart, radiusEnd, length, arc = Math.PI * 1.25, thickness = 0.05) {
  const geom = new THREE.CylinderGeometry(
    radiusEnd,
    radiusStart,
    length,
    48,
    1,
    true,
    -arc / 2,
    arc
  )
  return geom
}
