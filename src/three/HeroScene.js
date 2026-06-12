import * as THREE from 'three'

export function initHeroScene(canvas) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  )
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)

  const geo = new THREE.IcosahedronGeometry(1.6, 1)
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0xf5a623,
    emissive: 0xa86a10,
    emissiveIntensity: 0.4,
    wireframe: true,
  })
  const orb = new THREE.Mesh(geo, wireMat)
  scene.add(orb)

  const innerGeo = new THREE.IcosahedronGeometry(1.4, 1)
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x1a0f00,
    emissive: 0xd4891a,
    emissiveIntensity: 0.08,
    transparent: true,
    opacity: 0.6,
  })
  const innerOrb = new THREE.Mesh(innerGeo, innerMat)
  scene.add(innerOrb)

  scene.add(new THREE.AmbientLight(0xffffff, 0.3))
  const pointLight = new THREE.PointLight(0xf5a623, 2, 10)
  pointLight.position.set(3, 3, 3)
  scene.add(pointLight)

  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
  }
  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({
    color: 0xf5a623,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
  })
  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  let mouseX = 0
  let mouseY = 0
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
  }
  document.addEventListener('mousemove', onMouseMove)

  let time = 0
  let animationId = null

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    time += 0.01
    orb.rotation.y += 0.004
    orb.rotation.x += 0.002
    innerOrb.rotation.y += 0.004
    innerOrb.rotation.x += 0.002
    orb.position.y = Math.sin(time * 0.5) * 0.3
    innerOrb.position.y = Math.sin(time * 0.5) * 0.3
    orb.rotation.x += (mouseY * 0.1 - orb.rotation.x) * 0.05
    orb.rotation.y += (mouseX * 0.1 - orb.rotation.y) * 0.01
    innerOrb.rotation.x = orb.rotation.x
    innerOrb.rotation.y = orb.rotation.y
    particles.rotation.y += 0.0005
    renderer.render(scene, camera)
  }
  animate()

  const onResize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  window.addEventListener('resize', onResize)

  return () => {
    cancelAnimationFrame(animationId)
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    geo.dispose()
    wireMat.dispose()
    innerGeo.dispose()
    innerMat.dispose()
    particleGeo.dispose()
    particleMat.dispose()
  }
}
