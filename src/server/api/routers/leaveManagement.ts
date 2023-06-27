import moment from "moment";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { handleSendMail } from "~/utils/mail";

export const leaveManagement = createTRPCRouter({
  getLeaveRequests: adminProcedure.query(async ({ ctx }) => {

    const requests = await ctx.prisma.leaveRequests.findMany({
      include: { leave_type: true, employee: { include: { user: true } } },
    });

    if (ctx.session.user.role === "owner") {
      return requests;
    }
    if (ctx.session.user.role === "admin") {
      return requests.filter(
        (_req) => _req.employee?.user?.role !== ("owner" || "admin")
      );
    }
    if (ctx.session.user.role === "manager") {
      return requests.filter(
        (_req) => _req.employee?.user?.role === "employee"
      );
    }
  }),
  getLeaveRequest: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.leaveRequests.findMany({
      where: { employee_id: ctx.session.user.employee_id },
      include: { employee: { include: { user: true } } },
    });
  }),
  getLeaveApproved: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.requestApproved.findMany({
      where: { employee_id: ctx.session.user.employee_id },
      include: { employee: { include: { user: true } } },
    });
  }),
  getEmployeesOnLeave: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.requestApproved.findMany({
      include: {
        leave_type: true,
        employee: { include: { user: true } },
      },
    });
  }),
  getEmployeeOnLeave: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.requestApproved.findFirst({
      where: {
        employee_id: ctx.session.user.employee_id,
        AND: { still_on_leave: true },
      },
    });
  }),
  getLeaveDaysTaken: protectedProcedure
    .input(z.object({ employee_id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.requestApproved.findMany({
        where: {
          employee_id: input.employee_id,
        },
      });
    }),
  requestLeave: protectedProcedure
    .input(
      z.object({
        leaveTypeId: z.string().nullable().nullish(),
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        leaveDays: z.number().nullable(),
        head_office_approver_id: z.string().nullish(),
        work_assign_id: z.string().nullish(),
        customLeaveType: z.string().nullable().nullish(),
        customLeaveDesc: z.string().nullable().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const leaveRequest = await ctx.prisma.leaveRequests.create({
        data: {
          employee_id: ctx.session.user.employee_id,
          leave_type_id: input.leaveTypeId,
          start_date: input.startDate,
          end_date: input.endDate,
          leave_days: input.leaveDays,
          head_office_approver_id: input.head_office_approver_id,
          work_assign_id: input.work_assign_id,
          custom_type: input.customLeaveType,
          custom_desc: input.customLeaveDesc,
        },
      });

      await ctx.prisma
        .$transaction([
          ctx.prisma.employee.findUnique({
            where: { employee_id: leaveRequest.employee_id },
          }),
          ctx.prisma.employee.findUnique({
            where: { employee_id: leaveRequest.head_office_approver_id || undefined },
          }),
          ctx.prisma.employee.findUnique({
            where: { employee_id: leaveRequest.work_assign_id || undefined },
          }),
          ctx.prisma.leaveType.findUnique({
            where: { id: leaveRequest.leave_type_id || leaveRequest.custom_type || undefined },
          }),
        ])
        .then(async (employeeData) => {
          if (
            employeeData[0]?.name &&
            employeeData[1]?.name &&
            employeeData[2]?.name &&
            employeeData[0]?.email &&
            employeeData[1]?.email &&
            employeeData[2]?.email &&
            employeeData[3]?.leave_type &&
            leaveRequest.start_date
          ) {
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[0]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            })
            .catch((e)=>{console.error(e)});
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[1]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            })
            .catch((e)=>{console.error(e)});
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[2]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            })
            .catch((e)=>{console.error(e)});
          }else{
            console.log({
              Error: "Some data is missinmg",
              employee: employeeData[0],
              headOffice: employeeData[1],
              workAssign: employeeData[2],
            })
          }
        });

      return leaveRequest;
    }),
  requestEmployeeLeave: protectedProcedure
    .input(
      z.object({
        employee_id: z.string(),
        leaveTypeId: z.string().nullable().nullish(),
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        leaveDays: z.number().nullable(),
        head_office_approver_id: z.string(),
        work_assign_id: z.string(),
        customLeaveType: z.string().nullable().nullish(),
        customLeaveDesc: z.string().nullable().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const leaveRequest = await ctx.prisma.leaveRequests.create({
        data: {
          employee_id: input.employee_id,
          leave_type_id: input.leaveTypeId,
          start_date: input.startDate,
          end_date: input.endDate,
          leave_days: input.leaveDays,
          head_office_approver_id: input.head_office_approver_id,
          work_assign_id: input.work_assign_id,
          custom_type: input.customLeaveType,
          custom_desc: input.customLeaveDesc,
        },
      });

      await ctx.prisma
        .$transaction([
          ctx.prisma.employee.findUnique({
            where: { employee_id: leaveRequest.employee_id },
          }),
          ctx.prisma.employee.findUnique({
            where: {
              employee_id: leaveRequest.head_office_approver_id || undefined,
            },
          }),
          ctx.prisma.employee.findUnique({
            where: { employee_id: leaveRequest.work_assign_id || undefined },
          }),
          ctx.prisma.leaveType.findUnique({
            where: {
              id:
                leaveRequest.leave_type_id ||
                leaveRequest.custom_type ||
                undefined,
            },
          }),
        ])
        .then( async (employeeData) => {
          if (
            employeeData[0]?.name &&
            employeeData[1]?.name &&
            employeeData[2]?.name &&
            employeeData[0]?.email &&
            employeeData[1]?.email &&
            employeeData[2]?.email &&
            employeeData[3]?.leave_type &&
            leaveRequest.start_date
          ) {
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[0]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            });
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[1]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            });
            await handleSendMail({
              from: "Technisoft HRMS <technisofts@gmail.com>",
              to: employeeData[2]?.email,
              subject: `Leave request by ${employeeData[0].name}`,
              data: {
                employeeName: employeeData[0]?.name,
                headOfficeApproverName: employeeData[1]?.name,
                workStandInName: employeeData[2]?.name,
                leaveType: employeeData[3]?.leave_type,
                startDate: leaveRequest.start_date,
                subject: employeeData[3]?.leave_type,
              },
            });
          } else {
            console.log({
              Error: "Some data is missinmg",
              employee: employeeData[0],
              headOffice: employeeData[1],
              workAssign: employeeData[3],
            });
          }
        });
        return leaveRequest;
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
        .then(async (leaveData) => {
          return await ctx.prisma.requestApproved
            .create({
              data: {
                employee_id: leaveData?.employee_id || "",
                leave_type_id: leaveData?.leave_type_id || "",
                start_date: leaveData?.start_date || "",
                end_date: leaveData?.end_date || "",
                still_on_leave: true,
                custom_type: leaveData?.custom_type,
                custom_desc: leaveData?.custom_desc,
              },
            })
            .then(async () => {
             return await ctx.prisma.leaveRequests.delete({
                where: { id: input.leaveRequestId },
              });
            });
        })
    }),
  rejectLeaveRequest: adminProcedure
    .input(z.object({ leaveRequestId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.leaveRequests
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
                custom_type: leaveData.custom_type,
                custom_desc: leaveData.custom_desc,
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
        .then((approvedRequest) => {
          const startDate = approvedRequest.start_date;
          const endDate = input.returnDate;

          const dateDiff = moment(endDate).diff(moment(startDate), "days");

          if (approvedRequest.leave_type_id === ("" || "")) {
          }

          return ctx.prisma.employee.update({
            where: { employee_id: approvedRequest.employee_id || undefined },
            data: { leave_bal: { decrement: dateDiff } },
          });
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
