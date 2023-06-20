import './index.css'
import { useContext } from 'react'
import { DataContext } from './context/GameData'
import StartupScreen from './components/StartupScreen';
import GamePage from './components/GamePage';

function App() {

  const { gameStarted } = useContext(DataContext);

  return (
    <>
      {gameStarted ? (
        <GamePage />
      ) : (
        <StartupScreen />
      )}
    </>
  )
}

export default App
