import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const leaveManagement = createTRPCRouter({
  getLeaveRequests: adminProcedure.query(async({ ctx }) => {
    return await ctx.prisma.leaveRequests.findMany({
      include: { leave_type: true, user: true },
    });
  }),
  getLeaveRequest: protectedProcedure
  .query(async({ctx}) =>{
    return await ctx.prisma.leaveRequests.findUnique({
      where: {user_id: ctx.session.user.id}
    })
  }),
  getEmployeesOnLeave: adminProcedure.query(async({ ctx }) => {
    return await ctx.prisma.leaveApproved.findMany({
      where: {approved: true},
      include: {
        leave_type: true,
        user: true
      }
    });
  }),
  requestLeave: protectedProcedure.input(z.object({ userId: z.string(), leaveTypeId: z.string().nullable(), startDate: z.string().nullable(), endDate: z.string().nullable() }))
  .mutation(async({ ctx, input }) =>{
    return await ctx.prisma.leaveRequests.create({
      data: { user_id: input.userId, leave_type_id: input.leaveTypeId, start_date: input.startDate, end_date: input.endDate }
    })
  }),
  approveLeaveRequest: adminProcedure.input(z.object({ leaveRequestId: z.string(), approved: z.boolean() }))
  .mutation(async ({ ctx, input })=>{
      const leaveData = await ctx.prisma.leaveRequests.delete({
      where: {
        id: input.leaveRequestId
      }
    });
    return await ctx.prisma.leaveApproved.create({
      data: { user_id: leaveData.user_id, leave_type_id: leaveData.leave_type_id, start_date: leaveData.start_date, end_date: leaveData.end_date, approved: input.approved }
    });
  }),
  getLeaveTypes: protectedProcedure.query(async({ctx})=>{
    return await ctx.prisma.leaveType.findMany()
  }),
  createLeaveType: adminProcedure
  .input(z.object({leave_desc: z.string(), leave_type: z.string(), leave_days: z.number()}))
  .mutation(async({ctx, input})=>{
    return await ctx.prisma.leaveType.create({
      data: {leave_desc: input.leave_desc, leave_type: input.leave_type, leave_days: input.leave_days}
    })
  })
});
