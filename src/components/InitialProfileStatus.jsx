import { useUserContextState } from "../context/UserContext";
import { useGameStateContext } from "../context/GameStateContext";
import { formatTime } from "../Helper Functions/timer";

const ProfileStatusController = () => {

    const { user } = useUserContextState();
    const { bestScore } = useGameStateContext();
    
    const formattedScore = formatTime(bestScore);

    return (
        <InitialProfileStatus user={user} bestScore={bestScore} formattedScore={formattedScore}/>
    )
}
export const InitialProfileStatus = ({
    user,
    bestScore,
    formattedScore
}) => {
    console.log(user);
    console.log(bestScore);
    return (
        <>
        <img className="rounded-full w-10" src={user.photoURL} alt="user-icon" />


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

export default ProfileStatusController;