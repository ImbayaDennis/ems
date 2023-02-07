import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ user }){
      if(user.email){
        const checkEmployeeEmail = await prisma.employees.findUnique({where: {email: user.email }})

        if(!!checkEmployeeEmail){
          
          return true
        }
      }
      return false
    },
    async session({ session, user }) {
      if (!user.role) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "employee" },
        });
      }
      const odgId = await prisma.employees
        .findUnique({
          where: { email: user.email || undefined },
        })
        .then((employee) => {
          return employee?.org_id;
        });

      if (session.user && odgId) {
        session.user.org_id = odgId;
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
    redirect({baseUrl}){
      return baseUrl;
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages:{
    // signIn: "/auth/signin",
    // error: "/auth/error"
  },
};

export default NextAuth(authOptions);
