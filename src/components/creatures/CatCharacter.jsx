export default function CatCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature cat-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="80" height="70" viewBox="0 0 16 14" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* tail, curled over the back — rotates as one unit to wag */}
      <g
        className="cat-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        <rect x="1" y="7" width="1" height="2" fill="#8a8f99" />
        <rect x="0" y="5" width="1" height="2" fill="#8a8f99" />
        <rect x="1" y="3" width="1" height="2" fill="#8a8f99" />
      </g>
      {/* body */}
      <rect x="3" y="7" width="8" height="3" fill="#8a8f99" />
      <rect x="4" y="8" width="2" height="2" fill="#e8e6e0" />
      {/* head */}
      <rect x="9" y="4" width="4" height="4" fill="#8a8f99" />
      <rect x="11" y="2" width="1" height="2" fill="#8a8f99" />
      <rect x="13" y="2" width="1" height="2" fill="#8a8f99" />
      <rect x="11" y="6" width="1" height="1" fill="#1d1d1d" />
      <rect x="13" y="6" width="1" height="1" fill="#5c6169" />
      {/* legs */}
      <rect x="4" y="10" width="1" height="3" fill="#5c6169" />
      <rect x="6" y="10" width="1" height="3" fill="#5c6169" />
      <rect x="9" y="10" width="1" height="3" fill="#5c6169" />
      <rect x="11" y="10" width="1" height="3" fill="#5c6169" />
    </svg>
  )
}
