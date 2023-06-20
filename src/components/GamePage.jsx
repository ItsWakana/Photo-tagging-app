
const GamePage = () => {

    return (
        //Thin header which contains the character the player needs to search for along with a small icon below it showing what that character is.

        // <Header />
        <img className="main-bg rounded-lg" src={`${import.meta.env.BASE_URL}images/universe-113-poster.jpg`} alt="" />

        //Footer which has the current time the user has been searching for. 

        // <TimerFooter />
    )
}

export default GamePage;