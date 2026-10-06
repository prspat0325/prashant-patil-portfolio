// Text is shown all at once (no typewriter effect) so it's easy to read immediately.
export default function DialogueBox({ text, className = '' }) {
  return (
    <div className={`dialogue-box font-body ${className}`}>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  )
}
