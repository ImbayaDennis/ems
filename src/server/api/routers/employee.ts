import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from "../trpc";

export const employees = createTRPCRouter({
  getEmployees: adminProcedure.query(async({ ctx }) => {
    return await ctx.prisma.employees.findMany({
      where: {org_id: ctx.session.user.org_id},
      include: {user: true}
    });
  }),
  removeEmployee: adminProcedure.input(z.object({employeeId: z.string()}))
  .mutation(async({ctx, input})=>{
    return ctx.prisma.employees.delete({
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
      await ctx.prisma.leaveApproved.deleteMany({
        where: {user_id: deletedUser?.id},
      });
      await ctx.prisma.leaveRequests.deleteMany({
        where: {user_id: deletedUser?.id},
      });
    })
  })
});
