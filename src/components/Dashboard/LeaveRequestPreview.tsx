import type {
  Employee,
  LeaveRequests,
  LeaveType,
  User,
} from "@prisma/client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../assets/images/blank-profile-picture.jpg";
import Loader from "../common/Loader";

type ListCardProps = {
  title: string;
  btn_lbl: string;
  page_link: string;
  leave_requests_loading: boolean;
  listData?:
    | (LeaveRequests & {
        employee:
          | (Employee & {
              user: User | null;
            })
          | null;
        leave_type: LeaveType | null;
      })[];
};

const LeaveRequestPreview = ({
  title = "table header",
  btn_lbl = "details",
  page_link = "/",
  listData,
  leave_requests_loading,
}: ListCardProps) => {
  return (
    <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300/40 p-4 shadow-md  backdrop-blur-md dark:bg-slate-600/40">
      <table className="my-2 flex h-full w-full flex-col">
        <thead className="text-center text-2xl">
          <tr>
            <td>{title}</td>
          </tr>
        </thead>
        {leave_requests_loading ? (
          <tbody className="flex items-center justify-center">
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="overflow-x-scroll scrollbar-thin">
            {listData && listData.length > 0 ? (
              listData
                .slice(0, 3)
                .map((request) => (
                  <ListItem
                    key={request.id}
                    image={request.employee?.user?.image}
                    column1={request.employee?.name}
                    column2={request.leave_type?.leave_type}
                    column3={request.start_date}
                    column4={request.end_date}
                  />
                ))
            ) : (
              <tr className="py-4">
                <td>There is currently no data to display</td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      <Link href={page_link} className="self-end p-2 ">
        {btn_lbl}
      </Link>
    </div>
  );
};

export default LeaveRequestPreview;

type ListItemProps = {
  image?: string | StaticImageData | null;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
};

const ListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full min-w-fit flex-nowrap items-center rounded-md bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
          <Image src={image || img} width={48} height={48} alt="image" />
        </div>
      </td>
      <td className="w-1/5 min-w-[8rem] p-2">
        <p>{column1}</p>
      </td>
      <td className="w-1/5 min-w-[8rem] p-2">
        <p>{column2}</p>
      </td>
      <td className="w-1/5 min-w-[8rem] p-2">
        <p>{column3}</p>
      </td>
      <td className="w-1/5 min-w-[8rem] p-2">
        <p>{column4}</p>
      </td>
    </tr>
  );
};
