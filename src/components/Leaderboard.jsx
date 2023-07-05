import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { formatTime } from "../Helper Functions/timer";
import { UserContext } from "../context/UserContext";

const Leaderboard = () => {

    const { playerScores } = useContext(GameStateContext);

    const { isLoggedIn } = useContext(UserContext);

    //TODO: MAKE THE LEADERBOARD COMPONENT POSITION ABSOLUTE RELATIVE TO THE MAIN CONTAINER OF THE STARTUP PAGE, SO THAT WHEN THE LEADERBOARD LOADS IT DOESN'T SHIFT THE POSITION OF THE MAIN PANEL.
    
    return (
        <div className="leaderboard text-white flex items-left flex-col">
            <h1 className="text-xl font-bold pb-5">Leaderboard</h1>
            {isLoggedIn ? (
                playerScores.length ?
                <ul>
                    {playerScores.map((score) => (
                        <li key={score.id}>{`${score.nickname}: ${formatTime(score.elapsedTime)}`}</li>
                    ))}
                </ul>
                : <div className="loading"></div>
            ) : (
                null
            )}
        </div>
    )     
}

export default Leaderboard;