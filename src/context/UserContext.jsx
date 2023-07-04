import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {


    //TODO: STORE ALL THE STATE AND FUNCTIONALITY FOR USER LOGIN STATE AND THE CURRENT USER THAT IS LOGGED IN.

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    }

    return (
        <UserContext.Provider value={{
            user, setUser, isLoggedIn, setIsLoggedIn,
            nickname, handleNicknameChange, setNickname
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;