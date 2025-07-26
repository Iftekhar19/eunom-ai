import React, { useEffect, useState } from "react";
import SearchIcon from "./SearchIcon";
import Image from "next/image";
import ismg from "../../public/icons/user.png";
import Logo from "./Logo";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure} from "@heroui/react";
import { useParams,useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";

import { auth, db } from "@/config/firebaseClient";
import LogoIcon from "./LogoIcon";
import UserPlanModal from "./UserPlanModal";
import MyPlanIcon from "./MyPlanIcon";
import LogOutIcon from "./LogOutIcon";
import { useUserAuth } from "@/app/context/userAuthContext";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import CustomListItem from "./CustomListItem";


const Sidebar = ({   }) => {
  const [toggle, setToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const params=useParams();
  const router=useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const user=useUserAuth();
  const [sideBarData, setSidebarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const  {toggleSidebarHandler} =user;

  // useEffect(()=>
  // {
  //   let snapshot
  //   if(user && user?.user?.hasOwnProperty("uid"))
  //   {
      
  //     try {
  //       const chatRef = collection(db, "chats");
  //     const q = query(chatRef,where("userId","==",user?.user?.uid), orderBy("timestamp", "desc")); // DESC 
  //      snapshot=onSnapshot(q, (snapshot) => {
  //       const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       console.log(chats)
  //       setSidebarData(chats);
  //     })
  //     } catch (error) {
  //       console.log(error)
  //     }
       
      
      
  //   }
  //   return snapshot

  // },[user])

useEffect(() => {
  // Guard clause: wait until Firebase Auth loads


const uid = localStorage.getItem("uid");
// console.log(JSON.parse(uid))
  if (!uid) {
    console.log("nothing is there");
    return;
  }
 setLoading(true);
  // Reference to clean up listener
  const chatRef = collection(db, "chats");
  const q = query(
    chatRef,
    orderBy("timestamp", "desc"),
    where("userId", "==", JSON.parse(uid)),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("Chats: ", chats);
    setLoading(false);
    setSidebarData(chats);
  });

  return () => unsubscribe();
}, []);
  const logoutUser =async()=>
    {
      try {
        
        await  signOut(auth)
        localStorage.removeItem("uid");
      } catch (error) {
        console.log(error)
      }
    }
    const addnewChat=async()=>
      {
        // setIsFirst(true);
        // console.log(toggleSidebarHandler)
        toggleSidebarHandler();
        router.replace(`/dashboard`)
      }
  
  return (
    <div className="w-full h-full  border-[1px] border-[#ECF0F6] bg-[] flex flex-col gap-4 pt-4 relative">
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
            Recent
          </span>
        </div>
        <ul className="flex flex-col gap-2 ">
          {/* skeleton */}
          {loading ?(<>
          {
            Array(5).fill(0).map((_, index) => (<li key={index}
                   className="animate-pulse flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 my-1"
>                   
            </li>))
          }
          </>):<>
         {/* { sideBarData.filter(e=>e?.title?.includes(searchText.trim())).map((d)=><ListItem params={params.id}  key={d.id} d={d} />)} */}
         { sideBarData.filter(e=>e?.title?.includes(searchText.trim())).map((d)=><CustomListItem title={d.title} key={d.id} id={d.id} />)}
          </>}
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
        <DropdownItem key="new" >{user?.user?.email}</DropdownItem>
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
      {/* {
        toggleSidebar !='undefined' &&(
          <div className="absolute top-1 right-2 text-[22px] font-[500] text-[black] px-4 py-2 rounded-full border" onClick={toggleSidebarHandler}>X</div>
        )
      } */}
      <UserPlanModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
    </div>
  );
};

export default Sidebar;
