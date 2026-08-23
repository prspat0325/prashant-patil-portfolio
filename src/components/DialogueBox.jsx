import { useTypewriter } from '../hooks/useTypewriter'

export default function DialogueBox({ text, prefersReducedMotion, className = '' }) {
  const { displayed, done, skip } = useTypewriter(text, { prefersReducedMotion })

  return (
    <div className={`dialogue-box font-body ${className}`} onClick={done ? undefined : skip}>
      <p style={{ margin: 0 }}>
        {displayed}
        {!done && <span className="type-cursor">▍</span>}
      </p>
    </div>
  )
}
