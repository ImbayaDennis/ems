import { z } from "zod";

import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";

export const employees = createTRPCRouter({
  getEmployees: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.employee.findMany({
      where: { org_id: ctx.session.user.org_id },
      include: { user: true },
    });
  }),
  getEmployee: protectedProcedure
  .query(async({ctx})=>{
    return await ctx.prisma.employee.findUnique({
      where: {employee_id: ctx.session.user.employee_id}
    })
  }),
  addEmployee: adminProcedure
    .input(
      z.object({
        employee_id: z.string(),
        name: z.string(),
        email: z.string(),
        employed_on: z.string(),
        leave_days: z.number(),
        leave_balance: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.employee.create({
        data: {
          employee_id: input.employee_id,
          name: input.name,
          email: input.email,
          employed_on: input.employed_on,
          org_id: ctx.session.user.org_id,
          leave_days: input.leave_days,
          leave_bal: input.leave_balance,
        },
      });
    }),
  removeEmployee: adminProcedure
    .input(z.object({ employeeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.employee
        .delete({
          where: { employee_id: input.employeeId },
        })
        .then(async(deletedEmployee) => {
          const employeeUser = await ctx.prisma.user.findUnique({
            where: {email: deletedEmployee.email || ""}
          })
          if (employeeUser && deletedEmployee.email)
            return ctx.prisma.user.delete({
              where: { email: deletedEmployee.email },
            });
        })
        .then(async (deletedUser) => {
          if (deletedUser) {
            await ctx.prisma.account.deleteMany({
              where: { userId: deletedUser?.id },
            });
            await ctx.prisma.session.deleteMany({
              where: { userId: deletedUser?.id },
            });
            await ctx.prisma.requestApproved.deleteMany({
              where: { employee_id: input?.employeeId },
            });
            await ctx.prisma.leaveRequests.deleteMany({
              where: { employee_id: input.employeeId },
            });
          }
        });
    }),
});
