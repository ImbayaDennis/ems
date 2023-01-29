import { signIn } from 'next-auth/react'
import React from 'react'

type Props = {}

const signin = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className="bg-slate-300 dark:bg-slate-600 w-4/5 max-w-md h-1/3 justify-center items-center flex rounded-md shadow-md">
            <button onClick={()=>{signIn("google")}} className='btn-1'>Authenticate with Google</button>
        </div>
    </div>
  )
}

export default signin