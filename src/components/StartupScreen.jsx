import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/GameData";
import { storage } from "../firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";

const StartupScreen = () => {

    const { toggleGameState, gameStarted, 
    handleLoginClick, isLoggedIn } = useContext(DataContext);

    const [imageUrl, setImageUrl] = useState(null);

    //TODO: IF THE USER IS NOT LOGGED IN, DISABLE THE START GAME BUTTON UNTIL THE USER LOG IN STATE IS PRESENT.

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
                {!isLoggedIn && (
                    <button onClick={handleLoginClick}
                    className="rounded-lg text-sm w-full p-2">
                        {`${isLoggedIn ? 'LOG OUT' : 'LOG IN'}`}
                    </button>
                )}
                <button disabled={!isLoggedIn} onClick={toggleGameState} className="rounded-lg text-sm w-full p-2">
                    START GAME
                </button>

            </div>
        )
    )
}

export default StartupScreen;