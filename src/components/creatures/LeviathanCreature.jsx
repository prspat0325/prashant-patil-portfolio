export default function LeviathanCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature leviathan-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="140" height="84" viewBox="0 0 20 12" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* dorsal fin */}
      <rect x="7" y="1" width="3" height="2" fill="#2a5aa5" />
      {/* body, rounded via stepped taper */}
      <rect x="5" y="3" width="6" height="1" fill="#3a7bd5" />
      <rect x="3" y="4" width="10" height="1" fill="#3a7bd5" />
      <rect x="2" y="5" width="12" height="1" fill="#3a7bd5" />
      <rect x="2" y="6" width="12" height="1" fill="#3a7bd5" />
      <rect x="2" y="7" width="12" height="1" fill="#6fa8e8" />
      <rect x="3" y="8" width="10" height="1" fill="#2a5aa5" />
      <rect x="5" y="9" width="6" height="1" fill="#2a5aa5" />
      {/* tail fluke */}
      <rect x="14" y="3" width="4" height="2" fill="#2a5aa5" />
      <rect x="14" y="7" width="4" height="2" fill="#2a5aa5" />
      {/* eye */}
      <rect x="4" y="5" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
