import { createContext, useState } from "react";

export const PopupContext = createContext({});

const PopupProvider = ({ children }) => {


    const [popupMessage, setPopupMessage] = useState('');
    const [isPositivePopup, setIsPositivePopup] = useState(true);

    const handlePopupType = (message, isPositive = true) => {
        
        setPopupMessage(message);
        setIsPositivePopup(isPositive);
    }

    const resetPopupMessage = () => {
        setPopupMessage('');
    }

    return (
        <PopupContext.Provider value={{
            handlePopupType, resetPopupMessage, popupMessage, isPositivePopup
        }}>
            {children}
        </PopupContext.Provider>
    )
}

export default PopupProvider;