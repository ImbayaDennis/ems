import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Appbar from './Appbar'
import img from "../../../assets/images/blank-profile-picture.jpg";

const AppbarContainer = () => {
  const {data} = useSession()

  const isAuth = data ? true : false
  const imgUrl = data?.user?.image ? data?.user?.image : img

  return (
    <Appbar signIn={()=>{signIn()}} signOut={()=>{signOut}} isAuth={isAuth} imgUrl={imgUrl} />
  )
}

export default AppbarContainer