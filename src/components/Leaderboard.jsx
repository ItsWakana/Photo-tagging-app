import { useContext, useEffect } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { formatTime } from "../Helper Functions/timer";
import { UserContext } from "../context/UserContext";

const Leaderboard = () => {

    const { playerScores } = useContext(GameStateContext);

    const { isLoggedIn } = useContext(UserContext);

    const { getScores } = useContext(DatabaseContext);

    useEffect(() => {

        getScores();
    },[]);
    
    return (
        <div className="leaderboard text-white flex items-center flex-col">
            <h1 className="text-xl font-bold pb-5">Leaderboard</h1>
                {playerScores.length ?
                <ul>
                    {playerScores.map((score) => (
                        <li key={score.id}>{`${score.nickname}: ${formatTime(score.elapsedTime)}`}</li>
                    ))}
                </ul>
                : <div className="loading"></div>
                }

        </div>
    )     
}

export default Leaderboard;