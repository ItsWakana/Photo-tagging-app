import { useEffect, useContext } from 'react';
import { useGameStateContext } from '../context/GameStateContext';
import { formatTime } from '../Helper Functions/timer';
const Timer = () => {
  
    const {
        startTime,
        setStartTime,
        elapsedTime,
        setElapsedTime,
        isRunning
    } = useGameStateContext();


    useEffect(() => {
      if (isRunning && !startTime) {
        setStartTime(Date.now());
      }


      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);

      if (!isRunning) {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning, startTime]);
  
    return (
      <div>
        <h1 className="text-white">{formatTime(elapsedTime)}</h1>
      </div>
    );
  };
  
  export default Timer;