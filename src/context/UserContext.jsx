import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {


    //TODO: STORE ALL THE STATE AND FUNCTIONALITY FOR USER LOGIN STATE AND THE CURRENT USER THAT IS LOGGED IN.

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{
            user, setUser, isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;