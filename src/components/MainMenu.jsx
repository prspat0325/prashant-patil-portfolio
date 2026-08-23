import { useMenuNavigation } from '../hooks/useMenuNavigation'
import MenuCompanion from './creatures/MenuCompanion'
import profile from '../data/profile'

const MENU_ITEMS = [
  { key: 'trainer', label: 'TRAINER CARD', subtitle: 'About' },
  { key: 'pokedex', label: 'POKEDEX', subtitle: 'Projects' },
  { key: 'moves', label: 'MOVES', subtitle: 'Skills' },
  { key: 'badges', label: 'BADGES', subtitle: 'Experience' },
  { key: 'contact', label: 'CONTACT', subtitle: 'Get in touch' },
]

export default function MainMenu({ onNavigate, playBlip, prefersReducedMotion }) {
  const { cursorIndex } = useMenuNavigation({
    itemCount: MENU_ITEMS.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); onNavigate(MENU_ITEMS[i].key) },
  })

  return (
    <div className="menu-screen">
      <MenuCompanion prefersReducedMotion={prefersReducedMotion} />
      <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
      <ul className="menu-list font-pixel">
        {MENU_ITEMS.map((item, i) => (
          <li key={item.key} className={i === cursorIndex ? 'active' : ''}>
            <button
              type="button"
              onClick={() => { playBlip('select'); onNavigate(item.key) }}
            >
              <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
              <span className="menu-item-subtitle font-body">{item.subtitle}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
