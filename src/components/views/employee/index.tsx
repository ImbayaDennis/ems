import { useSession } from "next-auth/react";
import React from "react";
import ListItemCard from "../../common/ListItemCard";
import MetricsCard from "../../common/MetricsCard";

const EmployeeHomePage = () => {
  const { data: session } = useSession();
  return (
    <div className="h-full w-full">
      <h1 className="my-8 text-center text-2xl sm:text-start">
        Welcome, {session?.user?.name || "[Employee name]"}
      </h1>
      <div className="flex h-full w-full flex-col flex-wrap sm:flex-row">
        <div className="m-2 flex h-full max-h-[calc(100vh-21rem)] flex-col justify-start sm:w-1/2">
          <MetricsCard />
          <ListItemCard title="Shift history" btn_lbl="View full list" />
        </div>
        <div className="m-2 h-full max-h-[calc(100vh-21rem)] max-w-2xl p-4 sm:w-1/2">
          <div className="h-full w-full rounded-md bg-slate-300 shadow-md dark:bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
