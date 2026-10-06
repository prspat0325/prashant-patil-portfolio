import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSound } from './hooks/useSound'
import BootScreen from './components/BootScreen'
import MainMenu from './components/MainMenu'
import MuteToggle from './components/MuteToggle'
import SakuraPetals from './components/SakuraPetals'
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
    : { duration: 0.6, ease: 'easeOut' }

  const ActiveScreen = SCREEN_COMPONENTS[screen]

  return (
    <>
      <SakuraPetals prefersReducedMotion={prefersReducedMotion} />
      {screen !== 'boot' && <MuteToggle muted={muted} toggleMute={toggleMute} />}
      <AnimatePresence mode="wait">
        {screen === 'boot' && (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={transition}>
            <BootScreen onStart={goToMenu} />
          </motion.div>
        )}
        {screen === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
            <MainMenu onNavigate={setScreen} playBlip={playBlip} />
          </motion.div>
        )}
        {ActiveScreen && (
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transition}
          >
            <ActiveScreen onBack={goToMenu} playBlip={playBlip} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
