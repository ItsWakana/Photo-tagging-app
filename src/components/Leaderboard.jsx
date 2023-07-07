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
        <div className="leaderboard text-white flex items-center flex-col bg-stone-900 w-60">
            <h1 className="text-xl font-bold pb-5">Leaderboard</h1>
                {playerScores.length ?
                <ul className="flex flex-col rounded-xl w-full p-1 bg-stone-800 ">
                    {playerScores.map((score) => (
                        <li key={score.id} className="p-2 rounded-lg flex flex-col gap-3">
                            <div>
                            <h4 className="font-bold">{score.nickname} </h4>
                            <span>{formatTime(score.bestScore)}</span>
                            </div>
                            <hr className="opacity-30"/>
                        </li>
                    ))}
                </ul>
                : <div className="loading"></div>
                }

        </div>
    )     
}

export default Leaderboard;