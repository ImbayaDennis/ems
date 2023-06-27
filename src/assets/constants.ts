import type { Employee, RequestApproved } from "@prisma/client";
import moment from "moment";
import { HiClock, HiCollection, HiHome, HiUserGroup } from "react-icons/hi";

export const ApplicationLinks = [
  { link: "/", to: "Dashboard", icon: HiHome },
  {
    link: "/leave-request-manager",
    to: "Leave Request Manager",
    icon: HiCollection,
  },
  { link: "/employee-manager", to: "Employee Manager", icon: HiUserGroup },
];

export const LogsManagementLinks = [
  { link: "/", to: "Dashboard", icon: HiHome },
  { link: "/logs-manager", to: "Log manager", icon: HiClock },
  { link: "/employee-manager", to: "Employee Manager", icon: HiUserGroup },
];

export const EmployeeLinks = [{ link: "/", to: "Home", icon: HiHome }];

export const date = new Date();

export const todayDateTime = date.toJSON().substring(0, 26);

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export const dateToday = `${year}-${month}-${day}`;
export const dateYesterday = moment(dateToday)
  .subtract(1, "day")
  .format("YYYY-MM-DD");

export const DAYS_EARNED_PER_MONTH = 1.75

export const calculateEarnedLeaveDays = (employee: Employee | null | undefined) => {
  return (
    Math.floor(
      (moment(dateToday).diff(employee?.employed_on, "months") % 12) *
        DAYS_EARNED_PER_MONTH
    ) || 0
  );
};

//(dateToday - dateEmployed)

export const calculateLeaveDaysTaken = (
  leaveDaysTaken: RequestApproved[] | undefined
) => {
  let totalLeaveDaysTaken = 0;
  leaveDaysTaken?.map((approvedRequest) =>
    approvedRequest.return_date && !approvedRequest.still_on_leave
      ? (totalLeaveDaysTaken += moment(approvedRequest.return_date).diff(
          approvedRequest.start_date,
          "days"
        ))
      : (totalLeaveDaysTaken += moment(approvedRequest.end_date).diff(
          approvedRequest.start_date,
          "days"
        ))
  );
  return totalLeaveDaysTaken;
};