import { useState } from 'react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useTypewriter } from './hooks/useTypewriter'
import { useSound } from './hooks/useSound'
import { useMenuNavigation } from './hooks/useMenuNavigation'

const DEMO_ITEMS = ['ALPHA', 'BRAVO', 'CHARLIE']

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()
  const { displayed, done, skip } = useTypewriter(
    'Hooks smoke test: typing, sound, and cursor navigation.',
    { prefersReducedMotion }
  )
  const [selected, setSelected] = useState(null)
  const { cursorIndex } = useMenuNavigation({
    itemCount: DEMO_ITEMS.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); setSelected(DEMO_ITEMS[i]) },
  })

  return (
    <div className="console-frame">
      <button className="font-pixel" style={{ fontSize: '10px', marginBottom: 16 }} onClick={toggleMute}>
        {muted ? 'UNMUTE' : 'MUTE'}
      </button>
      <div className="dialogue-box" onClick={done ? undefined : skip}>
        <p>{displayed}{!done && <span className="type-cursor">▍</span>}</p>
      </div>
      <ul className="font-body" style={{ marginTop: 16 }}>
        {DEMO_ITEMS.map((item, i) => (
          <li key={item}>{i === cursorIndex ? '▶ ' : '  '}{item}</li>
        ))}
      </ul>
      {selected && <p className="font-body">Selected: {selected}</p>}
    </div>
  )
}
