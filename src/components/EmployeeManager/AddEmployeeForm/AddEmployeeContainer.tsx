import moment from "moment";
import { useSession } from "next-auth/react";
import { FormEvent, useState, useContext } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { trpc } from "../../../utils/trpc";
import AddEmployeePresentation from "./AddEmployeePresentation";

type AddEmployeeProps = {
  refetchEmployees: () => void
}
const AddEmployeeContainer = ({refetchEmployees}:AddEmployeeProps) => {
  const { mutateAsync: addEmployee, isLoading, isSuccess } =
    trpc.employees.addEmployee.useMutation();
  const { data: session } = useSession();
  const { setModals } = useContext(ModalContextProvider);

  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeEmploymentDate, setEmployeeEmploymentDate] = useState("");
  const [leaveDays, setLeaveDays] = useState(0);
  const [errors, setErrors] = useState<string[]>([])

  const calculateLeaveDays = () => {
    const employedFor = moment().diff(employeeEmploymentDate, "years")
    if (employedFor > 0) {
      setLeaveDays(30);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateLeaveDays();
    if (
      employeeID &&
      employeeName &&
      employeeEmail &&
      employeeEmploymentDate &&
      session?.user?.org_id
    ) {
      addEmployee({
        employee_id: employeeID,
        name: employeeName,
        email: employeeEmail,
        employed_on: employeeEmploymentDate,
        leave_days: leaveDays,
        leave_balance: leaveDays,
      }).then(()=>{
        setModals
          ? setModals((prev) => ({
              ...prev,
              createEmployee: { isOpen: false },
            }))
          : null;
        refetchEmployees();
        setErrors([])

        setEmployeeID("")
        setEmployeeName("")
        setEmployeeEmail("")
        setEmployeeEmploymentDate("")
        setLeaveDays(0)
        
      }).catch((e)=>{
        console.error(e)
      });
    }else{
      setErrors(["Please provide all required detaials"])
      const fields = {
        employeeID,
        employeeName,
        employeeEmail,
        org_id: session?.user?.org_id,
        employeeEmploymentDate,
        leaveDays,
      };
      console.log(fields)
      console.log(errors);
    }
  };
  return (
    <AddEmployeePresentation
      handleSubmit={handleSubmit}
      employeeID={employeeID}
      setEmployeeID={setEmployeeID}
      employeeName={employeeName}
      setEmployeeName={setEmployeeName}
      employeeEmail={employeeEmail}
      setEmployeeEmail={setEmployeeEmail}
      employeeEmploymentDate={employeeEmploymentDate}
      setEmployeeEmploymentDate={setEmployeeEmploymentDate}
      addEmployeeLoading={isLoading}
      errors={errors}
    />
  );
};

export default AddEmployeeContainer;
