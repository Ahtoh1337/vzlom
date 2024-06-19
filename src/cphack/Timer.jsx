import { useState, useEffect } from "react";

function Timer({ startTime, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(startTime);
  useEffect(() => {
    const id = setInterval(() => {
      if (timeLeft <= 0) onTimeout();
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(id);
  });

  return <>Time left:{" "}{timeLeft}</>
}

export default Timer;
