import {FormEvent, useContext, useState} from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext'
import { api } from '../../../utils/api'
import LeaveTypePresentation from './LeaveTypePresentation'
import { toast } from 'react-toastify'

const LeaveTypeContainer = () => {
    const{mutateAsync: createLeaveType, isLoading}=api.leaveManagement.createLeaveType.useMutation()
    const{setModals} = useContext(ModalContextProvider)

    const [leaveTypeName, setLeaveTypeName] = useState("")
    const [leaveTypeDesc, setLeaveTypeDesc] = useState("")
    const [leaveTypeDays, setLeaveTypeDays] = useState(0)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(leaveTypeName && leaveTypeDesc && leaveTypeDesc){
          createLeaveType({leave_type: leaveTypeName, leave_desc: leaveTypeDesc, leave_days: leaveTypeDays})
          .then(()=>{
            setModals
              ? setModals((prev) => ({
                  ...prev,
                  createLeaveType: { isOpen: false },
                }))
              : null;
              toast.success("Leave type created successfully")
          })
          .catch((e)=>{
            console.error(e)
            toast.error("Leave type not created");
          })
        }
    }
  return (
    <LeaveTypePresentation handleSubmit={handleSubmit} leaveTypeName={leaveTypeName} setLeaveTypeName={setLeaveTypeName} leaveTypeDesc={leaveTypeDesc} setLeaveTypeDesc={setLeaveTypeDesc} leaveTypeDays={leaveTypeDays} setLeaveTypeDays={setLeaveTypeDays} typesLoading={isLoading} />
  )
}

export default LeaveTypeContainer;