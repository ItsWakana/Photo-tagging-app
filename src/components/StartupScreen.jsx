import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { GameStateContext } from "../context/GameStateContext";
import { storage } from "../firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";
import InitialProfileStatus from "./InitialProfileStatus";
import ErrorModal from "./ErrorModal";

const StartupScreen = () => {

    const { isLoggedIn } = useContext(UserContext);

    const { gameStarted, toggleGameState } = useContext(GameStateContext);

    const { handleLoginClick } = useContext(DatabaseContext);

    const [imageUrl, setImageUrl] = useState(null);

    //TODO: WHEN THE USER HAS LOGGED IN, DISPLAY A SMALL SECTION ABOVE WHICH SHOWS THEIR PROFILE ICON ASSOCIATED WITH THEIR GOOGLE ACCOUNT. (PERHAPS WE CAN DISPLAY THEIR HIGH SCORE AS WELL IF THEY HAVE ONE).

    useEffect(() => {

        const getInitialImage = async () => {

            const imageRef = ref(storage, 'images/universe-113-poster crop.jpg');

            const url = await getDownloadURL(imageRef);

            setImageUrl(url);
        }

        getInitialImage()
    },[]);

    return (
        !gameStarted && (
            <div className={`startup-menu ${gameStarted ? 'invisible' : ''}`}>
                <h1 className="text-white font-normal text-xl">FIND THE CHARACTERS</h1>
                {imageUrl ? (
                    <img className="mini-bg rounded-lg" src={imageUrl} alt="" />
                ) : (
                    <div className="loading"></div>
                )}
                {!isLoggedIn ? (
                    <button onClick={handleLoginClick}
                    className="rounded-lg text-sm w-full p-2">
                        {`${isLoggedIn ? 'LOG OUT' : 'LOG IN WITH GOOGLE'}`}
                    </button>
                ) : (
                    <div className="absolute top-3 flex items-center flex-col gap-2">
                        <InitialProfileStatus />
                    </div>
                )}
                <button disabled={!isLoggedIn} onClick={toggleGameState} className="rounded-lg text-sm w-full p-2">
                    START GAME
                </button>
                <ErrorModal />

            </div>
        )
    )
}

export default StartupScreen;