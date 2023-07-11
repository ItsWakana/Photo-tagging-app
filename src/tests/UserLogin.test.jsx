import { render, screen } from "@testing-library/react";
import StartupScreen from "../components/StartupScreen";

describe("StartupScreen component", () => {

    it("mocks google log in and displays users score if they have played before", () => {

        render(<StartupScreen />);

        console.log(screen.getByRole(''));
    });
});