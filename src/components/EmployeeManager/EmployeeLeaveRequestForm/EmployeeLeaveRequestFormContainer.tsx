import { Employee, LeaveType, User } from "@prisma/client";
import moment from "moment";
import { useSession } from "next-auth/react";
import {
  type FormEvent,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { api } from "../../../utils/api";
import EmployeeLeaveRequestForm from "./EmployeeLeaveRequestForm";
import { toast } from "react-toastify";

type Props = {
  employeeId: string | null | undefined;

  refetchLeaveRequests: () => void;
};

const EmployeeLeaveRequestFormContainer = ({
  refetchLeaveRequests,
  employeeId,
}: Props) => {
  const { data: session } = useSession();

  const leaveRequest = api.leaveManagement.requestEmployeeLeave.useMutation();
  const { data: leaveTypes } = api.leaveManagement.getLeaveTypes.useQuery();
  const { data: employees } = api.employees.getEmployees.useQuery();
  const { setModals } = useContext(ModalContextProvider);

  const admins = employees?.filter((admin) => admin.user?.role === "admin");
  const managers = employees?.filter(
    (manager) => manager.user?.role === "manager"
  );

  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now()).toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState<string>("");
  const [leaveType, setLeaveType] = useState<LeaveType | undefined>();

  const [customLeaveType, setCustomLeaveType] = useState("Custom");
  const [customLeaveDesc, setCustomLeaveDesc] = useState("");
  const [customLeaveDays, setCustomLeaveDays] = useState(0);
  const [isCustom, setIsCustom] = useState(false);

  const [headOfficeApprover, setHeadOfficeApprover] = useState<
    Employee & {
      user: User | null;
    }
  >();
  const [workAssignment, setWorkAssignment] = useState<
    Employee & {
      user: User | null;
    }
  >();

  const calculateLeaveEndDate = () => {
    if (!isCustom) {
      leaveType &&
        setEndDate(
          moment(startDate)
            .add(leaveType.leave_days, "days")
            .format("YYYY-MM-DD")
        );
    } else {
      leaveType &&
        setEndDate(
          moment(startDate).add(customLeaveDays, "days").format("YYYY-MM-DD")
        );
    }
  };

  const callback = useCallback(calculateLeaveEndDate, [
    startDate,
    leaveType?.leave_days,
    customLeaveDays,
  ]);

  useEffect(() => {
    if (!leaveType) {
      setLeaveType(leaveTypes?.at(0));
    }
    setIsCustom(leaveType?.leave_type === "Custom");
    setHeadOfficeApprover(managers?.at(0));
    setWorkAssignment(employees?.at(0));
    calculateLeaveEndDate();
  }, [leaveTypes, callback]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateLeaveEndDate();
    if (
      isCustom &&
      session?.user &&
      startDate &&
      endDate &&
      leaveType &&
      employeeId
    ) {
      leaveRequest
        .mutateAsync({
          employee_id: employeeId,
          leaveDays: customLeaveDays,
          startDate,
          endDate,
          head_office_approver_id: headOfficeApprover?.id,
          work_assign_id: workAssignment?.id,
          customLeaveType,
          customLeaveDesc,
        })
        .then(() => {
          setModals
            ? setModals((prev) => ({
                ...prev,
                createLeaveRequest: { isOpen: false },
              }))
            : null;
          refetchLeaveRequests();
          toast.success("Employee leave requested successfully");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Error requesting employee leave");
        });
    } else if (
      session?.user &&
      startDate &&
      endDate &&
      leaveType &&
      employeeId
    ) {
      leaveRequest
        .mutateAsync({
          employee_id: employeeId,
          leaveTypeId: leaveType.id,
          leaveDays: leaveType.leave_days,
          head_office_approver_id: headOfficeApprover?.id,
          work_assign_id: workAssignment?.id,
          startDate,
          endDate,
        })
        .then(() => {
          setModals
            ? setModals((prev) => ({
                ...prev,
                createEmployeeLeaveRequest: { isOpen: false },
              }))
            : null;
          refetchLeaveRequests();
          toast.success("Employee leave requested successfully");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Error requesting employee leave");
        });
    } else {
      console.error("Missing required details");
      console.log("start date: ", startDate);
      console.log("End date: ", endDate);
      console.log("Leave Type: ", leaveType);
    }
  };
  return (
    <EmployeeLeaveRequestForm
      handleSubmit={handleSubmit}
      startDate={startDate}
      setStartDate={setStartDate}
      setLeaveType={setLeaveType}
      leaveType={leaveType}
      calculateLeaveEndDate={calculateLeaveEndDate}
      leaveTypes={leaveTypes || []}
      isLoading={leaveRequest.isLoading}
      customLeaveType={customLeaveType}
      setCustomLeaveType={setCustomLeaveType}
      customLeaveDesc={customLeaveDesc}
      setCustomLeaveDesc={setCustomLeaveDesc}
      customLeaveDays={customLeaveDays}
      setCustomLeaveDays={setCustomLeaveDays}
      headOfficeApprovers={admins}
      headOfficeApprover={headOfficeApprover}
      setHeadOfficeApprover={setHeadOfficeApprover}
      workAssignments={employees}
      workAssignment={workAssignment}
      setWorkAssignment={setWorkAssignment}
      isCustom={isCustom}
    />
  );
};

export default EmployeeLeaveRequestFormContainer;
