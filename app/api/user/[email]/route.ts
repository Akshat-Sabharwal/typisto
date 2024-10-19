import { sql } from "@/db/config";

export const GET = async (
  req: Request,
  context: { params: { email: string } }
) => {
  const { email } = context.params;

  if (!email || email.length === 0) {
    return Response.json(
      {
        code: "BAD_REQUEST",
        message: "Email is missing from request",
      },
      { status: 400 }
    );
  }

  const res = await sql(`SELECT * FROM users WHERE email = '${email}'`);

  return Response.json(
    {
      code: "SUCCESS",
      message: "User found",
      data: res.rows.at(0),
    },
    { status: 200 }
  );
};
