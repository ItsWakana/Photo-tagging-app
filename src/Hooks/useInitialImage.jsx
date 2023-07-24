import { useState, useEffect } from "react";
import { useDatabaseContext } from "../context/DatabaseContext";
const useInitialImage = (url) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    
    const { fetchImageFromFirebase } = useDatabaseContext();

    useEffect(() => {

        const getInitialImage = async (imageURL) => {
            try {
                const url = await fetchImageFromFirebase(imageURL);
                setImageUrl(url);
                setImageIsLoading(false);

            } catch(error) {
                setImageIsLoading(false);
            }

        }

        if (!imageUrl) {
            getInitialImage(url);
        }
    },[]);

    return [imageUrl, imageIsLoading];
}

export default useInitialImage;