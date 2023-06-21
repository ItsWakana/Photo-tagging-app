import { useContext } from "react";
import { DataContext } from "../context/GameData";

const Header = () => {

    const { characters, currentCoordinate, imageIsClicked,
    handleCharacterQuery } = useContext(DataContext);

    return (
        <div className="header">
            <div className={`header__character-picker ${imageIsClicked ? 'open' : ''}`}>

                {characters.map((character, i) => (
                    <div key={i} className="character-picker__character">
                        <img src={`${import.meta.env.BASE_URL}images/icons/${character}.png`} alt=""/>
                        <button onClick={() => handleCharacterQuery(character)} className={`character-btn ${imageIsClicked ? 'visible' : ''}`}>^</button>
                    </div>
                ))}
            </div>
            <h3 className="text-white ">FIND THESE CHARACTERS AS FAST AS YOU CAN!</h3>
            {/* {currentCoordinate && (
                <p>X: {currentCoordinate.x} Y: {currentCoordinate.y}</p>
            )} */}
        </div>
    )
}

export default Header;