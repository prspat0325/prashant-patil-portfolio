const PETALS = [
  { left: '6%', duration: '18s', delay: '0s', size: '13px' },
  { left: '22%', duration: '24s', delay: '6s', size: '11px' },
  { left: '41%', duration: '20s', delay: '12s', size: '14px' },
  { left: '58%', duration: '26s', delay: '3s', size: '10px' },
  { left: '76%', duration: '22s', delay: '9s', size: '12px' },
  { left: '92%', duration: '28s', delay: '15s', size: '11px' },
]

export default function SakuraPetals({ prefersReducedMotion }) {
  if (prefersReducedMotion) return null
  return (
    <div className="sakura-petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="sakura-petal"
          style={{ left: p.left, fontSize: p.size, animationDuration: p.duration, animationDelay: p.delay }}
        >
          🌸
        </span>
      ))}
    </div>
  )
}
