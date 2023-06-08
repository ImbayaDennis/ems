import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      employee_id: string;
      role: "owner" | "admin" | "manager" | "employee";
      org_id: string;
    } & DefaultSession["user"];
  }

  interface User {
    employee_id: string;
    role: "owner" | "admin" | "manager" | "employee";
    org_id: string;
  }
}
