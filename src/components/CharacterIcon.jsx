import { useContext,  useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { PopupContext } from "../context/PopupContext";
import { DatabaseContext } from "../context/DatabaseContext";
import { storage } from "../firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

const CharacterIcon = ({ character }) => {

    const { imageIsClicked, setCharacters } = useContext(MainContext);
    const { handlePopupType } = useContext(PopupContext);
    const { handleCharacterQuery } = useContext(DatabaseContext);
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
                    <img src={imageUrl} alt=""/>
                ) : (
                    <div className="loading smaller"></div>
                )}
                {/* <img src={`${import.meta.env.BASE_URL}images/icons/${character.name}.png`} alt=""/> */}
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''}`}>^</button>
            </div>
        )
    )
}

export default CharacterIcon;