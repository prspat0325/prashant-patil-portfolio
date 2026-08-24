import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import PsychicCreature from './creatures/PsychicCreature'
import profile from '../data/profile'
import labels from '../data/labels'

export default function TrainerCardScreen({ onBack, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { identity, summary, stats } = profile

  return (
    <div className="console-frame screen-content">
      <PsychicCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>ABOUT</h2>
      <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.screens.trainer}</p>
      <p className="font-body" style={{ marginBottom: 4 }}>{identity.name} — {identity.title}</p>
      <p className="font-body" style={{ marginTop: 0, opacity: 0.85 }}>{identity.location}</p>

      <DialogueBox text={summary} prefersReducedMotion={prefersReducedMotion} />

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
        <span className="font-jp jp-gloss">{labels.downloadResume}</span>
      </a>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
        <span className="font-jp jp-gloss">{labels.back}</span>
      </button>
    </div>
  )
}
