import { timeOptions } from "@/constants";
import { useSetting } from "@/context/settings";
import { twMerge } from "tailwind-merge";

type SettingsProps = {
  className?: string;
};

export const Settings: React.FC<SettingsProps> = ({ className }) => {
  const { setting, setSetting } = useSetting();

  return (
    <div className={twMerge("flex justify-center items-center", className)}>
      <div className="bg-secondary rounded-lg p-1.5 text-2xl flex justify-start items-center gap-2">
        <span className="text-primary mx-2 text-xl">time</span>
        {timeOptions.map((time, index) => (
          <span
            key={index}
            className={twMerge(
              "text-accent hover:bg-hover px-2 py-1 rounded-md cursor-pointer active:bg-active",
              time === setting.time ? "bg-active" : ""
            )}
            onClick={() =>
              setSetting((prev) => {
                return { ...prev, time };
              })
            }
          >
            {time}
          </span>
        ))}
      </div>
    </div>
  );
};
