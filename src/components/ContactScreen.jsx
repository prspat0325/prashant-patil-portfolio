import { useMenuNavigation } from '../hooks/useMenuNavigation'
import ConsoleDpad from './ConsoleDpad'
import profile from '../data/profile'
import labels from '../data/labels'

export default function ContactScreen({ onBack, playBlip }) {
  const { identity } = profile
  const items = [
    { label: `EMAIL: ${identity.email}`, href: `mailto:${identity.email}` },
    { label: `PHONE: ${identity.phone}`, href: `tel:${identity.phone.replace(/\s+/g, '')}` },
    { label: 'LINKEDIN', href: identity.linkedin },
    { label: 'GITHUB', href: identity.github },
  ]

  const { cursorIndex, moveUp, moveDown, select } = useMenuNavigation({
    itemCount: items.length,
    onMove: () => playBlip('move'),
    onSelect: (i) => { playBlip(); window.open(items[i].href, '_blank') },
    onBack,
  })

  return (
    <div className="console-frame screen-content">
      <h2 className="font-pixel" style={{ fontSize: '14px' }}>CONTACT</h2>
      <p className="font-jp jp-gloss" style={{ margin: 0 }}>{labels.screens.contact}</p>
      <ul className="menu-list font-pixel">
        {items.map((item, i) => (
          <li key={item.label} className={i === cursorIndex ? 'active' : ''}>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              onClick={() => playBlip()}
              style={{ display: 'block', padding: '14px 12px', color: 'var(--gbc-text)', textDecoration: 'none', fontSize: '11px' }}
            >
              <span className="cursor">{i === cursorIndex ? '▶' : ''}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="font-pixel back-button" onClick={onBack}>
        ◀ BACK
        <span className="font-jp jp-gloss">{labels.back}</span>
      </button>
      <ConsoleDpad onUp={moveUp} onDown={moveDown} onSelect={select} />
    </div>
  )
}
