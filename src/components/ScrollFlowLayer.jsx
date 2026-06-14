import { useEffect, useRef } from 'react'
import { initFlowScene } from '../three/FlowScene'
import { useSectionFlow } from '../hooks/useSectionFlow'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ScrollFlowLayer({ sectionRefs }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const glowWrapRef = useRef(null)
  const frameRef = useRef(null)
  const flow = useSectionFlow(sectionRefs)
  const isMobile = useIsMobile(1024)

  useEffect(() => {
    if (!canvasRef.current) return
    sceneRef.current?.dispose()
    sceneRef.current = initFlowScene(canvasRef.current, { isMobile })
    return () => sceneRef.current?.dispose()
  }, [isMobile])

  useEffect(() => {
    sceneRef.current?.setFlowTarget(flow.x, flow.y, flow.scale)

    const scale = isMobile
      ? 0.5 + flow.glowScale * 0.22
      : 0.52 + flow.glowScale * 0.28
    const opacity = isMobile
      ? 0.28 + flow.scale * 0.18
      : 0.32 + flow.scale * 0.16
    const transform = `translate(-50%, -50%) scale(${scale})`

    if (glowWrapRef.current) {
      glowWrapRef.current.style.left = `${flow.glowX}%`
      glowWrapRef.current.style.top = `${flow.glowY}%`
      glowWrapRef.current.style.opacity = String(opacity)
      glowWrapRef.current.style.transform = transform
    }

    if (frameRef.current) {
      frameRef.current.style.left = `${flow.glowX}%`
      frameRef.current.style.top = `${flow.glowY}%`
      frameRef.current.style.transform = `${transform} rotate(${flow.phase * (isMobile ? 8 : 12)}deg)`
    }
  }, [flow, isMobile])

  return (
    <div className={`scroll-flow-layer ${isMobile ? 'scroll-flow-layer--mobile' : ''}`} aria-hidden="true">
      <div ref={frameRef} className="scroll-flow-tech-frame">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <polygon
            points="100,6 186,54 186,146 100,194 14,146 14,54"
            stroke="rgba(212, 184, 150, 0.28)"
            strokeWidth="1"
          />
          <polygon
            points="100,22 168,58 168,142 100,178 32,142 32,58"
            stroke="rgba(245, 224, 184, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
      <div ref={glowWrapRef} className="scroll-flow-glow-wrap">
        <div className="scroll-flow-glow" />
        <div className="scroll-flow-glow-core" />
      </div>
      <canvas ref={canvasRef} className="scroll-flow-canvas" />
    </div>
  )
}
