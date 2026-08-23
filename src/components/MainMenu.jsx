import { useMenuNavigation } from '../hooks/useMenuNavigation'
import ConsoleDpad from './ConsoleDpad'
import CatCharacter from './creatures/CatCharacter'
import DogCharacter from './creatures/DogCharacter'
import profile from '../data/profile'

const MENU_ITEMS = [
  { key: 'trainer', label: 'TRAINER CARD', subtitle: 'About' },
  { key: 'pokedex', label: 'POKEDEX', subtitle: 'Projects' },
  { key: 'moves', label: 'MOVES', subtitle: 'Skills' },
  { key: 'badges', label: 'BADGES', subtitle: 'Experience' },
  { key: 'contact', label: 'CONTACT', subtitle: 'Get in touch' },
]

export default function MainMenu({ onNavigate, playBlip, prefersReducedMotion }) {
  const { cursorIndex, moveUp, moveDown, select } = useMenuNavigation({
    itemCount: MENU_ITEMS.length,
    onMove: () => playBlip?.('move'),
    onSelect: (i) => { playBlip?.(); onNavigate(MENU_ITEMS[i].key) },
  })

  return (
    <div className="menu-screen">
      <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
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
                <span className="menu-item-subtitle font-body">{item.subtitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <a className="font-pixel resume-link" href="/resume-prashant-patil.pdf" download>
        DOWNLOAD RESUME
      </a>
      <ConsoleDpad onUp={moveUp} onDown={moveDown} onSelect={select} />
    </div>
  )
}
