import { useContext,  useEffect, useState } from "react";
import { DataContext } from "../context/GameData";
import { storage } from "../firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

const CharacterIcon = ({ character }) => {

    const { handleCharacterQuery, imageIsClicked,
    setCharacters } = useContext(DataContext);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {

        const getInitialImage = async () => {
            const iconRef = ref(storage, `images/icons/${character.name}.png`);

            const url = await getDownloadURL(iconRef);

            setImageUrl(url);
        }

        getInitialImage();

    },[]);

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

                {imageUrl ? (
                    <img src={imageUrl} alt=""/>
                ) : (
                    <div id="loading"></div>
                )}
                {/* <img src={`${import.meta.env.BASE_URL}images/icons/${character.name}.png`} alt=""/> */}
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''}`}>^</button>
            </div>
        )
    )
}

export default CharacterIcon;