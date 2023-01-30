import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { trpc } from '../../../utils/trpc'
import img from "../../../assets/images/blank-profile-picture.jpg"


const LeaveRequestManager = () => {
  const {data: leaveRequests} = trpc.leaveManagement.getLeaveRequests.useQuery()
  return (
    <div>
      <table className='w-full'>
        <thead className='w-full'>
          <tr>
            <td>Leave Requests</td>
          </tr>
          <tr className="my-2 flex justify-evenly h-12 w-full items-center rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
            <td></td>
            <td>Employee name</td>
            <td>Leave type</td>
            <td>Start date</td>
            <td>Return date</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {leaveRequests?.map((request) => (
            <ListItem
              key={request.id}
              image={request.user.image!}
              column1={request.user.name}
              column2={request.leave_type.leave_type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestManager

type ListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
};

const ListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
  column5 = "column5",
  column6 = "column6",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full items-center rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 rounded-full bg-slate-300 overflow-hidden">
          <Image src={image} width={48} height={48} alt="profile-img" />
        </div>
      </td>
      <td className="p-2">
        <p>{column1}</p>
      </td>
      <td className="p-2">
        <p>{column2}</p>
      </td>
      <td className="p-2">
        <p>{column3}</p>
      </td>
      <td className="p-2">
        <p>{column4}</p>
      </td>
    </tr>
  );
};