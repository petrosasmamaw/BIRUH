import * as THREE from 'three'

const C = {
  gold: 0xe8c992,
  goldLight: 0xf5e0b8,
  goldSoft: 0xfaf0dc,
  goldMuted: 0xd4b896,
  goldDeep: 0xc47a12,
  cream: 0xfffdf8,
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
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.52 })
  return { mesh: new THREE.LineSegments(geo, mat), geo, mat }
}

function createBrandLabel() {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 400
  const ctx = canvas.getContext('2d')

  const draw = () => {
    ctx.clearRect(0, 0, 800, 400)

    ctx.strokeStyle = 'rgba(245, 224, 184, 0.42)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(180, 72, 440, 256)

    ctx.strokeStyle = 'rgba(232, 201, 146, 0.28)'
    ctx.lineWidth = 1
    ctx.strokeRect(192, 84, 416, 232)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = '#F5E0B8'
    ctx.font = '700 48px "Space Mono", ui-monospace, monospace'
    ctx.fillText('Z I H O N', 400, 148)

    ctx.fillStyle = '#E8C992'
    ctx.font = '700 54px "Space Mono", ui-monospace, monospace'
    ctx.fillText('T E C H', 400, 218)

    ctx.fillStyle = 'rgba(245, 224, 184, 0.88)'
    ctx.font = '600 20px "Space Mono", ui-monospace, monospace'
    ctx.fillText('SOFTWARE', 400, 278)
  }

  draw()
  document.fonts?.ready?.then(draw)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 1,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(1.7, 0.85, 1)

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

  const outer = createEdgePoly(new THREE.IcosahedronGeometry(1.85, 0), C.goldMuted, 0.72)
  polyGroup.add(outer.mesh)
  disposables.push(outer.edges, outer.mat)

  const mid = createEdgePoly(new THREE.IcosahedronGeometry(1.45, 0), C.gold, 0.68)
  polyGroup.add(mid.mesh)
  disposables.push(mid.edges, mid.mat)

  const core = createEdgePoly(new THREE.OctahedronGeometry(0.95, 0), C.goldLight, 0.75)
  polyGroup.add(core.mesh)
  disposables.push(core.edges, core.mat)

  const hexOuter = createHexRing(2.55, C.gold, 0.32)
  const hexInner = createHexRing(2.15, C.goldLight, 0.26)
  flowGroup.add(hexOuter.mesh, hexInner.mesh)
  disposables.push(hexOuter.geo, hexOuter.mat, hexInner.geo, hexInner.mat)

  const brackets = createHudBrackets(2.35, 0.55, C.goldLight)
  flowGroup.add(brackets.mesh)
  disposables.push(brackets.geo, brackets.mat)

  const label = createBrandLabel()
  label.sprite.scale.set(isMobile ? 1.3 : 1.8, isMobile ? 0.65 : 0.9, 1)
  flowGroup.add(label.sprite)
  disposables.push(label.texture, label.mat)

  scene.add(new THREE.AmbientLight(0xfffdf8, 1))
  const keyLight = new THREE.PointLight(0xf5e8d0, 1.1, 18)
  keyLight.position.set(1, 2, 5)
  scene.add(keyLight)
  const fillLight = new THREE.PointLight(0xfff8ee, 0.6, 14)
  fillLight.position.set(-2, -1, 4)
  scene.add(fillLight)

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
    color: C.goldLight,
    size: isMobile ? 0.04 : 0.028,
    transparent: true,
    opacity: isMobile ? 0.45 : 0.38,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)
  disposables.push(particleGeo, particleMat)

  const mouseInfluence = isMobile ? 0.02 : 0.05
  let target = { x: isMobile ? 0 : 2, y: 0.15, scale: isMobile ? 0.42 : 0.56 }
  let current = { x: isMobile ? 0 : 2, y: 0.15, scale: isMobile ? 0.42 : 0.56 }
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

    current.x += (target.x - current.x) * 0.048
    current.y += (target.y - current.y) * 0.048
    current.scale += (target.scale - current.scale) * 0.048

    const floatY = Math.sin(time * 0.45) * 0.1
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

    label.sprite.position.z = 0.55

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
