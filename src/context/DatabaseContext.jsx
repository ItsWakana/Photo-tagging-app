import { createContext, useContext, useState } from "react";
import { PopupContext } from "./PopupContext";
import { useGameStateContext } from "./GameStateContext";
import { ImageInteractionContext } from "./ImageInteractionContext";
import { useUserContextState } from "./UserContext";
import { checkCoordinates } from "../Helper Functions/checkCoordinates";
import { doc, setDoc, updateDoc, getDoc, getDocs, collection, deleteField, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseSetup";
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

    
    const { bestScore, setBestScore, elapsedTime, setPlayerScores } = useGameStateContext();

    const userState = useUserContextState();

    const submitScoreFirebase = async () => {

        //TODO: WHEN THE USER PLAYS AN ANONYMOUSE GAME AND SUBMITS THEIR SCORE, AND THEN LOGS IN WITH GOOGLE TO PLAY ANOTHER ROUND. WE SHOULD CHECK IF THEY ALREADY HAVE A BESTSCORE 


        getScores();
        if (!bestScore) {
            if (!userState.nickname) return;
            try {
                if (userState.isLoggedIn) {
                    await setDoc(doc(db, "/account scores", userState.user.uid), {
                        bestScore: elapsedTime,
                        nickname: userState.nickname
                    });
                } else {
                    await setDoc(doc(db, "/anon scores", userState.sessionId), {
                        bestScore: elapsedTime,
                        nickname: userState.nickname
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

            try {
                if (userState.isLoggedIn) {
                    await updateDoc(doc(db, "/account scores", userState.user.uid), {
                        bestScore: elapsedTime, 
                        nickname: userState.nickname
                    });

                } else {
                    await updateDoc(doc(db, "/anon scores", userState.sessionId), {
                        bestScore: elapsedTime,
                        nickname: userState.nickname
                    })
                }
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
        const accountScoresSnapshot = await getDocs(collection(db, "account scores"));

        const anonScoresSnapshot = await getDocs(collection(db, "anon scores"));

        const accScoresData = accountScoresSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        const anonScoresData = anonScoresSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        const allScores = [...accScoresData, ...anonScoresData];

        setPlayerScores(allScores);
        return allScores;
    }

    const handleLoginClick = async () => {

        if (userState.isLoggedIn) {
            signOut(getAuth());
            userState.setUser(null);
            userState.setIsLoggedIn(false);
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(getAuth(), provider);
            const auth = getAuth();
            userState.setUser(auth.currentUser);
            userState.setIsLoggedIn(true);
            const firebaseData = await getFirebaseData(auth.currentUser.uid);
            getScores();
            if (firebaseData) {

                if (!bestScore) {
                    setBestScore(firebaseData.bestScore);
                }
                await deleteDoc(doc(db, "/anon scores", userState.sessionId));

                userState.setNickname(firebaseData.nickname);
                // setGoogleAccountScore(firebaseData.bestScore);
                if (bestScore && bestScore < firebaseData.bestScore) {
                    await updateDoc(doc(db, "/account scores", auth.currentUser.uid), {
                        bestScore,
                        nickname: userState.nickname
                    })
                } else if (bestScore && bestScore > firebaseData.bestScore) {
                    setBestScore(firebaseData.bestScore);
                }
            } else {
                //no firebase data available for the user

                if (!bestScore) return;
                await deleteDoc(doc(db, "/anon scores", userState.sessionId));

                await setDoc(doc(db, "/account scores", auth.currentUser.uid), {
                    bestScore,
                    nickname: userState.nickname
                });


            }
        } catch(err) {
            console.log(err);
            userState.setUser(null);
            userState.setIsLoggedIn(false);
            handlePopupType("Sign in failed", false);
        }
    }

    const fetchImageFromFirebase = async (fileLocation) => {

        const imageRef = ref(storage, fileLocation);

        const url = await getDownloadURL(imageRef);

        return url;
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
            submitScoreFirebase, handleLoginClick, handleCharacterQuery, fetchImageFromFirebase,
            getScores
        }}>
            {children}
        </DatabaseContext.Provider>
    )
}

export const useDatabaseContext = () => {

    const { submitScoreFirebase, handleLoginClick, handleCharacterQuery, fetchImageFromFirebase, getScores } = useContext(DatabaseContext);

    return { submitScoreFirebase, handleLoginClick, handleCharacterQuery, fetchImageFromFirebase, getScores };
}

export default DatabaseProvider;