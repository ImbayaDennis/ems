/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Listbox, Transition } from "@headlessui/react";
import type { Employee, User, LeaveType } from "@prisma/client";
import { type Dispatch, type SetStateAction, type FormEvent } from "react";
import Loader from "../../common/Loader";
import ModalContainer from "../../common/Modal/ModalContainer";
import { dateYesterday } from "~/assets/constants";

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
                className="my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
              />
            </div>

            <div className="relative w-full py-2">
              <label htmlFor="head-office-approver">
                Select head office approver
              </label>
              <Listbox
                value={headOfficeApprover}
                onChange={setHeadOfficeApprover}
                name="head-office-approver"
              >
                <Listbox.Button className="z-10 w-full rounded-sm bg-slate-300 p-2 dark:bg-slate-700">
                  {headOfficeApprover?.name}
                </Listbox.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="max-h-48 w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
                    {headOfficeApprovers?.map((admin) => (
                      <Listbox.Option
                        key={admin.id}
                        value={admin}
                        className="z-10 my-1 w-full cursor-pointer rounded-sm bg-slate-200 p-2 text-center backdrop-blur-md dark:bg-slate-600"
                      >
                        {admin.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
            <div className="relative w-full py-2">
              <label htmlFor="work-assignment">Select work assignment</label>
              <Listbox
                value={workAssignment}
                onChange={setWorkAssignment}
                name="work-assignment"
              >
                <Listbox.Button className="z-10 w-full rounded-sm bg-slate-300 p-2 dark:bg-slate-700">
                  {workAssignment?.name}
                </Listbox.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="max-h-48 w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
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
                </Transition>
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
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="max-h-48 w-full overflow-y-scroll backdrop-blur-md scrollbar-thin">
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
                </Transition>
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
