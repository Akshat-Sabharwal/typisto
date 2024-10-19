"use client";

import { useSession } from "next-auth/react";
import { Settings } from "./Settings";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="w-[90%] flex justify-between items-center">
      <h1 className="text-accent text-5xl">Typisto</h1>

      <div className="flex justify-end items-center gap-4">
        <Settings />
        <img
          src={session?.user?.image as string}
          alt="Account"
          className="h-12 rounded-md cursor-pointer"
          onClick={() => router.push("/account")}
        />
      </div>
    </div>
  );
};
