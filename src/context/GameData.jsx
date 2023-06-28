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

            console.log('no best score');
            console.log(elapsedTime);
            await setDoc(doc(db, "/scores", user.uid), {
                elapsedTime
            });
        } else if (bestScore > elapsedTime) {
            const scoreRef = doc(db, "/scores", user.uid);
            
            await updateDoc(scoreRef, {
                elapsedTime
            });
            setBestScore(elapsedTime);
        }

        if (bestScore < elapsedTime) {
            console.log('Score is not higher than best score');
            //TODO: ERROR LOGGING IF THE USER TRIES TO SUBMIT A SCORE NOT HIGHER THAN THEIR BEST SCORE.
        }
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
            console.log(err);
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

    const toggleGameState = () => {
        setGameStarted((prev) => !prev);
    }

    return (
        <DataContext.Provider value={{
            gameStarted, toggleGameState, handleImageClick,
            characters, imageIsClicked, boxSelectorRef, currentCoordinate,
            handleCharacterQuery, setCharacters,
            startTime, setStartTime, elapsedTime, setElapsedTime, isRunning, handleLoginClick, isLoggedIn, user, bestScore, submitScoreFirebase
        }}>
            {children}
        </DataContext.Provider>
    )
}
