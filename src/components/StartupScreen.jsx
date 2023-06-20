import { useContext } from "react"
import { DataContext } from "../context/GameData";

const StartupScreen = () => {

    const { toggleGameState, gameStarted } = useContext(DataContext);

    //TODO: ADD BACKGROUND IMAGE BELOW SO USER CAN SEE WHAT THEY WILL BE DOING.

    return (
        // <div className="startup-menu">

        !gameStarted && (
            <div className={`startup-menu ${gameStarted ? 'invisible' : ''}`}>
                <h1 className="text-white font-normal text-xl">FIND THE CHARACTERS</h1>
                <img className="mini-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster crop.jpg`} alt="" />
                <button onClick={toggleGameState} className=" rounded-lg text-sm w-full">
                    START GAME
                </button>
            </div>
        )
    )
}

export default StartupScreen;