import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/GameData';
import Header from './Header';
import Footer from './Footer';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseSetup';
import LoginNav from './LoginNav';

const GamePage = () => {

    //TODO: ADD PULL OUT MENU TO THE LEFT SO THE LOGGED IN USER CAN SEE THE LEADERBOARDS OF OTHER PLAYERS. PERHAPS WE CAN IMPLEMENT A WAY FOR THE USER TO ADD A NICKNAME TO ASSOCIATE THEIR SCORE WITH, WHEN THE SUBMIT SCORE THING POPS OUT, DISPLAY THEIR DEFAULT USERNAME IN THE INPUT FIELD AND A WAY FOR THEM TO JUST UPDATE IT IF THEY WANT TO.

    //THE DRAWER THE PULLS OUT SHOULD JUST HAVE A LITTLE ARROW THAT THE USER CAN CLICK WHICH WOULD OPEN THE MENU RIGHT OUT.
    
    const { gameStarted, handleImageClick, imageIsClicked, boxSelectorRef } = useContext(DataContext);

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
                <LoginNav />
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