import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type TCharacter = {
  actual: string;
  typed: string | null;
  active: boolean;
};

export const Character: React.FC<TCharacter> = ({ actual, typed, active }) => {
  const char = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (active) {
      char &&
        char.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
    }
  }, [active]);

  return (
    <span
      className={twMerge(
        "text-secondary text-4xl",
        typed ? (actual === typed ? "text-primary" : "text-red-400") : "",
        active
          ? "before:inline-block before:ml-0 before:w-[0.2ch] before:bg-accent before:h-[1em] before:animate-pulse"
          : ""
      )}
      ref={char}
    >
      {actual}
    </span>
  );
};
