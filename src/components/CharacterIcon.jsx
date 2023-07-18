import { useContext,  useEffect, useState } from "react";
import { ImageInteractionContext } from "../context/ImageInteractionContext";
import { PopupContext } from "../context/PopupContext";
import { useGameStateContext } from "../context/GameStateContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { storage } from "../firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

const CharacterIcon = ({ character }) => {

    const { imageIsClicked } = useContext(ImageInteractionContext);
    const { setCharacters } = useGameStateContext();
    const { handlePopupType } = useContext(PopupContext);
    const { handleCharacterQuery } = useContext(DatabaseContext);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {

        const getInitialImage = async () => {
            const iconRef = ref(storage, `images/icons/${character.name}.png`);

            const url = await getDownloadURL(iconRef);

            setImageUrl(url);
        }

        if (!imageUrl) {
            getInitialImage();
        }

    },[]);

    const checkCharacterFound = async () => {
        try {
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
    
                handlePopupType(`Congrats! You found ${character.name}!`, true);
            } else {
                handlePopupType(`This is not ${character.name}`, false);
            }
        } catch(err) {
            handlePopupType("There was a problem querying the character", false);
        }
    }

    return (
        !character.isFound && (
            <div className="character-picker__character">

                {imageUrl ? (
                    <img className="border-2 border-orange-600" src={imageUrl} alt=""/>
                ) : (
                    <div className="loading smaller"></div>
                )}
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''} bg-orange-600`}>^</button>
            </div>
        )
    )
}

export default CharacterIcon;