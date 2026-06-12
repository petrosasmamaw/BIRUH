import { useEffect, useState, useCallback } from 'react'

function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

export const FLOW_WAYPOINTS = [
  { x: 1.85, y: 0, scale: 1.2, glowX: 72, glowY: 48, glowScale: 1.15 },
  { x: 0.4, y: 1.1, scale: 1.08, glowX: 54, glowY: 30, glowScale: 1.05 },
  { x: -1.75, y: 0.5, scale: 1.05, glowX: 26, glowY: 44, glowScale: 1.08 },
  { x: 1.7, y: -0.35, scale: 1.08, glowX: 70, glowY: 54, glowScale: 1.05 },
  { x: -1.55, y: -0.5, scale: 1.02, glowX: 24, glowY: 58, glowScale: 1.02 },
  { x: 0, y: -1.0, scale: 0.98, glowX: 50, glowY: 66, glowScale: 1 },
  { x: 1.35, y: 0.25, scale: 0.95, glowX: 64, glowY: 46, glowScale: 0.98 },
  { x: 0, y: 0, scale: 0.92, glowX: 50, glowY: 50, glowScale: 1.1 },
  { x: 0, y: 1.4, scale: 0.78, glowX: 50, glowY: 72, glowScale: 0.85 },
]

export function interpolateFlow(phase) {
  const max = FLOW_WAYPOINTS.length - 1
  const clamped = Math.max(0, Math.min(max, phase))
  const i = Math.floor(clamped)
  const frac = smoothstep(clamped - i)
  const a = FLOW_WAYPOINTS[i]
  const b = FLOW_WAYPOINTS[Math.min(i + 1, max)]

  return {
    x: lerp(a.x, b.x, frac),
    y: lerp(a.y, b.y, frac),
    scale: lerp(a.scale, b.scale, frac),
    glowX: lerp(a.glowX, b.glowX, frac),
    glowY: lerp(a.glowY, b.glowY, frac),
    glowScale: lerp(a.glowScale, b.glowScale, frac),
    sectionIndex: i,
    phase: clamped,
  }
}

export function useSectionFlow(sectionRefs) {
  const [flow, setFlow] = useState(() => interpolateFlow(0))

  const computeFlow = useCallback(() => {
    const refs = sectionRefs.current.filter(Boolean)
    if (!refs.length) return

    const vh = window.innerHeight
    const scrollCenter = window.scrollY + vh * 0.48
    const centers = refs.map((el) => el.offsetTop + el.offsetHeight / 2)

    let phase = 0
    if (scrollCenter <= centers[0]) {
      phase = 0
    } else if (scrollCenter >= centers[centers.length - 1]) {
      phase = centers.length - 1
    } else {
      for (let i = 0; i < centers.length - 1; i++) {
        if (scrollCenter >= centers[i] && scrollCenter < centers[i + 1]) {
          const t = (scrollCenter - centers[i]) / (centers[i + 1] - centers[i])
          phase = i + t
          break
        }
      }
    }

    setFlow(interpolateFlow(phase))
  }, [sectionRefs])

  useEffect(() => {
    computeFlow()
    window.addEventListener('scroll', computeFlow, { passive: true })
    window.addEventListener('resize', computeFlow)
    return () => {
      window.removeEventListener('scroll', computeFlow)
      window.removeEventListener('resize', computeFlow)
    }
  }, [computeFlow])

  return flow
}
