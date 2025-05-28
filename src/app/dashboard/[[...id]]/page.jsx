"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import Sidebar from "@/components/Sidebar";
import { data } from "@/Data/tempData";
import NoGenScreen from "@/components/NoGenScreen";
import PromptBox from "@/components/PromptBox";
import { useRouter } from 'next/navigation'
const page = () => {
  const temp = useRef(null);
  const user = useUserAuth();
  const [sideBarData, setSidebarData] = useState(data);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isFirst,setIsFirst]=useState(true)
  const router = useRouter()
    useEffect(()=>
  {
 
    console.log(user)
   if(user && user?.user?.hasOwnProperty("uid"))
   {
     console.log("there is")
   }
   else{
  router.push("/signup")
   console.log("nothing is there")
   }
 

  },[user])
  return (
    <div className="h-[100dvh] w-full xs:px-1 sm:px-2 xs:py-1 sm:py-2 relative  bg-[#e7eaefea]">
      <div className="h-full w-full flex ">
        {/* left for desktop */}
        <section className="w-[292px] xs:hidden sm:block rounded-[24px] bg-[white]">
          <Sidebar
            sideBarData={sideBarData}
            setSidebarData={setSidebarData}
            toggleSidebar={"undefined"}
            isFirst={isFirst}
            setIsFirst={setIsFirst}
          />
        </section>
        {/* left for mobile */}
        {toggleSidebar && (
          <section className="w-[350px] transition-all xs:block sm:hidden overflow-auto h-[98dvh]  absolute left-0 top-2 rounded-[24px] bg-[white]">
            <Sidebar
              sideBarData={sideBarData}
              setSidebarData={setSidebarData}
              toggleSidebar={toggleSidebar}
              setToggleSidebar={setToggleSidebar}
            />
          </section>
        )}

        {/* right  main generation section*/}
        <section className="flex-1 ">
          <div className="max-w-[1000px] w-full h-full mx-auto  overflow-y-auto flex flex-col  items-center">
           <NoGenScreen/>
           <PromptBox setIsFirst={setIsFirst} isFirst={isFirst} setSideBarData={setSidebarData}/>
          </div>
        </section>
      </div>
      {/* for hemburger menu */}
      {!toggleSidebar && (
        <div
          className="menu absolute top-2 xs:block sm:hidden right-3 cursor-pointer"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default page;
