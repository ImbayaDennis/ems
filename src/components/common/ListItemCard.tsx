import Link from "next/link";
import React from "react";
import { AdminLinks } from "../../assets/constants";

type Props = {};

const ListItems = [1, 2, 3, 4];

const ListItemCard = (props: Props) => {
  return (
    <div className="my-4 flex h-2/5 w-full min-w-[24rem] max-w-lg flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md  dark:bg-slate-600 sm:w-2/5">
      <table className="my-2 h-full w-full overflow-x-scroll scrollbar-thin">
        <thead className="text-center"><h2 className="text-2xl">Leave Requests</h2></thead>
        <tbody>
          {ListItems.map((li) => (
            <ListItem key={li} />
          ))}
        </tbody>
      </table>
      <Link href={AdminLinks.leaveMngr} className="p-2 self-end ">
        See more requests
      </Link>
    </div>
  );
};

export default ListItemCard;

type ListItemProps = {
  column1?: string | number;
  column2?: string | number;
  column3?: string | number;
  column4?: string | number;
};

const ListItem = ({
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full items-center rounded-md bg-slate-100 dark:bg-slate-500 text-slate-600 dark:text-slate-50 p-2">
      <td className="p-2">
        <div className="h-8 w-8 rounded-full bg-slate-300"></div>
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
