import { createContext, useState, useRef } from "react";

export const ImageInteractionContext = createContext({});

const ImageInteractionProvider = ({ children }) => {


    const [imageIsClicked, setImageIsClicked] = useState(false);
    const [currentCoordinate, setCurrentCoordinate] = useState(null);

    const boxSelectorRef = useRef(null);

    const handleImageClick = async (event) => {

        setImageIsClicked(true);
        const image = event.target;

        const imageRect = image.getBoundingClientRect();

        const xRelative = (event.clientX - imageRect.left) / imageRect.width;
        const yRelative = (event.clientY - imageRect.top) / imageRect.height;

        const coordinateObj = {
            x: xRelative,
            y: yRelative
        }

        const boxSelectorElement = boxSelectorRef.current;
        const boxRect = boxSelectorElement.getBoundingClientRect();

        const leftPos = event.clientX - boxRect.width / 2 + window.scrollX;
        const topPos = event.clientY - boxRect.height / 2 + window.scrollY;

        boxSelectorElement.style.left = `${leftPos}px`;
        boxSelectorElement.style.top = `${topPos}px`;

        setCurrentCoordinate(coordinateObj);
    }

    const checkCoordinates = (fetchedCoordinates) => {

        return currentCoordinate.x >= fetchedCoordinates.xStart && currentCoordinate.x <= fetchedCoordinates.xEnd && currentCoordinate.y >= fetchedCoordinates.yStart && currentCoordinate.y <= fetchedCoordinates.yEnd

    }

    const contextValue = {
        imageIsClicked, currentCoordinate,
        handleImageClick, checkCoordinates, setImageIsClicked,
        boxSelectorRef
    }
    return (
        <ImageInteractionContext.Provider value={contextValue}>
            {children}
        </ImageInteractionContext.Provider>
    )
}

export default ImageInteractionProvider;