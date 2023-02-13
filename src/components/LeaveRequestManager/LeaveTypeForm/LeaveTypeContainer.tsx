import {FormEvent} from 'react'
import LeaveTypePresentation from './LeaveTypePresentation'

type Props = {}

const LeaveTypeContainer = (props: Props) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
  return (
    <LeaveTypePresentation handleSubmit={handleSubmit} />
  )
}

export default LeaveTypeContainer;