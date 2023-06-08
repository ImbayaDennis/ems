import { LeaveRequests, RequestApproved } from "@prisma/client";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

type Props = {
  openLeaveReqModal: () => void;
};

const QuickActionPanel = ({ openLeaveReqModal }: Props) => {
  return (
    <div className="my-4 h-fit w-full min-w-[24rem] max-w-2xl">
      <div className="h-fit w-full rounded-sm bg-slate-300/40 p-2 shadow-md backdrop-blur-md dark:bg-slate-500/40">
        <div className="w-full rounded-sm bg-slate-200/40 p-4 shadow-md dark:bg-slate-600/40">
          <div className="flex w-32 flex-wrap justify-center">
            <button
              onClick={openLeaveReqModal}
              aria-label="Request leave"
              className="btn-1 flex h-12 w-12 items-center justify-center self-center rounded-full bg-slate-400 shadow-md hover:text-orange-800 dark:bg-slate-700 hover:dark:text-orange-400"
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

export default QuickActionPanel;
