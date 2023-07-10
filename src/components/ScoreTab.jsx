import { useContext } from "react";
import { useUserContextState } from "../context/UserContext";
import { GameStateContext } from "../context/GameStateContext";
import { formatTime } from '../Helper Functions/timer';
import Timer from "./Timer";

const ScoreTab = () => {

    const { user } = useUserContextState();

    const { bestScore, elapsedTime } = useContext(GameStateContext);
    return (
        <div className="login-tab bg-stone-900">
            {user ? (
                <img className="rounded-xl w-7" src={user.photoURL}/>

            ) : (
                null
            )}
            <h4 className={`font-bold text-base text-white ${user ? '' : 'pt-9'}`}>
                CURRENT TIME
            </h4>
            <Timer />
            <h5 className="font-bold text-base text-white">
                BEST TIME
            </h5>
            <p className="text-sm text-white">{bestScore ? formatTime(bestScore) : formatTime(elapsedTime)}</p>
        </div>
    )
}

export default ScoreTab;