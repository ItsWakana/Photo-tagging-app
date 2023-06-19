import { useContext } from "react"
import { DataContext } from "../context/GameData";

const StartupScreen = () => {

    const { toggleGameState } = useContext(DataContext);

    //TODO: ADD BACKGROUND IMAGE BELOW SO USER CAN SEE WHAT THEY WILL BE DOING.
    return (
        <div className="startup-menu">
            <h1 className="text-white font-bold text-">FIND THE CHARACTERS</h1>
            <button onClick={toggleGameState} className=" rounded-md text-sm">
                START GAME
            </button>
        </div>
    )
}

export default StartupScreen;