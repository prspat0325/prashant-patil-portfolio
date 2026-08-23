import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import DragonCreature from './creatures/DragonCreature'
import DogCharacter from './creatures/DogCharacter'
import profile from '../data/profile'

export default function BadgesScreen({ onBack, prefersReducedMotion }) {
  useBackNavigation(onBack)
  const { experience, certifications } = profile

  return (
    <div className="console-frame screen-content">
      <DragonCreature prefersReducedMotion={prefersReducedMotion} />
      <div className={`mascot-corner mascot-corner-right dog-roam ${prefersReducedMotion ? 'is-static' : ''}`}>
        <DogCharacter prefersReducedMotion={prefersReducedMotion} />
      </div>
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>BADGES</h2>

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

        <p className="font-pixel badge-title" style={{ marginTop: 16 }}>CERTIFICATIONS</p>
        <ul className="font-body ribbon-list">
          {certifications.map((cert) => (
            <li key={cert}>🎖 {cert}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
      </button>
    </div>
  )
}
