import { Stat } from "./Stat";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface StatBlockProps {
  data: THistory[] | undefined;
  stats: {
    averageWPM: number;
    maximumWPM: number;
    minimumWPM: number;
    averageAccuracy: number;
    variance: number;
  };
}

interface ChartBlockProps {
  data: THistory[] | undefined;
}

interface TableBlockProps {
  data: THistory[] | undefined;
}

export const Profile: React.FC = () => {
  const { data: session } = useSession();

  return (
    <span className="flex flex-col justify-start items-center gap-8 -mb-6">
      {session?.user?.image ? (
        <img
          src={session?.user?.image}
          alt="Profile image"
          className="rounded-md size-32"
        />
      ) : (
        <RxAvatar />
      )}

      <h1 className="text-primary text-4xl">{session?.user?.name}</h1>
    </span>
  );
};

export const StatBlock: React.FC<StatBlockProps> = ({ data, stats }) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <p className="text-primary text-4xl mb-5">Stats</p>
      <hr className="border-2 border-secondary w-full mb-8" />
      <div className="grid grid-cols-3 gap-8 max-w-[90%]">
        {data && (
          <>
            <Stat
              number={Number.isNaN(stats.averageWPM) ? 0 : stats.averageWPM}
              description="All time average WPM"
            />

            <Stat
              number={Number.isNaN(stats.maximumWPM) ? 0 : stats.maximumWPM}
              description="Maximum WPM"
            />

            <Stat
              number={Number.isNaN(stats.minimumWPM) ? 0 : stats.minimumWPM}
              description="Minimum WPM"
            />

            <Stat
              number={
                Number.isNaN(stats.averageAccuracy) ? 0 : stats.averageAccuracy
              }
              description="All time average accuracy"
            />

            <Stat
              number={Number.isNaN(stats.variance) ? 0 : stats.variance}
              description="All time average variance"
            />
          </>
        )}
      </div>
    </div>
  );
};

export const ChartBlock: React.FC<ChartBlockProps> = ({ data: history }) => {
  history?.forEach(
    (item) =>
      (item.month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].at(new Date(item.date).getMonth()))
  );
  return (
    <div className="flex flex-col justify-start items-start w-full mt-8">
      <p className="text-primary text-4xl mb-5">Graphical Interpretation</p>
      <hr className="border-2 border-secondary w-full mb-8" />
      {history?.length === 0 ? (
        <p className="text-secondary text-2xl">No records to interpret!</p>
      ) : (
        <div className="mt-10 w-[90%]">
          <ChartContainer
            config={
              {
                wpm: { label: "WPM", color: "#DC7E4B" },
              } satisfies ChartConfig
            }
            className="max-h-[60vh] w-full flex justify-start"
          >
            <BarChart
              accessibilityLayer
              data={history?.reverse()}
              maxBarSize={50}
              barGap={5}
              className="text-xl"
            >
              <XAxis />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "#404040" }}
              />
              <Bar dataKey="wpm" fill="#DC7E4B" radius={4} barSize={30} />
              <Bar dataKey="accuracy" fill="#B35624" radius={4} barSize={30} />
              <Legend />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};

export const TableBlock: React.FC<TableBlockProps> = ({ data }) => {
  const { data: session } = useSession();

  const deleteHistory = async () => {
    const user = await fetch(`/api/user/${session?.user?.email}`).then(
      async (res) => await res.json()
    );

    await fetch(`/api/history/${user.data.uid}`, {
      method: "DELETE",
    });
  };

  const sortedData = data
    ?.slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col justify-evenly items-start w-full my-8">
      <div className="flex justify-between items-center w-full">
        <p className="text-primary text-4xl mb-3">History</p>
        <FaTrash
          onClick={deleteHistory}
          className="size-8 text-primary rounded-md hover:bg-hover active:bg-active p-2"
        />
      </div>
      <hr className="border-2 border-secondary w-full mb-8" />
      {sortedData?.length === 0 ? (
        <p className="text-secondary text-2xl">No history to display!</p>
      ) : (
        <div className="mb-16 w-full">
          <Table className="text-xl text-primary w-full">
            <TableHeader>
              <TableRow className="hover:bg-hover">
                <TableHead className="w-[100px]">WPM</TableHead>
                <TableHead className="text-center">Accuracy</TableHead>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData &&
                sortedData.map((item: THistory, index: number) => (
                  <TableRow key={index} className="hover:bg-hover">
                    <TableCell className="font-medium text-left">
                      {item.wpm}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.accuracy}%
                    </TableCell>
                    <TableCell className="text-center">{item.time}s</TableCell>
                    <TableCell className="text-right">
                      {new Date(item.date).toISOString().split("T").at(0)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
