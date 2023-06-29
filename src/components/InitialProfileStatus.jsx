import { useContext } from "react";
import { DataContext } from "../context/GameData";
import { formatTime } from "../Helper Functions/timer";

const InitialProfileStatus = () => {

    const { user, bestScore } = useContext(DataContext);

    const formattedScore = formatTime(bestScore);

    return (
        <>
        <img className="rounded-full w-10" src={user.photoURL} alt="" />


        {bestScore ? (
            <>
            <div className="flex items-center flex-col">
                <h4 className="font-bold text-base text-white">
                    FASTEST TIME
                </h4>
                <p className="text-sm text-white">{formattedScore}</p>
            </div>
            </>
        ) : (
            <h4 className="font-bold text-sm text-white">
                Click below to play your first game!
            </h4>
        )}
        </>
    )
}

export default InitialProfileStatus;