import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import PsychicCreature from './creatures/PsychicCreature'
import profile from '../data/profile'

export default function TrainerCardScreen({ onBack, playBlip, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { identity, summary, stats } = profile

  return (
    <div className="console-frame screen-content">
      <PsychicCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>TRAINER CARD</h2>
      <p className="font-body" style={{ marginBottom: 4 }}>{identity.name} — {identity.title}</p>
      <p className="font-body" style={{ marginTop: 0, opacity: 0.85 }}>{identity.location}</p>

      <DialogueBox text={summary} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />

      <ul className="font-body stat-list">
        {stats.map((s) => (
          <li key={s.label}><strong>{s.label}:</strong> {s.value}</li>
        ))}
      </ul>

      <a
        className="font-pixel resume-link"
        href="/resume-prashant-patil.pdf"
        download
      >
        DOWNLOAD RESUME
      </a>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
