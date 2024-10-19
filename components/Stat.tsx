"use client";

interface StatProps {
  number: number;
  description?: string;
}

export const Stat: React.FC<StatProps> = ({ number, description }) => {
  return (
    <div className="border-2 border-primary rounded-lg w-full p-6 flex flex-col justify-start items-start gap-3">
      <p className="text-7xl text-primary">{number}</p>
      <p className="text-2xl text-secondary text-wrap text-left">
        {description}
      </p>
    </div>
  );
};
