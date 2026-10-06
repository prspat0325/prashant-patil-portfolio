import { useBackNavigation } from '../hooks/useBackNavigation'
import profile from '../data/profile'
import labels from '../data/labels'

export default function BadgesScreen({ onBack }) {
  useBackNavigation(onBack)
  const { experience, certifications, certificationsVerifyUrl, education } = profile

  return (
    <div className="console-frame screen-content">
      {/* Pixel mascots removed for a calmer, subtler look. Sprites are kept in ./creatures if you want them back. */}
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>EXPERIENCE</h2>
      <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.screens.badges}</p>

      <div className="badges-list">
        {experience.map((job) => (
          <div key={job.company} className="badge-card">
            <p className="font-pixel badge-title">{job.company} — {job.role}</p>
            <p className="font-body badge-dates">{job.dates}</p>
            <ul className="dialogue-box font-body badge-dialogue badge-bullets">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className="font-pixel badge-title" style={{ marginTop: 16 }}>
          CERTIFICATIONS <span className="font-jp" style={{ opacity: 0.7 }}>({labels.screens.certifications})</span>
        </p>
        <ul className="font-body ribbon-list">
          {certifications.map((cert) => (
            <li key={cert}>❀ {cert}</li>
          ))}
        </ul>
        <a className="font-body verify-link" href={certificationsVerifyUrl} target="_blank" rel="noreferrer">
          Verify all credentials on LinkedIn ↗
        </a>

        <p className="font-pixel badge-title" style={{ marginTop: 24 }}>
          EDUCATION <span className="font-jp" style={{ opacity: 0.7 }}>({labels.screens.education})</span>
        </p>
        <ul className="font-body ribbon-list">
          {education.map((ed) => (
            <li key={ed.degree}>❀ {ed.degree} — {ed.school} · {ed.date} · {ed.percentage}</li>
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
