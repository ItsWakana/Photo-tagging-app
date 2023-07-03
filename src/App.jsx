import './index.css'
import StartupScreen from './components/StartupScreen';
import GamePage from './components/GamePage';
import PageNotFound from './components/PageNotFound';
import GameStateProvider from './context/GameStateContext';
import { Routes, Route } from 'react-router-dom';

function App() {

  //TODO: SET THE USERS GAME STATE URL TO INCLUDE THEIR LOGIN UID, CREATE A CUSTOM URL FOR WHEN THE GAME STARTS. IF THEY TRY TO ACCESS THIS URL WHEN THEY AREN'T LOGGED IN, REDIRECT THEM TO THE STARTUP LOGIN PAGE.

  return (
    <>
      <GameStateProvider>
        <GamePage />
      <Routes>
        <Route path="/" element={<StartupScreen />}/>
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
      </GameStateProvider>
    </>
  )
}

export default App
