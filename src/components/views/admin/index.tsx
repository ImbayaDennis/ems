import { useSession } from 'next-auth/react';
import Head from 'next/head'
import React from 'react'
import ListItemCard from '../../common/ListItemCard';
import MetricsCard from "../../common/MetricsCard";
import Layout from "../../layout/Layout";

type Props = {};

const AdminHomePage = (props: Props) => {
  const{data:session} = useSession();
  return (
    <>
      <h1 className="my-8 text-center text-2xl sm:text-start">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="w-full h-full flex justify-evenly">
        <div className="flex flex-col justify-start h-full w-full">
          <MetricsCard />
          <ListItemCard />
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default AdminHomePage