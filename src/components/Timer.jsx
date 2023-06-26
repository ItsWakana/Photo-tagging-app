import { useEffect, useContext } from 'react';
import { DataContext } from '../context/GameData';

const Timer = () => {
    // const [startTime, setStartTime] = useState(null);
    // const [elapsedTime, setElapsedTime] = useState(0);
  
    const {
        startTime,
        setStartTime,
        elapsedTime,
        setElapsedTime
    } = useContext(DataContext);


    useEffect(() => {
      if (!startTime) {
        setStartTime(Date.now());
      }

      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
  
      return () => clearInterval(interval);
    }, [startTime]);
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      const milliseconds = Math.floor((time % 1000) / 10);
  
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <div>
        <h1 className="text-white">{formatTime(elapsedTime)}</h1>
      </div>
    );
  };
  
  export default Timer;