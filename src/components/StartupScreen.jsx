import { useContext } from "react"
import { DataContext } from "../context/GameData";

const StartupScreen = () => {

    const { toggleGameState } = useContext(DataContext);


    return (
        <button onClick={toggleGameState} className="py-2 px-3 font-semibold bg-orange-600 rounded-md text-sm">Start Game</button>
    )
}

export default StartupScreen;