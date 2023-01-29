import Head from 'next/head'
import Image, { StaticImageData } from 'next/image';
import React from 'react'

type Props = {
  signIn: () => void;
  signOut: () => void;
  isAuth: boolean
  imgUrl: string | StaticImageData
}

function Appbar({signIn, signOut, isAuth, imgUrl}: Props) {
  return (
    <>
    <Head>
      <title>Employee Management System</title>
      <meta name="description" content="Custom Content Management System" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className='w-screen h-12 px-4 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-900 flex justify-between items-center shadow-md'>
      <div className="">
        LOGO
      </div>
      <div className="flex items-center">
        {!isAuth ? (<button className='btn-1' onClick={signIn} aria-label='Sign in button'>Sign in</button>) : (<button className='btn-1' onClick={signOut} aria-label='Sign out button'>Sign out</button>)}
        <div className="w-12 h-12 mx-2 rounded-full overflow-hidden bg-gray-400 dark:bg-gray-600 cursor-pointer">
          <Image src={imgUrl} alt="prof-pic" width={48} height={48} priority={isAuth} />
        </div>
      </div>
    </header>
    </>
  )
}

export default Appbar