import { useSession } from 'next-auth/react';
import { type FormEvent, useState, useContext } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext';
import { trpc } from '../../../utils/trpc';
import LeaveRequestForm from './LeaveRequestForm'

type Props = {
    refetchLeaveRequests: () => void
}

const LeaveRequestFormContainer = ({refetchLeaveRequests}: Props) => {
      const { data: session } = useSession();

      const [startDate, setStartDate] = useState<string>("");
      const [endDate, setEndDate] = useState<string>("");
      const [leaveTypeId, setLeaveTypeId] = useState<string>("");

      const leaveRequest = trpc.leaveManagement.requestLeave.useMutation();
      const{data: leaveTypes} = trpc.leaveManagement.getLeaveTypes.useQuery();
      const {setModals} = useContext(ModalContextProvider)

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session?.user && startDate && endDate) {
          leaveRequest
            .mutateAsync({
              userId: session.user.id,
              leaveTypeId,
              startDate,
              endDate,
            })
            .then(() => refetchLeaveRequests())
            .catch(e=> console.error(e));
        }
        setLeaveTypeId("");
        setModals
          ? setModals((prev) => ({ ...prev, createLeaveRequest: { isOpen: false } }))
          : null;
      };
  return (
    <LeaveRequestForm handleSubmit={handleSubmit} setStartDate={setStartDate} setEndDate={setEndDate} setLeaveTypeId={setLeaveTypeId} leaveTypes={leaveTypes} />
  )
}

export default LeaveRequestFormContainer