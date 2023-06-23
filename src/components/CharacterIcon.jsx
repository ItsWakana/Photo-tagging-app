import { useContext } from "react";
import { DataContext } from "../context/GameData";

const CharacterIcon = ({ character }) => {

    const { handleCharacterQuery, imageIsClicked,
    setCharacters } = useContext(DataContext);

    const checkCharacterFound = async () => {

        const result = await handleCharacterQuery(character.name);
        if (result) {
            // setIsFound(true);
            setCharacters((prevCharacters) => {
                return prevCharacters.map((char) => {
                    if (char.name === character.name) {
                        return {...char, isFound: true}
                    } else {
                        return char;
                    }
                })
            });

            console.log(`Congrats! You found ${character.name}!`);
        } else {
            console.log(`This is not ${character.name}`);
        }
    }

    return (
        !character.isFound && (
            <div className="character-picker__character">
                <img src={`${import.meta.env.BASE_URL}images/icons/${character.name}.png`} alt=""/>
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''}`}>^</button>
            </div>
        )
    )
}

export default CharacterIcon;