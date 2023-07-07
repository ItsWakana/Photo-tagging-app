import { useContext, useEffect, useState } from 'react'
import { ImageInteractionContext } from '../context/ImageInteractionContext';
import { GameStateContext } from '../context/GameStateContext';
import Header from './Header';
import Footer from './Footer';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseSetup';
import ScoreTab from './ScoreTab';
import NavigationTab from './Navigation';

const GamePage = () => {
    
    const { handleImageClick, imageIsClicked, boxSelectorRef } = useContext(ImageInteractionContext);
    const { gameStarted } = useContext(GameStateContext);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {

        const getInitialImage = async () => {

            const imageRef = ref(storage, "images/universe-113-poster.jpg");

            const url = await getDownloadURL(imageRef);

            setImageUrl(url);
        }

        getInitialImage();

    },[]);
    return (
        gameStarted && (
            <>
                <Header />
                <NavigationTab />
                {imageUrl ? (
                    <>
                    <img onClick={handleImageClick} className="main-bg rounded-lg" src={imageUrl} alt=""/>
                    <div ref={boxSelectorRef}
                    className={`box-click ${imageIsClicked ? 'visible' : ''} border-4 border-orange-600`}
                    ></div>
                    </>
                ) : (
                    <div className="loading"></div>
                )}
            </>
        )
    )
}

export default GamePage;