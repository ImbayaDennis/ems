import { useSession } from 'next-auth/react';
import { useContext, type FormEvent, useState, type Dispatch, type SetStateAction } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext';
import { trpc } from '../../../utils/trpc';
import LeaveRequestFormContainer from '../../common/LeaveRequestForm/LeaveRequestFormContainer';
import ListItemCard from '../../common/ListItemCard';
import MetricsCard from "../../common/MetricsCard";


const AdminHomePage = () => {
  const{data:session} = useSession();

  const {data: employees} = trpc.employees.getEmployees.useQuery()
  const {data: employeesOnLeave} = trpc.leaveManagement.getEmployeesOnLeave.useQuery()
  const {data: leaveRequestData, refetch} = trpc.leaveManagement.getLeaveRequests.useQuery()
  const {data: leaveRequest} = trpc.leaveManagement.getLeaveRequest.useQuery()
  const modalContext = useContext(ModalContextProvider);


  const openLeaveReqModal = () =>{
    if(modalContext.setModals){
      modalContext.setModals((prev)=>({...prev, createLeaveRequest: {isOpen: true}}))
    }
  }


  return (
    <div className="h-full w-full">
      <h1 className="my-8 text-center text-2xl sm:text-start">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-col flex-wrap sm:flex-row">
        <div className="flex h-full max-h-[calc(100vh-21rem)] w-full flex-col items-start sm:w-1/2">
          <MetricsCard
            metric_one={employees?.length}
            metric_one_label="Total Employees"
            metric_two={employeesOnLeave?.length}
            metric_two_label="Employees on leave"
            metric_three_label="Active Employees"
          />
          <ListItemCard
            title="Leave Requests"
            btn_lbl="See all requests"
            listData={leaveRequestData}
          />
          <LeaveRequestFormContainer refetchLeaveRequests={()=>{refetch().catch(e=>console.error(e))}} />
        </div>
        <div className="m-2 h-full max-h-[calc(100vh-21rem)] max-w-2xl py-2 sm:w-1/2">
          <div className="h-full w-full rounded-md bg-slate-300 p-2 shadow-md dark:bg-slate-600">
            <div className="w-full rounded-md bg-slate-200 p-4 shadow-md dark:bg-slate-500">
              <button
                onClick={openLeaveReqModal}
                className="btn-1 w-1/3 self-center"
                disabled={!!leaveRequest}
              >
                Request Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage