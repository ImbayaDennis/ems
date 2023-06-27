import type { Employee, LeaveType, User } from "@prisma/client";
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
import LeaveRequestForm from "./LeaveRequestForm";
import { toast } from "react-toastify";

type Props = {
  refetchLeaveRequests: () => void;
};

const LeaveRequestFormContainer = ({ refetchLeaveRequests }: Props) => {
  const { data: session } = useSession();

  const leaveRequest = api.leaveManagement.requestLeave.useMutation();
  const { data: leaveTypes } = api.leaveManagement.getLeaveTypes.useQuery();
  const { data: employees } = api.employees.getEmployees.useQuery();
  const { setModals } = useContext(ModalContextProvider);

  const admins = employees?.filter((admin) => admin.user?.role === "admin");

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

  const calculateLeaveEndDate = useCallback(() => {
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
  },[customLeaveDays, isCustom, leaveType, startDate]);

  const callback = useCallback(calculateLeaveEndDate, [calculateLeaveEndDate]);

  useEffect(() => {
    if (!leaveType) {
      setLeaveType(leaveTypes?.at(0));
    }
    setIsCustom(leaveType?.leave_type === "Custom");
    setHeadOfficeApprover(admins?.at(0));
    setWorkAssignment(employees?.at(0));
    calculateLeaveEndDate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveTypes, callback]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateLeaveEndDate();
    if (isCustom) {
      leaveRequest
        .mutateAsync({
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
          toast.success("Leave request sent successfully");
        })
        .catch((e) => {
          console.error(e);
          toast.error("An error occured while sending leave request");
        });
    } else if (session?.user && startDate && endDate && leaveType) {
      leaveRequest
        .mutateAsync({
          leaveTypeId: leaveType.id,
          leaveDays: leaveType.leave_days,
          startDate,
          endDate,
          head_office_approver_id: headOfficeApprover?.employee_id,
          work_assign_id: workAssignment?.employee_id,
        })
        .then(() => {
          setModals
            ? setModals((prev) => ({
                ...prev,
                createLeaveRequest: { isOpen: false },
              }))
            : null;
          refetchLeaveRequests();
          toast.success("Leave request sent successfully");
        })
        .catch((e) => {
          console.error(e);
          toast.error("An error occured while sending leave request");
        });
    } else {
      console.error("Missing required details");
      console.log("start date: ", startDate);
      console.log("End date: ", endDate);
      console.log("Leave Type: ", leaveType);
    }
  };
  return (
    <LeaveRequestForm
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
      workAssignments={employees}
      workAssignment={workAssignment}
      setWorkAssignment={setWorkAssignment}
      headOfficeApprover={headOfficeApprover}
      setHeadOfficeApprover={setHeadOfficeApprover}
      isCustom={isCustom}
    />
  );
};

export default LeaveRequestFormContainer;
