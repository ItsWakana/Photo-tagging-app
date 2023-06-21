import { createContext, useRef, useState } from "react";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseSetup";
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const characters = ["Arnold", "Totoro", "Johnny Bravo"];

    const [imageIsClicked, setImageIsClicked] = useState(false);
    const [currentCoordinate, setCurrentCoordinate] = useState(null);

    const boxSelectorRef = useRef(null);

    const handleImageClick = async (event) => {

        // const characterRef = doc(db, "characters", "character list");
        // const characterSnapshot = await getDoc(characterRef);
        // console.log(characterSnapshot.data());

        setImageIsClicked(true);
        const image = event.target;

        const imageRect = image.getBoundingClientRect();

        const xRelative = (event.clientX - imageRect.left) / imageRect.width;
        const yRelative = (event.clientY - imageRect.top) / imageRect.height;

        const coordinateObj = {
            x: xRelative,
            y: yRelative
        }

        const boxSelectorElement = boxSelectorRef.current;
        const boxRect = boxSelectorElement.getBoundingClientRect();

        // const boxWidth = boxSelectorElement.offsetWidth;
        // const boxHeight = boxSelectorElement.offsetHeight;

        const leftPos = event.clientX - boxRect.width / 2;
        const topPos = event.clientY - boxRect.height / 2;

        boxSelectorElement.style.left = `${leftPos}px`;
        boxSelectorElement.style.top = `${topPos}px`;

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
    }

    const handleCharacterQuery = async (character) => {
        const characterRef = doc(db, "characters", "character list");
        const characterSnapshot = await getDoc(characterRef);

        const characterArray = characterSnapshot.data();

        const dbCoordinates = characterArray[character].coordinates;

        if (currentCoordinate.x >= dbCoordinates.xStart && currentCoordinate.x <= dbCoordinates.xEnd && currentCoordinate.y >= dbCoordinates.yStart && currentCoordinate.y <= dbCoordinates.yEnd) {
            console.log(`Congrats! You found ${character}!`);
        } else {
            console.log(`This is not ${character}`);
        }

        setImageIsClicked(false);

    }

    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters, imageIsClicked, boxSelectorRef, currentCoordinate,
            handleCharacterQuery
        }}>
            {children}
        </DataContext.Provider>
    )
}
