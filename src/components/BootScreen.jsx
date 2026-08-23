import { useEffect } from 'react'
import profile from '../data/profile'

export default function BootScreen({ onStart }) {
  useEffect(() => {
    function handleKeyDown() { onStart() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div className="boot-screen" onClick={onStart}>
      <h1 className="font-pixel boot-title">{profile.identity.name.toUpperCase()}</h1>
      <p className="font-pixel boot-prompt">PRESS START</p>
    </div>
  )
}
