import { useEffect, useMemo, useRef, useState } from 'react'

const COLORS = {
  back: '#9BB87A',
  mid: '#5F8F2E',
  front: '#3E6B15',
  frontDeep: '#25450C',
  gold: '#C4A35A',
  goldSoft: '#E8C992',
  tip: '#6FAF3C',
}

const NODE_LABELS = ['Auth', 'API', 'Data', 'AI', 'LMS', 'ERP', 'Cloud', 'Pay']

/**
 * Start-position bloom — larger visible curls in all directions around the seed.
 * Fixed size (does NOT grow with scroll). Snakes handle downward growth.
 */
const RADIAL = [
  { id: 'r0', angle: -Math.PI / 2, len: 0.78, curls: 3.4, amp: 22, coil: 2.4, coilR: 20, dir: 1, phase: 0.2, layer: 'front', width: 2.4 },
  { id: 'r1', angle: -Math.PI / 2 + 0.72, len: 0.7, curls: 3.8, amp: 20, coil: 2.7, coilR: 18, dir: -1, phase: 0.9, layer: 'mid', width: 2.0 },
  { id: 'r2', angle: -Math.PI / 2 + 1.45, len: 0.74, curls: 3.2, amp: 21, coil: 2.2, coilR: 19, dir: 1, phase: 1.5, layer: 'front', width: 2.25 },
  { id: 'r3', angle: -Math.PI / 2 + 2.15, len: 0.66, curls: 4.0, amp: 18, coil: 2.9, coilR: 16, dir: -1, phase: 2.1, layer: 'back', width: 1.6 },
  { id: 'r4', angle: Math.PI / 2, len: 0.72, curls: 3.5, amp: 21, coil: 2.5, coilR: 18, dir: 1, phase: 0.4, layer: 'mid', width: 1.95 },
  { id: 'r5', angle: Math.PI / 2 + 0.78, len: 0.7, curls: 3.7, amp: 20, coil: 2.6, coilR: 18, dir: -1, phase: 1.2, layer: 'front', width: 2.15 },
  { id: 'r6', angle: Math.PI / 2 + 1.52, len: 0.68, curls: 3.3, amp: 19, coil: 2.3, coilR: 17, dir: 1, phase: 2.6, layer: 'back', width: 1.55 },
  { id: 'r7', angle: Math.PI / 2 + 2.25, len: 0.72, curls: 3.9, amp: 20, coil: 2.7, coilR: 18, dir: -1, phase: 0.7, layer: 'mid', width: 1.9 },
  { id: 'r8', angle: 0.2, len: 0.64, curls: 3.6, amp: 18, coil: 2.5, coilR: 16, dir: 1, phase: 1.8, layer: 'back', width: 1.5 },
  { id: 'r9', angle: Math.PI - 0.25, len: 0.64, curls: 3.5, amp: 18, coil: 2.4, coilR: 16, dir: -1, phase: 2.3, layer: 'mid', width: 1.55 },
]

/**
 * Downward snake trunks — only these grow with scroll to page end.
 */
const SNAKES = [
  { id: 's0', xBias: 0, amp: 58, freq: 1.15, phase: 0.0, layer: 'front', width: 2.4, nodes: 4 },
  { id: 's1', xBias: -80, amp: 46, freq: 1.55, phase: 1.4, layer: 'mid', width: 1.7, nodes: 3 },
  { id: 's2', xBias: 85, amp: 50, freq: 1.35, phase: 2.5, layer: 'mid', width: 1.6, nodes: 3 },
  { id: 's3', xBias: -40, amp: 36, freq: 1.9, phase: 0.8, layer: 'back', width: 1.15, nodes: 2 },
  { id: 's4', xBias: 45, amp: 40, freq: 1.7, phase: 3.1, layer: 'back', width: 1.1, nodes: 2 },
]

const LAYER = {
  back: { opacity: 0.55, speed: 0.55, sway: 0.7 },
  mid: { opacity: 0.85, speed: 0.72, sway: 0.9 },
  front: { opacity: 1, speed: 0.9, sway: 1.1 },
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

/** Catmull-Rom → cubic Bezier path (smooth snake) */
function pointsToPath(pts) {
  if (pts.length < 2) return ''
  if (pts.length === 2) {
    return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`
  }

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

/**
 * Start tendrils — always sway like a tree in light wind (even when not scrolling).
 * Soft stem bend + tip coil breathing; fixed length (no scroll growth).
 */
function buildRadialPoints(cfg, origin, radius, time) {
  const segs = 40
  const pts = []
  const layer = LAYER[cfg.layer]
  const cosA = Math.cos(cfg.angle)
  const sinA = Math.sin(cfg.angle)
  const perpX = -sinA
  const perpY = cosA

  // Tree-sway: slow primary + softer secondary (always on)
  const wind1 = Math.sin(time * layer.speed * 1.15 + cfg.phase) * layer.sway
  const wind2 = Math.sin(time * layer.speed * 0.55 + cfg.phase * 1.7) * layer.sway * 0.45
  const wind3 = Math.cos(time * layer.speed * 1.8 + cfg.phase * 0.6) * layer.sway * 0.25

  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const tip = t * t // sway stronger toward tip (like real branches)
    const along = t * cfg.len * radius

    // Base organic curl of the tendril shape
    const shapeCurl =
      Math.sin(t * Math.PI * cfg.curls * 0.5 + cfg.phase) *
      cfg.amp *
      Math.sin(t * Math.PI) *
      (0.25 + t * 0.4)

    // Continuous wind sway — whole strand bends
    const sway =
      (wind1 * 16 + wind2 * 10 + wind3 * 7) * tip +
      Math.sin(t * Math.PI * 2.2 + time * layer.speed + cfg.phase) * cfg.amp * 0.35 * tip

    // Tip coil + slow breathing rotation
    const coilStart = 0.38
    const coilT = t <= coilStart ? 0 : (t - coilStart) / (1 - coilStart)
    const coilEase = coilT * coilT * (3 - 2 * coilT)
    const breathe = 1 + Math.sin(time * layer.speed * 1.4 + cfg.phase) * 0.12
    const turns = cfg.coil * coilEase * coilEase
    const spiralAng =
      turns * Math.PI * 2 * cfg.dir + cfg.phase * 0.25 + time * layer.speed * 0.65 * cfg.dir
    const spiralR =
      cfg.coilR *
      breathe *
      Math.sin(coilEase * Math.PI) *
      (0.3 + 0.7 * (1 - coilEase * 0.7))

    const spiralX = Math.cos(spiralAng) * spiralR
    const spiralY = Math.sin(spiralAng) * spiralR

    const bend = shapeCurl + sway

    const docX =
      origin.docX +
      cosA * along +
      perpX * bend +
      cosA * spiralX * 0.28 +
      perpX * spiralY
    const docY =
      origin.docY +
      sinA * along +
      perpY * bend +
      sinA * spiralX * 0.28 +
      perpY * spiralY

    pts.push({ x: docX, y: docY, docX, docY, t })
  }
  return pts
}

/**
 * Downward snake — grows with scroll, and always tree-sways (even when scroll stops).
 */
function buildSnakePoints(cfg, origin, pageBottom, time) {
  const segs = 64
  const pts = []
  const travel = Math.max(120, pageBottom - origin.docY)
  const layer = LAYER[cfg.layer]

  // Continuous wind — always on, independent of scroll
  const windA = Math.sin(time * layer.speed * 1.05 + cfg.phase) * layer.sway
  const windB = Math.sin(time * layer.speed * 0.48 + cfg.phase * 1.6) * layer.sway * 0.55
  const windC = Math.cos(time * layer.speed * 1.65 + cfg.phase * 0.7) * layer.sway * 0.3

  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const tip = t * t // sway stronger farther from seed
    const envelope = Math.sin(t * Math.PI * 0.5)

    // Stable path shape (snake route down the page)
    const baseWave =
      Math.sin(t * Math.PI * 2 * cfg.freq + cfg.phase) * cfg.amp * envelope
    const baseSecondary =
      Math.sin(t * Math.PI * 2 * cfg.freq * 0.55 + cfg.phase * 1.3) *
      cfg.amp *
      0.28 *
      envelope

    // Tree-sway overlay — keeps moving when user stops scrolling
    const swayX =
      (windA * 22 + windB * 14 + windC * 9) * tip +
      Math.sin(t * Math.PI * 2.4 + time * layer.speed * 1.2 + cfg.phase) *
        (10 + cfg.amp * 0.12) *
        tip
    const swayY =
      Math.sin(t * Math.PI * 1.6 + time * layer.speed * 0.9 + cfg.phase) * 6 * tip

    // Soft tip curl at the end (like a tendril tip)
    const curlT = Math.max(0, (t - 0.82) / 0.18)
    const tipCurl =
      Math.sin(time * layer.speed * 1.3 + cfg.phase + curlT * Math.PI * 2) *
      12 *
      curlT *
      curlT

    const docY = origin.docY + t * travel + swayY
    const docX =
      origin.docX + cfg.xBias * envelope + baseWave + baseSecondary + swayX + tipCurl

    pts.push({ x: docX, y: docY, docX, docY, t })
  }
  return pts
}

function toView(pts, scrollY) {
  return pts.map((p) => ({
    ...p,
    x: p.docX,
    y: p.docY - scrollY,
  }))
}

export default function VineGrowthLayer() {
  const svgRef = useRef(null)
  const [size, setSize] = useState({ w: 1200, h: 800 })
  const reducedRef = useRef(false)
  const stateRef = useRef({
    time: 0,
    scrollY: 0,
    growth: 0, // smoothed 0→1
    targetGrowth: 0,
  })
  const pathMeta = useRef(new Map()) // id → { len }

  const origin = useMemo(() => {
    const mobile = size.w < 1024
    return {
      docX: mobile ? size.w * 0.5 : size.w * 0.72,
      docY: mobile ? size.h * 0.38 : size.h * 0.42,
    }
  }, [size])

  useEffect(() => {
    reducedRef.current = prefersReducedMotion()
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let raf = 0
    let running = true
    const root = () => svgRef.current

    const getEl = (sel) => root()?.querySelector(sel)
    const getAll = (sel) => [...(root()?.querySelectorAll(sel) || [])]

    const ensureLength = (el, id) => {
      try {
        const len = el.getTotalLength()
        if (!len || !Number.isFinite(len)) return pathMeta.current.get(id)?.len || 0
        const prev = pathMeta.current.get(id)?.len || 0
        // Only refresh dasharray when length meaningfully changes (avoids flicker)
        if (Math.abs(len - prev) > 2) {
          pathMeta.current.set(id, { len })
          el.style.strokeDasharray = String(len)
        } else if (!prev) {
          pathMeta.current.set(id, { len })
          el.style.strokeDasharray = String(len)
        }
        return pathMeta.current.get(id)?.len || len
      } catch {
        return pathMeta.current.get(id)?.len || 0
      }
    }

    const tick = (now) => {
      if (!running) return
      const s = stateRef.current
      const scrollY = window.scrollY || 0
      const vh = window.innerHeight || 800
      const pageH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        vh,
      )
      const reduced = reducedRef.current

      s.time = reduced ? 0 : now * 0.001
      s.scrollY = scrollY

      // Growth: vine tip stays ~90% down the viewport, until page end
      const revealDocY = scrollY + vh * 0.92
      const travel = Math.max(1, pageH - origin.docY - 40)
      s.targetGrowth = reduced ? 1 : clamp((revealDocY - origin.docY) / travel, 0, 1)
      // Smooth lerp so snake extends continuously, not in jumps
      s.growth += (s.targetGrowth - s.growth) * (reduced ? 1 : 0.08)

      const seedX = origin.docX
      const seedY = origin.docY - scrollY

      const seed = getEl('[data-seed]')
      if (seed) {
        seed.setAttribute('x', String(seedX - 28))
        seed.setAttribute('y', String(seedY - 28))
      }
      const leaves = getEl('[data-leaves]')
      if (leaves) leaves.setAttribute('transform', `translate(${seedX}, ${seedY})`)

      const pageBottom = pageH - 24
      // Larger bloom around seed — fixed size, not scroll-grown
      const radialRadius = Math.min(420, Math.min(size.w, size.h) * 0.48)

      for (const cfg of RADIAL) {
        const el = getEl(`[data-tendril="${cfg.id}"]`)
        if (!el) continue
        const pts = toView(buildRadialPoints(cfg, origin, radialRadius, s.time), scrollY)
        el.setAttribute('d', pointsToPath(pts))
        const len = ensureLength(el, cfg.id)
        // Draw-in once by time only (never grows with scroll)
        const radialDraw = reduced ? 1 : clamp(now / 1200, 0, 1)
        if (len) el.style.strokeDashoffset = String(len * (1 - radialDraw))
        el.style.opacity = '1'
      }

      // --- Downward snakes ---
      let tip = null
      let tipDocY = -Infinity
      const nodesOut = []

      for (const cfg of SNAKES) {
        const el = getEl(`[data-tendril="${cfg.id}"]`)
        if (!el) continue
        const full = buildSnakePoints(cfg, origin, pageBottom, s.time)
        const pts = toView(full, scrollY)
        el.setAttribute('d', pointsToPath(pts))
        const len = ensureLength(el, cfg.id)

        // Reveal along path length by smoothed growth (snake draw)
        const reveal = reduced ? 1 : s.growth
        if (len) el.style.strokeDashoffset = String(len * (1 - reveal))

        // Tip = point along path at growth
        const tipIdx = Math.min(full.length - 1, Math.floor(reveal * (full.length - 1)))
        const tipPt = pts[tipIdx]
        if (tipPt && full[tipIdx].docY > tipDocY) {
          tipDocY = full[tipIdx].docY
          tip = tipPt
        }

        // Nodes along revealed portion
        for (let n = 0; n < cfg.nodes; n++) {
          const nt = 0.15 + (n / Math.max(1, cfg.nodes)) * 0.75
          if (nt > reveal + 0.02) continue
          const idx = Math.min(full.length - 1, Math.floor(nt * (full.length - 1)))
          const p = pts[idx]
          const fp = full[idx]
          nodesOut.push({
            x: p.x,
            y: p.y,
            docY: fp.docY,
            label: NODE_LABELS[(cfg.id.charCodeAt(1) + n) % NODE_LABELS.length],
          })
        }
      }

      const tipEl = getEl('[data-growth-tip]')
      if (tipEl && tip) {
        tipEl.setAttribute('cx', tip.x)
        tipEl.setAttribute('cy', tip.y)
        tipEl.style.opacity = reduced ? '0' : String(0.4 + s.growth * 0.55)
      }

      const nodeEls = getAll('[data-node]')
      nodesOut.slice(0, nodeEls.length).forEach((n, i) => {
        const g = nodeEls[i]
        g.setAttribute('transform', `translate(${n.x}, ${n.y})`)
        g.style.opacity = s.growth > 0.08 || reduced ? '1' : '0'
        const label = g.querySelector('text')
        if (label) label.textContent = n.label
      })
      for (let i = nodesOut.length; i < nodeEls.length; i++) {
        nodeEls[i].style.opacity = '0'
      }

      const links = getAll('[data-link]')
      links.forEach((line, i) => {
        const a = nodesOut[i]
        const b = nodesOut[i + 1]
        if (!a || !b) {
          line.style.opacity = '0'
          return
        }
        line.setAttribute('x1', a.x)
        line.setAttribute('y1', a.y)
        line.setAttribute('x2', b.x)
        line.setAttribute('y2', b.y)
        line.style.opacity = '0.5'
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [origin, size.w, size.h])

  const nodeSlots = useMemo(() => Array.from({ length: 16 }, (_, i) => i), [])
  const linkSlots = useMemo(() => Array.from({ length: 14 }, (_, i) => i), [])

  return (
    <div className="vine-growth-layer" aria-hidden="true">
      <svg
        ref={svgRef}
        className="vine-growth-svg"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
      >
        <defs>
          <linearGradient id="vineFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.tip} />
            <stop offset="50%" stopColor={COLORS.front} />
            <stop offset="100%" stopColor={COLORS.frontDeep} />
          </linearGradient>
          <filter id="vineBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
          <filter id="tipGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Back */}
        <g opacity={LAYER.back.opacity} filter="url(#vineBlur)">
          {[...RADIAL, ...SNAKES]
            .filter((t) => t.layer === 'back')
            .map((t) => (
              <path
                key={t.id}
                data-tendril={t.id}
                fill="none"
                stroke={COLORS.back}
                strokeWidth={t.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                d=""
              />
            ))}
        </g>

        {/* Mid */}
        <g opacity={LAYER.mid.opacity}>
          {[...RADIAL, ...SNAKES]
            .filter((t) => t.layer === 'mid')
            .map((t) => (
              <path
                key={t.id}
                data-tendril={t.id}
                fill="none"
                stroke={COLORS.mid}
                strokeWidth={t.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                d=""
              />
            ))}
        </g>

        {/* Front */}
        <g opacity={LAYER.front.opacity}>
          {[...RADIAL, ...SNAKES]
            .filter((t) => t.layer === 'front')
            .map((t) => (
              <path
                key={t.id}
                data-tendril={t.id}
                fill="none"
                stroke={t.id.startsWith('s') ? 'url(#vineFrontGrad)' : COLORS.front}
                strokeWidth={t.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                d=""
              />
            ))}
        </g>

        <g className="vine-links">
          {linkSlots.map((i) => (
            <line
              key={i}
              data-link={i}
              stroke={COLORS.gold}
              strokeWidth="1"
              strokeDasharray="3 5"
              style={{ opacity: 0, transition: 'opacity 0.35s ease' }}
            />
          ))}
        </g>

        <g className="vine-nodes">
          {nodeSlots.map((i) => (
            <g
              key={i}
              data-node={`n${i}`}
              style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
            >
              <circle r="5.5" fill={COLORS.goldSoft} filter="url(#nodeGlow)" className="vine-node-pulse" />
              <circle r="2.8" fill={COLORS.gold} />
              <text x="10" y="3" className="vine-node-label" fill={COLORS.frontDeep}>
                {NODE_LABELS[i % NODE_LABELS.length]}
              </text>
            </g>
          ))}
        </g>

        <g data-leaves transform={`translate(${origin.docX}, ${origin.docY})`}>
          <ellipse cx="14" cy="-11" rx="4" ry="1.7" fill={COLORS.mid} transform="rotate(-35 14 -11)" opacity="0.85" />
          <ellipse cx="-12" cy="8" rx="3.5" ry="1.5" fill={COLORS.front} transform="rotate(40 -12 8)" opacity="0.8" />
          <ellipse cx="10" cy="16" rx="3.2" ry="1.35" fill={COLORS.tip} transform="rotate(-20 10 16)" opacity="0.75" />
        </g>

        <circle
          data-growth-tip
          r="7"
          fill={COLORS.tip}
          filter="url(#tipGlow)"
          cx={origin.docX}
          cy={origin.docY}
          style={{ opacity: 0 }}
        />

        <image
          data-seed
          href="/haregtech-mark.png"
          x={origin.docX - 28}
          y={origin.docY - 28}
          width="56"
          height="56"
          className="vine-seed-logo"
        />
      </svg>
    </div>
  )
}
