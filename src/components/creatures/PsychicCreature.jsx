export default function PsychicCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature psychic-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="64" height="64" viewBox="0 0 16 16" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="6" y="2" width="4" height="4" fill="#b98ce8" />
      <rect x="5" y="6" width="6" height="5" fill="#9a5fd1" />
      <rect x="4" y="11" width="2" height="3" fill="#7a3fb0" />
      <rect x="10" y="11" width="2" height="3" fill="#7a3fb0" />
      <rect x="7" y="3" width="1" height="1" fill="#1d2b53" />
      <rect x="9" y="3" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
