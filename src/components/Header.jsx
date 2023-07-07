import { useContext } from "react";
import { ImageInteractionContext } from "../context/ImageInteractionContext";
import { GameStateContext } from "../context/GameStateContext";
import { UserContext } from "../context/UserContext";
import CharacterIcon from "./CharacterIcon";
import ErrorModal from "./ErrorModal";
import { DatabaseContext } from "../context/DatabaseContext";
import { Link } from "react-router-dom";

const Header = () => {

    const { imageIsClicked } = useContext(ImageInteractionContext);

    const { characters, isRunning, restartGame } = useContext(GameStateContext);
    
    const { nickname, handleNicknameChange } = useContext(UserContext);

    const { submitScoreFirebase } = useContext(DatabaseContext);
    
    return (
        <div className="header bg-stone-900">
            <ErrorModal />
            <div className={`header__character-picker ${imageIsClicked ? 'open' : ''} bg-stone-900`}>

                {!isRunning ? (
                    <>
                    <div className="flex flex-col gap-3">
                    <input onChange={handleNicknameChange} value={nickname} type="text" placeholder="Nickname"/>
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