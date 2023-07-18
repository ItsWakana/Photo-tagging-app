import { useState } from "react";

export const useGameScores = () => {

    const [playerScores, setPlayerScores] = useState([]);
    const [bestScore, setBestScore] = useState(null);
    const [googleAccountScore, setGoogleAccountScore] = useState(null);

    return { playerScores, setPlayerScores, bestScore, setBestScore, googleAccountScore, setGoogleAccountScore }
}

export const useTimers = () => {

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    return { startTime, setStartTime, elapsedTime, setElapsedTime }
}

