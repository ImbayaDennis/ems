import { LeaveRequests, RequestApproved } from "@prisma/client";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

type Props = {
  openLeaveReqModal: () => void;
  leaveRequest: LeaveRequests | null | undefined;
  leaveApproved: RequestApproved | null | undefined;
};

const DashboardRightPanel = ({
  openLeaveReqModal,
  leaveRequest,
  leaveApproved,
}: Props) => {
  return (
    <div className="h-full">
      <div className="h-full w-full rounded-sm bg-slate-300 p-2 shadow-md dark:bg-slate-600">
        <div className="w-full rounded-sm bg-slate-200 p-4 shadow-md dark:bg-slate-500">
          <div className="flex w-32 flex-wrap justify-center">
            <button
              onClick={openLeaveReqModal}
              className="btn-1 h-12 w-12 self-center rounded-full shadow-md hover:text-orange-100 hover:dark:text-orange-400"
              disabled={!!leaveRequest || !!leaveApproved}
            >
              <HiOutlineLogout />
            </button>
            <p className="p-2">Request leave</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRightPanel;
