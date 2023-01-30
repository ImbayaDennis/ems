import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const employees = createTRPCRouter({
  getEmployees: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.employees.findMany({});
  }),
});
