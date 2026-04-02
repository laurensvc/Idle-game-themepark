import { useEffect } from 'react'
import { HUD } from './components/HUD'
import { ParkView } from './components/ParkView'
import { Notifications } from './components/Notifications'
import { startGameLoop, stopGameLoop } from './store/gameStore'

const App = () => {
  useEffect(() => {
    startGameLoop()
    return () => stopGameLoop()
  }, [])

  return (
    <div className="crt-overlay flex flex-col h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Top HUD bar */}
      <HUD />

      {/* Main game view */}
      <ParkView />

      {/* Toast notifications */}
      <Notifications />
    </div>
  )
}

export default App
