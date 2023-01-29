import { useSession } from "next-auth/react";
import React from "react";
import AuthRedirect from "../components/common/AuthRedirect";
import LeaveRequestMngr from "../components/views/admin/LeaveRequestManager";

type Props = {};

const LeaveRequestManager = (props: Props) => {
  const { data: session } = useSession();

  if(!session){
    return <AuthRedirect/>
  }

  if(session.user?.role === "admin"){
      return <LeaveRequestMngr />;
  }else{
    return <AuthRedirect/>
  }

};

export default LeaveRequestManager;
