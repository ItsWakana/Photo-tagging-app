import { Leaderboard } from "../components/LeaderboardController";
import { render, screen } from "@testing-library/react";

describe("Leaderboard component", () => {

    const playerScoresMockData = [
        { bestScore: 7262, id: 1, nickname: "Player 1" },
        { bestScore: 10222, id: 2, nickname: "Player 2" },
        { bestScore: 17742, id: 3, nickname: "Player 3" },
        { bestScore: 22514, id: 4, nickname: "Player 4" },
        { bestScore: 25682, id: 5, nickname: "Player 5" },
    ];

    it("displays leaderboard info based on data passed in", () => {

        render(<Leaderboard playerScores={playerScoresMockData} />);

        const playerThree = screen.getByText(/player 3/i);
        const playerThreeScore = screen.getByText("00:17.74");

        const playerFour = screen.getByText(/player 4/i);
        const playerFourScore = screen.getByText("00:22.51");

        expect(playerThree).toBeInTheDocument();
        expect(playerThreeScore).toBeInTheDocument();

        expect(playerFour).toBeInTheDocument();
        expect(playerFourScore).toBeInTheDocument();
    });

    it("displays loading icon if scores are not available", () => {

        render(<Leaderboard playerScores={[]}/>)

        const loadingIcon = screen.queryByTestId("loading-div");
        expect(loadingIcon).toBeInTheDocument();
    });

    it("Displays no more than 5 user scores on the leaderboard", () => {
        const extraScoresMockData = [
            { bestScore: 7262, id: 1, nickname: "Player 1" },
            { bestScore: 10222, id: 2, nickname: "Player 2" },
            { bestScore: 17742, id: 3, nickname: "Player 3" },
            { bestScore: 22514, id: 4, nickname: "Player 4" },
            { bestScore: 25682, id: 5, nickname: "Player 5" },
            { bestScore: 28522, id: 6, nickname: "Player 6" },
            { bestScore: 32491, id: 7, nickname: "Player 7" },
        ];

        render(<Leaderboard playerScores={extraScoresMockData}/>);

        const playerSix = screen.queryByText(/player 6/i);
        const playerSixScore = screen.queryByText("00:28.52");

        expect(playerSix).toBeNull();
        expect(playerSixScore).toBeNull();

    })
})