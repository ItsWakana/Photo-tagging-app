import { useContext } from "react";
import { DataContext } from "../context/GameData";
import CharacterIcon from "./CharacterIcon";
import { formatTime } from "../Helper Functions/timer";

const Header = () => {

    const { characters, imageIsClicked,
    isRunning, elapsedTime } = useContext(DataContext);

    return (
        <div className="header">
            <div className={`header__character-picker ${imageIsClicked ? 'open' : ''}`}>

                {!isRunning ? (
                    // <div>{`Your time: ${formatTime(elapsedTime)}`}</div>
                    <button className="rounded-lg text-sm w-50 h-10 p-2">Submit score</button>
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