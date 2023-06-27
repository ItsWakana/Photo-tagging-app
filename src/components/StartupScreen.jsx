import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/GameData";
import { storage } from "../firebaseSetup";
import { ref, getDownloadURL } from "firebase/storage";

const StartupScreen = () => {

    const { toggleGameState, gameStarted } = useContext(DataContext);
    const [imageUrl, setImageUrl] = useState(null);

    //TODO: ADD BACKGROUND IMAGE BELOW SO USER CAN SEE WHAT THEY WILL BE DOING.

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
                <button onClick={toggleGameState} className=" rounded-lg text-sm w-full p-2">
                    START GAME
                </button>
            </div>
        )
    )
}

export default StartupScreen;