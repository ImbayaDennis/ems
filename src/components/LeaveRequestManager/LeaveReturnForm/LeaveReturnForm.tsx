import { type FormEvent, type Dispatch, type SetStateAction } from 'react'
import Loader from '../../common/Loader';
import ModalContainer from '../../common/Modal/ModalContainer'

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  returnDate: string;
  setReturnDate: Dispatch<SetStateAction<string>>;
  approvedRequestsLoading: boolean;
};

const LeaveReturnForm = ({handleSubmit, returnDate, setReturnDate, approvedRequestsLoading}: Props) => {
  return (
    <ModalContainer modal="returnFromLeave">
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <legend className='text-2xl text-center'>Re-admit Employee</legend>
          <fieldset className="flex flex-col">
            <div className="flex flex-col py-2">
              <label className='py-2' htmlFor="return-date">Date of return</label>
              <input className="input-1" name="return-date" type="date" value={returnDate} onChange={(e)=>{setReturnDate(e.currentTarget.value)}} />
            </div>
            <button className='btn-1 self-center '>
                {approvedRequestsLoading ? <Loader/> : "Submit"}
            </button>
          </fieldset>
        </form>
      </div>
    </ModalContainer>
  );
}

export default LeaveReturnForm