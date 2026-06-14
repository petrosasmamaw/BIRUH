import { useEffect, useState, useCallback } from 'react'

function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

export const FLOW_WAYPOINTS_DESKTOP = [
  { x: 1.85, y: 0, scale: 0.62, glowX: 72, glowY: 48, glowScale: 0.72 },
  { x: 0.4, y: 1.1, scale: 0.58, glowX: 54, glowY: 30, glowScale: 0.68 },
  { x: -1.75, y: 0.5, scale: 0.56, glowX: 26, glowY: 44, glowScale: 0.7 },
  { x: 1.7, y: -0.35, scale: 0.58, glowX: 70, glowY: 54, glowScale: 0.68 },
  { x: -1.55, y: -0.5, scale: 0.54, glowX: 24, glowY: 58, glowScale: 0.65 },
  { x: 0, y: -1.0, scale: 0.52, glowX: 50, glowY: 66, glowScale: 0.64 },
  { x: 1.35, y: 0.25, scale: 0.5, glowX: 64, glowY: 46, glowScale: 0.62 },
  { x: 0, y: 0, scale: 0.48, glowX: 50, glowY: 50, glowScale: 0.68 },
  { x: 0, y: 1.4, scale: 0.42, glowX: 50, glowY: 72, glowScale: 0.58 },
]

export const FLOW_WAYPOINTS_MOBILE = [
  { x: 0, y: 0.6, scale: 0.44, glowX: 50, glowY: 32, glowScale: 0.58 },
  { x: 0.35, y: 0.4, scale: 0.42, glowX: 58, glowY: 38, glowScale: 0.55 },
  { x: -0.3, y: 0.35, scale: 0.4, glowX: 42, glowY: 40, glowScale: 0.55 },
  { x: 0.4, y: 0.2, scale: 0.42, glowX: 55, glowY: 42, glowScale: 0.56 },
  { x: -0.35, y: 0.15, scale: 0.38, glowX: 45, glowY: 44, glowScale: 0.52 },
  { x: 0, y: 0, scale: 0.38, glowX: 50, glowY: 46, glowScale: 0.52 },
  { x: 0.3, y: 0.1, scale: 0.36, glowX: 54, glowY: 43, glowScale: 0.5 },
  { x: 0, y: -0.1, scale: 0.35, glowX: 50, glowY: 48, glowScale: 0.54 },
  { x: 0, y: 0.5, scale: 0.32, glowX: 50, glowY: 55, glowScale: 0.48 },
]

export function interpolateFlow(phase, waypoints = FLOW_WAYPOINTS_DESKTOP) {
  const max = waypoints.length - 1
  const clamped = Math.max(0, Math.min(max, phase))
  const i = Math.floor(clamped)
  const frac = smoothstep(clamped - i)
  const a = waypoints[i]
  const b = waypoints[Math.min(i + 1, max)]

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
  const [flow, setFlow] = useState(() => interpolateFlow(0, FLOW_WAYPOINTS_DESKTOP))

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

    const waypoints = window.innerWidth < 1024 ? FLOW_WAYPOINTS_MOBILE : FLOW_WAYPOINTS_DESKTOP
    setFlow(interpolateFlow(phase, waypoints))
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
