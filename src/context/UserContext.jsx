import { createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {


    //TODO: STORE ALL THE STATE AND FUNCTIONALITY FOR USER LOGIN STATE AND THE CURRENT USER THAT IS LOGGED IN.
    return (
        <UserContext.Provider value={{

        }}>
            {children}
        </UserContext.Provider>
    )
}