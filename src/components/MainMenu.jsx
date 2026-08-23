import { useMenuNavigation } from '../hooks/useMenuNavigation'
import profile from '../data/profile'

const MENU_ITEMS = [
  { key: 'trainer', label: 'TRAINER CARD' },
  { key: 'pokedex', label: 'POKEDEX' },
  { key: 'moves', label: 'MOVES' },
  { key: 'badges', label: 'BADGES' },
  { key: 'contact', label: 'CONTACT' },
]

export default function MainMenu({ onNavigate, playBlip }) {
  const { cursorIndex } = useMenuNavigation({
    itemCount: MENU_ITEMS.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip('select'); onNavigate(MENU_ITEMS[i].key) },
  })

  return (
    <div className="menu-screen">
      <h1 className="font-pixel menu-title">{profile.identity.name.toUpperCase()}</h1>
      <ul className="menu-list font-pixel">
        {MENU_ITEMS.map((item, i) => (
          <li key={item.key} className={i === cursorIndex ? 'active' : ''}>
            <button
              type="button"
              onClick={() => { playBlip('select'); onNavigate(item.key) }}
            >
              <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
