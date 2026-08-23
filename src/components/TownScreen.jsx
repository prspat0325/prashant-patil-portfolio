import { useEffect, useMemo, useRef, useState } from 'react'
import { useViewportSize } from '../hooks/useViewportSize'
import BoyCharacter from './creatures/BoyCharacter'
import profile from '../data/profile'

const PLAYER_WIDTH = 54
const PLAYER_HEIGHT = 72
const ICON_SIZE = { width: 64, height: 50 }
const SPEED = 0.16 // px per ms
const ENTER_RADIUS = 30
const PATH_WIDTH = 26
const WALK_PHASE_MS = 170

const BUILDINGS = [
  { key: 'trainer', name: 'HOUSE', subtitle: 'About', kind: 'house', fx: 0.06, fy: 0.16 },
  { key: 'contact', name: 'POKEMON CENTER', subtitle: 'Contact', kind: 'pokecenter', fx: 0.44, fy: 0.1 },
  { key: 'pokedex', name: 'MUSEUM', subtitle: 'Projects', kind: 'museum', fx: 0.8, fy: 0.16 },
  { key: 'badges', name: 'GYM', subtitle: 'Experience', kind: 'gym', fx: 0.08, fy: 0.62 },
  { key: 'moves', name: 'LIBRARY', subtitle: 'Skills', kind: 'library', fx: 0.78, fy: 0.62 },
]

// Scattered broadly across the open grass, clear of the path network below.
const TREES = [
  { fx: 0.24, fy: 0.42 }, { fx: 0.6, fy: 0.36 }, { fx: 0.32, fy: 0.9 },
  { fx: 0.66, fy: 0.9 }, { fx: 0.92, fy: 0.46 }, { fx: 0.02, fy: 0.9 },
  { fx: 0.16, fy: 0.28 }, { fx: 0.94, fy: 0.85 }, { fx: 0.5, fy: 0.92 },
  { fx: 0.02, fy: 0.35 }, { fx: 0.72, fy: 0.28 },
]
const BUSHES = [
  { fx: 0.14, fy: 0.5 }, { fx: 0.5, fy: 0.55 }, { fx: 0.9, fy: 0.32 }, { fx: 0.36, fy: 0.26 },
]

const SPAWN_FRACTION = { fx: 0.46, fy: 0.85 }

const ROOF_COLOR = {
  house: '#c0392b',
  pokecenter: '#e85d75',
  museum: '#5c6d7a',
  gym: '#e08a3c',
  library: '#7a5230',
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function doorPoint(building, worldWidth, worldHeight) {
  return {
    x: building.fx * worldWidth + ICON_SIZE.width / 2,
    y: building.fy * worldHeight + ICON_SIZE.height,
  }
}

// Computed straight from live building door positions (not hand-guessed
// fractions), so the path network stays pixel-accurate at any viewport
// size: one horizontal "main street" spine, plus a vertical stem from the
// spine to every building's door and one down to the spawn point. Flowers
// are placed along each vertical stem's edge.
function buildTownLayout(worldWidth, worldHeight) {
  const spineY = worldHeight * 0.5
  const doors = BUILDINGS.map((b) => ({ key: b.key, ...doorPoint(b, worldWidth, worldHeight) }))
  const spawnX = SPAWN_FRACTION.fx * worldWidth
  const spawnY = SPAWN_FRACTION.fy * worldHeight

  const paths = []
  const flowers = []
  const half = PATH_WIDTH / 2

  function addStem(x, doorY) {
    const top = Math.min(doorY, spineY)
    const height = Math.abs(spineY - doorY)
    paths.push({ left: x - half, top, width: PATH_WIDTH, height })
    if (height > 24) {
      flowers.push({ left: x - half - 14, top: top + height * 0.3 })
      flowers.push({ left: x + half + 4, top: top + height * 0.65 })
    }
  }

  doors.forEach((d) => addStem(d.x, d.y))
  addStem(spawnX, spawnY)

  const xs = doors.map((d) => d.x).concat(spawnX)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  paths.unshift({ left: minX - half, top: spineY - half, width: (maxX - minX) + PATH_WIDTH, height: PATH_WIDTH })

  return { paths, flowers }
}

function BuildingIcon({ kind }) {
  const roof = ROOF_COLOR[kind]
  return (
    <svg className="pixel-outline" width="64" height="50" viewBox="0 0 10 8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="0" width="2" height="1" fill={roof} />
      <rect x="3" y="1" width="4" height="1" fill={roof} />
      <rect x="2" y="2" width="6" height="1" fill={roof} />
      <rect x="1" y="3" width="8" height="1" fill="#f5f0e6" />
      <rect x="1" y="4" width="8" height="1" fill="#f5f0e6" />
      <rect x="1" y="5" width="3" height="2" fill="#f5f0e6" />
      <rect x="6" y="5" width="3" height="2" fill="#f5f0e6" />
      <rect x="4" y="5" width="2" height="2" fill="#1d2b53" />
      <rect x="1" y="7" width="8" height="1" fill="#2b3a6b" />
      <rect x="2" y="3" width="1" height="1" fill="#a8d8ff" />
      <rect x="7" y="3" width="1" height="1" fill="#a8d8ff" />
    </svg>
  )
}

function Tree() {
  return (
    <svg className="pixel-outline" width="34" height="40" viewBox="0 0 8 10" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="3" y="7" width="2" height="3" fill="#6b4423" />
      <rect x="1" y="3" width="6" height="1" fill="#3aa66a" />
      <rect x="2" y="4" width="4" height="1" fill="#2f8f5b" />
      <rect x="1" y="5" width="6" height="1" fill="#2f8f5b" />
      <rect x="0" y="6" width="8" height="1" fill="#2f8f5b" />
    </svg>
  )
}

function Bush() {
  return (
    <svg className="pixel-outline" width="26" height="16" viewBox="0 0 8 5" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="0" width="4" height="1" fill="#3aa66a" />
      <rect x="1" y="1" width="6" height="1" fill="#2f8f5b" />
      <rect x="0" y="2" width="8" height="2" fill="#2f8f5b" />
    </svg>
  )
}

function Flower({ hue }) {
  return (
    <svg className="pixel-outline" width="14" height="14" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="0" width="1" height="1" fill={hue} />
      <rect x="0" y="1" width="1" height="1" fill={hue} />
      <rect x="2" y="1" width="1" height="1" fill={hue} />
      <rect x="1" y="2" width="1" height="1" fill={hue} />
      <rect x="1" y="1" width="1" height="1" fill="#ffd34a" />
    </svg>
  )
}

const FLOWER_HUES = ['#ff6b81', '#ffffff', '#b98ce8']

export default function TownScreen({ onNavigate, playBlip, prefersReducedMotion }) {
  const { width: worldWidth, height: worldHeight } = useViewportSize()
  const [pos, setPos] = useState(() => ({
    x: SPAWN_FRACTION.fx * worldWidth - PLAYER_WIDTH / 2,
    y: SPAWN_FRACTION.fy * worldHeight - PLAYER_HEIGHT / 2,
  }))
  const [facingLeft, setFacingLeft] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [walkPhase, setWalkPhase] = useState(0)

  const { paths, flowers } = useMemo(
    () => buildTownLayout(worldWidth, worldHeight),
    [worldWidth, worldHeight]
  )

  const onNavigateRef = useRef(onNavigate)
  onNavigateRef.current = onNavigate
  const playBlipRef = useRef(playBlip)
  playBlipRef.current = playBlip
  const worldSizeRef = useRef({ width: worldWidth, height: worldHeight })
  worldSizeRef.current = { width: worldWidth, height: worldHeight }

  useEffect(() => {
    const pressed = new Set()
    const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    function handleKeyDown(e) {
      if (ARROWS.includes(e.key)) {
        e.preventDefault()
        pressed.add(e.key)
      }
    }
    function handleKeyUp(e) {
      pressed.delete(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let rafId
    let lastTime = performance.now()
    let entered = false
    let phaseAccum = 0

    function tick(now) {
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      if (pressed.size > 0 && !entered) {
        const { width: ww, height: wh } = worldSizeRef.current
        let dx = 0
        let dy = 0
        if (pressed.has('ArrowLeft')) dx -= SPEED * dt
        if (pressed.has('ArrowRight')) dx += SPEED * dt
        if (pressed.has('ArrowUp')) dy -= SPEED * dt
        if (pressed.has('ArrowDown')) dy += SPEED * dt

        if (dx !== 0) setFacingLeft(dx < 0)
        setIsMoving(true)

        phaseAccum += dt
        if (phaseAccum >= WALK_PHASE_MS) {
          phaseAccum = 0
          setWalkPhase((p) => (p === 0 ? 1 : 0))
        }

        setPos((prev) => {
          const nextX = clamp(prev.x + dx, 0, ww - PLAYER_WIDTH)
          const nextY = clamp(prev.y + dy, 0, wh - PLAYER_HEIGHT)

          const centerX = nextX + PLAYER_WIDTH / 2
          const centerY = nextY + PLAYER_HEIGHT / 2
          for (const building of BUILDINGS) {
            const door = doorPoint(building, ww, wh)
            if (Math.hypot(centerX - door.x, centerY - door.y) < ENTER_RADIUS) {
              entered = true
              playBlipRef.current?.()
              onNavigateRef.current(building.key)
              break
            }
          }

          return { x: nextX, y: nextY }
        })
      } else if (pressed.size === 0) {
        setIsMoving(false)
        phaseAccum = 0
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="town-screen">
      <div className="town-hud">
        <h1 className="font-pixel town-hud-title">{profile.identity.name.toUpperCase()}</h1>
        <p className="font-body town-hint">Walk into a building, or tap one directly.</p>
      </div>

      {paths.map((p, i) => (
        <div key={`path-${i}`} className="town-path" style={{ left: p.left, top: p.top, width: p.width, height: p.height }} />
      ))}

      {flowers.map((f, i) => (
        <div key={`flower-${i}`} className="town-prop" style={{ left: f.left, top: f.top }}>
          <Flower hue={FLOWER_HUES[i % FLOWER_HUES.length]} />
        </div>
      ))}

      {TREES.map((t, i) => (
        <div key={`tree-${i}`} className="town-prop" style={{ left: t.fx * worldWidth, top: t.fy * worldHeight }}>
          <Tree />
        </div>
      ))}
      {BUSHES.map((b, i) => (
        <div key={`bush-${i}`} className="town-prop" style={{ left: b.fx * worldWidth, top: b.fy * worldHeight }}>
          <Bush />
        </div>
      ))}

      {BUILDINGS.map((building) => (
        <button
          key={building.key}
          type="button"
          className="town-building"
          style={{ left: building.fx * worldWidth, top: building.fy * worldHeight }}
          onClick={() => { playBlip?.(); onNavigate(building.key) }}
        >
          <BuildingIcon kind={building.kind} />
          <span className="font-pixel town-building-label">{building.name}</span>
          <span className="font-body town-building-subtitle">{building.subtitle}</span>
        </button>
      ))}

      <div className="town-player" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
        <BoyCharacter
          facingLeft={facingLeft}
          walking={isMoving}
          walkPhase={walkPhase}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </div>
  )
}
