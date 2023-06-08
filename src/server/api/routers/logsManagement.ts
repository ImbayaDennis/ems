import { z } from "zod";

import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";

export const logsManagement = createTRPCRouter({
  getAllLogs: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.log.findMany({
      include: {employee: true},
      orderBy: {time_in: "desc"}
    });
  }),
  getEmployeeLogs: protectedProcedure
  .input(z.object({employee_id: z.string().nullable().nullish()}))
  .query(({ctx, input})=>{
    return ctx.prisma.log.findMany({
      where: {employee_id: input.employee_id},
      orderBy: {time_in: "desc"},
      include: {employee: true},
    })
  }),
  addLogs: protectedProcedure
  .input(z.object({employee_id: z.string(), time_in: z.string(), time_out: z.string()}))
  .mutation(({ctx, input})=>{
    return ctx.prisma.log.createMany({
      data: {
        employee_id: input.employee_id,
        time_in: input.time_in,
        time_out: input.time_out
      }
    })
  })
});

