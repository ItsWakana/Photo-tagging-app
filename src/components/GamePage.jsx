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

    //TODO: ADD PULL OUT MENU TO THE LEFT SO THE LOGGED IN USER CAN SEE THE LEADERBOARDS OF OTHER PLAYERS. PERHAPS WE CAN IMPLEMENT A WAY FOR THE USER TO ADD A NICKNAME TO ASSOCIATE THEIR SCORE WITH, WHEN THE SUBMIT SCORE THING POPS OUT, DISPLAY THEIR DEFAULT USERNAME IN THE INPUT FIELD AND A WAY FOR THEM TO JUST UPDATE IT IF THEY WANT TO.

    //THE DRAWER THE PULLS OUT SHOULD JUST HAVE A LITTLE ARROW THAT THE USER CAN CLICK WHICH WOULD OPEN THE MENU RIGHT OUT.
    
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
                <ScoreTab />
                <NavigationTab />
                {imageUrl ? (
                    <>
                    <img onClick={handleImageClick} className="main-bg rounded-lg" src={imageUrl} alt=""/>
                    <div ref={boxSelectorRef}
                    className={`box-click ${imageIsClicked ? 'visible' : ''}`}
                    ></div>
                    </>
                ) : (
                    <div className="loading"></div>
                )}
                <Footer />
            </>
        )
    )
}

export default GamePage;