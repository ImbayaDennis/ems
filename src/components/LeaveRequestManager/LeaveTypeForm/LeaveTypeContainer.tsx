import {FormEvent} from 'react'
import LeaveTypePresentation from './LeaveTypePresentation'

const LeaveTypeContainer = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
  return (
    <LeaveTypePresentation handleSubmit={handleSubmit} />
  )
}

export default LeaveTypeContainer;