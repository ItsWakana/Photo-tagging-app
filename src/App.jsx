import './index.css'
import { useContext } from 'react'
import { DataContext } from './context/GameData'
import StartupScreen from './components/StartupScreen';
function App() {

  const { gameStarted } = useContext(DataContext);

  return (
    <>
      {gameStarted ? (
        null
      ) : (
        <StartupScreen />
      )}
    </>
  )
}

export default App
