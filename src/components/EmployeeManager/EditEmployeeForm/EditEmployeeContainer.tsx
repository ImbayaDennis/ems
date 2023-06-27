import type{ Employee, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useContext, useState, useEffect, type FormEvent } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext';
import { api } from '../../../utils/api';
import EditEmployeePresentation from './EditEmployeePresentation'
import { toast } from "react-toastify";

type Props = {
  currentEmployee:
    | (Employee & {
        user: User | null;
      })
    | undefined;
  refetchEmployees: () => void
};

const EditEmployeeContainer = ({currentEmployee, refetchEmployees}: Props) => {
    const {
      mutateAsync: editEmployee,
      isLoading,
    } = api.employees.editEmployee.useMutation();
    const { data: session } = useSession();
    const { setModals } = useContext(ModalContextProvider);
    
    const [employeeID, setEmployeeID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeeEmploymentDate, setEmployeeEmploymentDate] = useState("");
    const [leaveDays, setLeaveDays] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(()=>{
      setEmployeeID(currentEmployee?.employee_id || "");
      setEmployeeName(currentEmployee?.name || "");
      setEmployeeEmail(currentEmployee?.email || "");
      setEmployeeEmploymentDate(currentEmployee?.employed_on || "");
      setLeaveDays(currentEmployee?.leave_days || 0);
    },[currentEmployee])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        employeeID &&
        employeeName &&
        employeeEmail &&
        employeeEmploymentDate &&
        session?.user?.org_id
      ) {
        editEmployee({
          employee_id: employeeID,
          name: employeeName,
          email: employeeEmail,
          employed_on: employeeEmploymentDate,
          leave_balance: leaveDays,
        })
          .then(() => {
            setModals
              ? setModals((prev) => ({
                  ...prev,
                  editEmployee: { isOpen: false },
                }))
              : null;
            setErrors([]);
            refetchEmployees()
            setEmployeeID("");
            setEmployeeName("");
            setEmployeeEmail("");
            setEmployeeEmploymentDate("");
            setLeaveDays(0);
            toast.success("Employee details edited successfully")
          })
          .catch((e) => {
            console.error(e);
            toast.error("Error editing employee details")
          });
      } else {
        setErrors(["Please provide all required detaials"]);
        const fields = {
          employeeID,
          employeeName,
          employeeEmail,
          org_id: session?.user?.org_id,
          employeeEmploymentDate,
          leaveDays,
        };
        console.log(fields);
        console.log(errors);
      }
    };

  return (
    <EditEmployeePresentation
      currentEmployeeImg={currentEmployee?.user?.image}
      handleSubmit={handleSubmit}
      employeeID={employeeID}
      setEmployeeID={setEmployeeID}
      employeeName={employeeName}
      setEmployeeName={setEmployeeName}
      employeeEmail={employeeEmail}
      setEmployeeEmail={setEmployeeEmail}
      employeeEmploymentDate={employeeEmploymentDate}
      setEmployeeEmploymentDate={setEmployeeEmploymentDate}
      leaveDays={leaveDays}
      setLeaveDays={setLeaveDays}
      editEmployeeLoading={isLoading}
      errors={errors}
    />
  );
}

export default EditEmployeeContainer