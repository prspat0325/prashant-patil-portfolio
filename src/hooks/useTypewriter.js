import { useEffect, useState } from 'react'

export function useTypewriter(text, { speedMs = 22, prefersReducedMotion = false } = {}) {
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : '')
  const [done, setDone] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        clearInterval(id)
      }
    }, speedMs)
    return () => clearInterval(id)
  }, [text, speedMs, prefersReducedMotion])

  function skip() {
    setDisplayed(text)
    setDone(true)
  }

  return { displayed, done, skip }
}
