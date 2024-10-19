import { generate } from "random-words";

export const useWords = (len: number) => {
  const words = generate(len);
  return typeof words === "string" ? words : words.join(" ");
};
