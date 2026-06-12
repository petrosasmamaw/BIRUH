import * as THREE from 'three'

const C = {
  gold: 0xc47a12,
  goldLight: 0xf0a830,
  goldDark: 0x8f5509,
  cream: 0xfff8ee,
}

function createEdgePoly(geometry, color, opacity = 1) {
  const edges = new THREE.EdgesGeometry(geometry)
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    linewidth: 1,
  })
  return { mesh: new THREE.LineSegments(edges, mat), edges, mat }
}

function createHexRing(radius, color, opacity = 0.75) {
  const points = []
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  return { mesh: new THREE.Line(geo, mat), geo, mat }
}

function createHudBrackets(size, arm, color) {
  const s = size
  const a = arm
  const verts = new Float32Array([
    -s, s, 0, -s + a, s, 0,
    -s, s, 0, -s, s - a, 0,
    s, s, 0, s - a, s, 0,
    s, s, 0, s, s - a, 0,
    -s, -s, 0, -s + a, -s, 0,
    -s, -s, 0, -s, -s + a, 0,
    s, -s, 0, s - a, -s, 0,
    s, -s, 0, s, -s + a, 0,
  ])
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
  return { mesh: new THREE.LineSegments(geo, mat), geo, mat }
}

function createBiruhLabel() {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 320
  const ctx = canvas.getContext('2d')

  const draw = () => {
    ctx.clearRect(0, 0, 640, 320)

    ctx.fillStyle = 'rgba(255, 252, 247, 0.94)'
    ctx.fillRect(148, 58, 344, 204)

    ctx.strokeStyle = '#C47A12'
    ctx.lineWidth = 2.5
    ctx.strokeRect(148, 58, 344, 204)

    ctx.strokeStyle = 'rgba(240, 168, 48, 0.5)'
    ctx.lineWidth = 1
    ctx.strokeRect(156, 66, 328, 188)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#8F5509'
    ctx.font = '700 52px "Space Mono", ui-monospace, monospace'
    ctx.fillText('ብሩህ', 320, 128)

    ctx.fillStyle = '#C47A12'
    ctx.font = '700 58px "Space Mono", ui-monospace, monospace'
    ctx.fillText('B I R U H', 320, 200)

    ctx.fillStyle = '#F0A830'
    ctx.font = '400 18px "Space Mono", ui-monospace, monospace'
    ctx.fillText('SOFTWARE', 320, 238)
  }

  draw()
  document.fonts?.ready?.then(draw)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(2.6, 1.3, 1)

  return { sprite, texture, mat, canvas, redraw: draw }
}

export function initFlowScene(canvas, { isMobile = false } = {}) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.z = 6

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const disposables = []

  const flowGroup = new THREE.Group()
  scene.add(flowGroup)

  const polyGroup = new THREE.Group()
  flowGroup.add(polyGroup)

  const outer = createEdgePoly(new THREE.IcosahedronGeometry(1.85, 0), C.gold, 0.95)
  polyGroup.add(outer.mesh)
  disposables.push(outer.edges, outer.mat)

  const mid = createEdgePoly(new THREE.IcosahedronGeometry(1.45, 0), C.goldLight, 0.7)
  polyGroup.add(mid.mesh)
  disposables.push(mid.edges, mid.mat)

  const core = createEdgePoly(new THREE.OctahedronGeometry(0.95, 0), C.goldDark, 1)
  polyGroup.add(core.mesh)
  disposables.push(core.edges, core.mat)

  const hexOuter = createHexRing(2.55, C.gold, 0.55)
  const hexInner = createHexRing(2.15, C.goldLight, 0.4)
  flowGroup.add(hexOuter.mesh, hexInner.mesh)
  disposables.push(hexOuter.geo, hexOuter.mat, hexInner.geo, hexInner.mat)

  const brackets = createHudBrackets(2.35, 0.55, C.goldLight)
  flowGroup.add(brackets.mesh)
  disposables.push(brackets.geo, brackets.mat)

  const label = createBiruhLabel()
  label.sprite.scale.set(isMobile ? 1.75 : 2.6, isMobile ? 0.88 : 1.3, 1)
  flowGroup.add(label.sprite)
  disposables.push(label.texture, label.mat)

  scene.add(new THREE.AmbientLight(0xfff8ee, 0.9))
  const keyLight = new THREE.PointLight(0xf0a830, 2.2, 16)
  keyLight.position.set(1, 2, 5)
  scene.add(keyLight)

  const particleCount = isMobile ? 28 : 72
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 14
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 2 - 2
  }
  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: C.gold,
    size: isMobile ? 0.04 : 0.028,
    transparent: true,
    opacity: isMobile ? 0.45 : 0.35,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)
  disposables.push(particleGeo, particleMat)

  const mouseInfluence = isMobile ? 0.02 : 0.05
  let target = { x: isMobile ? 0 : 2, y: 0, scale: isMobile ? 0.78 : 1.15 }
  let current = { x: isMobile ? 0 : 2, y: 0, scale: isMobile ? 0.78 : 1.15 }
  let mouseX = 0
  let mouseY = 0
  let time = 0
  let animationId = null

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
  }
  document.addEventListener('mousemove', onMouseMove)

  const setFlowTarget = (x, y, scale) => {
    target.x = x
    target.y = y
    target.scale = scale
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    time += 0.01

    current.x += (target.x - current.x) * 0.085
    current.y += (target.y - current.y) * 0.085
    current.scale += (target.scale - current.scale) * 0.085

    const floatY = Math.sin(time * 0.5) * 0.18
    flowGroup.position.set(current.x, current.y + floatY, 0)
    flowGroup.scale.setScalar(current.scale)

    polyGroup.rotation.y += 0.003
    polyGroup.rotation.x = Math.sin(time * 0.35) * 0.06 + mouseY * mouseInfluence
    polyGroup.rotation.y += mouseX * (mouseInfluence * 0.8)

    mid.mesh.rotation.y -= 0.005
    core.mesh.rotation.x += 0.004
    core.mesh.rotation.z += 0.003

    hexOuter.mesh.rotation.z += 0.002
    hexInner.mesh.rotation.z -= 0.003

    label.sprite.position.z = 0.3

    particles.position.x = current.x * 0.12
    particles.position.y = current.y * 0.12

    renderer.render(scene, camera)
  }
  animate()

  const onResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    label.redraw()
    label.texture.needsUpdate = true
  }
  onResize()
  window.addEventListener('resize', onResize)

  return {
    setFlowTarget,
    dispose() {
      cancelAnimationFrame(animationId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      disposables.forEach((d) => d.dispose?.())
    },
  }
}
