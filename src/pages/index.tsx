import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AdminHomePage from "../components/views/admin";
import EmployeeHomePage from "../components/views/employee";
import AuthRedirect from "../components/common/AuthRedirect";

const Home: NextPage = () => {
  const {data: session} = useSession()

  if(!session){
    return(
      <AuthRedirect/>
    );
  }

  if(session?.user?.role == "admin"){
    return <AdminHomePage />
  } else {
    return <EmployeeHomePage />
  }
};

export default Home;
