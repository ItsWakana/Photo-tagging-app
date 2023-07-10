import { createContext, useContext, useState } from "react";
import { PopupContext } from "./PopupContext";
import { GameStateContext } from "./GameStateContext";
import { UserContext } from "./UserContext";
import { ImageInteractionContext } from "./ImageInteractionContext";
import { checkCoordinates } from "../Helper Functions/checkCoordinates";
import { doc, setDoc, updateDoc, getDoc, getDocs, collection, deleteField, deleteDoc } from "firebase/firestore";
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

    const { bestScore, setBestScore, elapsedTime, setPlayerScores,
    googleAccountScore, setGoogleAccountScore } = useContext(GameStateContext);

    const submitScoreFirebase = async () => {

        //TODO: WHEN THE USER PLAYS AN ANONYMOUSE GAME AND SUBMITS THEIR SCORE, AND THEN LOGS IN WITH GOOGLE TO PLAY ANOTHER ROUND. WE SHOULD CHECK IF THEY ALREADY HAVE A BESTSCORE 


        getScores();
        if (!bestScore) {
            console.log('no best score');
            if (!nickname) return;
            try {
                if (isLoggedIn) {
                    await setDoc(doc(db, "/account scores", user.uid), {
                        bestScore: elapsedTime,
                        nickname
                    });
                } else {
                    await setDoc(doc(db, "/anon scores", sessionId), {
                        bestScore: elapsedTime,
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

            try {
                if (isLoggedIn) {
                    await updateDoc(doc(db, "/account scores", user.uid), {
                        bestScore: elapsedTime, 
                        nickname
                    });

                } else {
                    await updateDoc(doc(db, "/anon scores", sessionId), {
                        bestScore: elapsedTime,
                        nickname
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
        let scoresLimit = [];

        for (let i=0; i<allScores.length; i++) {
            if (i==5) break;
            scoresLimit.push(allScores[i]);
        }
        // setPlayerScores([...accScoresData, ...anonScoresData]);
        setPlayerScores(scoresLimit);
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

                if (!bestScore) {
                    setBestScore(firebaseData.bestScore);
                }
                await deleteDoc(doc(db, "/anon scores", sessionId));

                setNickname(firebaseData.nickname);
                setGoogleAccountScore(firebaseData.bestScore);
                if (bestScore && bestScore < firebaseData.bestScore) {
                    console.log('rewrite database');
                    console.log(bestScore);
                    console.log(nickname);
                    await updateDoc(doc(db, "/account scores", auth.currentUser.uid), {
                        bestScore,
                        nickname
                    })
                } else if (bestScore && bestScore > firebaseData.bestScore) {
                    setBestScore(firebaseData.bestScore);
                }
            } else {
                //no firebase data available for the user

                if (!bestScore) return;
                await deleteDoc(doc(db, "/anon scores", sessionId));

                await setDoc(doc(db, "/account scores", auth.currentUser.uid), {
                    bestScore,
                    nickname
                });


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