import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const leaveManagement = createTRPCRouter({
  getLeaveRequests: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.leaveRequests.findMany({
      include: { leave_type: true, user: true },
    });
  }),
  getEmployeesOnLeave: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.leaveApproved.findMany({
      
    });
  }),
});
