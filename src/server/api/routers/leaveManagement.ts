import moment from "moment";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const leaveManagement = createTRPCRouter({
  getLeaveRequests: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.leaveRequests.findMany({
      include: { leave_type: true, employee: { include: { user: true } } },
    });
  }),
  getLeaveRequest: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.leaveRequests.findUnique({
      where: { employee_id: ctx.session.user.employee_id },
      include: { employee: { include: { user: true } } },
    });
  }),
  getEmployeesOnLeave: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.requestApproved.findMany({
      where: { still_on_leave: true },
      include: {
        leave_type: true,
        employee: { include: { user: true } },
      },
    });
  }),
  getEmployeeOnLeave: protectedProcedure
  .query(async({ctx})=>{
    return await ctx.prisma.requestApproved.findFirst({
      where: {employee_id: ctx.session.user.employee_id, AND: {still_on_leave: true}}
    })
  }),
  requestLeave: protectedProcedure
    .input(
      z.object({
        leaveTypeId: z.string().nullable(),
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        leaveDays: z.number().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.leaveRequests.create({
        data: {
          employee_id: ctx.session.user.employee_id,
          leave_type_id: input.leaveTypeId,
          start_date: input.startDate,
          end_date: input.endDate,
          leave_days: input.leaveDays,
        },
      });
    }),
  approveLeaveRequest: adminProcedure
    .input(z.object({ leaveRequestId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.leaveRequests
        .findUnique({
          where: {
            id: input.leaveRequestId,
          },
          include: {
            employee: { select: { id: true } },
          },
        })
        .then(async(leaveData) => {
          await ctx.prisma.requestApproved
            .create({
              data: {
                employee_id: leaveData?.employee_id || "",
                leave_type_id: leaveData?.leave_type_id || "",
                start_date: leaveData?.start_date || "",
                end_date: leaveData?.end_date || "",
                still_on_leave: true,
              },
            })
            .then(async() => {
              await ctx.prisma.leaveRequests.delete({
                where: {id: input.leaveRequestId}
              })
            });
        });
    }),
  rejectLeaveRequest: adminProcedure
    .input(z.object({ leaveRequestId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.leaveRequests
        .delete({
          where: {
            id: input.leaveRequestId,
          },
        })
        .then((leaveData) => {
          ctx.prisma.requestRejected
            .create({
              data: {
                employee_id: leaveData.employee_id,
                leave_type_id: leaveData.leave_type_id,
                start_date: leaveData.start_date,
                end_date: leaveData.end_date,
              },
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    }),
  revertLeaveStatus: adminProcedure
    .input(z.object({ approvedLeaveId: z.string(), returnDate: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.requestApproved
        .update({
          where: { id: input.approvedLeaveId },
          data: {
            still_on_leave: false,
            return_date: input.returnDate,
          },
        })
        .then((approvedRequest)=>{
          const startDate = approvedRequest.start_date
          const endDate = input.returnDate

          const dateDiff = moment(endDate).diff(moment(startDate), "days")

          return ctx.prisma.employee.update({
            where: {employee_id: approvedRequest.employee_id},
            data: {leave_bal: {decrement: dateDiff}}
          })
        })
        .catch((e) => {
          console.error(e);
        });
    }),
  getLeaveTypes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.leaveType.findMany();
  }),
  createLeaveType: adminProcedure
    .input(
      z.object({
        leave_desc: z.string(),
        leave_type: z.string(),
        leave_days: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.leaveType.create({
        data: {
          leave_desc: input.leave_desc,
          leave_type: input.leave_type,
          leave_days: input.leave_days,
        },
      });
    }),
});
