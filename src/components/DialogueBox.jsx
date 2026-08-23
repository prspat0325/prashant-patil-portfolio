import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

export default function DialogueBox({ text, playBlip, prefersReducedMotion, className = '' }) {
  const { displayed, done, skip } = useTypewriter(text, { prefersReducedMotion })
  const lastLengthRef = useRef(0)

  useEffect(() => {
    if (displayed.length > lastLengthRef.current && !done) {
      // Blip on every typed character reads as a clean rhythm for a short
      // line, but for long dialogue (e.g. Badges' joined bullet points) it
      // becomes a rapid machine-gun of beeps — thin it out and skip spaces.
      const lastChar = displayed[displayed.length - 1]
      if (lastChar !== ' ' && displayed.length % 2 === 0) {
        playBlip?.('type')
      }
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
