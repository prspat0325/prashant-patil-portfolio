import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useViewportSize } from '../hooks/useViewportSize'
import DiverCharacter from './creatures/DiverCharacter'
import profile from '../data/profile'

const TARGETS = [
  { key: 'trainer', name: 'MESSAGE BUOY', subtitle: 'About', accent: '#2f6fb3', fx: 0.14, fy: 0.32 },
  { key: 'pokedex', name: 'TREASURE RAFT', subtitle: 'Projects', accent: '#e0a72f', fx: 0.32, fy: 0.22 },
  { key: 'moves', name: 'CORAL MARKER', subtitle: 'Skills', accent: '#2f8f5b', fx: 0.5, fy: 0.3 },
  { key: 'badges', name: 'ANCHOR POINT', subtitle: 'Experience', accent: '#e08a3c', fx: 0.68, fy: 0.22 },
  { key: 'contact', name: 'LIGHTHOUSE DOCK', subtitle: 'Contact', accent: '#e74c3c', fx: 0.86, fy: 0.32 },
]

const PLAYER_FRACTION = { fx: 0.46, fy: 0.86 }

const SUN = { fx: 0.85, fy: 0.12 }

// Swim continuously across the full screen width via CSS animation (see
// .swim-right/.swim-left in index.css) — fy is the only fixed coordinate;
// duration/delay stagger them so it reads as a school, not a synced loop.
const FISH = [
  { fy: 0.4, hue: '#f2a65a', dir: 'right', duration: 13, delay: 0 },
  { fy: 0.55, hue: '#4fd1c5', dir: 'left', duration: 15, delay: 2 },
  { fy: 0.68, hue: '#f76e9c', dir: 'right', duration: 11, delay: 5 },
  { fy: 0.42, hue: '#f2a65a', dir: 'left', duration: 17, delay: 1 },
  { fy: 0.6, hue: '#4fd1c5', dir: 'right', duration: 14, delay: 7 },
  { fy: 0.68, hue: '#f76e9c', dir: 'left', duration: 12, delay: 4 },
  { fy: 0.75, hue: '#f2a65a', dir: 'right', duration: 16, delay: 3 },
]

const SHARK = { fy: 0.28, dir: 'right', duration: 24, delay: 0 }
const DOLPHINS = [
  { fy: 0.5, dir: 'left', duration: 19, delay: 3 },
  { fy: 0.44, dir: 'right', duration: 21, delay: 9 },
]

const CORALS = [
  { fx: 0.05, fy: 0.8, hue: '#e0764a' }, { fx: 0.2, fy: 0.82, hue: '#c94f7c' },
  { fx: 0.4, fy: 0.81, hue: '#e0764a' }, { fx: 0.6, fy: 0.82, hue: '#7a5fd1' },
  { fx: 0.78, fy: 0.8, hue: '#c94f7c' }, { fx: 0.94, fy: 0.82, hue: '#e0764a' },
]

const KELP = [
  { fx: 0.15, fy: 0.78 }, { fx: 0.3, fy: 0.79 }, { fx: 0.68, fy: 0.78 }, { fx: 0.87, fy: 0.79 },
]

const CLAM = { fx: 0.5, fy: 0.83 }

const WHALE = { fy: 0.16, dir: 'left', duration: 34, delay: 0 }

function RaftIcon({ accent, aimed }) {
  return (
    <svg
      className={`pixel-outline ocean-target-icon ${aimed ? 'is-aimed' : ''}`}
      viewBox="0 0 8 6" shapeRendering="crispEdges" aria-hidden="true"
    >
      <rect x="3" y="0" width="3" height="1" fill={accent} />
      <rect x="3" y="1" width="1" height="3" fill="#f5f0e6" />
      <rect x="2" y="4" width="4" height="2" fill="#6b4423" />
      <rect x="1" y="5" width="6" height="1" fill="#5a3419" />
    </svg>
  )
}

function Sun() {
  return (
    <svg className="pixel-outline icon-sun" viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="4" y="0" width="4" height="1" fill="#f8d34a" />
      <rect x="2" y="1" width="8" height="1" fill="#f8d34a" />
      <rect x="1" y="2" width="10" height="1" fill="#f8d34a" />
      <rect x="0" y="3" width="12" height="6" fill="#f8d34a" />
      <rect x="1" y="9" width="10" height="1" fill="#f8d34a" />
      <rect x="2" y="10" width="8" height="1" fill="#f8d34a" />
      <rect x="4" y="11" width="4" height="1" fill="#f8d34a" />
      <rect x="3" y="5" width="4" height="4" fill="#ffe58a" />
    </svg>
  )
}

function FishIcon({ hue }) {
  return (
    <svg className="pixel-outline ocean-critter icon-fish" viewBox="0 0 8 6" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="2" width="2" height="2" fill={hue} />
      <rect x="2" y="1" width="4" height="4" fill={hue} />
      <rect x="6" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="3" y="0" width="2" height="1" fill={hue} />
    </svg>
  )
}

function SharkIcon() {
  return (
    <svg className="pixel-outline ocean-critter icon-shark" viewBox="0 0 14 6" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="2" width="2" height="2" fill="#8fa0ad" />
      <rect x="2" y="2" width="8" height="2" fill="#7c8a99" />
      <rect x="5" y="0" width="2" height="2" fill="#5c6d7a" />
      <rect x="10" y="1" width="3" height="1" fill="#7c8a99" />
      <rect x="10" y="3" width="3" height="1" fill="#7c8a99" />
      <rect x="1" y="2" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}

function DolphinIcon() {
  return (
    <svg className="pixel-outline ocean-critter icon-dolphin" viewBox="0 0 10 6" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="2" width="5" height="2" fill="#8fa8bd" />
      <rect x="6" y="3" width="2" height="1" fill="#8fa8bd" />
      <rect x="4" y="0" width="1" height="2" fill="#7c93a8" />
      <rect x="1" y="4" width="2" height="1" fill="#7c93a8" />
      <rect x="6" y="2" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}

function CoralIcon({ hue }) {
  return (
    <svg className="pixel-outline icon-coral" viewBox="0 0 6 6" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="3" width="2" height="3" fill={hue} />
      <rect x="0" y="1" width="1" height="3" fill={hue} />
      <rect x="4" y="0" width="1" height="4" fill={hue} />
      <rect x="1" y="0" width="1" height="2" fill={hue} />
    </svg>
  )
}

function WhaleIcon() {
  return (
    <svg className="pixel-outline ocean-critter icon-whale" viewBox="0 0 18 8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="3" width="2" height="2" fill="#4a6b91" />
      <rect x="2" y="2" width="10" height="3" fill="#5c7fa8" />
      <rect x="3" y="5" width="8" height="1" fill="#8fa8c4" />
      <rect x="12" y="2" width="3" height="2" fill="#5c7fa8" />
      <rect x="6" y="0" width="2" height="2" fill="#4a6b91" />
      <rect x="13" y="2" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}

function CaveWallIcon() {
  return (
    <svg className="pixel-outline icon-cave-wall" viewBox="0 0 6 24" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="0" width="4" height="4" fill="#4a3a63" />
      <rect x="0" y="4" width="6" height="4" fill="#5c4a78" />
      <rect x="0" y="8" width="3" height="4" fill="#4a3a63" />
      <rect x="0" y="12" width="5" height="5" fill="#5c4a78" />
      <rect x="0" y="17" width="4" height="4" fill="#4a3a63" />
      <rect x="0" y="21" width="6" height="3" fill="#5c4a78" />
    </svg>
  )
}

function KelpIcon() {
  return (
    <svg className="pixel-outline icon-kelp" viewBox="0 0 4 12" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="9" width="2" height="3" fill="#1e6b41" />
      <rect x="0" y="6" width="2" height="3" fill="#2f8f5b" />
      <rect x="2" y="3" width="2" height="3" fill="#2f8f5b" />
      <rect x="1" y="0" width="2" height="3" fill="#3aa66a" />
    </svg>
  )
}

function ClamIcon() {
  return (
    <svg className="pixel-outline icon-clam" viewBox="0 0 10 6" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0" y="2" width="10" height="3" fill="#a86fc9" />
      <rect x="1" y="1" width="8" height="1" fill="#c48fe0" />
      <rect x="4" y="0" width="2" height="2" fill="#f5f0e6" />
      <rect x="0" y="5" width="10" height="1" fill="#7a4fa0" />
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
        <p className="font-body town-hint">Tap a target to open it — or aim with ← → and throw with Enter/Space.</p>
      </div>

      <div className="ocean-sky" style={{ height: worldHeight * 0.22 }} />
      <div className="ocean-water" style={{ top: worldHeight * 0.22, height: worldHeight * 0.64 }} />
      <div className="ocean-sand" style={{ top: worldHeight * 0.86, height: worldHeight * 0.14 }} />

      <div className="ocean-prop" style={{ left: SUN.fx * worldWidth, top: SUN.fy * worldHeight }}>
        <Sun />
      </div>

      <div className="ocean-prop" style={{ left: 0, top: worldHeight * 0.55, transform: 'translateY(-50%)' }}>
        <CaveWallIcon />
      </div>
      <div className="ocean-prop" style={{ left: worldWidth, top: worldHeight * 0.55, transform: 'translate(-100%, -50%) scaleX(-1)' }}>
        <CaveWallIcon />
      </div>

      {CORALS.map((c, i) => (
        <div key={`coral-${i}`} className="ocean-prop" style={{ left: c.fx * worldWidth, top: c.fy * worldHeight }}>
          <CoralIcon hue={c.hue} />
        </div>
      ))}
      {KELP.map((k, i) => (
        <div key={`kelp-${i}`} className="ocean-prop" style={{ left: k.fx * worldWidth, top: k.fy * worldHeight }}>
          <KelpIcon />
        </div>
      ))}
      <div className="ocean-prop" style={{ left: CLAM.fx * worldWidth, top: CLAM.fy * worldHeight }}>
        <ClamIcon />
      </div>

      <div
        className={`ocean-prop swim-${WHALE.dir}`}
        style={{
          top: WHALE.fy * worldHeight,
          animationDuration: `${WHALE.duration}s`,
          animationDelay: `${WHALE.delay}s`,
          transform: WHALE.dir === 'left' ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%)',
        }}
      >
        <WhaleIcon />
      </div>

      <div
        className={`ocean-prop swim-${SHARK.dir}`}
        style={{
          top: SHARK.fy * worldHeight,
          animationDuration: `${SHARK.duration}s`,
          animationDelay: `${SHARK.delay}s`,
          transform: SHARK.dir === 'left' ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%)',
        }}
      >
        <SharkIcon />
      </div>
      {DOLPHINS.map((d, i) => (
        <div
          key={`dolphin-${i}`}
          className={`ocean-prop swim-${d.dir}`}
          style={{
            top: d.fy * worldHeight,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            transform: d.dir === 'left' ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%)',
          }}
        >
          <DolphinIcon />
        </div>
      ))}
      {FISH.map((f, i) => (
        <div
          key={`fish-${i}`}
          className={`ocean-prop swim-${f.dir}`}
          style={{
            top: f.fy * worldHeight,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            transform: f.dir === 'left' ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%)',
          }}
        >
          <FishIcon hue={f.hue} />
        </div>
      ))}

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
        style={{ left: playerPoint.x - 20, top: playerPoint.y - 53 }}
      >
        <DiverCharacter facingLeft={false} walking={false} walkPhase={0} prefersReducedMotion={prefersReducedMotion} />
      </div>

      {thrown !== null && targetPoint && (
        <motion.div
          className="ocean-food"
          initial={{ left: playerPoint.x - 13, top: playerPoint.y - 44, opacity: 1 }}
          animate={{ left: targetPoint.x, top: targetPoint.y, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          onAnimationComplete={() => onNavigateRef.current(TARGETS[thrown].key)}
        >
          <FoodIcon />
        </motion.div>
      )}
    </div>
  )
}
