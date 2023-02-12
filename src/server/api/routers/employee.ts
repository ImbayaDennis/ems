import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from "../trpc";

export const employees = createTRPCRouter({
  getEmployees: adminProcedure.query(async({ ctx }) => {
    return await ctx.prisma.employee.findMany({
      where: {org_id: ctx.session.user.org_id},
      include: {user: true}
    });
  }),
  addEmployee: adminProcedure.input(z.object({employee_id: z.string(), name: z.string(), email: z.string(), org_id: z.string(), leave_days: z.number(), leave_balance: z.number(),}))
  .mutation(async({ctx, input})=>{
    return await ctx.prisma.employee.create({
      data: {employee_id: input.employee_id, name: input.name, email: input.email, org_id: ctx.session.user.org_id, leave_days: 0, leave_bal: 0 }
    })
  }),
  removeEmployee: adminProcedure.input(z.object({employeeId: z.string()}))
  .mutation(async({ctx, input})=>{
    return ctx.prisma.employee.delete({
      where: {employee_id: input.employeeId}
    }).then((deletedEmployee)=>{
      if(deletedEmployee.email)
      return ctx.prisma.user.delete({
        where: {email: deletedEmployee.email}
      })
    }).then(async(deletedUser)=>{
      await ctx.prisma.account.deleteMany({
        where: {userId: deletedUser?.id}
      })
      await ctx.prisma.session.deleteMany({
        where: {userId: deletedUser?.id},
      });
      await ctx.prisma.requestApproved.deleteMany({
        where: {employee_id: input?.employeeId},
      });
      await ctx.prisma.leaveRequests.deleteMany({
        where: {employee_id: input.employeeId},
      });
    })
  })
});
