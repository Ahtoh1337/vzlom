import { useState, useEffect } from "react";

function Timer({ startTime, onTimeout, text }) {
  const [timeLeft, setTimeLeft] = useState(startTime);
  useEffect(() => {
    const id = setInterval(() => {
      if (timeLeft <= 0) onTimeout();
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(id);
  });

  return <>{text}{" "}{Math.floor(timeLeft / 60)}m {timeLeft % 60}s</>
}

export default Timer;
