import {FormEvent, useContext, useState} from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext'
import { trpc } from '../../../utils/trpc'
import LeaveTypePresentation from './LeaveTypePresentation'

const LeaveTypeContainer = () => {
    const{mutateAsync: createLeaveType, isLoading}=trpc.leaveManagement.createLeaveType.useMutation()
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
          })
          .catch((e)=>{
            console.error(e)
          })
        }
    }
  return (
    <LeaveTypePresentation handleSubmit={handleSubmit} leaveTypeName={leaveTypeName} setLeaveTypeName={setLeaveTypeName} leaveTypeDesc={leaveTypeDesc} setLeaveTypeDesc={setLeaveTypeDesc} leaveTypeDays={leaveTypeDays} setLeaveTypeDays={setLeaveTypeDays} typesLoading={isLoading} />
  )
}

export default LeaveTypeContainer;