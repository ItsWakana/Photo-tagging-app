import { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const characters = ["Arthur", "Totoro", "Johnny Bravo"];

    const [imageIsClicked, setImageIsClicked] = useState(false);
    const [currentCoordinate, setCurrentCoordinate] = useState(null);

    const handleImageClick = (event) => {
        const image = event.target;

        const imageRect = image.getBoundingClientRect();

        const xRelative = (event.clientX - imageRect.left) / imageRect.width;
        const yRelative = (event.clientY - imageRect.top) / imageRect.height;

        const coordinateObj = {
            x: xRelative,
            y: yRelative
        }

        setCurrentCoordinate(coordinateObj);
        //FIREBASE DB:

        //Character locations collection-
          //character name document-
            //object map containing name, Xstart, xEnd, yStart, yEnd coordinate boundary keys
        //bestScores collection

        // ArthurX: start: 0.418 end: 0.435
        // ArthurY: start: 0.617 end: 0.633

        // TotoroX: start: 0.698 end: 0.719
        // TotoroY: start: 0.527 end: 0.556

        //JohnnyBravoX: start: 0.38 end: 0.407
        //JohnnyBravoY: start: 0.349 end: 0.374

        console.log(coordinateObj);
    }
    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters
        }}>
            {children}
        </DataContext.Provider>
    )
}
