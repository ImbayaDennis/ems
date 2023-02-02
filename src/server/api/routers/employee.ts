import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from "../trpc";

export const employees = createTRPCRouter({
  getEmployees: adminProcedure.query(async({ ctx }) => {
    return await ctx.prisma.employees.findMany();
  }),
});
