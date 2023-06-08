import { useSession } from 'next-auth/react';
import React from 'react'
import AuthRedirect from '../components/common/AuthRedirect';
import Loader from "../components/common/Loader";
import EmployeeMngr from "../components/views/admin/EmployeeManager";

const EmployeeManager = () => {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  } else if (!session) {
    return <AuthRedirect />;
  }

  if (session.user?.role === "owner" || "admin" || "manager") {
    return <EmployeeMngr />;
  } else {
    return <AuthRedirect />;
  }
};

export default EmployeeManager