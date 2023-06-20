import { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const handleGameClick = (event) => {
        const image = event.target;

        const imageRect = image.getBoundingClientRect();

        const xRelative = event.pageX - imageRect.left;
        const yRelative = event.pageY - imageRect.top;

        console.log(event.target.style);
        console.log(`X:${xRelative}`);
        console.log(`Y:${yRelative}`);
    }
    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleGameClick,
        }}>
            {children}
        </DataContext.Provider>
    )
}
