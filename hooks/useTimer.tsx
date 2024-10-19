import { useEffect, useState } from "react";

export const useTimer = (sec: number, trigger: boolean | null) => {
  const [time, setTime] = useState(sec);

  useEffect(() => {
    if (trigger) {
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            return prev;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (trigger === null) {
      setTime(sec);
    }
  }, [trigger, sec]);

  return time;
};
