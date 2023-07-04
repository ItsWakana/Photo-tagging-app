import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { formatTime } from "../Helper Functions/timer";

const Leaderboard = () => {

    const { playerScores } = useContext(GameStateContext);

    return (
        <div className="leaderboard text-white">
            <h1>Leaderboard</h1>
            <ul>
                {playerScores.map((score) => (
                    <li key={score.id}>{formatTime(score.elapsedTime)}</li>
                ))}
            </ul>
        </div>
    )     
}

export default Leaderboard;