import { createContext, useContext, useState } from "react";
import { PopupContext } from "./PopupContext";
import { MainContext } from "./MainContext";

import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { db } from "../firebaseSetup";

export const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {

    const { handlePopupType } = useContext(PopupContext);
    
    const { bestScore, setBestScore, elapsedTime, user, isLoggedIn, setUser, setIsLoggedIn, setImageIsClicked, checkCoordinates } = useContext(MainContext);

    const submitScoreFirebase = async () => {

        if (!bestScore) {

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

    const getFirebaseData = async (userId) => {

        const scoreRef = doc(db, "/scores", userId);

        const scoreSnapshot = await getDoc(scoreRef);

        if (!scoreSnapshot.exists()) {
            return null;
        }

        return scoreSnapshot.data();
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

            if (firebaseData) {
                setBestScore(firebaseData.elapsedTime);
            }
        } catch(err) {
            console.log(err);
            setUser(null);
            setIsLoggedIn(false);
            handlePopupType("Sign in failed", false);
        }
    }

    const handleCharacterQuery = async (character) => {
        setImageIsClicked(false);
        const characterRef = doc(db, "characters", "character list");
            const characterSnapshot = await getDoc(characterRef);
            const characterArray = characterSnapshot.data();
    
            const dbCoordinates = characterArray[character].coordinates;
    
            return checkCoordinates(dbCoordinates);
    }

    return (
        <DatabaseContext.Provider value={{
            submitScoreFirebase, handleLoginClick, handleCharacterQuery
        }}>
            {children}
        </DatabaseContext.Provider>
    )
}