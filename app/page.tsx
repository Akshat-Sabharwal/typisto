"use client";

import { Auth } from "@/components/Auth";
import { Kbd } from "@/components/Kbd";
import { Navbar } from "@/components/Navbar";
import { TypeTest } from "@/components/TypeTest";
import { useAnimate } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Landing = () => {
  const [landingScope, landingAnimate] = useAnimate();
  const [typeScope, typeAnimate] = useAnimate();

  const [ran, setRan] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const start = async (e: KeyboardEvent) => {
        if (e.key === "Enter" && !ran) {
          await landingAnimate(
            landingScope.current,
            {
              opacity: 0,
              scale: 1.5,
            },
            {
              duration: 0.75,
            }
          );

          await typeAnimate(
            typeScope.current,
            { opacity: 1, scale: 1 },
            {
              duration: 0.75,
            }
          );
        }

        setRan(true);
      };

      document.addEventListener("keydown", start);

      return () => {
        document.removeEventListener("keydown", start);
      };
    }
  }, [ran, landingAnimate, landingScope, typeAnimate, typeScope]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      {typeof window !== "undefined" &&
      document.documentElement.clientWidth < 800 ? (
        <div className="min-h-[30vh] md:min-h-[40vh] min-w-[40vw] max-w-[95vw] bg-secondary rounded-xl flex justify-center items-center px-8 md:px-16 text-center text-xl md:text-3xl text-primary">
          <h1>
            <span className="text-accent">Typist</span> isn't compatible with
            this device!
          </h1>
        </div>
      ) : (
        <>
          <div
            className="absolute vstack gap-8 text-center scale-100 opacity-1"
            ref={landingScope}
          >
            <h1 className="text-accent text-9xl">Typisto</h1>
            <p className="text-secondary text-3xl">
              Press{" "}
              <span className="text-accent bg-secondary px-1.5 py-1 text-xl rounded-md">
                enter
              </span>{" "}
              to get started.
            </p>
          </div>

          <div
            className="absolute top-auto left-auto opacity-0 scale-0 h-screen flex flex-col justify-around items-center gap-[8rem]"
            ref={typeScope}
          >
            {status === "authenticated" ? (
              <>
                <Navbar />
                <TypeTest />
                <div className="flex justify-start items-center w-[90%] text-xl text-secondary">
                  <span>
                    <Kbd>ctrl</Kbd> regenerate text
                  </span>
                </div>
              </>
            ) : (
              <Auth />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
