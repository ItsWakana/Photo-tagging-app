import { useContext } from "react";
import { ImageInteractionContext } from "../context/ImageInteractionContext";
import { GameStateContext } from "../context/GameStateContext";
import CharacterIcon from "./CharacterIcon";
import ErrorModal from "./ErrorModal";
import { DatabaseContext } from "../context/DatabaseContext";
import { Link } from "react-router-dom";

const Header = () => {

    const { imageIsClicked } = useContext(ImageInteractionContext);

    const { characters, isRunning, restartGame } = useContext(GameStateContext);
    
    const { submitScoreFirebase } = useContext(DatabaseContext);
    
    return (
        <div className="header">
            <ErrorModal />
            <div className={`header__character-picker ${imageIsClicked ? 'open' : ''}`}>

                {!isRunning ? (
                    <>
                    <button onClick={submitScoreFirebase} className="rounded-lg text-sm w-50 h-10 py-2 px-1">Submit time</button>
                    {/* <Link to="/"> */}
                    <button onClick={restartGame}
                    className="rounded-lg text-sm w-50 h-10 py-2 px-1">Play again</button>
                    {/* </Link> */}
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