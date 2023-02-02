import { useSession } from 'next-auth/react';
import React from 'react'
import AuthRedirect from '../components/common/AuthRedirect';
import EmployeeMngr from '../components/views/admin/EmployeeManager';
import { trpc } from '../utils/trpc'

const EmployeeManager = () => {
    const {data: session} = useSession();
  if (!session) {
    return <AuthRedirect />;
  }

  if (session.user?.role === "admin") {
    return <EmployeeMngr />;
  } else {
    return <AuthRedirect />;
  }
}

export default EmployeeManager