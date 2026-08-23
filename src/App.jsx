import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import DialogueBox from './components/DialogueBox'
import MuteToggle from './components/MuteToggle'

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()

  return (
    <div className="console-frame">
      <MuteToggle muted={muted} toggleMute={toggleMute} />
      <DialogueBox
        text="DialogueBox + MuteToggle smoke test: typing, click-to-skip, and sound."
        playBlip={playBlip}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  )
}
