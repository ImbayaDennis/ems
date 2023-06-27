import type {Dispatch, FormEvent, SetStateAction} from 'react'
import Loader from '../../common/Loader';
import ModalContainer from '../../common/Modal/ModalContainer'

type Props = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    leaveTypeName: string;
    setLeaveTypeName: Dispatch<SetStateAction<string>>;
    leaveTypeDesc: string;
    setLeaveTypeDesc: Dispatch<SetStateAction<string>>;
    leaveTypeDays: number;
    setLeaveTypeDays: Dispatch<SetStateAction<number>>;
    typesLoading: boolean;
}

const LeaveTypePresentation = ({handleSubmit, leaveTypeName, setLeaveTypeName, leaveTypeDesc, setLeaveTypeDesc, leaveTypeDays, setLeaveTypeDays, typesLoading }: Props) => {
  return (
    <ModalContainer modal="createLeaveType">
      <form onSubmit={handleSubmit}>
        <legend className="text-center text-2xl">Add a leave type</legend>
        <fieldset className="flex flex-col p-4">
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="name">
              Leave Type Name
            </label>
            <input
              className="input-1"
              name="name"
              type="text"
              value={leaveTypeName}
              onChange={(e) => {
                setLeaveTypeName(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="desc">
              Leave Type Description
            </label>
            <input
              className="input-1"
              name="desc"
              type="text"
              value={leaveTypeDesc}
              onChange={(e) => {
                setLeaveTypeDesc(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="my-2 whitespace-nowrap" htmlFor="days">
              Number of leave Days
            </label>
            <input
              className="input-1"
              name="days"
              type="number"
              value={leaveTypeDays}
              onChange={(e) => {
                setLeaveTypeDays(parseInt(e.currentTarget.value));
              }}
            />
          </div>
          <button className="btn-1 mt-4 self-center" type="submit">
            {typesLoading ? <Loader /> : "Add Leave Type"}
          </button>
        </fieldset>
      </form>
    </ModalContainer>
  );
}

export default LeaveTypePresentation