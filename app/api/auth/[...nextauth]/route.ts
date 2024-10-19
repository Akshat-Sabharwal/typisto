// import { createClient, createPool, sql } from "@vercel/postgres";
import { sql } from "@/db/config";
import { randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (!user.email || !user.image || !user.email) {
        return false;
      }

      const res = await sql(
        `SELECT * FROM users WHERE email = '${user.email}'`
      );

      if (res.rowCount === 0) {
        const res = await sql(
          `INSERT INTO users VALUES('${randomUUID()}', '${user.name}', '${
            user.email
          }', '${user.image}')`
        );
      }

      return true;
    },
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
