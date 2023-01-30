import { useSession } from "next-auth/react";
import React from "react";
import MetricsCard from "../../common/MetricsCard";

const EmployeeHomePage = () => {
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
