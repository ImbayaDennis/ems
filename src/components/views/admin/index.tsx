import { useSession } from 'next-auth/react';
import { useContext } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext';
import { api } from "../../../utils/api";
import QuickActionPanel from "../../Dashboard/QuickActionPanel";
import LeaveRequestFormContainer from "../../LeaveRequestManager/LeaveRequestForm/LeaveRequestFormContainer";
import LeaveRequestPreview from "../../Dashboard/LeaveRequestPreview";
import AdminMetricsCard from "../../Dashboard/AdminMetricsCard";
import EmployeeMetricsCard from "../../Dashboard/EmployeeMetricsCard";
import {
  calculateEarnedLeaveDays,
  calculateLeaveDaysTaken,
} from "~/assets/constants";

const AdminHomePage = () => {
  const { data: session } = useSession();

  const { data: employees, isLoading: employeesLoading } =
    api.employees.getEmployees.useQuery();
  const { data: employee, isLoading } = api.employees.getEmployee.useQuery();
  const { data: employeesOnLeave, isLoading: employeesOnLeaveLoading } =
    api.leaveManagement.getEmployeesOnLeave.useQuery();
  const { data: employeeOnLeave, isLoading: employeeOnLeaveLoading } =
    api.leaveManagement.getEmployeeOnLeave.useQuery();
  const {
    data: leaveRequests,
    isLoading: leaveRequestsLoading,
    refetch,
  } = api.leaveManagement.getLeaveRequests.useQuery();
  const { data: leaveDaysTaken, isLoading: leaveDaysTakenLoading } =
    api.leaveManagement.getLeaveDaysTaken.useQuery({
      employee_id: session?.user?.employee_id || "",
    });
  const modalContext = useContext(ModalContextProvider);

  const openLeaveReqModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: true },
      }));
    }
  };

  console.log();

  return (
    <div className="h-full w-full">
      <h1 className="my-8 mx-4 text-start text-2xl">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-wrap gap-x-12 gap-y-2">
        <AdminMetricsCard
          metric_one={employees?.length}
          metric_one_label="Total Employees"
          metric_one_loading={employeesLoading}
          metric_two={employeesOnLeave?.length}
          metric_two_label="Employees on leave"
          metric_two_loading={employeeOnLeaveLoading}
          metric_three={
            (employees?.length || 0) - (employeesOnLeave?.length || 0)
          }
          metric_three_label="Active Employees"
          metric_three_loading={employeesLoading}
          isLoading={false}
        />
        <EmployeeMetricsCard
          metric_one_label="Leave days taken"
          metric_one={calculateLeaveDaysTaken(leaveDaysTaken)}
          metric_one_loading={isLoading}
          metric_two_label="Entitled leave days"
          metric_two={employee?.leave_days || 0}
          metric_three_label="Earned leave days"
          metric_two_loading={isLoading}
          metric_three={calculateEarnedLeaveDays(employee)}
          metric_three_loading={isLoading}
          isLoading={false}
        />
        <LeaveRequestPreview
          title="Leave Requests"
          btn_lbl="See all requests"
          page_link="/leave-request-manager"
          leave_requests_loading={leaveRequestsLoading}
          listData={leaveRequests}
        />
        <QuickActionPanel openLeaveReqModal={openLeaveReqModal} />

        <LeaveRequestFormContainer
          refetchLeaveRequests={() => {
            refetch().catch((e) => console.error(e));
          }}
        />
      </div>
    </div>
  );
};

export default AdminHomePage