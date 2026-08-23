export default function CatCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature cat-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="64" height="64" viewBox="0 0 14 14" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* tail, tight curl at the side — rotates as one unit to wag */}
      <g
        className="cat-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}
      >
        <rect x="12" y="7" width="2" height="2" fill="#8a8f99" />
        <rect x="13" y="5" width="2" height="2" fill="#8a8f99" />
      </g>
      {/* tall, narrow pointed ears */}
      <rect x="2" y="0" width="1" height="3" fill="#5c6169" />
      <rect x="11" y="0" width="1" height="3" fill="#5c6169" />
      {/* head + cream face patch */}
      <rect x="2" y="2" width="10" height="5" fill="#8a8f99" />
      <rect x="3" y="4" width="8" height="3" fill="#e8e6e0" />
      <rect x="4" y="4" width="1" height="1" fill="#1d1d1d" />
      <rect x="9" y="4" width="1" height="1" fill="#1d1d1d" />
      {/* small triangular nose */}
      <rect x="6" y="6" width="2" height="1" fill="#c0392b" />
      {/* whiskers */}
      <rect x="2" y="5" width="1" height="1" fill="#5c6169" />
      <rect x="11" y="5" width="1" height="1" fill="#5c6169" />
      {/* collar */}
      <rect x="2" y="7" width="10" height="1" fill="#c0392b" />
      {/* body + belly patch */}
      <rect x="2" y="8" width="10" height="4" fill="#8a8f99" />
      <rect x="4" y="9" width="6" height="2" fill="#e8e6e0" />
      {/* legs */}
      <rect x="3" y="12" width="2" height="2" fill="#5c6169" />
      <rect x="9" y="12" width="2" height="2" fill="#5c6169" />
    </svg>
  )
}
