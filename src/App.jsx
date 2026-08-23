import { useState } from 'react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import BootScreen from './components/BootScreen'
import MainMenu from './components/MainMenu'
import MuteToggle from './components/MuteToggle'

export default function App() {
  const [screen, setScreen] = useState('boot')
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()

  function goToMenu() { setScreen('menu') }

  return (
    <>
      {screen !== 'boot' && <MuteToggle muted={muted} toggleMute={toggleMute} />}
      {screen === 'boot' && <BootScreen onStart={goToMenu} />}
      {screen === 'menu' && <MainMenu onNavigate={setScreen} playBlip={playBlip} />}
      {screen !== 'boot' && screen !== 'menu' && (
        <div className="console-frame">
          <p className="font-body">Screen "{screen}" not built yet — press Escape to go back.</p>
        </div>
      )}
    </>
  )
}
