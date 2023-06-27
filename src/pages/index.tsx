import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import AuthRedirect from "~/components/common/AuthRedirect";
import Loader from "~/components/common/Loader";
import AdminHomePage from "~/components/views/admin";
import EmployeeHomePage from "../components/views/employee";

const Home: NextPage = () => {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  } else if (!session) {
    return <AuthRedirect />;
  }

  if(session.user.role !== "employee" || null || undefined){
    return (
    <AdminHomePage />
    )
    }else{
    return <EmployeeHomePage/>
  }
};

export default Home;
