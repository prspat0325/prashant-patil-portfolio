export default function DragonCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature dragon-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="80" height="40" viewBox="0 0 20 10" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="0" y="6" width="4" height="2" fill="#2f8f5b" />
      <rect x="4" y="4" width="4" height="2" fill="#2f8f5b" />
      <rect x="8" y="2" width="4" height="2" fill="#2f8f5b" />
      <rect x="12" y="1" width="4" height="2" fill="#1e6b41" />
      <rect x="16" y="0" width="2" height="2" fill="#1e6b41" />
      <rect x="17" y="0" width="1" height="1" fill="#f8d34a" />
    </svg>
  )
}
