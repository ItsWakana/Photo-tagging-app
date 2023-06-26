import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/GameData';
import Header from './Header';
import Footer from './Footer';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseSetup';

const GamePage = () => {

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

                {imageUrl ? (
                    <>
                    <img onClick={handleImageClick} className="main-bg rounded-lg" src={imageUrl} alt=""/>
                    <div ref={boxSelectorRef}
                    className={`box-click ${imageIsClicked ? 'visible' : ''}`}
                    ></div>
                    </>
                ) : (
                    <div id="loading"></div>
                )}
                {/* <img onClick={handleImageClick} className="main-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster.jpg`} alt="" />
                <div ref={boxSelectorRef} 
                className={`box-click ${imageIsClicked ? 'visible' : ''}`}></div> */}
                <Footer />
            </>
        )
    )
}

export default GamePage;