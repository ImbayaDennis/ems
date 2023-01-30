import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { AdminLinks } from "../../assets/constants";
import img from "../../assets/images/blank-profile-picture.jpg"

type ListCardProps = {
  title: string;
  btn_lbl: string;
}

const ListItems = [1, 2, 3, 4];

const ListItemCard = ({title = "table header", btn_lbl = "details"}: ListCardProps) => {
  return (
    <div className="my-4 flex h-2/5 w-full min-w-[24rem] max-w-2xl flex-col items-center justify-center rounded-lg bg-slate-300 p-4 shadow-md  dark:bg-slate-600">
      <table className="my-2 h-full w-full overflow-x-scroll scrollbar-thin">
        <thead className="text-center text-2xl">
          <tr>
            <td>{title}</td>
          </tr>
        </thead>
        <tbody>
          {ListItems.map((li) => (
            <ListItem key={li} />
          ))}
        </tbody>
      </table>
      <Link href={AdminLinks.leaveMngr} className="self-end p-2 ">
        {btn_lbl}
      </Link>
    </div>
  );
};

export default ListItemCard;

type ListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number;
  column2?: string | number;
  column3?: string | number;
  column4?: string | number;
};

const ListItem = ({
  image = img,
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex justify-evenly h-12 w-full items-center rounded-md bg-slate-100 dark:bg-slate-500 text-slate-600 dark:text-slate-50 p-2">
      <td className="p-2">
        <div className="h-8 w-8 rounded-full bg-slate-300 overflow-hidden">
          <Image src={image} width={48} height={48} alt="image" />
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
