import { InitialProfileStatus } from "../components/InitialProfileStatus";
import { render, screen } from '@testing-library/react';
import { formatTime } from "../Helper Functions/timer";

describe("InitialProfileStatus component", () => {

    const userMock = {
        displayName: "Name",
        photoURL: "https://image.com",

    }
    const userBestScoreMock = 18567;
    const userFormattedScoreMock = formatTime(userBestScoreMock);

    it("Should display the users bestScore", () => {

        render(
            <InitialProfileStatus user={userMock} bestScore={userBestScoreMock} formattedScore={userFormattedScoreMock}/>
        );

        const bestScoreElement = screen.getByText("00:18.56");
        expect(bestScoreElement).toBeInTheDocument();
    });

    it("Should display the icon of the logged in user", () => {

        render(
            <InitialProfileStatus user={userMock} bestScore={userBestScoreMock} formattedScore={userFormattedScoreMock}/>
        );

        const userIcon = screen.getByAltText('user-icon');

        expect(userIcon).toBeInTheDocument();
    });

    it("Should display introductory text if user does not have a best score on their account", () => {

        render(
            <InitialProfileStatus user={userMock} />
        );

        const noBestScoreText = screen.getByText(/click below to play your first game!/i);

        expect(noBestScoreText).toBeInTheDocument();

    })

});
