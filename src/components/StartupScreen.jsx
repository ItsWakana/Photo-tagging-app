import { useContext } from "react"
import { DataContext } from "../context/GameData";

const StartupScreen = () => {

    const { toggleGameState } = useContext(DataContext);


    return (
        <div className="startup-menu">
            <h1 className="text-white font-bold text-2xl">FIND THE CHARACTERS</h1>
            <button onClick={toggleGameState} className=" rounded-md text-sm">
                START GAME
            </button>
        </div>
    )
}

export default StartupScreen;