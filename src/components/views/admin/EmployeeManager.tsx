import Image, { type StaticImageData } from 'next/image'
import { useContext } from "react";
import { HiX } from "react-icons/hi";
import img from "../../../assets/images/blank-profile-picture.jpg";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { trpc } from "../../../utils/trpc";
import Loader from "../../common/Loader";
import AddEmployeeContainer from "../../EmployeeManager/AddEmployeeForm/AddEmployeeContainer";

const EmployeeManager = () => {
  const {
    data: employees,
    refetch,
    isLoading,
  } = trpc.employees.getEmployees.useQuery();
  const { data: employeesOnLeave } =
    trpc.leaveManagement.getEmployeesOnLeave.useQuery();
  const modalContext = useContext(ModalContextProvider);

  const openAddEmployeeModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createEmployee: { isOpen: true },
      }));
    }
  };

  if (isLoading) {
    return (
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 w-full text-2xl">Employee Manager</p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Loader />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <div className="flex w-full">
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 text-2xl">Employee Manager</p>
            </td>
          </tr>
          <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
            <td className="p-2">
              <div className="h-8 w-8"></div>
            </td>
            <td className="w-36 p-2">Employee ID</td>
            <td className="w-36 p-2">Empoyee name</td>
            <td className="w-36 p-2">Email address</td>
            <td className="w-36 p-2">Role</td>
            <td className="w-36 p-2">On leave</td>
            <td className="w-36 p-2">
              <p className="text-center">Remove</p>
            </td>
          </tr>
        </thead>
        <tbody className="overflow-x-scroll">
          {employees?.map((employee) => (
            <ListItem
              key={employee.id}
              employee_id={employee.employee_id || ""}
              refetch={() => {
                refetch().catch((e) => console.error(e));
              }}
              image={employee.user?.image || img}
              column1={employee.employee_id}
              column2={employee.name}
              column3={employee.email}
              column4={employee.user?.role}
              column5={
                employeesOnLeave?.filter(
                  (x) => x.employee_id === employee.employee_id
                )[0]
                  ? "On leave"
                  : "Active"
              }
            />
          ))}
        </tbody>
      </table>
      <AddEmployeeContainer
        refetchEmployees={() => {
          refetch().catch((e) => {
            console.error(e);
          });
        }}
      />
      <button
        onClick={openAddEmployeeModal}
        className="btn-1 fixed bottom-8 left-1/2 w-1/3 -translate-x-1/2"
      >
        Add Employee
      </button>
    </div>
  );
};

export default EmployeeManager;

type ListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
  employee_id: string;
  refetch: () => void;
};

const ListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "employee",
  column5 = "column5",
  employee_id,
  refetch,
}: ListItemProps) => {
  const removeEmployee = trpc.employees.removeEmployee.useMutation();
  return (
    <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
          <Image src={image} width={48} height={48} alt="profile-img" />
        </div>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column1}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column2}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column3}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column4}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column5}</p>
      </td>
      <td className="flex w-36 justify-center p-2">
        <div className="flex">
          <button
            onClick={() => {
              removeEmployee
                .mutateAsync({
                  employeeId: employee_id,
                })
                .then(() => refetch())
                .catch((e) => console.error(e));
            }}
            className="btn-1 flex h-8 w-10 items-center justify-center"
          >
            {removeEmployee.isLoading ? <Loader /> : <HiX />}
          </button>
        </div>
      </td>
    </tr>
  );
};