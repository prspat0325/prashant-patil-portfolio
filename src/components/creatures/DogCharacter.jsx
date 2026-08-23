export default function DogCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dog-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="112" height="84" viewBox="0 0 16 12" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* floppy ear */}
      <rect x="4" y="1" width="2" height="3" fill="#7a4f28" />
      {/* head + snout */}
      <rect x="0" y="2" width="6" height="1" fill="#a8703f" />
      <rect x="0" y="3" width="7" height="1" fill="#a8703f" />
      <rect x="1" y="4" width="6" height="1" fill="#a8703f" />
      <rect x="0" y="3" width="1" height="1" fill="#7a4f28" />
      <rect x="2" y="3" width="1" height="1" fill="#1d2b53" />
      {/* body (lying pose) */}
      <rect x="2" y="5" width="10" height="1" fill="#a8703f" />
      <rect x="1" y="6" width="11" height="1" fill="#a8703f" />
      <rect x="0" y="7" width="12" height="1" fill="#a8703f" />
      <rect x="0" y="8" width="12" height="1" fill="#a8703f" />
      <rect x="1" y="9" width="10" height="1" fill="#a8703f" />
      {/* belly highlight */}
      <rect x="2" y="8" width="7" height="1" fill="#c68f5c" />
      {/* paws */}
      <rect x="2" y="10" width="2" height="1" fill="#7a4f28" />
      <rect x="8" y="10" width="2" height="1" fill="#7a4f28" />
      {/* tail, rotates as one unit to wag — faster/wider swing than the cat's */}
      <g
        className="dog-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 80%' }}
      >
        <rect x="12" y="5" width="2" height="2" fill="#a8703f" />
        <rect x="13" y="3" width="2" height="2" fill="#a8703f" />
      </g>
    </svg>
  )
}
