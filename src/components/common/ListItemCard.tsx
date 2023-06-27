/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Employee, LeaveRequests, LeaveType, User } from "@prisma/client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { ApplicationLinks } from "~/assets/constants";
import img from "../../assets/images/blank-profile-picture.jpg"
import { trpc } from "../../utils/trpc";
import Loader from "./Loader";

type ListCardProps = {
  title: string;
  btn_lbl: string;
  listData?:
    | (LeaveRequests & {
        employee:
          | (Employee & {
              user: User | null;
            })
          | null;
        leave_type: LeaveType | null;
      })[]
    | undefined;
};

const ListItemCard = ({
  title = "table header",
  btn_lbl = "details",
}: ListCardProps) => {
  const { data: leaveRequests, isLoading } =
    trpc.leaveManagement.getLeaveRequests.useQuery();

  if (isLoading) {
    return (
      <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md  dark:bg-slate-600">
        <Loader />
      </div>
    );
  }
  return (
    <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md  dark:bg-slate-600">
      <table className="my-2 flex h-full w-full flex-col">
        <thead className="text-center text-2xl">
          <tr>
            <td>{title}</td>
          </tr>
        </thead>
        <tbody className="overflow-x-scroll scrollbar-thin">
          {leaveRequests && leaveRequests.length > 0 ? (
            leaveRequests
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
              <td>There are currently no leave requests</td>
            </tr>
          )}
        </tbody>
      </table>
      {ApplicationLinks[1] ? (
        <Link href={ApplicationLinks[1].link} className="self-end p-2 ">
          {btn_lbl}
        </Link>
      ) : (
        <Link href="/" className="self-end p-2 ">
          {btn_lbl}
        </Link>
      )}
    </div>
  );
};

export default ListItemCard;

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
    <tr className="my-2 flex flex-nowrap h-12 w-full min-w-fit items-center rounded-md bg-slate-100 dark:bg-slate-500 text-slate-600 dark:text-slate-50 p-2">
      <td className="p-2">
        <div className="h-8 w-8 rounded-full bg-slate-300 overflow-hidden">
          <Image src={image || img} width={48} height={48} alt="image" />
        </div>
      </td>
      <td className="p-2 w-1/5 min-w-[8rem]">
        <p>{column1}</p>
      </td>
      <td className="p-2 w-1/5 min-w-[8rem]">
        <p>{column2}</p>
      </td>
      <td className="p-2 w-1/5 min-w-[8rem]">
        <p>{column3}</p>
      </td>
      <td className="p-2 w-1/5 min-w-[8rem]">
        <p>{column4}</p>
      </td>
    </tr>
  );
};
