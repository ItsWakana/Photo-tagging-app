import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { GameStateContext } from "../context/GameStateContext";
import { formatTime } from '../Helper Functions/timer';

const LoginNav = () => {

    const { user } = useContext(UserContext);
    const { bestScore, elapsedTime } = useContext(GameStateContext);
    return (
        <div className="login-tab">
            <img className="rounded-xl w-7" src={user.photoURL}/>
            <h4 className="font-bold text-base text-white">
                FASTEST TIME
            </h4>
            <p className="text-sm text-white">{bestScore ? formatTime(bestScore) : formatTime(elapsedTime)}</p>
        </div>
    )
}

export default LoginNav;