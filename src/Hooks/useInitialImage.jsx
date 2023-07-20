import { useState, useEffect } from "react";
import { useDatabaseContext } from "../context/DatabaseContext";
const useInitialImage = () => {

    const [imageUrl, setImageUrl] = useState(null);

    const { fetchImageFromFirebase } = useDatabaseContext();

    useEffect(() => {

        const getInitialImage = async () => {

            const url = await fetchImageFromFirebase('images/universe-113-poster crop.jpg');

            setImageUrl(url);
        }

        if (!imageUrl) {
            getInitialImage()
        }
    },[]);

    return [imageUrl, setImageUrl];
}

export default useInitialImage;