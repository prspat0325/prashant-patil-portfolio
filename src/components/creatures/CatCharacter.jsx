export default function CatCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature cat-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="112" height="84" viewBox="0 0 16 12" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* ears */}
      <rect x="1" y="0" width="2" height="2" fill="#e08a3c" />
      <rect x="4" y="0" width="2" height="1" fill="#e08a3c" />
      {/* head */}
      <rect x="1" y="2" width="6" height="1" fill="#e08a3c" />
      <rect x="1" y="3" width="6" height="1" fill="#e08a3c" />
      <rect x="1" y="4" width="6" height="1" fill="#e08a3c" />
      <rect x="3" y="3" width="1" height="1" fill="#1d2b53" />
      {/* body (loaf pose) */}
      <rect x="2" y="5" width="10" height="1" fill="#e08a3c" />
      <rect x="1" y="6" width="11" height="1" fill="#e08a3c" />
      <rect x="1" y="7" width="11" height="1" fill="#e08a3c" />
      <rect x="1" y="8" width="11" height="1" fill="#e08a3c" />
      <rect x="2" y="9" width="9" height="1" fill="#e08a3c" />
      {/* belly highlight */}
      <rect x="3" y="8" width="7" height="1" fill="#f2a65a" />
      {/* paws */}
      <rect x="2" y="10" width="2" height="1" fill="#a85f1e" />
      <rect x="9" y="10" width="2" height="1" fill="#a85f1e" />
      {/* tail, curling up from the rear — rotates as one unit to wag */}
      <g
        className="cat-tail"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}
      >
        <rect x="12" y="6" width="2" height="2" fill="#e08a3c" />
        <rect x="13" y="4" width="2" height="2" fill="#e08a3c" />
        <rect x="12" y="2" width="2" height="2" fill="#e08a3c" />
      </g>
    </svg>
  )
}
