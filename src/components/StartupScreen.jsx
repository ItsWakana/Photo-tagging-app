import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { GameStateContext } from "../context/GameStateContext";
import { storage } from "../firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";
import InitialProfileStatus from "./InitialProfileStatus";
import ErrorModal from "./ErrorModal";
import Leaderboard from "./Leaderboard";

const StartupScreen = () => {

    const { isLoggedIn } = useContext(UserContext);

    const { gameStarted, toggleGameState } = useContext(GameStateContext);

    const { handleLoginClick } = useContext(DatabaseContext);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {

        const getInitialImage = async () => {

            const imageRef = ref(storage, 'images/universe-113-poster crop.jpg');

            const url = await getDownloadURL(imageRef);

            setImageUrl(url);
        }

        if (!imageUrl) {
            getInitialImage()
        }
    },[]);

    const startGame = () => {
        toggleGameState();
    }

    return (
        !gameStarted && (
            <div className="flex items-start gap-6 mt-40">
            <div className={`startup-menu ${gameStarted ? 'invisible' : ''} bg-stone-900`}>
                <h1 className="text-white font-normal text-xl">FIND THE CHARACTERS</h1>
                {imageUrl ? (
                    <img className="mini-bg rounded-lg w-80" src={imageUrl} alt="" />
                    ) : (
                    <img className="mini-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster crop blur.jpg`} alt="" />
                )}
                {!isLoggedIn ? (
                    <button onClick={handleLoginClick}
                    className="rounded-lg text-sm w-full p-2 bg-stone-800">
                        {`${isLoggedIn ? 'LOG OUT' : 'LOG IN WITH GOOGLE'}`}
                    </button>
                ) : (
                    <div className="absolute top-3 flex items-center flex-col gap-2">
                        <InitialProfileStatus />
                    </div>
                )}
                <button onClick={startGame} className="rounded-lg text-sm w-full p-2 bg-orange-600">
                    START GAME
                </button>
                <ErrorModal />

            </div>
            <Leaderboard />
            </div>
        )
    )
}

export default StartupScreen;