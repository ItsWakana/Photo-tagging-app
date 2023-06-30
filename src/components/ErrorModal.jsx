import { useContext, useState, useEffect } from "react";
import { PopupContext } from "../context/PopupContext";
const ErrorModal = () => {

    const { popupMessage, resetPopupMessage, isPositivePopup } = useContext(PopupContext);
    
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        if (popupMessage) {
            setDisplayModal(true);
            const timeoutId = setTimeout(() => {
                setDisplayModal(false);
                setTimeout(resetPopupMessage, 500);
            }, 3500);

            return () => {
                clearTimeout(timeoutId);
            }
        }

    },[popupMessage]);

    return (
        <>
        <div style={{backgroundColor: `${isPositivePopup ? 'green' : 'red'}`}} className={`error-modal ${displayModal ? 'active' : ''}`}>
            {popupMessage}
        </div>
        </>
    )
}

export default ErrorModal;