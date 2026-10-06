import { useEffect } from 'react'
import profile from '../data/profile'
import labels from '../data/labels'

export default function BootScreen({ onStart }) {
  useEffect(() => {
    function handleKeyDown() { onStart() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div className="boot-screen" onClick={onStart}>
      <div className="enso" aria-hidden="true" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div className="title-row">
          <h1 className="font-pixel boot-title">{profile.identity.name.toUpperCase()}</h1>
          <span className="avatar-badge" role="img" aria-label="person coding at a laptop">🧑‍💻</span>
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
