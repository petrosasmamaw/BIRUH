import { useEffect, useRef } from 'react'
import { initFlowScene } from '../three/FlowScene'
import { useSectionFlow } from '../hooks/useSectionFlow'

export default function ScrollFlowLayer({ sectionRefs }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const glowWrapRef = useRef(null)
  const frameRef = useRef(null)
  const flow = useSectionFlow(sectionRefs)

  useEffect(() => {
    if (!canvasRef.current) return
    sceneRef.current = initFlowScene(canvasRef.current)
    return () => sceneRef.current?.dispose()
  }, [])

  useEffect(() => {
    sceneRef.current?.setFlowTarget(flow.x, flow.y, flow.scale)

    const scale = 0.88 + flow.glowScale * 0.48
    const opacity = 0.65 + flow.scale * 0.25
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
      frameRef.current.style.transform = `${transform} rotate(${flow.phase * 12}deg)`
    }
  }, [flow])

  return (
    <div className="scroll-flow-layer" aria-hidden="true">
      <div ref={frameRef} className="scroll-flow-tech-frame">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <polygon
            points="100,6 186,54 186,146 100,194 14,146 14,54"
            stroke="rgba(196,122,18,0.45)"
            strokeWidth="1.2"
          />
          <polygon
            points="100,22 168,58 168,142 100,178 32,142 32,58"
            stroke="rgba(240,168,48,0.28)"
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
