import './index.css'
import StartupScreen from './components/StartupScreen';
import GamePage from './components/GamePage';
import { MainProvider } from './context/MainContext.jsx';


function App() {

  return (
    <MainProvider>
      <GamePage />
      <StartupScreen />
    </MainProvider>
  )
}

export default App
