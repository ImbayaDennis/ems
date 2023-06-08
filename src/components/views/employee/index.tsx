import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { api } from "~/utils/api";
import QuickActionPanel from "../../Dashboard/QuickActionPanel";
import LeaveRequestFormContainer from "../../LeaveRequestManager/LeaveRequestForm/LeaveRequestFormContainer";
import MetricsCard from "../../Dashboard/AdminMetricsCard";
import moment from "moment";
import { DAYS_EARNED_PER_MONTH, dateToday } from "~/assets/constants";

const EmployeeHomePage = () => {
  const { data: session } = useSession();
  const { data: leaveRequest, refetch } =
    api.leaveManagement.getLeaveRequest.useQuery();
  const { data: employeeOnLeave } =
    api.leaveManagement.getEmployeeOnLeave.useQuery();
  const { data: employee, isLoading } = api.employees.getEmployee.useQuery();
  const modalContext = useContext(ModalContextProvider);
  const { data: leaveDaysTaken, isLoading: leaveDaysTakenLoading } =
    api.leaveManagement.getLeaveDaysTaken.useQuery({
      employee_id: session?.user.employee_id,
    });

  const openLeaveReqModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: true },
      }));
    }
  };

  const calculateLeaveDaysTaken = () => {
    let totalLeaveDaysTaken: number = 0;
    leaveDaysTaken?.map((approvedRequest) =>
      approvedRequest.return_date
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

  return (
    <div className="h-full w-full">
      <h1 className="my-8 mx-4 text-start text-2xl">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-wrap gap-x-12 gap-y-4">
        <MetricsCard
          metric_one_label="Leave days taken"
          metric_one={calculateLeaveDaysTaken()}
          metric_one_loading={isLoading}
          metric_two_label="Entitled leave days"
          metric_two={employee?.leave_days || 0}
          metric_three_label="Earned leave days"
          metric_two_loading={isLoading}
          metric_three={
            Math.floor(
              (moment(dateToday).diff(employee?.employed_on, "months") % 12) *
                DAYS_EARNED_PER_MONTH
            ) || 0
          }
          metric_three_loading={isLoading}
          isLoading={false}
        />
        <LeaveRequestFormContainer
          refetchLeaveRequests={() => {
            refetch().catch((e) => console.error(e));
          }}
        />
        <QuickActionPanel openLeaveReqModal={openLeaveReqModal} />
      </div>
    </div>
  );
};

export default EmployeeHomePage;
