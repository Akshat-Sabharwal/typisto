import { sql } from "@/db/config";
import { randomUUID } from "crypto";

export const POST = async (
  req: Request,
  context: { params: { uid: string } }
) => {
  const { wpm, time, charsTyped, accuracy }: THistory = await req.json();

  if (!context.params.uid || !wpm || !time || !charsTyped || !accuracy) {
    return Response.json(
      {
        code: "MISSING_DATA",
        error: "wpm, chars_typed, accuracy or time is missing.",
      },
      { status: 400 }
    );
  }

  const result = await sql(
    `INSERT INTO history(hid, uid, wpm, date, chars_typed, accuracy, time) VALUES('${randomUUID()}', '${
      context.params.uid
    }', ${wpm}, '${new Date(Date.now())}', ${charsTyped}, ${accuracy}, ${time})`
  );

  return Response.json(
    {
      code: "SUCCESS",
      message: "Record created successfully",
      data: result,
    },
    { status: 200 }
  );
};

export const GET = async (
  req: Request,
  context: { params: { uid: string } }
) => {
  const res = await sql(
    `SELECT * FROM history WHERE uid = '${context.params.uid}'`
  );

  res.rows.forEach((item) => {
    item.wpm, item.accuracy, item.date, item.time, item.variance;
  });

  return Response.json(
    { code: "SUCCESS", message: "Records found", data: res.rows },
    { status: 200 }
  );
};

export const DELETE = async () => {
  await sql(`DELETE FROM history WHERE uid IS NOT NULL`);

  return Response.json({}, { status: 204 });
};
