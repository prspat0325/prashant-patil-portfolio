export default function DogCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dog-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="80" height="70" viewBox="0 0 16 14" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* tail, curled over the back — rotates as one unit to wag */}
      <g
        className="dog-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        <rect x="1" y="6" width="2" height="2" fill="#e0954a" />
        <rect x="0" y="4" width="2" height="2" fill="#e0954a" />
        <rect x="1" y="2" width="2" height="2" fill="#e0954a" />
      </g>
      {/* body */}
      <rect x="3" y="7" width="8" height="3" fill="#e0954a" />
      <rect x="4" y="8" width="3" height="2" fill="#f5e6d3" />
      {/* head */}
      <rect x="9" y="3" width="5" height="4" fill="#e0954a" />
      <rect x="12" y="1" width="2" height="2" fill="#b8712f" />
      <rect x="13" y="6" width="2" height="1" fill="#f5e6d3" />
      <rect x="11" y="5" width="1" height="1" fill="#1d1d1d" />
      <rect x="14" y="6" width="1" height="1" fill="#1d1d1d" />
      {/* legs */}
      <rect x="4" y="10" width="1" height="3" fill="#b8712f" />
      <rect x="6" y="10" width="1" height="3" fill="#b8712f" />
      <rect x="9" y="10" width="1" height="3" fill="#b8712f" />
      <rect x="11" y="10" width="1" height="3" fill="#b8712f" />
    </svg>
  )
}
