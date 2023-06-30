import { createContext, useEffect, useState } from "react";
import ImageInteractionProvider from "./ImageInteractionContext";
import PopupProvider from "./PopupContext";
import UserProvider from "./UserContext";
import DatabaseProvider from "./DatabaseContext";

export const GameStateContext = createContext({});

const GameStateProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const [bestScore, setBestScore] = useState(null);

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
        gameStarted, toggleGameState, characters, setCharacters,
        startTime, setStartTime, elapsedTime, setElapsedTime, 
        isRunning, bestScore, setBestScore, restartGame
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

export default GameStateProvider;