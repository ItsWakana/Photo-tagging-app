import { createContext, useRef, useState, useEffect, useContext } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";

import { PopupProvider } from "./PopupContext";
import { PopupContext } from "./PopupContext";
import { DatabaseProvider } from "./DatabaseContext";

export const MainContext = createContext({});

export const MainProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [bestScore, setBestScore] = useState(null);

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

    useEffect(() => {

        if (winner) {
            setIsRunning(false);
        }
    },[winner]);

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

    const checkCoordinates = (fetchedCoordinates) => {

        return currentCoordinate.x >= fetchedCoordinates.xStart && currentCoordinate.x <= fetchedCoordinates.xEnd && currentCoordinate.y >= fetchedCoordinates.yStart && currentCoordinate.y <= fetchedCoordinates.yEnd

    }
    // const handleCharacterQuery = async (character) => {
    //     setImageIsClicked(false);
    //     const characterRef = doc(db, "characters", "character list");
    //         const characterSnapshot = await getDoc(characterRef);
    //         const characterArray = characterSnapshot.data();
    
    //         const dbCoordinates = characterArray[character].coordinates;
    
    //         return checkCoordinates(dbCoordinates);
    // }

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

    return (
        <MainContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters, imageIsClicked, setImageIsClicked, boxSelectorRef, currentCoordinate, setCharacters,
            startTime, setStartTime, elapsedTime, setElapsedTime, isRunning, isLoggedIn, setIsLoggedIn, user, setUser, bestScore, setBestScore, restartGame,checkCoordinates,
        }}>
            <PopupProvider>
                <DatabaseProvider>
                {children}
                </DatabaseProvider>
            </PopupProvider>
        </MainContext.Provider>
    )
}
