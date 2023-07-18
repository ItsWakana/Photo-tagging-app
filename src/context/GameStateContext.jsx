import { createContext, useEffect, useState, useContext } from "react";
import ImageInteractionProvider from "./ImageInteractionContext";
import PopupProvider from "./PopupContext";
import UserProvider from "./UserContext";
import DatabaseProvider from "./DatabaseContext";
import { useGameScores } from "../Hooks/GameStateHooks";

export const GameStateContext = createContext({});

const GameStateProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    // const [playerScores, setPlayerScores] = useState([]);
    // const [bestScore, setBestScore] = useState(null);
    // const [googleAccountScore, setGoogleAccountScore] = useState(null);
    const gameScores = useGameScores();

    const initialCharacterState = [
        { name: "Arnold", isFound: false },
        { name: "Totoro", isFound: false },
        { name: "Johnny Bravo", isFound: false },
    ]

    const [characters, setCharacters] = useState(initialCharacterState);

    const winner = characters.every((char) => char.isFound);

    useEffect(() => {

        if (winner) {
            setIsRunning(false);
        }
    },[winner]);

    const restartGame = () => {
        toggleGameState();
        setCharacters(initialCharacterState);
        setStartTime(null);
        setElapsedTime(0);
        setIsRunning(true);

    }

    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    const contextValue = {
        gameStarted,
        toggleGameState,
        characters,
        setCharacters,
        startTime,
        setStartTime,
        elapsedTime,
        setElapsedTime,
        isRunning,
        restartGame,
        ...gameScores
    }
    return (
        <GameStateContext.Provider value={contextValue}>
        <ImageInteractionProvider>
            <PopupProvider>
                <UserProvider>
                    <DatabaseProvider>
                        {children}
                    </DatabaseProvider>
                </UserProvider>
            </PopupProvider>
        </ImageInteractionProvider>
        </GameStateContext.Provider>
    )
}

export const useGameStateContext = () => {

    // const { gameStarted, toggleGameState, characters, setCharacters,
    //     startTime, setStartTime, elapsedTime, setElapsedTime, 
    //     isRunning, restartGame, gameScores } = useContext(GameStateContext);

    // return { gameStarted, toggleGameState, characters, setCharacters,
    //     startTime, setStartTime, elapsedTime, setElapsedTime, 
    //     isRunning, restartGame, gameScores }
    return useContext(GameStateContext);
}

export default GameStateProvider;