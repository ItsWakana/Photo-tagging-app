import { useContext } from "react";
import { DataContext } from "../context/GameData";
import { formatTime } from '../Helper Functions/timer';

const LoginNav = () => {

    const { user, bestScore, elapsedTime } = useContext(DataContext);

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