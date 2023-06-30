import './index.css'
import StartupScreen from './components/StartupScreen';
import GamePage from './components/GamePage';
import GameStateProvider from './context/GameStateContext';

function App() {

  return (
    <GameStateProvider>
      <GamePage />
      <StartupScreen />
    </GameStateProvider>
  )
}

export default App
