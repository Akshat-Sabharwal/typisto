"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  ChartBlock,
  Profile,
  StatBlock,
  TableBlock,
} from "@/components/AccountComponents";

const Account: React.FC = () => {
  const [stats, setStats] = useState({
    averageWPM: 0,
    maximumWPM: 0,
    minimumWPM: 0,
    averageAccuracy: 0,
    variance: 0,
  });

  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const user = await fetch(`/api/user/${session?.user?.email}`).then(
        async (res) => await res.json()
      );

      const history = await fetch(`/api/history/${user.data.uid}`)
        .then(async (res) => await res.json())
        .then((res) =>
          (res.data as THistory[]).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );

      return history;
    },
  });

  useEffect(() => {
    if (data) {
      const averageWPM = Math.floor(
        (data as THistory[]).reduce((acc, cur) => (acc += cur.wpm), 0) /
          data.length
      );

      const maximumWPM = Math.floor(
        (data as THistory[]).sort((a, b) => a.wpm - b.wpm).at(-1)?.wpm as number
      );

      const minimumWPM = Math.floor(
        (data as THistory[]).sort((a, b) => a.wpm - b.wpm).at(0)?.wpm as number
      );

      const averageAccuracy = Math.floor(
        (data as THistory[]).reduce((acc, cur) => (acc += cur.accuracy), 0) /
          data.length
      );

      const variance = Math.floor(
        (data as THistory[]).reduce(
          (acc, cur) => (acc += Math.abs(cur.accuracy - averageAccuracy)),
          0
        ) / data.length
      );

      setStats({
        maximumWPM,
        minimumWPM,
        averageAccuracy,
        averageWPM,
        variance,
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen justify-start items-center py-8 text-center">
        <h1
          className="text-accent text-5xl self-start ml-20 mt-4 mb-12 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Typisto
        </h1>

        {isLoading ? (
          <FaSpinner className="size-24 text-accent animate-spin duration-1000 mt-40" />
        ) : (
          <div className="flex flex-col gap-[5rem] items-center">
            <Profile />
            <StatBlock data={data} stats={stats} />
            <ChartBlock data={data} />
            <TableBlock data={data} />
          </div>
        )}

        <div className="w-[95%] flex justify-end items-center text-secondary text-3xl pt-28 pb-8">
          Akshat Sabharwal
        </div>
      </div>
    </>
  );
};

export default Account;
