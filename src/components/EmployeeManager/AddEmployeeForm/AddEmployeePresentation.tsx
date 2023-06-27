import type { FormEvent, Dispatch, SetStateAction } from "react";
import Loader from "../../common/Loader";
import ModalContainer from "../../common/Modal/ModalContainer";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  employeeID: string;
  setEmployeeID: Dispatch<SetStateAction<string>>;
  employeeName: string;
  setEmployeeName: Dispatch<SetStateAction<string>>;
  employeeEmail: string;
  setEmployeeEmail: Dispatch<SetStateAction<string>>;
  employeeEmploymentDate: string;
  setEmployeeEmploymentDate: Dispatch<SetStateAction<string>>;
  addEmployeeLoading: boolean;
  errors: string[];
};

const AddEmployeePresentation = ({
  handleSubmit,
  employeeID,
  setEmployeeID,
  employeeName,
  setEmployeeName,
  employeeEmail,
  setEmployeeEmail,
  employeeEmploymentDate,
  setEmployeeEmploymentDate,
  addEmployeeLoading,
}: Props) => {
  return (
    <ModalContainer modal="createEmployee">
      <form onSubmit={handleSubmit}>
        <legend className="text-center text-2xl">Add Employee</legend>
        <fieldset className="flex flex-col p-4">
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
              required
              className="input-1"
              value={employeeEmploymentDate}
              onChange={(e) => {
                setEmployeeEmploymentDate(e.currentTarget.value);
              }}
              name="employed_on"
              type="date"
            />
          </div>
          <button
            className="btn-1 mt-4 self-center"
            disabled={addEmployeeLoading}
            type="submit"
          >
            {addEmployeeLoading ? <Loader /> : "Add employee"}
          </button>
        </fieldset>
      </form>
    </ModalContainer>
  );
};

export default AddEmployeePresentation;
