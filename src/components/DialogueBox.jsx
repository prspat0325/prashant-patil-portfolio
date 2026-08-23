import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

export default function DialogueBox({ text, playBlip, prefersReducedMotion, className = '' }) {
  const { displayed, done, skip } = useTypewriter(text, { prefersReducedMotion })
  const lastLengthRef = useRef(0)

  useEffect(() => {
    if (displayed.length > lastLengthRef.current && !done) {
      playBlip?.('type')
    }
    lastLengthRef.current = displayed.length
  }, [displayed, done, playBlip])

  return (
    <div className={`dialogue-box font-body ${className}`} onClick={done ? undefined : skip}>
      <p style={{ margin: 0 }}>
        {displayed}
        {!done && <span className="type-cursor">▍</span>}
      </p>
    </div>
  )
}
