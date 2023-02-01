import { type LeaveType } from "@prisma/client";
import { type Dispatch, type SetStateAction, type FormEvent } from "react";
import ModalContainer from "../Modal/ModalContainer";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setLeaveTypeId: Dispatch<SetStateAction<string>>;
  leaveTypes: LeaveType[] | undefined;
};

const LeaveRequestForm = ({
  handleSubmit,
  setStartDate,
  setEndDate,
  setLeaveTypeId,
  leaveTypes,
}: Props) => {
  return (
    <div>
      <ModalContainer modal="createLeaveRequest">
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
          <label htmlFor="start-date" className="self-start my-4">Start date</label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            onChange={(e) => setStartDate(e.currentTarget.value)}
            className="rounded-sm bg-slate-200/70 p-2 text-slate-700 outline-none dark:bg-slate-500/40 dark:text-slate-50 w-full"
          />
          <label htmlFor="end-date" className="self-start my-4">End date</label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            onChange={(e) => setEndDate(e.currentTarget.value)}
            className="rounded-sm bg-slate-200/70 p-2 text-slate-700 outline-none dark:bg-slate-500/40 dark:text-slate-50 w-full"
          />
          <label htmlFor="leave-types" className="self-start my-4">Leave-types</label>
          <select
            name="leave-types"
            id="leave-types"
            onChange={(e) => {
              const current = leaveTypes?.filter(
                (x) => x.leave_type !== e.currentTarget.value
              )[0]?.id;
              leaveTypes
                ? setLeaveTypeId(current ? current : "")
                : null;
            }}
            className="rounded-sm bg-slate-200/70 p-2 text-slate-700 outline-none dark:bg-slate-500/40 dark:text-slate-50 w-full"
          >
            {leaveTypes?.map((leaveType) => (
              <option
                key={leaveType.id}
                value={leaveType.leave_type || undefined}
                id={leaveType.id}
                className="rounded-sm bg-slate-50/70 p-2 text-slate-700 outline-none dark:bg-slate-500/40"
              >{leaveType.leave_type}</option>
            ))}
          </select>
          <button type="submit" className="btn-1 m-4">Submit request</button>
        </form>
      </ModalContainer>
    </div>
  );
};

export default LeaveRequestForm;
