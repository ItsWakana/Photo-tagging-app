import { useContext, useEffect } from 'react'
import { DataContext } from '../context/GameData';
import Header from './Header';
import Footer from './Footer';

const GamePage = () => {

    const { gameStarted, handleImageClick, imageIsClicked, boxSelectorRef } = useContext(DataContext);

    // useEffect(() => {

    //     window.addEventListener('scroll', setScrollHeight);

    //     return (() => {
    //         window.removeEventListener("scroll", setScrollHeight);
    //     })
    // });

    // const setScrollHeight = (event) => {
    //     console.log(event);
    // }
    return (
        //Thin header which contains the character the player needs to search for along with a small icon below it showing what that character is.

        // <Header />
        gameStarted && (
            <>
                <Header />
                <img onClick={handleImageClick} className="main-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster.jpg`} alt="" />
                <div ref={boxSelectorRef} 
                className={`box-click ${imageIsClicked ? 'visible' : ''}`}></div>
                <Footer />
            </>
        )

        //Footer which has the current time the user has been searching for. 

        // <TimerFooter />
    )
}

export default GamePage;