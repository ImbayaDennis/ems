import { signIn } from 'next-auth/react'
import React from 'react'

const signin = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-1/3 w-4/5 max-w-md items-center justify-center rounded-sm bg-slate-300 shadow-md dark:bg-slate-600">
        <button
          onClick={() => {
            signIn("google").catch((e) => {
              console.error(e);
            });
          }}
          className="btn-1"
        >
          Authenticate with Google
        </button>
      </div>
    </div>
  );
}

export default signin