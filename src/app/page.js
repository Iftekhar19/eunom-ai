'use client'
import { useEffect, useRef } from "react";
import { useUserAuth } from "./context/userAuthContext";
import { useRouter } from "next/router";
export default function Home() {
  const temp=useRef(null)
  const user=useUserAuth();
  // const router=useRouter();


// useEffect(()=>
// {
// temp.current=  setTimeout(()=>
// {
//   console.log(user)
//  if(user && user.user.hasOwnProperty("uid"))
//  {
//    console.log("there is")
//  }
//  else{
//   // window.location.pathname="/signin"
//  console.log("nothing is there")
//  }
// },3000)

// },[user])



  
  return (
  <main>
    main page
  </main>
  );
}
