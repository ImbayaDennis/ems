import { LeaveType } from '@prisma/client';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { type FormEvent, useState, useContext, useEffect } from 'react'
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
      const [leaveType, setLeaveType] = useState<LeaveType | undefined>();

      useEffect(()=>{
        setLeaveType(leaveTypes?.at(0))
      },[leaveTypes])

      const calculateLeaveEndDate = () => {
        leaveType &&
          setEndDate(
            moment()
              .add(leaveType.leave_days, "days")
              .calendar({sameElse: "YYYY-MM-DD"})
          );
      }

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        calculateLeaveEndDate();
        if (session?.user && startDate && endDate && leaveType) {
          leaveRequest
            .mutateAsync({
              leaveTypeId: leaveType.id,
              leaveDays: leaveType.leave_days,
              startDate,
              endDate,
            })
            .then(() => {
              setModals
                ? setModals((prev) => ({
                    ...prev,
                    createLeaveRequest: { isOpen: false },
                  }))
                : null;
              refetchLeaveRequests()
            })
            .catch(e=> {
              console.error(e)
            });
        }else{
          console.error("Missing required details")
          console.log("start date: ", startDate)
          console.log("End date: ", endDate)
          console.log("Leave Type: ", leaveType)
        }
      };
  return (
    <LeaveRequestForm handleSubmit={handleSubmit} startDate={startDate} setStartDate={setStartDate} setLeaveType={setLeaveType} leaveType={leaveType} calculateLeaveEndDate={calculateLeaveEndDate} leaveTypes={leaveTypes || []} isLoading={leaveRequest.isLoading} />
  )
}

export default LeaveRequestFormContainer