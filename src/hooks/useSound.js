import { useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-muted'

export function useSound() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'false'
    } catch {
      return true
    }
  })
  const ctxRef = useRef(null)

  function getContext() {
    if (!ctxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AudioContextClass()
    }
    return ctxRef.current
  }

  function playBlip() {
    if (muted) return
    const ctx = getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const duration = 0.06
    osc.type = 'square'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  }

  function toggleMute() {
    setMuted((current) => {
      const next = !current
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable (private mode) — mute state just won't persist
      }
      return next
    })
  }

  return { playBlip, muted, toggleMute }
}
