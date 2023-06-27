import { createTRPCRouter } from "./trpc";
import { leaveManagement } from "./routers/leaveManagement";
import { employees } from "./routers/employee";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  leaveManagement,
  employees,
});

// export type definition of API
export type AppRouter = typeof appRouter;
