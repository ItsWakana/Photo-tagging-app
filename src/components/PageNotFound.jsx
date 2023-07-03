import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section className="p-10 flex items-center flex-col gap-7">
            <h1 className="text-2xl text-white">THE PAGE YOU REQUESTED WAS NOT FOUND</h1>
            <img className="rounded-lg" src={`${import.meta.env.BASE_URL}images/courage-not-found.png`} alt="" />
            <Link to="/">
                <button className="bg-transparent rounded-lg text-sm w-full p-2">Click Me</button>
            </Link>
        </section>

    ) 
    
}

export default PageNotFound;