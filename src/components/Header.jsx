import { useContext } from "react";
import { DataContext } from "../context/GameData";
import CharacterIcon from "./CharacterIcon";
const Header = () => {

    const { characters, currentCoordinate, imageIsClicked } = useContext(DataContext);

    return (
        <div className="header">
            <div className={`header__character-picker ${imageIsClicked ? 'open' : ''}`}>

                {characters.map((character, i) => (
                    <CharacterIcon key={i} character={character} />
                ))}

                
            </div>
            <h3 className="text-white ">FIND THESE CHARACTERS AS FAST AS YOU CAN!</h3>
        </div>
    )
}

export default Header;