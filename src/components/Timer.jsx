import { useEffect, useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { formatTime } from '../Helper Functions/timer';
const Timer = () => {
    // const [startTime, setStartTime] = useState(null);
    // const [elapsedTime, setElapsedTime] = useState(0);
  
    const {
        startTime,
        setStartTime,
        elapsedTime,
        setElapsedTime,
        isRunning
    } = useContext(MainContext);


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