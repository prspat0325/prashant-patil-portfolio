export default function LeviathanCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature leviathan-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="72" height="48" viewBox="0 0 18 12" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="10" height="4" fill="#3a7bd5" />
      <rect x="11" y="2" width="4" height="3" fill="#3a7bd5" />
      <rect x="0" y="5" width="2" height="2" fill="#2a5aa5" />
      <rect x="12" y="3" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
