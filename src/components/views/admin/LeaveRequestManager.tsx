import Image, { type StaticImageData } from 'next/image'
import { useContext, useState } from "react";
import { trpc } from "../../../utils/trpc";
import img from "../../../assets/images/blank-profile-picture.jpg";
import { HiCheck, HiLogin, HiX } from "react-icons/hi";
import Loader from "../../common/Loader";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import LeaveTypeContainer from "../../LeaveRequestManager/LeaveTypeForm/LeaveTypeContainer";
import LeaveReturnFormContainer from "../../LeaveRequestManager/LeaveReturnForm/LeaveReturnFormContainer";

const LeaveRequestManager = () => {
  const {
    data: leaveRequests,
    refetch,
    isLoading,
  } = trpc.leaveManagement.getLeaveRequests.useQuery();
  const {
    data: approvedRequests,
    refetch: approvedReqRefetch,
    isLoading: approvedRequestsLoading,
  } = trpc.leaveManagement.getEmployeesOnLeave.useQuery();
  const modalContext = useContext(ModalContextProvider);

  const [requestID, setRequestID] = useState("");

  const openAddLeaveTypeModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveType: { isOpen: true },
      }));
    }
  };

  const openLeaveReturnForm = (request_id: string) => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        returnFromLeave: { isOpen: true },
      }));
    }
    setRequestID(request_id);
  };

  const { mutateAsync: approveRequest, isLoading: acceptLeaveRequestLoading } =
    trpc.leaveManagement.approveLeaveRequest.useMutation();
  const { mutateAsync: denyRequest, isLoading: denyLeaveRequestLoading } =
    trpc.leaveManagement.rejectLeaveRequest.useMutation();
  const {} = useContext(ModalContextProvider);

  const acceptLeaveRequest = (requestID: string) => {
    approveRequest({ leaveRequestId: requestID })
      .then(() => {
        refetch().catch((e) => {
          console.error(e);
        });
        approvedReqRefetch().catch((e) => {
          console.error(e);
        });
      })
      .catch((e) => console.error(e));
  };

  const denyLeaveRequest = (requestID: string) => {
    denyRequest({ leaveRequestId: requestID })
      .then(() => {
        approvedReqRefetch().catch((e) => {
          console.error(e);
        });
      })
      .catch((e) => console.error(e));
  };

  if (isLoading) {
    return (
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 w-full text-2xl">Leave Requests</p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Loader />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <div className="mb-28">
      <table className="mb-4 w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 text-2xl">Leave Requests</p>
            </td>
          </tr>
          <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
            <td className="p-2">
              <div className="h-8 w-8"></div>
            </td>
            <td className="w-36 p-2">Employee name</td>
            <td className="w-36 p-2">Leave type</td>
            <td className="w-36 p-2">Start date</td>
            <td className="w-36 p-2">
              <p className="text-center">Approve</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {leaveRequests?.map((request) => (
            <RequestListItem
              key={request.id}
              request_id={request.id}
              image={request.employee?.user?.image || img}
              column1={request.employee?.name}
              column2={request.leave_type?.leave_type}
              column3={request.start_date}
              acceptLeaveRequest={acceptLeaveRequest}
              acceptLeaveRequestLoading={acceptLeaveRequestLoading}
              denyLeaveRequest={denyLeaveRequest}
              denyLeaveRequestLoading={denyLeaveRequestLoading}
            />
          ))}
        </tbody>
      </table>

      <table className="mb-8 w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 text-2xl">Employees on leave</p>
            </td>
          </tr>
          <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
            <td className="p-2">
              <div className="h-8 w-8"></div>
            </td>
            <td className="w-36 p-2">Employee name</td>
            <td className="w-36 p-2">Leave type</td>
            <td className="w-36 p-2">Start date</td>
            <td className="w-36 p-2">
              <p className="text-center">Return</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {approvedRequests?.map((request) => (
            <ApprovedListItem
              key={request.id}
              request_id={request.id}
              image={request.employee?.user?.image || img}
              column1={request.employee?.name}
              column2={request.leave_type?.leave_type}
              column3={request.start_date}
              openLeaveReturnForm={openLeaveReturnForm}
            />
          ))}
        </tbody>
      </table>
      <LeaveTypeContainer />
      <LeaveReturnFormContainer
        approvedLeaveId={requestID}
        refetchApprovedLeave={() => {
          approvedReqRefetch().catch((e) => console.error(e));
        }}
      />
      <button
        onClick={openAddLeaveTypeModal}
        className="btn-1 fixed bottom-8 left-1/2 w-1/3 -translate-x-1/2"
      >
        Add Leave Type
      </button>
    </div>
  );
};

export default LeaveRequestManager;

type RequestsListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
  request_id: string;
  acceptLeaveRequest?: (requestID: string) => void;
  acceptLeaveRequestLoading?: boolean;
  denyLeaveRequest?: (requestID: string) => void;
  denyLeaveRequestLoading?: boolean;
};

const RequestListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  request_id,
  acceptLeaveRequest,
  denyLeaveRequest,
  acceptLeaveRequestLoading,
  denyLeaveRequestLoading,
}: RequestsListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
          <Image src={image} width={48} height={48} alt="profile-img" />
        </div>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column1}</p>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column2}</p>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column3}</p>
      </td>
      <td className="flex w-36 justify-center p-2">
        <div className="flex">
          {acceptLeaveRequest ? (
            <button
              onClick={() => {
                acceptLeaveRequest ? acceptLeaveRequest(request_id) : null;
              }}
              className="btn-1 flex h-10 w-10 items-center justify-center"
            >
              {acceptLeaveRequestLoading ? <Loader /> : <HiCheck />}
            </button>
          ) : null}
          <button
            onClick={() => {
              denyLeaveRequest ? denyLeaveRequest(request_id) : null;
            }}
            className="btn-1 flex h-10 w-10 items-center justify-center"
          >
            {denyLeaveRequestLoading ? <Loader /> : <HiX />}
          </button>
        </div>
      </td>
    </tr>
  );
};

type ApprovedListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
  request_id: string;
  openLeaveReturnForm: (request_id: string) => void;
};

const ApprovedListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  request_id,
  openLeaveReturnForm,
}: ApprovedListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
          <Image src={image} width={48} height={48} alt="profile-img" />
        </div>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column1}</p>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column2}</p>
      </td>
      <td className="w-36 p-2 text-sm">
        <p>{column3}</p>
      </td>
      <td className="flex w-36 justify-center p-2">
        <div className="flex">
          <button
            onClick={() => {
              openLeaveReturnForm(request_id);
            }}
            className="btn-1 flex h-10 w-10 items-center justify-center"
          >
            {<HiLogin />}
          </button>
        </div>
      </td>
    </tr>
  );
};