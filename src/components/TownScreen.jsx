import { useEffect, useRef, useState } from 'react'
import BoyCharacter from './creatures/BoyCharacter'
import profile from '../data/profile'

const WORLD_WIDTH = 280
const WORLD_HEIGHT = 200
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 46
const ICON_SIZE = { width: 50, height: 40 }
const SPEED = 0.14 // px per ms
const ENTER_RADIUS = 24
const SPAWN = { x: 120, y: 150 }

const BUILDINGS = [
  { key: 'trainer', name: 'HOUSE', subtitle: 'About', kind: 'house', x: 14, y: 10 },
  { key: 'contact', name: 'POKEMON CENTER', subtitle: 'Contact', kind: 'pokecenter', x: 112, y: 10 },
  { key: 'pokedex', name: 'MUSEUM', subtitle: 'Projects', kind: 'museum', x: 210, y: 10 },
  { key: 'badges', name: 'GYM', subtitle: 'Experience', kind: 'gym', x: 14, y: 100 },
  { key: 'moves', name: 'LIBRARY', subtitle: 'Skills', kind: 'library', x: 210, y: 100 },
]

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
    <svg width="50" height="40" viewBox="0 0 10 8" shapeRendering="crispEdges" aria-hidden="true">
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

export default function TownScreen({ onNavigate, playBlip, prefersReducedMotion }) {
  const [pos, setPos] = useState(SPAWN)
  const [facingLeft, setFacingLeft] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const onNavigateRef = useRef(onNavigate)
  onNavigateRef.current = onNavigate
  const playBlipRef = useRef(playBlip)
  playBlipRef.current = playBlip

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
        let dx = 0
        let dy = 0
        if (pressed.has('ArrowLeft')) dx -= SPEED * dt
        if (pressed.has('ArrowRight')) dx += SPEED * dt
        if (pressed.has('ArrowUp')) dy -= SPEED * dt
        if (pressed.has('ArrowDown')) dy += SPEED * dt

        if (dx !== 0) setFacingLeft(dx < 0)
        setIsMoving(true)

        setPos((prev) => {
          const nextX = clamp(prev.x + dx, 0, WORLD_WIDTH - PLAYER_WIDTH)
          const nextY = clamp(prev.y + dy, 0, WORLD_HEIGHT - PLAYER_HEIGHT)

          const centerX = nextX + PLAYER_WIDTH / 2
          const centerY = nextY + PLAYER_HEIGHT / 2
          for (const building of BUILDINGS) {
            const doorX = building.x + ICON_SIZE.width / 2
            const doorY = building.y + ICON_SIZE.height
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
    <div className="menu-screen">
      <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
      <p className="font-body town-hint">Walk into a building (arrow keys), or tap one directly.</p>
      <div className="town-world" style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}>
        {BUILDINGS.map((building) => (
          <button
            key={building.key}
            type="button"
            className="town-building"
            style={{ left: building.x, top: building.y }}
            onClick={() => { playBlip?.(); onNavigate(building.key) }}
          >
            <BuildingIcon kind={building.kind} />
            <span className="font-pixel town-building-label">{building.name}</span>
            <span className="font-body town-building-subtitle">{building.subtitle}</span>
          </button>
        ))}
        <div
          className="town-player"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <BoyCharacter facingLeft={facingLeft} walking={isMoving} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </div>
  )
}
