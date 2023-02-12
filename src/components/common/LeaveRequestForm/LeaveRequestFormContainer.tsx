import { LeaveType } from '@prisma/client';
import moment from 'moment';
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

      
      const leaveRequest = trpc.leaveManagement.requestLeave.useMutation();
      const{data: leaveTypes} = trpc.leaveManagement.getLeaveTypes.useQuery();
      const {setModals} = useContext(ModalContextProvider)
      
      const [startDate, setStartDate] = useState<string>("");
      const [endDate, setEndDate] = useState<string>("");
      const [leaveType, setLeaveType] = useState<LeaveType | undefined>(leaveTypes?.at(0));

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        leaveType && setEndDate((moment().add(leaveType.leave_days, 'days').calendar().replaceAll("/", "-")))

        if (session?.user && startDate && endDate && leaveType) {
          leaveRequest
            .mutateAsync({
              leaveTypeId: leaveType.id,
              leaveDays: leaveType.leave_days,
              startDate,
              endDate,
            })
            .then(() => refetchLeaveRequests())
            .catch(e=> {
              console.error(e)
            });
        }else{
          console.error("Missing required details")
          console.log("start date: ", startDate)
          console.log("End date: ", endDate)
          console.log("Leave Type: ", leaveType)
        }
        if(!leaveRequest.isError){
          console.log("Success")
          setModals
            ? setModals((prev) => ({ ...prev, createLeaveRequest: { isOpen: false } }))
            : null;
        }
      };
  return (
    <LeaveRequestForm handleSubmit={handleSubmit} setStartDate={setStartDate} setEndDate={setEndDate} setLeaveType={setLeaveType} leaveType={leaveType} leaveTypes={leaveTypes || []} />
  )
}

export default LeaveRequestFormContainer