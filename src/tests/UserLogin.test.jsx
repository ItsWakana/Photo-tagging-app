import { render, screen } from "@testing-library/react";
import StartupScreen from "../components/StartupScreen";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const handleLoginClickMock = vi.fn()

vi.mock('../context/DatabaseContext', () => ({
    useDatabaseContext: () => ({
      handleLoginClick: handleLoginClickMock,
    }),
}));

describe("StartupScreen component", () => {

    it("clicks log in and mocks log state on screen", async () => {
        
        render(
            <StartupScreen />
        );

        const user = userEvent.setup();


        const loginButton = screen.getByRole("button", { name: /log in with google/i });

        await user.click(loginButton);

        expect(loginButton).toBeInTheDocument();
        expect(handleLoginClickMock).toHaveBeenCalled();

        //I want to somehow mock the log in authentication and change my log in state so that it displays that its logged in.
        expect(screen.getByRole("button", {name: /log out/i})).toBeInTheDocument();
    });
});