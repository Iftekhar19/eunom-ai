import React, { useEffect, useState } from "react";
import SearchIcon from "./SearchIcon";
import Image from "next/image";
import ismg from "../../public/icons/user.png";
import Logo from "./Logo";
import ListItem from "./ListItem";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure} from "@nextui-org/react";
import { useParams,useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";

import { auth } from "@/config/firebase.config";
import LogoIcon from "./LogoIcon";
import UserPlanModal from "./UserPlanModal";
import MyPlanIcon from "./MyPlanIcon";
import LogOutIcon from "./LogOutIcon";
import { useUserAuth } from "@/app/context/userAuthContext";

const Sidebar = ({ sideBarData, setSidebarData,toggleSidebar,setToggleSidebar,isFirst,setIsFirst }) => {
  const [toggle, setToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const params=useParams();
  const router=useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {user}=useUserAuth();
  // useEffect(()=>
  // {
  //       console.log(params.id)

  // },[params])
  const deleteSideBarData=async(id)=>
  {
    setSidebarData((old)=>
  {
    return old.filter((f,i)=>(i!=(id-1)))
  })
  }

  const logoutUser =async()=>
    {
      try {
        
        await  signOut(auth)
      } catch (error) {
        console.log(error)
      }
    }
    const addnewChat=async()=>
      {
        setIsFirst(true);
        router.replace(`/dashboard`)
      }
      // useEffect(()=>
      // {
      //   console.log(user)
      // },[])
  return (
    <div className="w-full h-full rounded-[24px] border-[1px] border-[#ECF0F6] bg-[] flex flex-col gap-4 pt-4 relative">
      {/* logo */}
      <section className="px-5 flex items-center gap-2 uppercase">
        {/* <h1 className="font-[700] text-[28px] text-[#1B2559]">
          EUNOM<span className="font-[700] text-[28px] text-[blue]">AI</span>
        </h1> */}
        <LogoIcon/>
        <Logo/>
      </section>
      {/* add button and search icon */}
      <section className="px-5 uppercase flex flex-col gap-4 ">
        <section className="flex items-center gap-4">
          <button onClick={addnewChat} className="h-[45px] text-center rounded-[45px] flex-1 btn-bg text-[#fff] text-[14px] font-[500]">
            + New Chat
          </button>
          <SearchIcon
            onClick={() => setToggle(true)}
            className="cursor-pointer"
            height={44}
            width={44}
          />
        </section>
        {toggle && (
          <section className="w-full border flex items-center overflow-hidden bg-[white]  rounded-[24px]">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search.."
              className="flex-1 outline-none border-none pl-2"
            />
            <span
              className="p-2  flex items-center justify-center cursor-pointer"
              onClick={() => setToggle(false)}
            >
              X
            </span>
          </section>
        )}
      </section>
      {/* list section */}
      <section className="flex-1 flex flex-col gap-4 overflow-auto bg-[]">
        <div className="border-t-1 border-t-[#EFEFEF] border-b-1 border-b-[#EFEFEF] px-5">
          <span className="py-2 inline-block text-[12px] font-[500] text-[#718096]">
            Today
          </span>
        </div>
        <ul className="flex flex-col gap-3 pl-3">
          {sideBarData.filter(e=>e?.text?.includes(searchText.trim())).map((d)=><ListItem params={params.id} deleteSideBarData={deleteSideBarData} key={d.id} d={d}/>)}
        </ul>
      </section>
      {/* profile section */}
      <section className="min-h-[50px] px-3 mb-1 ">
      <Dropdown className="">
      <DropdownTrigger>
        <Button 
          // variant="bordered" 
          className="w-full p-0   inline-block rounded-3xl text-left bg-[#1B25590A]"
        >
          <div className="flex w-full items-center rounded-[25px] gap-4  cursor-pointer  px-2">
          <div className="rounded-full overflow-hidden h-[40px] w-[40px]">

          <Image
            className="bg-center"
            height={40}
            width={40}
            src={ismg}
            alt="profile"
          />
          </div>

          <span className="text-[16px] flex-1 font-[500] text-[#1B2559]">
            Andrew Neilson
          </span>
        </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions " className="w-[250px]">
        <DropdownItem key="new" >{user?.email}</DropdownItem>
        <DropdownItem key="new" onClick={onOpen} ><span className="flex items-center gap-2"><MyPlanIcon/> My Plan</span></DropdownItem>
        {/* <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem> */}
        <DropdownItem key="delete" itemClasses="text-[30px]"  className="hover:bg-[]" color="danger"
        onClick={logoutUser}
        >
          <span className="flex items-center gap-2">
          <LogOutIcon className="hover:text-white"/>
          Log Out
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

        {/* <div className="flex items-center rounded-[25px] gap-4 bg-[#1B25590A] cursor-pointer py-2 px-2">
          <div className="rounded-full overflow-hidden h-[40px] w-[40px]">

          <Image
            className="bg-center"
            height={40}
            width={40}
            src={ismg}
            alt="profile"
          />
          </div>

          <span className="text-[16px] flex-1 font-[500] text-[#1B2559]">
            Andrew Neilson
          </span>
        </div> */}
      </section>
      {
        toggleSidebar !='undefined' &&(
          <div className="absolute top-1 right-2 text-[22px] font-[500] text-[black] px-4 py-2 rounded-full border" onClick={()=>setToggleSidebar(false)}>X</div>
        )
      }
      <UserPlanModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
    </div>
  );
};

export default Sidebar;
