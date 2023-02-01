import Image, { type StaticImageData } from 'next/image'
import React from 'react'
import { trpc } from '../../../utils/trpc'
import img from "../../../assets/images/blank-profile-picture.jpg"
import { HiCheck, HiX } from "react-icons/hi";

const LeaveRequestManager = () => {
  const { data: leaveRequests, refetch } =
    trpc.leaveManagement.getLeaveRequests.useQuery();
  return (
    <div>
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 text-2xl">Leave Request Manager</p>
            </td>
          </tr>
          <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
            <td className="p-2">
              <div className="h-8 w-8"></div>
            </td>
            <td className="w-36 p-2">Employee name</td>
            <td className="w-36 p-2">Leave type</td>
            <td className="w-36 p-2">Start date</td>
            <td className="w-36 p-2">Return date</td>
            <td className="w-36 p-2">
              <p className="text-center">Approve</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {leaveRequests?.map((request) => (
            <ListItem
              key={request.id}
              request_id={request.id}
              refetch={() => {
                refetch().catch((e) => console.error(e));
              }}
              image={request.user.image || img}
              column1={request.user.name}
              column2={request.leave_type?.leave_type}
              column3={request.start_date}
              column4={request.end_date}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestManager;

type ListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
  request_id: string;
  refetch: () => void;
};

const ListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
  request_id,
  refetch,
}: ListItemProps) => {
  const leaveRequestApproval =
    trpc.leaveManagement.approveLeaveRequest.useMutation();
  return (
    <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
          <Image src={image} width={48} height={48} alt="profile-img" />
        </div>
      </td>
      <td className="w-36 p-2">
        <p>{column1}</p>
      </td>
      <td className="w-36 p-2">
        <p>{column2}</p>
      </td>
      <td className="w-36 p-2">
        <p>{column3}</p>
      </td>
      <td className="w-36 p-2">
        <p>{column4}</p>
      </td>
      <td className="flex w-36 justify-center p-2">
        <div className="flex">
          <button
            onClick={() => {
              leaveRequestApproval
                .mutateAsync({
                  leaveRequestId: request_id,
                  approved: true,
                })
                .then(() => refetch())
                .catch(e=>console.error(e));
            }}
            className="btn-1 flex h-8 w-10 items-center justify-center"
          >
            <HiCheck />
          </button>
          <button
            onClick={() => {
              leaveRequestApproval
                .mutateAsync({
                  leaveRequestId: request_id,
                  approved: false,
                })
                .then(() => refetch())
                .catch(e=>console.error(e));
            }}
            className="btn-1 flex h-8 w-10 items-center justify-center"
          >
            <HiX />
          </button>
        </div>
      </td>
    </tr>
  );
};