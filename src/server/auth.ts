import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  type UserRole = "owner" | "admin" | "manager" | "employee"

  interface Session extends DefaultSession {
    user?: {
      employee_id: string;
      org_id: string;
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    employee_id: string;
    org_id: string;
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        const checkEmployeeEmail = await prisma.employee.findUnique({
          where: { email: user.email },
        });

        if (!!checkEmployeeEmail) {
          return true;
        }
      }
      return false;
    },
    async session({ session, user }) {
      if (!user.role) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "employee" },
        });
      }
      if (!user.org_id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { org_id: "cle3cxhup0000p2k0tk0fefv8" },
        });
      }
      const employee = await prisma.employee
        .findUnique({
          where: { email: user.email || undefined },
        })
        .then((employee) => {
          return employee;
        });

      if (session.user && employee?.org_id && employee.employee_id) {
        session.user.employee_id = employee.employee_id;
        session.user.org_id = employee?.org_id;
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
