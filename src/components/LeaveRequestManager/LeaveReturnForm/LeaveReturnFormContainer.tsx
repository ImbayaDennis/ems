import { FormEvent, useState, useContext } from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext'
import { api } from '../../../utils/api'
import LeaveReturnForm from './LeaveReturnForm'
import { toast } from 'react-toastify'

type Props = {
  approvedLeaveId: string;
  refetchApprovedLeave: () => void;
};

const LeaveReturnFormContainer = ({approvedLeaveId, refetchApprovedLeave }: Props) => {
    const { mutateAsync: readmitEmployee, isLoading: approvedRequestsLoading } =
      api.leaveManagement.revertLeaveStatus.useMutation();

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
                toast.success("Employee return date recorded")
            })
            .catch((e)=>{
              console.error(e)
              toast.error("Employee return date not recorded");
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