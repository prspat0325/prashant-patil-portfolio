export default function DragonCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dragon-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="140" height="70" viewBox="0 0 20 10" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* tail */}
      <rect x="0" y="7" width="3" height="2" fill="#1e6b41" />
      <rect x="2" y="6" width="4" height="2" fill="#2f8f5b" />
      {/* body, ascending segments */}
      <rect x="5" y="5" width="4" height="2" fill="#2f8f5b" />
      <rect x="8" y="4" width="4" height="2" fill="#2f8f5b" />
      <rect x="11" y="3" width="4" height="2" fill="#2f8f5b" />
      {/* wing marking */}
      <rect x="10" y="2" width="3" height="2" fill="#f8d34a" />
      {/* neck + head */}
      <rect x="14" y="2" width="3" height="2" fill="#2f8f5b" />
      <rect x="16" y="0" width="4" height="3" fill="#1e6b41" />
      {/* eye */}
      <rect x="17" y="1" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
