import { useEffect, useState } from 'react'

export function useMenuNavigation({ itemCount, onSelect, onBack, onMove, enabled = true }) {
  const [cursorIndex, setCursorIndex] = useState(0)

  useEffect(() => {
    if (!enabled || itemCount <= 0) return

    function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursorIndex((i) => {
          const next = (i + 1) % itemCount
          onMove?.(next)
          return next
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursorIndex((i) => {
          const next = (i - 1 + itemCount) % itemCount
          onMove?.(next)
          return next
        })
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(cursorIndex)
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        onBack?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, itemCount, cursorIndex, onSelect, onBack, onMove])

  return { cursorIndex, setCursorIndex }
}
