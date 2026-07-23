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
 * Radial bloom — short curling tendrils in ALL directions from the seed.
 * Angles evenly cover a full circle (not only downward).
 */
const RADIAL = [
  { id: 'r0', angle: -Math.PI / 2, len: 0.42, curls: 2.8, amp: 28, phase: 0.2, layer: 'front', width: 2.6 },
  { id: 'r1', angle: -Math.PI / 2 + 0.7, len: 0.38, curls: 3.2, amp: 32, phase: 0.9, layer: 'mid', width: 2.0 },
  { id: 'r2', angle: -Math.PI / 2 + 1.4, len: 0.4, curls: 2.4, amp: 26, phase: 1.5, layer: 'front', width: 2.4 },
  { id: 'r3', angle: -Math.PI / 2 + 2.1, len: 0.36, curls: 3.5, amp: 30, phase: 2.1, layer: 'back', width: 1.4 },
  { id: 'r4', angle: Math.PI / 2, len: 0.4, curls: 2.6, amp: 28, phase: 0.4, layer: 'mid', width: 1.9 },
  { id: 'r5', angle: Math.PI / 2 + 0.75, len: 0.37, curls: 3.1, amp: 34, phase: 1.2, layer: 'front', width: 2.3 },
  { id: 'r6', angle: Math.PI / 2 + 1.5, len: 0.39, curls: 2.9, amp: 27, phase: 2.6, layer: 'back', width: 1.35 },
  { id: 'r7', angle: Math.PI / 2 + 2.2, len: 0.41, curls: 3.4, amp: 31, phase: 0.7, layer: 'mid', width: 1.85 },
]

/**
 * Downward snake trunks — long stable paths that grow to page end on scroll.
 * Each has a fixed wave recipe so motion is smooth, not random.
 */
const SNAKES = [
  { id: 's0', xBias: 0, amp: 70, freq: 1.15, phase: 0.0, layer: 'front', width: 3.4, nodes: 4 },
  { id: 's1', xBias: -90, amp: 55, freq: 1.55, phase: 1.4, layer: 'mid', width: 2.3, nodes: 3 },
  { id: 's2', xBias: 95, amp: 60, freq: 1.35, phase: 2.5, layer: 'mid', width: 2.1, nodes: 3 },
  { id: 's3', xBias: -45, amp: 42, freq: 1.9, phase: 0.8, layer: 'back', width: 1.5, nodes: 2 },
  { id: 's4', xBias: 50, amp: 48, freq: 1.7, phase: 3.1, layer: 'back', width: 1.45, nodes: 2 },
]

const LAYER = {
  back: { opacity: 0.4, speed: 0.22 },
  mid: { opacity: 0.78, speed: 0.38 },
  front: { opacity: 1, speed: 0.52 },
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

/** Radial bloom points — grow outward in the tendril's angle */
function buildRadialPoints(cfg, origin, radius, time) {
  const segs = 28
  const pts = []
  const drift = time * LAYER[cfg.layer].speed
  const cosA = Math.cos(cfg.angle)
  const sinA = Math.sin(cfg.angle)
  const perpX = -sinA
  const perpY = cosA

  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const along = t * cfg.len * radius
    const curl =
      Math.sin(t * Math.PI * cfg.curls + cfg.phase + drift) *
      cfg.amp *
      Math.sin(t * Math.PI) *
      (0.45 + t)
    const tipSpiral =
      Math.sin(t * Math.PI * cfg.curls * 1.6 + cfg.phase + drift * 0.8) *
      (cfg.amp * 0.45) *
      t *
      t

    const docX = origin.docX + cosA * along + perpX * (curl + tipSpiral)
    const docY = origin.docY + sinA * along + perpY * (curl * 0.85 + tipSpiral * 0.5)
    pts.push({ x: docX, y: docY, docX, docY, t })
  }
  return pts
}

/**
 * Downward snake — stable sine path from seed to page bottom.
 * Ambient drift is tiny phase shift only (smooth, not random rebuild).
 */
function buildSnakePoints(cfg, origin, pageBottom, time) {
  const segs = 64
  const pts = []
  const travel = Math.max(120, pageBottom - origin.docY)
  const drift = time * LAYER[cfg.layer].speed * 0.35

  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const docY = origin.docY + t * travel
    // Envelope grows gently so early path stays near seed, then snakes wider
    const envelope = Math.sin(t * Math.PI * 0.5) // 0→1 smooth
    const wave =
      Math.sin(t * Math.PI * 2 * cfg.freq + cfg.phase + drift) * cfg.amp * envelope
    const secondary =
      Math.sin(t * Math.PI * 2 * cfg.freq * 0.55 + cfg.phase * 1.3 + drift * 0.6) *
      cfg.amp *
      0.28 *
      envelope

    const docX = origin.docX + cfg.xBias * envelope + wave + secondary
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
      const radialRadius = Math.min(size.w, size.h) * 0.42

      // --- Radial bloom (all directions) ---
      for (const cfg of RADIAL) {
        const el = getEl(`[data-tendril="${cfg.id}"]`)
        if (!el) continue
        const pts = toView(buildRadialPoints(cfg, origin, radialRadius, s.time), scrollY)
        el.setAttribute('d', pointsToPath(pts))
        const len = ensureLength(el, cfg.id)
        // Radial fully drawn after brief intro; use growth of first 18% for draw-in
        const radialDraw = reduced ? 1 : clamp(s.growth / 0.12 + (now > 1600 ? 1 : now / 1600), 0, 1)
        if (len) el.style.strokeDashoffset = String(len * (1 - radialDraw))
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
          <ellipse cx="18" cy="-14" rx="5" ry="2.4" fill={COLORS.mid} transform="rotate(-35 18 -14)" opacity="0.85" />
          <ellipse cx="-16" cy="10" rx="4.5" ry="2.1" fill={COLORS.front} transform="rotate(40 -16 10)" opacity="0.8" />
          <ellipse cx="12" cy="22" rx="4" ry="1.8" fill={COLORS.tip} transform="rotate(-20 12 22)" opacity="0.75" />
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
