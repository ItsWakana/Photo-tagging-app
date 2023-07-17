import { createContext, useEffect, useState, useContext } from "react";
import ImageInteractionProvider from "./ImageInteractionContext";
import PopupProvider from "./PopupContext";
import UserProvider from "./UserContext";
import DatabaseProvider from "./DatabaseContext";
import { useGameScores, useTimers } from "../Hooks/GameStateHooks";

const GameStateContext = createContext({});

const GameStateProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    // const [startTime, setStartTime] = useState(null);
    // const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const gameScores = useGameScores();
    const gameTimers = useTimers();

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
        gameTimers.setStartTime(null);
        gameTimers.setElapsedTime(0);
        // setStartTime(null);
        // setElapsedTime(0);
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
        isRunning,
        restartGame,
        ...gameScores,
        ...gameTimers
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
    const context = useContext(GameStateContext);
    return context;
}

export default GameStateProvider;