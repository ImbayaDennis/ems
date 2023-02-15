import Head from 'next/head'
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import React from 'react'
import spurLogo from "../../../assets/images/spur-logo.png"

type Props = {
  signIn: () => void;
  signOut: () => void;
  isAuth: boolean
  imgUrl: string | StaticImageData;
}

function Appbar({signIn, signOut, isAuth, imgUrl}: Props) {
  return (
    <>
      <Head>
        <title>Employee Management System</title>
        <meta name="description" content="Custom Content Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="z-30 flex h-12 w-screen items-center justify-between bg-gray-300 px-4 text-gray-700 shadow-md dark:bg-gray-900 dark:text-gray-400">
        <div className="">
          <Image
            src={spurLogo}
            width={96}
            height={48}
            alt="LOGO"
            className="rounded-md mix-blend-multiply dark:mix-blend-normal"
          />
        </div>
        <h3 className="text-2xl font-light tracking-[4px] hidden md:visible">
          <span className='text-blue-600'>TECHNISOFT</span> <span className='text-orange-600'>SYSTEMS</span> - HRMS
        </h3>
        <div className="flex items-center">
          {!isAuth ? (
            <button
              className="btn-1"
              onClick={signIn}
              aria-label="Sign in button"
            >
              Sign in
            </button>
          ) : (
            <button
              className="btn-1"
              onClick={signOut}
              aria-label="Sign out button"
            >
              Sign out
            </button>
          )}
          <div className="mx-2 h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gray-400 dark:bg-gray-600">
            <Image
              src={imgUrl}
              alt="prof-pic"
              width={48}
              height={48}
              priority={isAuth}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Appbar