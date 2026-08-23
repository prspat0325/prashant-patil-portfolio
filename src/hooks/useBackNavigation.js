import { useEffect } from 'react'

export function useBackNavigation(onBack, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    function handleKeyDown(e) {
      if (e.key === 'Escape' || e.key === 'Backspace') onBack()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onBack])
}
