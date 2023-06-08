import type { Employee, Log } from "@prisma/client";
import { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import Loader from "../common/Loader";
import moment from "moment";

type ListCardProps = {
  title: string;
  btn_lbl: string;
  page_link: string;
  logs_loading: boolean;
  listData?:
    | (Log & {
        employee: Employee | null;
      })[]
    | undefined;
};

const LogListPreview = ({
  title = "table header",
  btn_lbl = "details",
  page_link = "/",
  listData,
  logs_loading,
}: ListCardProps) => {
  return (
    <div className="my-4 flex h-fit min-h-max w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-sm bg-slate-300/40 p-4 shadow-md  backdrop-blur-md dark:bg-slate-600/40">
      <table className="my-2 flex h-full w-full flex-col">
        <thead className="text-center text-2xl">
          <tr>
            <td>{title}</td>
          </tr>
        </thead>
        {logs_loading ? (
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
                .map((log) => (
                  <ListItem
                    key={log.id}
                    column1={log.employee?.name}
                    column2={moment(log.time_in).format("HH:MM")}
                    column3={moment(log.time_out).format("HH:MM")}
                    column4={moment(log.time_out).format("YYYY-MM-DD")}
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

export default LogListPreview;

type ListItemProps = {
  image?: string | StaticImageData | null;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
};

const ListItem = ({
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full min-w-fit flex-nowrap items-center rounded-sm bg-slate-100 p-2 text-slate-600 dark:bg-slate-500 dark:text-slate-50">
      <td className="p-2">
        <div className="h-8 w-8 overflow-hidden rounded-full"></div>
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
