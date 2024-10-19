"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const Auth: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-accent text-5xl mb-6">Sign In</h1>
        <button
          className="px-12 py-3 rounded-md bg-secondary hover:bg-hover active:bg-active text-primary flex justify-center items-center gap-3 text-2xl"
          onClick={() => signIn("google")}
        >
          <span className="text-accent">
            <FaGoogle />
          </span>
          Sign in with Google
        </button>
        <button
          className="px-12 py-3 rounded-md bg-secondary hover:bg-hover active:bg-active text-primary flex justify-center items-center gap-3 text-2xl"
          onClick={() => signIn("github")}
        >
          <span className="text-accent">
            <FaGithub />
          </span>
          Sign in with Github
        </button>
      </div>
    </div>
  );
};
