import { useEffect } from 'react'
import profile from '../data/profile'
import labels from '../data/labels'

const PETALS = [
  { left: '12%', duration: '7s', delay: '0s' },
  { left: '38%', duration: '9s', delay: '1.5s' },
  { left: '64%', duration: '8s', delay: '3s' },
  { left: '85%', duration: '10s', delay: '0.5s' },
]

export default function BootScreen({ onStart, prefersReducedMotion }) {
  useEffect(() => {
    function handleKeyDown() { onStart() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div className="boot-screen" onClick={onStart}>
      {!prefersReducedMotion && (
        <div className="sakura-petals" aria-hidden="true">
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="sakura-petal"
              style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay }}
            >
              🌸
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div className="title-row">
          <h1 className="font-pixel boot-title">{profile.identity.name.toUpperCase()}</h1>
          <span className="hanko-seal font-jp" title="craftsman">匠</span>
        </div>
        <p className="font-jp jp-gloss" style={{ margin: 0, fontSize: '13px' }}>{labels.name}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <p className="font-pixel boot-prompt" style={{ margin: 0 }}>PRESS START</p>
        <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.pressStart}</p>
      </div>
    </div>
  )
}
