import { signIn, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const AuthRedirect = ({}: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-full w-full flex-col justify-center items-center text-center">
        <p className="p-4">
          You are not authorised to view this page. Please Sign in first
        </p>

        <button
          onClick={() => {
            signIn();
          }}
          className="btn-1"
        >
          Sign In
        </button>
      </div>
    );
  }else{
    return (
      <div className="flex h-full w-full flex-col justify-center items-center text-center">
        <p className="p-4">
          You are not authorised to view this page.
        </p>
      </div>
    );
  }
};

export default AuthRedirect;
