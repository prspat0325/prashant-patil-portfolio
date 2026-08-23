import { useState } from 'react'
import { useMenuNavigation } from '../hooks/useMenuNavigation'
import { useBackNavigation } from '../hooks/useBackNavigation'
import DialogueBox from './DialogueBox'
import LeviathanCreature from './creatures/LeviathanCreature'
import profile from '../data/profile'

export default function PokedexScreen({ onBack, playBlip, prefersReducedMotion }) {
  const [openId, setOpenId] = useState(null)
  const { projects } = profile

  const { cursorIndex } = useMenuNavigation({
    itemCount: projects.length,
    enabled: openId === null,
    onSelect: (i) => { playBlip(); setOpenId(projects[i].id) },
    onBack,
  })
  useBackNavigation(() => (openId ? setOpenId(null) : onBack()), true)

  const openProject = projects.find((p) => p.id === openId)

  return (
    <div className="console-frame screen-content">
      <LeviathanCreature prefersReducedMotion={prefersReducedMotion} />
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>POKEDEX</h2>

      {!openProject && (
        <ul className="menu-list font-pixel">
          {projects.map((p, i) => (
            <li key={p.id} className={i === cursorIndex ? 'active' : ''}>
              <button type="button" onClick={() => { playBlip(); setOpenId(p.id) }}>
                <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> No. {p.number} {p.name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}

      {openProject && (
        <>
          <p className="font-pixel" style={{ fontSize: '11px' }}>No. {openProject.number} {openProject.name.toUpperCase()}</p>
          <DialogueBox text={openProject.description} prefersReducedMotion={prefersReducedMotion} />
          <p className="font-body">Tech: {openProject.tech.join(', ')}</p>
          <a className="font-pixel resume-link" href={openProject.link.url} target="_blank" rel="noreferrer">
            {openProject.link.label.toUpperCase()}
          </a>
          <button type="button" className="font-pixel back-button" onClick={() => setOpenId(null)}>
            ◀ BACK TO LIST
          </button>
        </>
      )}

      {!openProject && (
        <button type="button" className="font-pixel back-button" onClick={onBack}>
          ◀ BACK TO MENU
        </button>
      )}
    </div>
  )
}
