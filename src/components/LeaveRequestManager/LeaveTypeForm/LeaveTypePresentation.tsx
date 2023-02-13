import {FormEvent} from 'react'
import ModalContainer from '../../common/Modal/ModalContainer'

type Props = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const LeaveTypePresentation = ({handleSubmit}: Props) => {
  return (
    <ModalContainer modal="createLeaveType">
      <form onSubmit={handleSubmit}>
        <legend className="text-center text-2xl">Add a leave type</legend>
        <fieldset className="flex flex-col p-4">
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="name">
              Leave Type Name
            </label>
            <input className="input-1" name="name" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="desc">
              Leave Type Description
            </label>
            <input className="input-1" name="desc" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="days">
              Number of leave Days
            </label>
            <input className="input-1" name="days" type="number" />
          </div>
          <button className="btn-1 mt-4 self-center" type="submit">
            Add Leave Type
          </button>
        </fieldset>
      </form>
    </ModalContainer>
  );
}

export default LeaveTypePresentation