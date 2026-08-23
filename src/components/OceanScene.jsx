import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useViewportSize } from '../hooks/useViewportSize'
import BoyCharacter from './creatures/BoyCharacter'
import profile from '../data/profile'

const TARGETS = [
  { key: 'trainer', name: 'MESSAGE BUOY', subtitle: 'About', accent: '#2f6fb3', fx: 0.14, fy: 0.32 },
  { key: 'pokedex', name: 'TREASURE RAFT', subtitle: 'Projects', accent: '#e0a72f', fx: 0.32, fy: 0.22 },
  { key: 'moves', name: 'CORAL MARKER', subtitle: 'Skills', accent: '#2f8f5b', fx: 0.5, fy: 0.3 },
  { key: 'badges', name: 'ANCHOR POINT', subtitle: 'Experience', accent: '#e08a3c', fx: 0.68, fy: 0.22 },
  { key: 'contact', name: 'LIGHTHOUSE DOCK', subtitle: 'Contact', accent: '#e74c3c', fx: 0.86, fy: 0.32 },
]

const PLAYER_FRACTION = { fx: 0.46, fy: 0.86 }

function RaftIcon({ accent, aimed }) {
  return (
    <svg
      className={`pixel-outline ocean-target-icon ${aimed ? 'is-aimed' : ''}`}
      width="52" height="42" viewBox="0 0 8 6" shapeRendering="crispEdges" aria-hidden="true"
    >
      <rect x="3" y="0" width="3" height="1" fill={accent} />
      <rect x="3" y="1" width="1" height="3" fill="#f5f0e6" />
      <rect x="2" y="4" width="4" height="2" fill="#6b4423" />
      <rect x="1" y="5" width="6" height="1" fill="#5a3419" />
    </svg>
  )
}

function FoodIcon() {
  return (
    <svg className="pixel-outline" width="26" height="26" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="0" width="2" height="1" fill="#2f8f5b" />
      <rect x="0" y="1" width="4" height="2" fill="#e74c3c" />
      <rect x="1" y="3" width="2" height="1" fill="#c0392b" />
    </svg>
  )
}

export default function OceanScene({ onNavigate, playBlip, prefersReducedMotion }) {
  const { width: worldWidth, height: worldHeight } = useViewportSize()
  const [aimIndex, setAimIndex] = useState(0)
  const [thrown, setThrown] = useState(null)

  const onNavigateRef = useRef(onNavigate)
  onNavigateRef.current = onNavigate

  const playerPoint = {
    x: PLAYER_FRACTION.fx * worldWidth,
    y: PLAYER_FRACTION.fy * worldHeight,
  }

  function throwAt(index) {
    if (thrown !== null) return
    playBlip?.()
    setAimIndex(index)
    setThrown(index)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (thrown !== null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setAimIndex((i) => (i - 1 + TARGETS.length) % TARGETS.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setAimIndex((i) => (i + 1) % TARGETS.length)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        throwAt(aimIndex)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [aimIndex, thrown])

  const target = thrown !== null ? TARGETS[thrown] : null
  const targetPoint = target ? { x: target.fx * worldWidth, y: target.fy * worldHeight } : null

  return (
    <div className="ocean-scene">
      <div className="town-hud">
        <h1 className="font-pixel town-hud-title">{profile.identity.name.toUpperCase()}</h1>
        <p className="font-body town-hint">Aim with ← →, throw with Enter/Space — or tap a target directly.</p>
      </div>

      <div className="ocean-sky" style={{ height: worldHeight * 0.22 }} />
      <div className="ocean-water" style={{ top: worldHeight * 0.22, height: worldHeight * 0.64 }} />
      <div className="ocean-sand" style={{ top: worldHeight * 0.86, height: worldHeight * 0.14 }} />

      {TARGETS.map((t, i) => (
        <button
          key={t.key}
          type="button"
          className="ocean-target"
          style={{ left: t.fx * worldWidth, top: t.fy * worldHeight }}
          onClick={() => throwAt(i)}
        >
          <RaftIcon accent={t.accent} aimed={i === aimIndex && thrown === null} />
          <span className="font-pixel town-building-label">{t.name}</span>
          <span className="font-body town-building-subtitle">{t.subtitle}</span>
        </button>
      ))}

      <div
        className="ocean-player"
        style={{ left: playerPoint.x - 27, top: playerPoint.y - 72 }}
      >
        <BoyCharacter facingLeft={false} walking={false} walkPhase={0} prefersReducedMotion={prefersReducedMotion} />
      </div>

      {thrown !== null && targetPoint && (
        <motion.div
          className="ocean-food"
          initial={{ left: playerPoint.x - 13, top: playerPoint.y - 60, opacity: 1 }}
          animate={{ left: targetPoint.x + 12, top: targetPoint.y - 6, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          onAnimationComplete={() => onNavigateRef.current(TARGETS[thrown].key)}
        >
          <FoodIcon />
        </motion.div>
      )}
    </div>
  )
}
