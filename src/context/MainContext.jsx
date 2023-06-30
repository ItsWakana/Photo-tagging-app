import { createContext} from "react";
import { PopupProvider } from "./PopupContext";
import { DatabaseProvider } from "./DatabaseContext";
import UserProvider from "./UserContext";
import GameStateProvider from "./GameStateContext";
import ImageInteractionProvider from "./ImageInteractionContext";

export const MainContext = createContext({});

const MainProvider = ({ children }) => {

    return (
        <MainContext.Provider>
            <GameStateProvider>
                <ImageInteractionProvider>
                    <PopupProvider>
                        <UserProvider>
                        <DatabaseProvider>
                            {children}
                        </DatabaseProvider>
                        </UserProvider>
                    </PopupProvider>
                </ImageInteractionProvider>
            </GameStateProvider>
        </MainContext.Provider>
    )
}
