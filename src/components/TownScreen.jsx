import { useEffect, useRef, useState } from 'react'
import { useViewportSize } from '../hooks/useViewportSize'
import BoyCharacter from './creatures/BoyCharacter'
import profile from '../data/profile'

const PLAYER_WIDTH = 56
const PLAYER_HEIGHT = 65
const ICON_SIZE = { width: 64, height: 50 }
const SPEED = 0.16 // px per ms
const ENTER_RADIUS = 30

const BUILDINGS = [
  { key: 'trainer', name: 'HOUSE', subtitle: 'About', kind: 'house', fx: 0.06, fy: 0.16 },
  { key: 'contact', name: 'POKEMON CENTER', subtitle: 'Contact', kind: 'pokecenter', fx: 0.44, fy: 0.1 },
  { key: 'pokedex', name: 'MUSEUM', subtitle: 'Projects', kind: 'museum', fx: 0.8, fy: 0.16 },
  { key: 'badges', name: 'GYM', subtitle: 'Experience', kind: 'gym', fx: 0.08, fy: 0.62 },
  { key: 'moves', name: 'LIBRARY', subtitle: 'Skills', kind: 'library', fx: 0.78, fy: 0.62 },
]

const TREES = [
  { fx: 0.22, fy: 0.42 }, { fx: 0.62, fy: 0.36 }, { fx: 0.3, fy: 0.85 },
  { fx: 0.68, fy: 0.85 }, { fx: 0.9, fy: 0.46 }, { fx: 0.03, fy: 0.85 },
]
const BUSHES = [
  { fx: 0.14, fy: 0.5 }, { fx: 0.5, fy: 0.56 }, { fx: 0.86, fy: 0.32 }, { fx: 0.36, fy: 0.28 },
]

const SPAWN_FRACTION = { fx: 0.46, fy: 0.78 }

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

function BuildingIcon({ kind }) {
  const roof = ROOF_COLOR[kind]
  return (
    <svg width="64" height="50" viewBox="0 0 10 8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="0" width="2" height="1" fill={roof} />
      <rect x="3" y="1" width="4" height="1" fill={roof} />
      <rect x="2" y="2" width="6" height="1" fill={roof} />
      <rect x="1" y="3" width="8" height="1" fill="#f5f0e6" />
      <rect x="1" y="4" width="8" height="1" fill="#f5f0e6" />
      <rect x="1" y="5" width="3" height="2" fill="#f5f0e6" />
      <rect x="6" y="5" width="3" height="2" fill="#f5f0e6" />
      <rect x="4" y="5" width="2" height="2" fill="#1d2b53" />
      <rect x="1" y="7" width="8" height="1" fill="#2b3a6b" />
    </svg>
  )
}

function Tree() {
  return (
    <svg width="34" height="40" viewBox="0 0 8 10" shapeRendering="crispEdges" aria-hidden="true">
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
    <svg width="26" height="16" viewBox="0 0 8 5" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="0" width="4" height="1" fill="#3aa66a" />
      <rect x="1" y="1" width="6" height="1" fill="#2f8f5b" />
      <rect x="0" y="2" width="8" height="2" fill="#2f8f5b" />
    </svg>
  )
}

export default function TownScreen({ onNavigate, playBlip, prefersReducedMotion }) {
  const { width: worldWidth, height: worldHeight } = useViewportSize()
  const [pos, setPos] = useState(() => ({
    x: SPAWN_FRACTION.fx * worldWidth - PLAYER_WIDTH / 2,
    y: SPAWN_FRACTION.fy * worldHeight - PLAYER_HEIGHT / 2,
  }))
  const [facingLeft, setFacingLeft] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

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

        setPos((prev) => {
          const nextX = clamp(prev.x + dx, 0, ww - PLAYER_WIDTH)
          const nextY = clamp(prev.y + dy, 0, wh - PLAYER_HEIGHT)

          const centerX = nextX + PLAYER_WIDTH / 2
          const centerY = nextY + PLAYER_HEIGHT / 2
          for (const building of BUILDINGS) {
            const doorX = building.fx * ww + ICON_SIZE.width / 2
            const doorY = building.fy * wh + ICON_SIZE.height
            if (Math.hypot(centerX - doorX, centerY - doorY) < ENTER_RADIUS) {
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
        <BoyCharacter facingLeft={facingLeft} walking={isMoving} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </div>
  )
}
