import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import AdminHomePage from "../components/views/admin";
import EmployeeHomePage from "../components/views/employee";
import { useRouter } from "next/router";
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
    return <AdminHomePage />
  }
};

export default Home;
