import { useContext } from 'react'
import { DataContext } from '../context/GameData';

const GamePage = () => {

    const { gameStarted } = useContext(DataContext);

    return (
        //Thin header which contains the character the player needs to search for along with a small icon below it showing what that character is.

        // <Header />
        gameStarted && (
            <img className="main-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster.jpg`} alt="" />
        )

        //Footer which has the current time the user has been searching for. 

        // <TimerFooter />
    )
}

export default GamePage;