import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { DatabaseContext } from "../context/DatabaseContext";
import ScoreTab from "./ScoreTab";

const NavigationTab = () => {

    const { isLoggedIn } = useContext(UserContext);

    const { handleLoginClick } = useContext(DatabaseContext);

    return (
        <div className="navigation-tab bg-stone-900">
            <img src={`${import.meta.env.BASE_URL}images/icons/svg/home.svg`} className="svg-icon w-6"alt="home-icon"/>
            <button onClick={handleLoginClick} className="rounded-lg text-sm w-full p-2 bg-orange-600">
                {`${isLoggedIn ? 'LOG OUT' : 'LOG IN WITH GOOGLE'}`}
            </button>
            <ScoreTab />
        </div>
    )
}

export default NavigationTab;