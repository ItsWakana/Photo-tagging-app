import { render, screen } from "@testing-library/react";
import StartupScreen from "../components/StartupScreen";
import GameStateProvider, { GameStateContext } from "../context/GameStateContext";
import DatabaseProvider, { DatabaseContext } from "../context/DatabaseContext";
import userEvent from "@testing-library/user-event";


describe("StartupScreen component", () => {

    it("mocks google log in and displays users score if they have played before", async () => {

        const mockHandleLoginClick = vi.fn();

        const gameStateContextMock = {
            bestScore: 12939,
            playerScores: [],
        }
        
        render(
            <GameStateContext.Provider value={gameStateContextMock}>
                <DatabaseProvider value={{handleLoginClick: mockHandleLoginClick}}>
                    <StartupScreen />
                </DatabaseProvider>
            </GameStateContext.Provider>
        );

        const user = userEvent.setup();


        const loginButton = screen.getByRole("button", { name: /log in with google/i });

        await user.click(loginButton);

        expect(loginButton).toBeInTheDocument();

        expect(mockHandleLoginClick).toHaveBeenCalled();

    });
});