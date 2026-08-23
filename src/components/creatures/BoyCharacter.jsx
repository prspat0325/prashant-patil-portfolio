export default function BoyCharacter({ facingLeft, walking, prefersReducedMotion }) {
  return (
    <svg
      className={`creature boy-character ${walking && !prefersReducedMotion ? 'is-walking' : ''}`}
      width="56" height="65" viewBox="0 0 12 14" shapeRendering="crispEdges"
      style={{ transform: facingLeft ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      {/* cap */}
      <rect x="4" y="0" width="4" height="1" fill="#2f6fb3" />
      <rect x="3" y="1" width="6" height="1" fill="#2f6fb3" />
      <rect x="5" y="1" width="2" height="1" fill="#e74c3c" />
      {/* hair tufts + forehead */}
      <rect x="2" y="2" width="1" height="1" fill="#1d1d1d" />
      <rect x="9" y="2" width="1" height="1" fill="#1d1d1d" />
      <rect x="4" y="2" width="4" height="1" fill="#f2c199" />
      {/* face + eyes */}
      <rect x="3" y="3" width="6" height="1" fill="#f2c199" />
      <rect x="4" y="3" width="1" height="1" fill="#1d2b53" />
      <rect x="7" y="3" width="1" height="1" fill="#1d2b53" />
      <rect x="4" y="4" width="4" height="1" fill="#f2c199" />
      <rect x="5" y="5" width="2" height="1" fill="#f2c199" />
      {/* jacket */}
      <rect x="2" y="6" width="8" height="1" fill="#3aa6a0" />
      <rect x="1" y="7" width="10" height="1" fill="#3aa6a0" />
      <rect x="1" y="8" width="10" height="1" fill="#3aa6a0" />
      <rect x="4" y="8" width="4" height="1" fill="#f2c230" />
      <rect x="2" y="9" width="8" height="1" fill="#3aa6a0" />
      {/* jeans */}
      <rect x="3" y="10" width="2" height="3" fill="#2b3a6b" />
      <rect x="7" y="10" width="2" height="3" fill="#2b3a6b" />
      {/* shoes */}
      <rect x="2" y="13" width="3" height="1" fill="#1d2b53" />
      <rect x="7" y="13" width="3" height="1" fill="#1d2b53" />
    </svg>
  )
}
