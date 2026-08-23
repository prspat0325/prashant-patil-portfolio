export default function DogCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dog-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="64" height="64" viewBox="0 0 14 14" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* tail, tight curl at the side — rotates as one unit to wag */}
      <g
        className="dog-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}
      >
        <rect x="12" y="7" width="2" height="2" fill="#e0954a" />
        <rect x="13" y="5" width="2" height="2" fill="#e0954a" />
      </g>
      {/* short, rounded floppy ears */}
      <rect x="1" y="1" width="2" height="2" fill="#b8712f" />
      <rect x="11" y="1" width="2" height="2" fill="#b8712f" />
      {/* head + cream face patch */}
      <rect x="2" y="2" width="10" height="5" fill="#e0954a" />
      <rect x="3" y="4" width="8" height="3" fill="#f5e6d3" />
      <rect x="4" y="4" width="1" height="1" fill="#1d1d1d" />
      <rect x="9" y="4" width="1" height="1" fill="#1d1d1d" />
      {/* big round black nose */}
      <rect x="6" y="6" width="2" height="2" fill="#1d1d1d" />
      {/* collar */}
      <rect x="2" y="7" width="10" height="1" fill="#3a6fd8" />
      {/* body + belly patch */}
      <rect x="2" y="8" width="10" height="4" fill="#e0954a" />
      <rect x="4" y="9" width="6" height="2" fill="#f5e6d3" />
      {/* legs */}
      <rect x="3" y="12" width="2" height="2" fill="#b8712f" />
      <rect x="9" y="12" width="2" height="2" fill="#b8712f" />
    </svg>
  )
}
