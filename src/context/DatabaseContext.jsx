import { createContext, useContext, useState } from "react";
import { PopupContext } from "./PopupContext";
import { GameStateContext } from "./GameStateContext";
import { UserContext } from "./UserContext";
import { ImageInteractionContext } from "./ImageInteractionContext";
import { checkCoordinates } from "../Helper Functions/checkCoordinates";
import { doc, setDoc, updateDoc, getDoc, getDocs, collection } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { db } from "../firebaseSetup";

export const DatabaseContext = createContext({});

const DatabaseProvider = ({ children }) => {

    const { handlePopupType } = useContext(PopupContext);
    
    const { setImageIsClicked, currentCoordinate } = useContext(ImageInteractionContext);

    const { user, setUser, isLoggedIn, setIsLoggedIn,
    nickname, setNickname, sessionId } = useContext(UserContext);

    const { bestScore, setBestScore, elapsedTime, setPlayerScores } = useContext(GameStateContext);

    const submitScoreFirebase = async () => {
        getScores();
        if (!bestScore) {
            console.log('no best score');
            if (!nickname) return;
            try {
                if (isLoggedIn) {
                    await setDoc(doc(db, "/account scores", user.uid), {
                        elapsedTime,
                        nickname
                    });
                } else {
                    await setDoc(doc(db, "/anon scores", sessionId), {
                        elapsedTime,
                        nickname
                    });
                }

                setBestScore(elapsedTime);
                handlePopupType("Time submitted successfully!", true);
            } catch(err) {
                console.log(err);
                handlePopupType("There was an error submitting your time", false);
            }
            return;
        } else if (bestScore > elapsedTime) {
            const scoreRef = doc(db, "/account scores", user.uid);
            
            try {
                await updateDoc(scoreRef, {
                    elapsedTime, 
                    nickname
                });
                setBestScore(elapsedTime);
                handlePopupType("Time updated successfully!", true);
            } catch(err) {
                handlePopupType("There was an error updating your time", false);
            }
        }

        if (bestScore <= elapsedTime) {
            handlePopupType("Current time is not faster than your best!", false);
            //TODO: ERROR LOGGING IF THE USER TRIES TO SUBMIT A SCORE NOT HIGHER THAN THEIR BEST SCORE.
        }
    }

    const getFirebaseData = async (userId) => {

        const scoreRef = doc(db, "/account scores", userId);

        const scoreSnapshot = await getDoc(scoreRef);

        if (!scoreSnapshot.exists()) {
            return null;
        }

        return scoreSnapshot.data();
    }

    const getScores = async () => {
        const scoresSnapshot = await getDocs(collection(db, "account scores"));

        const scoresData = scoresSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setPlayerScores(scoresData);
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
            getScores();
            if (firebaseData) {
                setNickname(firebaseData.nickname);
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
    
            return checkCoordinates(currentCoordinate, dbCoordinates);
    }

    return (
        <DatabaseContext.Provider value={{
            submitScoreFirebase, handleLoginClick, handleCharacterQuery,
            getScores
        }}>
            {children}
        </DatabaseContext.Provider>
    )
}

export default DatabaseProvider;