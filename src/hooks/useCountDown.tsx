import { useEffect, useState } from "react";

export const useCountdown = (startCounter: number) => {
  const [countDown, setCountDown] = useState(startCounter);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return countDown;
};
