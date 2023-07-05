import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavigationTab = () => {

    const { isLoggedIn } = useContext(UserContext);
    
    return (
        <div className="navigation-tab">
            <h4 className="font-bold text-base text-white">
                {`<=`}
            </h4>
            <button className="rounded-lg text-sm w-full p-2">
                {`${isLoggedIn ? 'LOG OUT' : 'LOG IN WITH GOOGLE'}`}
            </button>
        </div>
    )
}

export default NavigationTab;