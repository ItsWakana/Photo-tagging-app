import { createContext, useRef, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [gameStarted, setGameStarted] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [bestScore, setBestScore] = useState(null);

    const [popupMessage, setPopupMessage] = useState('');
    const [isPositivePopup, setIsPositivePopup] = useState(true);

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

    const getFirebaseData = async (userId) => {

        const scoreRef = doc(db, "/scores", userId);

        const scoreSnapshot = await getDoc(scoreRef);

        if (!scoreSnapshot.exists()) {
            return null;
        }

        return scoreSnapshot.data();
    }

    const submitScoreFirebase = async () => {

        if (!bestScore) {

            //do a try catch to make sure the data gets submitted propery, if it does diplay a score submitted message otherwise show the user a something went wrong message.
            //Oops, something went wrong. Please try again

            try {
                await setDoc(doc(db, "/scores", user.uid), {
                    elapsedTime
                });
                setBestScore(elapsedTime);
                handlePopupType("Score submitted successfully!", true);
            } catch(err) {
                handlePopupType("There was an error submitting your score", false);
            }
            return;
        } else if (bestScore > elapsedTime) {
            const scoreRef = doc(db, "/scores", user.uid);
            
            try {
                await updateDoc(scoreRef, {
                    elapsedTime
                });
                setBestScore(elapsedTime);
                handlePopupType("Score updated successfully!", true);
            } catch(err) {
                handlePopupType("There was an error updating your score", false);
            }
        }

        if (bestScore <= elapsedTime) {
            handlePopupType("Current score is not higher than your best!", false);
            //TODO: ERROR LOGGING IF THE USER TRIES TO SUBMIT A SCORE NOT HIGHER THAN THEIR BEST SCORE.
        }
    }

    const handlePopupType = (message, isPositive = true) => {
        
        setPopupMessage(message);
        setIsPositivePopup(isPositive);
    }
    const handleLoginClick = async () => {

        if (isLoggedIn) {
            signOut(getAuth());
            setUser(null);
            setIsLoggedIn(false);
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(getAuth(), provider);
            const auth = getAuth();
            setUser(auth.currentUser);
            setIsLoggedIn(true);
            const firebaseData = await getFirebaseData(auth.currentUser.uid);
            //if a bestscore exists on the users account, set the score data and display it somewhere.

            //check the firebase db, if we get a return value, we we want to set the bestScore to that value we reiceved from the db. If we don't get any data, it means that the user doesn't have a bestScore

            if (firebaseData) {
                setBestScore(firebaseData.elapsedTime);
            }
            // if (score && bestScore > score) {
            //     setBestScore(score);
            // }
        } catch(err) {
            // setPopupMessage("Sign in failed");
            handlePopupType("Sign in failed", false);
        }
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
    
            return currentCoordinate.x >= dbCoordinates.xStart && currentCoordinate.x <= dbCoordinates.xEnd && currentCoordinate.y >= dbCoordinates.yStart && currentCoordinate.y <= dbCoordinates.yEnd
    }

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

    const resetPopupMessage = () => {
        setPopupMessage('');
    }
    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters, imageIsClicked, boxSelectorRef, currentCoordinate,
            handleCharacterQuery, setCharacters,
            startTime, setStartTime, elapsedTime, setElapsedTime, isRunning, handleLoginClick, isLoggedIn, user, bestScore, submitScoreFirebase, resetPopupMessage, popupMessage, setPopupMessage, restartGame, handlePopupType, isPositivePopup
        }}>
            {children}
        </DataContext.Provider>
    )
}
