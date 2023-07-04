import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export const UserContext = createContext({});

const UserProvider = ({ children }) => {


    //TODO: STORE ALL THE STATE AND FUNCTIONALITY FOR USER LOGIN STATE AND THE CURRENT USER THAT IS LOGGED IN.

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {

        const id = uuidv4();

        setSessionId(id);
    },[]);
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    }

    return (
        <UserContext.Provider value={{
            user, setUser, isLoggedIn, setIsLoggedIn,
            nickname, handleNicknameChange, setNickname,
            sessionId
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;