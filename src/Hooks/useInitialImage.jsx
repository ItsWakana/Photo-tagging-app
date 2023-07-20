import { useState, useEffect } from "react";
import { useDatabaseContext } from "../context/DatabaseContext";
const useInitialImage = () => {

    const [imageUrl, setImageUrl] = useState(null);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    
    const { fetchImageFromFirebase } = useDatabaseContext();

    useEffect(() => {

        const getInitialImage = async () => {
            try {
                const url = await fetchImageFromFirebase('images/universe-113-poster crop.jpg');
                setImageUrl(url);
                setImageIsLoading(false);

            } catch(error) {
                setImageIsLoading(false);
            }

        }

        if (!imageUrl) {
            getInitialImage()
        }
    },[]);

    return [imageUrl, imageIsLoading];
}

export default useInitialImage;