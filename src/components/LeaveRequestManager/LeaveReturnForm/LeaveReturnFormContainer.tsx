import { FormEvent, useState, useContext } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext'
import { trpc } from '../../../utils/trpc'
import LeaveReturnForm from './LeaveReturnForm'

type Props = {
  approvedLeaveId: string;
  refetchApprovedLeave: () => void;
};

const LeaveReturnFormContainer = ({approvedLeaveId, refetchApprovedLeave }: Props) => {
    const { mutateAsync: readmitEmployee, isLoading: approvedRequestsLoading } =
      trpc.leaveManagement.revertLeaveStatus.useMutation();

    const [returnDate, setReturnDate] =useState("")
    const {setModals} = useContext(ModalContextProvider)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(returnDate){
            readmitEmployee({approvedLeaveId, returnDate})
            .then(()=>{
                setModals
                  ? setModals((prev) => ({
                      ...prev,
                      returnFromLeave: { isOpen: false },
                    }))
                  : null;
                refetchApprovedLeave();
            })
        }
    }
  return (
    <LeaveReturnForm
      handleSubmit={handleSubmit}
      returnDate={returnDate}
      setReturnDate={setReturnDate}
      approvedRequestsLoading={approvedRequestsLoading}
    />
  );
}

export default LeaveReturnFormContainer