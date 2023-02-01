import { LeaveRequests } from '@prisma/client';
import React from 'react'

type Props = {
    openLeaveReqModal: ()=>void;
    leaveRequestData: LeaveRequests | null | undefined;
}

const DashboardRightPanel = ({openLeaveReqModal, leaveRequestData}: Props) => {
  return (
    <div className="m-2 h-full max-h-[calc(100vh-21rem)] min-w-[24rem] max-w-2xl w-full py-2 md:w-1/2">
      <div className="h-full w-full rounded-md bg-slate-300 p-2 shadow-md dark:bg-slate-600">
        <div className="w-full rounded-md bg-slate-200 p-4 shadow-md dark:bg-slate-500">
          <button
            onClick={openLeaveReqModal}
            className="btn-1 w-1/3 self-center"
            disabled={!!leaveRequestData ? true : false}
          >
            Request Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardRightPanel