export const useResult = (
  text: string,
  charsTyped: number,
  correctChars: number,
  time: number
) => {
  const avgWordLen =
    text
      .split(" ")
      .map((word: string) => word.length)
      .reduce((acc, cur) => acc + cur, 0) / text.split(" ").length;

  const rawWPM = Math.floor(charsTyped / (avgWordLen * (time / 60)));

  const actualWPM = Math.floor(correctChars / (avgWordLen * (time / 60)));

  const wordsTyped = Math.floor(charsTyped / avgWordLen);
  const correctTyped = Math.floor(correctChars / avgWordLen);

  const accuracy =
    charsTyped === 0
      ? 0
      : Math.floor((correctChars * 100) / charsTyped) > 100
      ? 100
      : Math.floor((correctChars * 100) / charsTyped);

  return { rawWPM, actualWPM, wordsTyped, correctTyped, accuracy };
};
