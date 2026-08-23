export default function DogCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dog-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="91" height="63" viewBox="0 0 13 9" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="7" height="3" fill="#a8703f" />
      <rect x="8" y="1" width="3" height="3" fill="#a8703f" />
      <rect x="10" y="0" width="2" height="2" fill="#7a4f28" />
      <rect x="11" y="3" width="1" height="1" fill="#7a4f28" />
      <rect x="9" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="3" y="6" width="1" height="2" fill="#7a4f28" />
      <rect x="7" y="6" width="1" height="2" fill="#7a4f28" />
      <rect
        className="dog-tail"
        x="0" y="2" width="2" height="2" fill="#a8703f"
        style={{ transformBox: 'fill-box', transformOrigin: '100% 50%' }}
      />
    </svg>
  )
}
