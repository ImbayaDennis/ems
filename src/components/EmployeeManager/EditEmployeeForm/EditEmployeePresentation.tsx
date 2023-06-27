import type { Dispatch, FormEvent, SetStateAction } from 'react'
import Image from 'next/image'
import Loader from '../../common/Loader';
import ModalContainer from '../../common/Modal/ModalContainer'
import placeholderImg from '~/assets/images/blank-profile-picture.jpg'

type Props = {
  currentEmployeeImg: string | null | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  employeeID: string;
  setEmployeeID: Dispatch<SetStateAction<string>>;
  employeeName: string;
  setEmployeeName: Dispatch<SetStateAction<string>>;
  employeeEmail: string;
  setEmployeeEmail: Dispatch<SetStateAction<string>>;
  employeeEmploymentDate: string;
  setEmployeeEmploymentDate: Dispatch<SetStateAction<string>>;
  leaveDays: number;
  setLeaveDays: Dispatch<SetStateAction<number>>;
  editEmployeeLoading: boolean;
  errors: string[];
};

const EditEmployeePresentation = ({
  currentEmployeeImg,
  handleSubmit,
  employeeID,
  setEmployeeID,
  employeeName,
  setEmployeeName,
  employeeEmail,
  setEmployeeEmail,
  employeeEmploymentDate,
  setEmployeeEmploymentDate,
  leaveDays,
  setLeaveDays,
  editEmployeeLoading,
}: Props) => {
  return (
    <ModalContainer modal="editEmployee">
      <form onSubmit={handleSubmit} className="flex w-full flex-col">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-300 self-center">
          <Image
            src={currentEmployeeImg || placeholderImg}
            alt="employee-img"
            width={64}
            height={64}
          />
        </div>
        <legend className="text-center text-2xl">
          Edit {`${employeeName}`}
        </legend>
        <div className="flex w-full">
          <fieldset className="flex w-full flex-col p-4">
            <div className="flex flex-col py-2">
              <label className="my-2 whitespace-nowrap" htmlFor="employee_id">
                Employee ID
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="my-2 whitespace-nowrap" htmlFor="name">
                Name
              </label>
              <input
                required
                className="input-1"
                value={employeeName}
                onChange={(e) => {
                  setEmployeeName(e.currentTarget.value);
                }}
                name="name"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="my-2 whitespace-nowrap" htmlFor="email">
                Email
              </label>
              <input
                required
                className="input-1"
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.currentTarget.value);
                }}
                name="email"
                type="email"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="my-2 whitespace-nowrap" htmlFor="employed_on">
                Date of employment
              </label>
              <input
                className="input-1"
                value={employeeEmploymentDate}
                onChange={(e) => {
                  setEmployeeEmploymentDate(e.currentTarget.value);
                }}
                name="employed_on"
                type="date"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="my-2 whitespace-nowrap" htmlFor="employed_on">
                LeaveDays
              </label>
              <input
                className="input-1"
                value={leaveDays}
                onChange={(e) => {
                  setLeaveDays(parseInt(e.currentTarget.value) || 0);
                }}
                name="employed_on"
                type="number"
              />
            </div>
          </fieldset>
          <fieldset className="flex w-full flex-col p-4">
            <div className="flex flex-col py-2">
              <label htmlFor="nhif-no" className="my-2 whitespace-nowrap">
                NHIF Number
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="nhif-no" className="my-2 whitespace-nowrap">
                NHIF Number
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="nhif-no" className="my-2 whitespace-nowrap">
                NHIF Number
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="nhif-no" className="my-2 whitespace-nowrap">
                NHIF Number
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="nhif-no" className="my-2 whitespace-nowrap">
                NHIF Number
              </label>
              <input
                required
                className="input-1"
                value={employeeID}
                onChange={(e) => {
                  setEmployeeID(e.currentTarget.value);
                }}
                name="employee_id"
                type="text"
              />
            </div>
          </fieldset>
        </div>
        <button
          className="btn-1 mt-4 self-center"
          disabled={editEmployeeLoading}
          type="submit"
        >
          {editEmployeeLoading ? <Loader /> : "Save employee"}
        </button>
      </form>
    </ModalContainer>
  );
}

export default EditEmployeePresentation