import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { formatTime } from "../Helper Functions/timer";

const Leaderboard = () => {

    const { playerScores } = useContext(GameStateContext);

    //TODO: MAKE THE LEADERBOARD COMPONENT POSITION ABSOLUTE RELATIVE TO THE MAIN CONTAINER OF THE STARTUP PAGE, SO THAT WHEN THE LEADERBOARD LOADS IT DOESN'T SHIFT THE POSITION OF THE MAIN PANEL.
    
    return (
        <div className="leaderboard text-white">
            <h1 className="text-xl font-bold pb-5">Leaderboard</h1>
            <ul>
                {playerScores.map((score) => (
                    <li key={score.id}>{`${score.nickname}: ${formatTime(score.elapsedTime)}`}</li>
                ))}
            </ul>
        </div>
    )     
}

export default Leaderboard;