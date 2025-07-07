'use client'
import LoadingPage from '@/components/LoadingPage';
import LogoText from '@/components/Logo';
import LogoIcon from '@/components/LogoIcon';
import MarkdownRenderer from '@/components/MarkDownRenderer';
import PromptBox2 from '@/components/PromptBox2'
import { db } from '@/config/firebase.config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

import { FaRegCircleUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import Markdown from 'react-markdown';
import { useUserAuth } from '@/app/context/userAuthContext';
// import Markdown from 'react-markdown';

const page = () => {
  const [isFirst, setIsFirst] = React.useState(true);
  const [sideBarData, setSideBarData] = React.useState([]);
  const [chatLoading, setChatLoading] = React.useState(false);
  const [loading,setLoading]=React.useState(false);
  const params=useParams();
  const divRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const user=useUserAuth();
  // const onSend = (message) => {
  //   console.log("Message sent:", message);
  //   // Add your send logic here
  // }

  const { toggleSidebarHandler,toggleSidebar } = user;

  useEffect(() => {
    const messagesRef = collection(db, "chats", params.id, "messages");
  setChatLoading(true);
  setLoading(true);
const q = query(messagesRef, orderBy("timestamp", "asc")); // ASC = oldest to newest
    const snapshot=onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(messages)
      setData(messages);
      
    })
    setChatLoading(false);
    setLoading(false);
    return snapshot
  }, []);
      useEffect(()=>
    {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        router.push("/signin", { scroll: false });
      }
  
    },[])
      useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[loading,data])
  return (
    
      <section className="flex-1 bg-[] flex flex-col w-full h-full ">

   <div className=" w-full xs:flex md:hidden justify-between items-center shadow-md border-b-2 border-gray-200">
        <div className="flex flex-1 items-center gap-2 md:pl-6 xs:pl-2 py-3  ">
          <LogoIcon />
          <LogoText />
        </div>
       {!toggleSidebar? <MdMenu className='w-10 h-10 mr-2'  onClick={toggleSidebarHandler} />:
        <AiOutlineClose className='w-8 h-8 mr-2' onClick={toggleSidebarHandler}/>}

      </div>
        {
        
       
      loading ?<LoadingPage/>:  <div className="xs:w-full md:w-3/4  h-full mx-auto overflow-y-auto flex flex-col items-center ">
          <div className=" text-sm  flex-1   flex flex-col gap-5 pt-3 overflow-y-auto">
           
            {data?.map((message,i) => {
              return(
                //  <div className={`text-start p-2 bg-[#d0d4da97] rounded-2xl  ${message.role === 'user' ? 'self-end' : 'self-start'}`} key={message.id||i}>
                //   {message.role === 'user' ?message.content : <Markdown >{message.content}</Markdown>}
                //  </div>
                message.role === 'user' ? (
                   <div className={`text-start p-2 bg-[#a6a8ab97] rounded-2xl flex items-start gap-2  self-end`}  key={message.id||i}>
                     
                     <span>{message.content}</span>
                 </div>
                ):(
                  <div className={`  self-start`} key={message.id||i}>
                    
                     {/* <div className='w-10 h-8 flex items-center justify-center'>
                      <LogoIcon />
                     </div> */}
                     <div className='text-start p-2 bg-[#cfd1d4ce] rounded-2xl w-full overflow-x-auto text-wrap'>

                     {/* <Markdown >{message.content}</Markdown> */}
                     <MarkdownRenderer content={message.content}/>
                     </div>
                 </div>
                )
              )
            })}
              <div ref={divRef}>

          </div>
          </div>
        
          {/* Add your chat components here */}
           <div className='w-full pb-2'>

          <PromptBox2 
          // isFirst={isFirst}
          // setIsFirst={setIsFirst}
          // setSideBarData={setSideBarData}
          loading={loading}
          setLoading={setLoading}
          setData={setData}
          />
           </div>
        </div>
         }
      </section>
    
  )
}

export default page