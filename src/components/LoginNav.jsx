import { useContext } from "react";
import { DataContext } from "../context/GameData";
import { formatTime } from '../Helper Functions/timer';

const LoginNav = () => {

    const { user, bestScore, elapsedTime } = useContext(DataContext);

    return (
        <div className="login-tab">
            <img className="rounded-xl w-5" src={user.photoURL}/>
            <h3>BEST SCORE</h3>
            <p>{bestScore ? formatTime(bestScore) : formatTime(elapsedTime)}</p>
        </div>
    )
}

export default LoginNav;