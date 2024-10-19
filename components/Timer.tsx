import { useSetting } from "@/context/settings";
import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type TTrigger = {
  trigger: boolean | null;
  onStop?: () => any;
  className?: string;
};

export const Timer: React.FC<TTrigger> = ({ trigger, onStop, className }) => {
  const { setting } = useSetting();
  const sec = useTimer(setting.time, trigger);

  useEffect(() => {
    if (sec === 0 && onStop) {
      onStop();
    }
  }, [sec]);

  return (
    <span className={twMerge("text-4xl text-accent", className)}>{sec}</span>
  );
};
