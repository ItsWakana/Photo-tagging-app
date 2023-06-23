import { createContext, useRef, useState } from "react";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseSetup";
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    // const characters = ["Arnold", "Totoro", "Johnny Bravo"];

    const initialCharacterState = [
        { name: "Arnold", isFound: false },
        { name: "Totoro", isFound: false },
        { name: "Johnny Bravo", isFound: false },
    ]
    const [characters, setCharacters] = useState(initialCharacterState);

    const [imageIsClicked, setImageIsClicked] = useState(false);
    const [currentCoordinate, setCurrentCoordinate] = useState(null);

    const boxSelectorRef = useRef(null);

    const winner = characters.every((char) => char.isFound);

    if (winner) {
        console.log('You found them all!');
    }
    const handleImageClick = async (event) => {

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

        const leftPos = event.clientX - boxRect.width / 2 + window.scrollX;
        const topPos = event.clientY - boxRect.height / 2 + window.scrollY;

        boxSelectorElement.style.left = `${leftPos}px`;
        boxSelectorElement.style.top = `${topPos}px`;

        setCurrentCoordinate(coordinateObj);
    }

    const handleCharacterQuery = async (character) => {
        setImageIsClicked(false);
        const characterRef = doc(db, "characters", "character list");
        const characterSnapshot = await getDoc(characterRef);

        const characterArray = characterSnapshot.data();

        const dbCoordinates = characterArray[character].coordinates;

        // if (currentCoordinate.x >= dbCoordinates.xStart && currentCoordinate.x <= dbCoordinates.xEnd && currentCoordinate.y >= dbCoordinates.yStart && currentCoordinate.y <= dbCoordinates.yEnd) {
        //     console.log(`Congrats! You found ${character}!`);
        // } else {
        //     console.log(`This is not ${character}`);
        // }

        return currentCoordinate.x >= dbCoordinates.xStart && currentCoordinate.x <= dbCoordinates.xEnd && currentCoordinate.y >= dbCoordinates.yStart && currentCoordinate.y <= dbCoordinates.yEnd


    }

    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters, imageIsClicked, boxSelectorRef, currentCoordinate,
            handleCharacterQuery, setCharacters
        }}>
            {children}
        </DataContext.Provider>
    )
}
