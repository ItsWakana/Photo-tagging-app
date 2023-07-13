import { useContext, useState } from "react";
import { useUserContextState } from "../context/UserContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { GameStateContext } from "../context/GameStateContext";
import ScoreTab from "./ScoreTab";

const NavigationTab = () => {

    const { isLoggedIn } = useUserContextState();
    const { handleLoginClick } = useContext(DatabaseContext);

    const { restartGame } = useContext(GameStateContext);

    const [isHidden, setIsHidden] = useState(false);

    const toggleModal = () => {
        setIsHidden((prev) => !prev);
    }

    return (
        <div className={`navigation-tab bg-stone-900 relative ${isHidden ? 'hidden' : ''}`}>
            <img onClick={restartGame} src={`${import.meta.env.BASE_URL}images/icons/svg/home.svg`} className="svg-icon w-6"alt="home-icon"/>
            <button onClick={handleLoginClick} className="rounded-lg text-sm w-full p-2 bg-orange-600">
                {`${isLoggedIn ? 'LOG OUT' : 'LOG IN WITH GOOGLE'}`}
            </button>
            <ScoreTab />
            <button onClick={toggleModal} className="modal-toggle rounded-lg w-full p-2 bg-orange-600">{isHidden ? 'v' : '^'}</button>
        </div>
    )
}

export default NavigationTab;