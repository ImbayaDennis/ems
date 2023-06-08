import { useSession } from "next-auth/react";
import React from "react";
import AuthRedirect from "../components/common/AuthRedirect";
import Loader from "../components/common/Loader";
import LeaveRequestMngr from "../components/views/admin/LeaveRequestManager";

const LeaveRequestManager = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loader />
      </div>
    );
  } else if (!session) {
    return <AuthRedirect />;
  }

  if (session.user?.role === "owner" || "admin" || "manager") {
    return <LeaveRequestMngr />;
  } else {
    return <AuthRedirect />;
  }
};

export default LeaveRequestManager;
