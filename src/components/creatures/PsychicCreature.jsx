export default function PsychicCreature({ prefersReducedMotion }) {
  return (
    <svg
      className={`creature psychic-creature ${prefersReducedMotion ? 'is-static' : ''}`}
      width="108" height="99" viewBox="0 0 12 11" shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* ears */}
      <rect x="1" y="0" width="1" height="1" fill="#7a3fb0" />
      <rect x="10" y="0" width="1" height="1" fill="#7a3fb0" />
      <rect x="1" y="1" width="2" height="1" fill="#7a3fb0" />
      <rect x="9" y="1" width="2" height="1" fill="#7a3fb0" />
      {/* head */}
      <rect x="4" y="1" width="4" height="1" fill="#b98ce8" />
      <rect x="2" y="2" width="8" height="1" fill="#b98ce8" />
      <rect x="2" y="3" width="8" height="1" fill="#b98ce8" />
      <rect x="2" y="4" width="8" height="1" fill="#b98ce8" />
      {/* neck/shoulders */}
      <rect x="3" y="5" width="6" height="1" fill="#b98ce8" />
      {/* body */}
      <rect x="2" y="6" width="8" height="1" fill="#9a5fd1" />
      <rect x="2" y="7" width="8" height="1" fill="#9a5fd1" />
      <rect x="2" y="8" width="8" height="1" fill="#9a5fd1" />
      {/* legs */}
      <rect x="3" y="9" width="2" height="2" fill="#7a3fb0" />
      <rect x="7" y="9" width="2" height="2" fill="#7a3fb0" />
      {/* eyes */}
      <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
      <rect x="7" y="3" width="2" height="2" fill="#ffffff" />
      <rect x="4" y="4" width="1" height="1" fill="#1d2b53" />
      <rect x="7" y="4" width="1" height="1" fill="#1d2b53" />
    </svg>
  )
}
