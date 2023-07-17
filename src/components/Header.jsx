import { useContext } from "react";
import { ImageInteractionContext } from "../context/ImageInteractionContext";
import { useGameStateContext } from "../context/GameStateContext";
import { useUserContextState } from "../context/UserContext";
import CharacterIcon from "./CharacterIcon";
import ErrorModal from "./ErrorModal";
import { DatabaseContext } from "../context/DatabaseContext";

const Header = () => {

    const { imageIsClicked } = useContext(ImageInteractionContext);

    const { characters, isRunning, restartGame } = useGameStateContext();

    const userState = useUserContextState();

    const { submitScoreFirebase } = useContext(DatabaseContext);
    
    return (
        <div className="header bg-stone-900">
            <ErrorModal />
            <div className={`header__character-picker pt-3${imageIsClicked ? '' : ''}`}>

                {!isRunning ? (
                    <>
                    <div className="flex flex-col gap-3">
                    <input className="rounded-md p-2" onChange={userState.handleNicknameChange} value={userState.nickname} type="text" placeholder="Nickname"/>
                    <button onClick={submitScoreFirebase} className="rounded-lg text-sm w-50 h-10 py-2 px-1 bg-orange-600">Submit time</button>
                    <button onClick={restartGame}
                    className="rounded-lg text-sm w-50 h-10 py-2 px-1 bg-orange-600">Play again</button>
                    </div>
                    </>
                ) : (
                    characters.map((character, i) => (
                        <CharacterIcon key={i} character={character} />
                    ))
                )}

                
            </div>
            <h3 className="text-white ">FIND THESE CHARACTERS AS FAST AS YOU CAN!</h3>
        </div>
    )
}

export default Header;