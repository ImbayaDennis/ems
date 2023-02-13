import { Listbox } from "@headlessui/react";
import { type LeaveType } from "@prisma/client";
import { type Dispatch, type SetStateAction, type FormEvent } from "react";
import ModalContainer from "../Modal/ModalContainer";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setLeaveType: Dispatch<SetStateAction<LeaveType | undefined>>;
  leaveTypes: LeaveType[];
  leaveType: LeaveType | undefined
};

const LeaveRequestForm = ({
  handleSubmit,
  setStartDate,
  setLeaveType,
  leaveTypes,
  leaveType
}: Props) => {
  return (
    <div>
      <ModalContainer modal="createLeaveRequest">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-4"
        >
          <label htmlFor="start-date" className="my-4 self-start">
            Start date
          </label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            onChange={(e) => setStartDate(e.currentTarget.value)}
            className="w-full rounded-sm bg-slate-200/70 p-2 text-slate-700 outline-none dark:bg-slate-500/40 dark:text-slate-50"
          />
          <label htmlFor="leave-types" className="my-4 self-start">
            Leave-types
          </label>
          <Listbox value={leaveType} onChange={setLeaveType}>
            <Listbox.Button className="w-full dark:bg-slate-700 bg-slate-300 p-2 rounded-sm">{leaveTypes.at(0)?.leave_type}</Listbox.Button>
            <Listbox.Options className="w-full">
              {leaveTypes.map((leave) => (
                <Listbox.Option
                  key={leave.id}
                  value={leave}
                  className="w-full p-2 my-1 rounded-sm text-center dark:bg-slate-600 bg-slate-200"
                >
                  {leave.leave_type}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <button type="submit" className="btn-1 m-4">
            Submit request
          </button>
        </form>
      </ModalContainer>
    </div>
  );
};

export default LeaveRequestForm;
