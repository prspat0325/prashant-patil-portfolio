export default function CatCharacter({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature cat-character ${prefersReducedMotion ? 'is-static' : ''}`}
      width="70" height="77" viewBox="0 0 10 11" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="2" y="0" width="1" height="1" fill="#e08a3c" />
      <rect x="7" y="0" width="1" height="1" fill="#e08a3c" />
      <rect x="2" y="1" width="6" height="3" fill="#e08a3c" />
      <rect x="3" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="6" y="2" width="1" height="1" fill="#1d2b53" />
      <rect x="1" y="4" width="7" height="4" fill="#e08a3c" />
      <rect x="2" y="8" width="2" height="1" fill="#a85f1e" />
      <rect x="5" y="8" width="2" height="1" fill="#a85f1e" />
      <rect
        className="cat-tail"
        x="7" y="3" width="2" height="3" fill="#e08a3c"
        style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}
      />
    </svg>
  )
}
