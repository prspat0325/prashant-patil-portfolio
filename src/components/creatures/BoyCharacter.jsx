export default function BoyCharacter({ facingLeft, walking, prefersReducedMotion }) {
  return (
    <svg
      className={`creature boy-character ${walking && !prefersReducedMotion ? 'is-walking' : ''}`}
      width="60" height="60" viewBox="0 0 10 10" shapeRendering="crispEdges"
      style={{ transform: facingLeft ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <rect x="3" y="0" width="4" height="1" fill="#c0392b" />
      <rect x="2" y="1" width="6" height="1" fill="#c0392b" />
      <rect x="3" y="2" width="4" height="2" fill="#f2c199" />
      <rect x="4" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="6" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="2" y="4" width="6" height="1" fill="#3a7bd5" />
      <rect x="1" y="5" width="8" height="1" fill="#3a7bd5" />
      <rect x="2" y="6" width="6" height="1" fill="#3a7bd5" />
      <rect x="3" y="7" width="1" height="2" fill="#2b3a6b" />
      <rect x="6" y="7" width="1" height="2" fill="#2b3a6b" />
      <rect x="2" y="9" width="2" height="1" fill="#1d2b53" />
      <rect x="6" y="9" width="2" height="1" fill="#1d2b53" />
    </svg>
  )
}
