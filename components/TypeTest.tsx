"use client";

import { useSetting } from "@/context/settings";
import { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { useWords } from "@/hooks/useWords";
import { Character } from "./Character";
import { alpha } from "@/constants";
import { useResult } from "@/hooks/useResult";
import { Modal } from "./Modal";
import { useSession } from "next-auth/react";

export const TypeTest: React.FC = () => {
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [correctChars, setCorrectChars] = useState(0);

  const [typing, setTyping] = useState<boolean | null>(null);
  const [currentChar, setCurrentChar] = useState(0);
  const [result, setResult] = useState({
    correctTyped: 0,
    wordsTyped: 0,
    rawWPM: 0,
    actualWPM: 0,
    accuracy: 0,
  });

  const { setting } = useSetting();
  const { data: session } = useSession();

  useEffect(() => {
    setText(useWords(setting.words));
  }, [setting.words]);

  useEffect(() => {
    const controls = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setText(useWords(setting.words));
        setCurrentChar(0);
        setCorrectChars(0);
        setTyped("");
        setTyping(null);
      }
    };

    document.addEventListener("keydown", controls);

    return () => {
      document.removeEventListener("keydown", controls);
    };
  }, [text, typing, setting.words]);

  useEffect(() => {
    const test = (e: KeyboardEvent) => {
      if (typing === null && alpha.split("").includes(e.key)) {
        setTyping(true);
      }

      if (typing !== false && e.key === "Backspace") {
        setCurrentChar((prev) => prev - 1);
        setTyped((prev) => prev.slice(0, -1));

        if (e.key === text.at(currentChar)) {
          setCorrectChars((prev) => prev - 1);
        }
      }

      if (typing !== false && alpha.split("").includes(e.key)) {
        setCurrentChar((prev) => prev + 1);
        setTyped((prev) => (prev += e.key));

        if (e.key === text.at(currentChar)) {
          setCorrectChars((prev) => prev + 1);
        }
      }
    };

    document.addEventListener("keydown", test);

    return () => {
      document.removeEventListener("keydown", test);
    };
  }, [typing, text, currentChar]);

  useEffect(() => {
    if (!typing) {
      const result = useResult(text, typed.length, correctChars, setting.time);

      setResult(result);

      const saveResult = async () => {
        const user = await fetch(`/api/user/${session?.user?.email}`).then(
          async (res) => await res.json()
        );

        await fetch(`/api/history/${user.data.uid}`, {
          method: "POST",
          body: JSON.stringify({
            wpm: result.actualWPM,
            accuracy: result.accuracy,
            charsTyped: typed.length,
            time: setting.time,
          }),
        });
      };

      saveResult();
    }
  }, [typing]);

  return (
    <>
      <div className="flex flex-col justify-center items-start gap-4 max-w-[70%] text-start">
        <Timer trigger={typing} onStop={() => setTyping(false)} />
        <span className="tracking-wider leading-[3em] max-h-[10rem] overflow-y-hidden">
          {text.split("").map((char, index) => (
            <Character
              key={index}
              actual={char}
              typed={typed.at(index) ?? null}
              active={currentChar === index}
            />
          ))}
        </span>
        {typing === false && (
          <Modal heading="Result">
            <div className="flex flex-col justify-start items-start gap-3 text-3xl text-secondary">
              <span className="mr-8">
                Raw WPM: <span className="text-accent">{result.rawWPM}</span>
              </span>
              <span className="mr-8">
                Actual WPM:{" "}
                <span className="text-accent">{result.actualWPM}</span>
              </span>
              <span className="mr-8">
                Accuracy:{" "}
                <span className="text-accent">{result.accuracy}%</span>
              </span>
              <span className="mr-8">
                Raw Words typed:{" "}
                <span className="text-accent">{result.wordsTyped}</span>
              </span>
              <span className="mr-8">
                Correct Words typed:{" "}
                <span className="text-accent">{result.correctTyped}</span>
              </span>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
