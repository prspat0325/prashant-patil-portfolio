import { useBackNavigation } from '../hooks/useBackNavigation'
import profile from '../data/profile'
import labels from '../data/labels'

export default function MovesScreen({ onBack }) {
  useBackNavigation(onBack)
  const { skillGroups } = profile

  return (
    <div className="console-frame screen-content">
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>MOVES</h2>
      <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.screens.moves}</p>
      <div className="moves-list">
        {skillGroups.map((group) => (
          <div key={group.category} className="move-group">
            <p className="font-pixel move-group-title">{group.category.toUpperCase()}</p>
            <ul className="font-body">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
        <span className="font-jp jp-gloss">{labels.back}</span>
      </button>
    </div>
  )
}
