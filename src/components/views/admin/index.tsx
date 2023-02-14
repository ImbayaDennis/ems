import { useSession } from 'next-auth/react';
import { useContext, type FormEvent, useState, type Dispatch, type SetStateAction } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext';
import { trpc } from '../../../utils/trpc';
import DashboardRightPanel from '../../common/DashboardRightPanel';
import LeaveRequestFormContainer from "../../LeaveRequestManager/LeaveRequestForm/LeaveRequestFormContainer";
import ListItemCard from '../../common/ListItemCard';
import MetricsCard from "../../common/MetricsCard";


const AdminHomePage = () => {
  const{data:session} = useSession();

  const {data: employees, isLoading: employeesLoading} = trpc.employees.getEmployees.useQuery()
  const {data: employeesOnLeave, isLoading: employeesOnLeaveLoading} = trpc.leaveManagement.getEmployeesOnLeave.useQuery()
  const {data: employeeOnLeave, isLoading: employeeOnLeaveLoading} = trpc.leaveManagement.getEmployeeOnLeave.useQuery()
  const {data: leaveRequests, isLoading: leaveRequestDataLoading, refetch} = trpc.leaveManagement.getLeaveRequests.useQuery()
  const {data: leaveRequest, isLoading:leaveRequestLoading } = trpc.leaveManagement.getLeaveRequest.useQuery()
  const modalContext = useContext(ModalContextProvider);


  const openLeaveReqModal = () =>{
    if(modalContext.setModals){
      modalContext.setModals((prev)=>({...prev, createLeaveRequest: {isOpen: true}}))
    }
  }


  return (
    <div className="h-full w-full">
      <h1 className="my-8 mx-4 text-start text-2xl">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-wrap gap-16">
        <div className="my-4 flex h-fit max-h-[calc(100vh-10rem)] w-full flex-col items-start p-2 md:w-1/2">
          <MetricsCard
            metric_one={employees?.length}
            metric_one_label="Total Employees"
            metric_two={employeesOnLeave?.length}
            metric_two_label="Employees on leave"
            metric_three={
              (employees?.length || 0) - (employeesOnLeave?.length || 0)
            }
            metric_three_label="Active Employees"
            isLoading={employeesLoading}
          />
          <ListItemCard
            title="Leave Requests"
            btn_lbl="See all requests"
            listData={leaveRequests}
          />
          <LeaveRequestFormContainer
            refetchLeaveRequests={() => {
              refetch().catch((e) => console.error(e));
            }}
          />
        </div>
        <DashboardRightPanel
          leaveRequest={leaveRequest}
          leaveApproved={employeeOnLeave}
          openLeaveReqModal={openLeaveReqModal}
        />
      </div>
    </div>
  );
};

export default AdminHomePage