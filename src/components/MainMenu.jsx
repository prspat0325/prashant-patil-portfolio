import { useMenuNavigation } from '../hooks/useMenuNavigation'
import ConsoleDpad from './ConsoleDpad'
import CatCharacter from './creatures/CatCharacter'
import DogCharacter from './creatures/DogCharacter'
import profile from '../data/profile'
import labels from '../data/labels'

const MENU_ITEMS = [
  { key: 'trainer', label: 'ABOUT' },
  { key: 'pokedex', label: 'PROJECTS' },
  { key: 'moves', label: 'SKILLS' },
  { key: 'badges', label: 'EXPERIENCE' },
  { key: 'contact', label: 'CONTACT' },
]

export default function MainMenu({ onNavigate, playBlip, prefersReducedMotion }) {
  const { cursorIndex, moveUp, moveDown, select } = useMenuNavigation({
    itemCount: MENU_ITEMS.length,
    onMove: () => playBlip?.('move'),
    onSelect: (i) => { playBlip?.(); onNavigate(MENU_ITEMS[i].key) },
  })

  return (
    <div className="menu-screen">
      <div className="title-row">
        <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
        <span className="avatar-badge" role="img" aria-label="person coding at a laptop">🧑‍💻</span>
      </div>
      <div className="menu-list-wrap">
        <div className="mascot-perch mascot-perch-left">
          <CatCharacter prefersReducedMotion={prefersReducedMotion} />
        </div>
        <div className="mascot-perch mascot-perch-right">
          <DogCharacter prefersReducedMotion={prefersReducedMotion} />
        </div>
        <ul className="menu-list font-pixel">
          {MENU_ITEMS.map((item, i) => (
            <li key={item.key} className={i === cursorIndex ? 'active' : ''}>
              <button
                type="button"
                onClick={() => { playBlip?.(); onNavigate(item.key) }}
              >
                <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
                <span className="menu-item-subtitle font-jp">{labels.menu[item.key]}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="wave-trim" aria-hidden="true" />
      </div>
      <a className="font-pixel resume-link" href="/resume-prashant-patil.pdf" download>
        DOWNLOAD RESUME
        <span className="font-jp jp-gloss">{labels.downloadResume}</span>
      </a>
      <ConsoleDpad onUp={moveUp} onDown={moveDown} onSelect={select} />
    </div>
  )
}
