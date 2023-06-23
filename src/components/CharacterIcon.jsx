import { useState, useContext } from "react";
import { DataContext } from "../context/GameData";

const CharacterIcon = ({ character }) => {

    const [isFound, setIsFound] = useState(false);

    const { handleCharacterQuery, imageIsClicked } = useContext(DataContext);

    const checkCharacterFound = async () => {

        const result = await handleCharacterQuery(character);
        if (result) {
            setIsFound(true);
            console.log(`Congrats! You found ${character}!`);
        } else {
            console.log(`This is not ${character}`);
            // setIsFound
        }
    }

    return (
        !isFound && (
            <div className="character-picker__character">
                <img src={`${import.meta.env.BASE_URL}images/icons/${character}.png`} alt=""/>
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''}`}>^</button>
            </div>
        )
    )
}

export default CharacterIcon;