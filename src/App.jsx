import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import BootScreen from './components/BootScreen'
import TownScreen from './components/TownScreen'
import MuteToggle from './components/MuteToggle'
import TrainerCardScreen from './components/TrainerCardScreen'
import PokedexScreen from './components/PokedexScreen'
import MovesScreen from './components/MovesScreen'
import BadgesScreen from './components/BadgesScreen'
import ContactScreen from './components/ContactScreen'

const SCREEN_COMPONENTS = {
  trainer: TrainerCardScreen,
  pokedex: PokedexScreen,
  moves: MovesScreen,
  badges: BadgesScreen,
  contact: ContactScreen,
}

export default function App() {
  const [screen, setScreen] = useState('boot')
  const prefersReducedMotion = usePrefersReducedMotion()
  const { playBlip, muted, toggleMute } = useSound()

  function goToMenu() { setScreen('menu') }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: 'easeInOut' }

  const ActiveScreen = SCREEN_COMPONENTS[screen]

  return (
    <>
      {screen !== 'boot' && <MuteToggle muted={muted} toggleMute={toggleMute} />}
      <AnimatePresence mode="wait">
        {screen === 'boot' && (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={transition}>
            <BootScreen onStart={goToMenu} />
          </motion.div>
        )}
        {screen === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
            <TownScreen onNavigate={setScreen} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        )}
        {ActiveScreen && (
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={transition}
          >
            <ActiveScreen onBack={goToMenu} playBlip={playBlip} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
