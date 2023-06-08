import { Listbox } from "@headlessui/react";
import { Employee, User, type LeaveType } from "@prisma/client";
import { type Dispatch, type SetStateAction, type FormEvent } from "react";
import Loader from "../../common/Loader";
import ModalContainer from "../../common/Modal/ModalContainer";
import {
  dateYesterday,
} from "~/assets/constants";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  leaveType: LeaveType | undefined;
  setLeaveType: Dispatch<SetStateAction<LeaveType | undefined>>;
  calculateLeaveEndDate: () => void;
  leaveTypes: LeaveType[];
  isLoading: boolean;
  customLeaveType: string;
  setCustomLeaveType: Dispatch<SetStateAction<string>>;
  customLeaveDesc: string;
  setCustomLeaveDesc: Dispatch<SetStateAction<string>>;
  customLeaveDays: number;
  setCustomLeaveDays: Dispatch<SetStateAction<number>>;
  headOfficeApprovers:
    | (Employee & {
        user: User | null;
      })[]
    | undefined;
  headOfficeApprover:
    | (Employee & {
        user: User | null;
      })
    | undefined;
  setHeadOfficeApprover: Dispatch<
    SetStateAction<
      | (Employee & {
          user: User | null;
        })
      | undefined
    >
  >;
  workAssignments:
    | (Employee & {
        user: User | null;
      })[]
    | undefined;
  workAssignment:
    | (Employee & {
        user: User | null;
      })
    | undefined;
  setWorkAssignment: Dispatch<
    SetStateAction<
      | (Employee & {
          user: User | null;
        })
      | undefined
    >
  >;
  isCustom: boolean;
};

const LeaveRequestForm = ({
  handleSubmit,
  startDate,
  setStartDate,
  leaveType,
  setLeaveType,
  calculateLeaveEndDate,
  leaveTypes,
  isLoading,
  customLeaveType,
  setCustomLeaveType,
  customLeaveDesc,
  setCustomLeaveDesc,
  customLeaveDays,
  setCustomLeaveDays,
  headOfficeApprovers,
  headOfficeApprover,
  setHeadOfficeApprover,
  workAssignments,
  workAssignment,
  setWorkAssignment,
  isCustom,
}: Props) => {
  return (
    <div>
      <ModalContainer modal="createLeaveRequest">
        <form onSubmit={handleSubmit} className="transition-all">
          <legend className="text-center text-2xl">Request Leave</legend>
          <fieldset className="flex flex-col items-center p-4">
            <div className="w-full py-2">
              <label htmlFor="start-date" className="my-4 self-start">
                Start date
              </label>
              <input
                type="date"
                name="start-date"
                id="start-date"
                min={dateYesterday}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.currentTarget.value);
                  calculateLeaveEndDate();
                }}
                className="z-10 my-1 w-full cursor-pointer rounded-sm bg-slate-300 p-2 text-center backdrop-blur-md dark:bg-slate-700"
              />
            </div>
            <div className="relative w-full py-2">
              <label htmlFor="head-office-approver">Select Manager</label>
              <Listbox
                value={headOfficeApprover}
                onChange={setHeadOfficeApprover}
                name="head-office-approver"
              >
                <Listbox.Button className="z-10 w-full rounded-sm bg-slate-300 p-2 dark:bg-slate-700">
                  {headOfficeApprover?.name}
                </Listbox.Button>
                <Listbox.Options className="z-20 max-h-[10rem] w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
                  {headOfficeApprovers?.map((manager) => (
                    <Listbox.Option
                      key={manager.id}
                      value={manager}
                      className="z-30 my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
                    >
                      {manager.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="relative w-full py-2">
              <label htmlFor="work-assignment">Select Work Handover</label>
              <Listbox
                value={workAssignment}
                onChange={setWorkAssignment}
                name="work-assignment"
              >
                <Listbox.Button className="z-10 w-full rounded-sm bg-slate-300 p-2 dark:bg-slate-700">
                  {/* {workAssignment?.name} */}
                  <span className="block truncate">{workAssignment?.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
                </Listbox.Button>
                <div className="h-fit w-full">
                  <Listbox.Options className="z-10 max-h-[10rem] w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
                    {workAssignments?.map((employee) => (
                      <Listbox.Option
                        key={employee.id}
                        value={employee}
                        className="z-10 my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
                      >
                        {employee.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div className="relative w-full py-2">
              <label htmlFor="leave-types" className="my-4 self-start">
                Type of leave
              </label>
              <Listbox
                value={leaveType}
                onChange={(e) => {
                  setLeaveType(e);
                  calculateLeaveEndDate();
                }}
                name="leave-types"
              >
                <Listbox.Button className="w-full rounded-sm bg-slate-300 p-2 dark:bg-slate-700">
                  {leaveType?.leave_type}
                </Listbox.Button>
                <Listbox.Options className="z-10 max-h-[10rem] w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
                  {leaveTypes.map((leave) => (
                    <Listbox.Option
                      key={leave.id}
                      value={leave}
                      className="z-10 my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
                    >
                      {leave.leave_type}
                    </Listbox.Option>
                  ))}
                  <Listbox.Option
                    value={
                      {
                        leave_type: customLeaveType,
                        leave_desc: customLeaveDesc,
                        leave_days: customLeaveDays,
                      } as LeaveType
                    }
                    className="z-10 my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
                  >
                    Custom
                  </Listbox.Option>
                </Listbox.Options>
              </Listbox>
            </div>
            {isCustom ? (
              <fieldset className="w-full transition-transform">
                <div className="my-2 w-full">
                  <label className="my-4 self-start" htmlFor="custom-type">
                    Custom type
                  </label>
                  <input
                    name="custom-type"
                    className="input-1 w-full"
                    type="text"
                    value={customLeaveType}
                    onChange={(e) => {
                      setCustomLeaveType(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="my-2 w-full">
                  <label className="my-4 self-start" htmlFor="custom-desc">
                    Custom Description
                  </label>
                  <input
                    name="custom-desc"
                    className="input-1 w-full"
                    type="text"
                    value={customLeaveDesc}
                    onChange={(e) => {
                      setCustomLeaveDesc(e.currentTarget.value);
                    }}
                  />
                </div>
                <div className="my-2 w-full">
                  <label className="my-4 self-start" htmlFor="custom-days">
                    Custom Days
                  </label>
                  <input
                    name="custom-days"
                    className="input-1 w-full"
                    type="number"
                    value={customLeaveDays}
                    onChange={(e) => {
                      setCustomLeaveDays(parseInt(e.currentTarget.value) || 0);
                    }}
                  />
                </div>
              </fieldset>
            ) : null}
            <button type="submit" className="btn-1 m-4">
              {isLoading ? <Loader /> : "Submit request"}
            </button>
          </fieldset>
        </form>
      </ModalContainer>
    </div>
  );
};

export default LeaveRequestForm;
