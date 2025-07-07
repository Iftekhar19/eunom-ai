"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../context/userAuthContext";
import Sidebar from "@/components/Sidebar";
import { data } from "@/Data/tempData";
import { useRouter } from "next/navigation";
import NoGenScreen from "@/components/NoGenScreen";
import PromptBox2 from "@/components/PromptBox2";

const layout = ({ children }) => {
  const temp = useRef(null);
  const user = useUserAuth();
  const { toggleSidebar} = user;
  const [sideBarData, setSidebarData] = useState(data);
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // console.log(user);
 
  //     if (user && user?.user?.hasOwnProperty("uid")) {
  //     console.log("there is");
  //   } else {
  //     setTimeout(()=>
  //     {
  //       if(!(user && user?.user?.hasOwnProperty("uid"))){
  //              router.push("/signup");
  //          console.log("nothing is there");
  //       }
        

  //     },1000)
   
  //   }
  
  // }, [user?.user?.uid]);
  // console.log(t1,t2)
  return (
    <div className="h-[100dvh] w-full xs:px-1 sm:px-0 xs:py-0 sm:py-0 relative  bg-[#e7eaefea]">
      <div className="h-full w-full flex ">
        {/* left for desktop */}
        <section className="w-[292px] xs:hidden sm:block  bg-[white]">
          <Sidebar
           
            // toggleSidebar={"undefined"}
           
          />
        </section>
        {/* left for mobile */}
        {toggleSidebar && (
          <section className="w-[350px] transition-all xs:block sm:hidden overflow-auto h-[100dvh] z-[100] absolute left-0   bg-[white]">
            <Sidebar
              
              toggleSidebar={toggleSidebar}
              // setToggleSidebar={setToggleSidebar}
            />
          </section>
        )}

        {/* right  main generation section*/}
        {children}
      </div>
      {/* for hemburger menu */}
      {/* {!toggleSidebar && (
        <div
          className="menu absolute top-2 xs:block sm:hidden right-3 cursor-pointer"
          // onClick={togg}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      )} */}
    </div>
  );
};

export default layout;
