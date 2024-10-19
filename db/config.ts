import { Client } from "pg";

export const sql = async (query: string) => {
  const client = new Client({
    connectionString: process.env.POSTGRES_PROD,
  });

  await client.connect();

  const res = await client.query(query);

  await client.end();

  return res;
};
