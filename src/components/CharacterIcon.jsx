import { useContext,  useEffect, useState } from "react";
import { ImageInteractionContext } from "../context/ImageInteractionContext";
import { PopupContext } from "../context/PopupContext";
import { useGameStateContext } from "../context/GameStateContext";
import { DatabaseContext } from "../context/DatabaseContext";
import useInitialImage from "../Hooks/useInitialImage";

const CharacterIconController = ({ character }) => {

    const { imageIsClicked } = useContext(ImageInteractionContext);
    const { setCharacters } = useGameStateContext();
    const { handlePopupType } = useContext(PopupContext);
    const { handleCharacterQuery } = useContext(DatabaseContext);

    const [imageUrl, imageIsLoading] = useInitialImage(`images/icons/${character.name}.png`);

    const checkCharacterFound = async () => {
        try {
            const result = await handleCharacterQuery(character.name);
            if (result) {
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
        <CharacterIcon character={character} checkCharacterFound={checkCharacterFound} imageIsClicked={imageIsClicked} imageIsLoading={imageIsLoading} imageUrl={imageUrl}/>
    )
}

const CharacterIcon = ({
    character,
    checkCharacterFound,
    imageIsClicked,
    imageIsLoading,
    imageUrl
}) => {

    // const { imageIsClicked } = useContext(ImageInteractionContext);
    // const { setCharacters } = useGameStateContext();
    // const { handlePopupType } = useContext(PopupContext);
    // const { handleCharacterQuery } = useContext(DatabaseContext);

    // const [imageUrl, imageIsLoading] = useInitialImage(`images/icons/${character.name}.png`);

    // const checkCharacterFound = async () => {
    //     try {
    //         const result = await handleCharacterQuery(character.name);
    //         if (result) {
    //             setCharacters((prevCharacters) => {
    //                 return prevCharacters.map((char) => {
    //                     if (char.name === character.name) {
    //                         return {...char, isFound: true}
    //                     } else {
    //                         return char;
    //                     }
    //                 })
    //             });
    
    //             handlePopupType(`Congrats! You found ${character.name}!`, true);
    //         } else {
    //             handlePopupType(`This is not ${character.name}`, false);
    //         }
    //     } catch(err) {
    //         handlePopupType("There was a problem querying the character", false);
    //     }
    // }

    return (
        !character.isFound && (
            <div className="character-picker__character">

                {imageIsLoading ? (
                <div className="loading smaller"></div>
                ) : (
                    <img className="border-2 border-orange-600" src={imageUrl} alt=""/>
                )}
                <button onClick={checkCharacterFound} className={`character-btn ${imageIsClicked ? 'visible' : ''} bg-orange-600`}>^</button>
            </div>
        )
    )
}

export default CharacterIconController;