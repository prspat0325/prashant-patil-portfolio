export default function MenuCompanion({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature menu-companion ${prefersReducedMotion ? 'is-static' : ''}`}
      width="80" height="72" viewBox="0 0 10 9" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="3" y="0" width="4" height="1" fill="#f2a65a" />
      <rect x="1" y="1" width="8" height="1" fill="#f2a65a" />
      <rect x="0" y="2" width="10" height="1" fill="#f2a65a" />
      <rect x="0" y="3" width="10" height="1" fill="#f2a65a" />
      <rect x="0" y="4" width="10" height="1" fill="#f2a65a" />
      <rect x="1" y="5" width="8" height="1" fill="#e08a3c" />
      <rect x="2" y="6" width="6" height="1" fill="#e08a3c" />
      <rect x="3" y="7" width="4" height="1" fill="#e08a3c" />
      <rect x="3" y="3" width="1" height="1" fill="#1d2b53" />
      <rect x="6" y="3" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
