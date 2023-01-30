import { useSession } from 'next-auth/react';
import React from 'react'
import { trpc } from '../../../utils/trpc';
import ListItemCard from '../../common/ListItemCard';
import MetricsCard from "../../common/MetricsCard";


const AdminHomePage = () => {
  const{data:session} = useSession();

  const {data: employees} = trpc.employees.getEmployees.useQuery()

  return (
    <div className="h-full w-full">
      <h1 className="my-8 text-center text-2xl sm:text-start">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-col flex-wrap sm:flex-row">
        <div className="flex h-full max-h-[calc(100vh-21rem)] w-full flex-col justify-start sm:w-1/2">
          <MetricsCard metric_one={employees?.length} metric_one_label="Total Employees" />
          <ListItemCard title="Leave Requests" btn_lbl="See all requests" />
        </div>
        <div className="m-2 h-full max-h-[calc(100vh-21rem)] max-w-2xl p-4 sm:w-1/2">
          <div className="h-full w-full rounded-md bg-slate-300 shadow-md dark:bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage