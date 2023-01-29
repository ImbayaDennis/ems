import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import MetricsCard from "../../common/MetricsCard";

type Props = {};

const EmployeeHomePage = (props: Props) => {
  const { data: session } = useSession();
  return (
    <>
      <h1 className="my-8 text-center text-2xl sm:text-start">
        Welcome, {session?.user?.name || "[Employee name]"}
      </h1>
      <MetricsCard />
    </>
  );
};

export default EmployeeHomePage;
