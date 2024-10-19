"use client";

import { twMerge } from "tailwind-merge";

interface KbdProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Kbd: React.FC<KbdProps> = ({ children, size }) => {
  return (
    <span
      className={twMerge(
        "text-accent bg-secondary px-2 py-1.5 text-xl rounded-md",
        size === "sm" ? "px-1.5 py-1" : "",
        size === "lg" ? "px-3 py-2" : "",
        size === "xl" ? "px-3.5 py-2.5 text-2xl" : ""
      )}
    >
      {children}
    </span>
  );
};
