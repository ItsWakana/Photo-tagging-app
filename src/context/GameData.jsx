import { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState
        }}>
            {children}
        </DataContext.Provider>
    )
}
