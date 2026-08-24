import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import DragonCreature from './creatures/DragonCreature'
import DogCharacter from './creatures/DogCharacter'
import profile from '../data/profile'
import labels from '../data/labels'

export default function BadgesScreen({ onBack, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { experience, certifications } = profile

  return (
    <div className="console-frame screen-content">
      <DragonCreature prefersReducedMotion={prefersReducedMotion} />
      <div className={`mascot-corner mascot-corner-right dog-roam ${prefersReducedMotion ? 'is-static' : ''}`}>
        <DogCharacter prefersReducedMotion={prefersReducedMotion} />
      </div>
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>EXPERIENCE</h2>
      <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.screens.badges}</p>

      <div className="badges-list">
        {experience.map((job) => (
          <div key={job.company} className="badge-card">
            <p className="font-pixel badge-title">{job.company} — {job.role}</p>
            <p className="font-body badge-dates">{job.dates}</p>
            <DialogueBox
              text={job.bullets.join(' ')}
              prefersReducedMotion={prefersReducedMotion}
              className="badge-dialogue"
            />
          </div>
        ))}

        <p className="font-pixel badge-title" style={{ marginTop: 16 }}>
          CERTIFICATIONS <span className="font-jp" style={{ opacity: 0.7 }}>({labels.screens.certifications})</span>
        </p>
        <ul className="font-body ribbon-list">
          {certifications.map((cert) => (
            <li key={cert}>🎖 {cert}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
        <span className="font-jp jp-gloss">{labels.back}</span>
      </button>
    </div>
  )
}
