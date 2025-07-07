"use client";
import LoadingPage from "@/components/LoadingPage";
import LogoText from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import MarkdownRenderer from "@/components/MarkDownRenderer";
import { db } from "@/config/firebase.config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const params = useParams();
  const divRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const onSend = (message) => {
  //   console.log("Message sent:", message);
  //   // Add your send logic here
  // }

  useEffect(() => {
    const messagesRef = collection(db, "chats", params.id, "messages");
    //   setChatLoading(true);
    setLoading(true);
    const q = query(messagesRef, orderBy("timestamp", "asc")); // ASC = oldest to newest
    const snapshot = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(messages);
      setData(messages);
      setLoading(false);
    });

    return snapshot;
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);
  return (
    <>
    {
        loading ?<LoadingPage/> :
   
    <div className=" flex flex-col w-full h-[100dvh] ">
      <div className=" w-full ">
        <div className="flex items-center gap-2 md:pl-6 xs:pl-2 py-3 shadow-lg border-b-2 border-gray-200">
          <LogoIcon />
          <LogoText />
        </div>
      </div>

      <div className="flex-1  mx-auto overflow-y-auto  md:w-3/4 xs:w-full pb-1 pt-3 ">
      <div className=" flex flex-col gap-3 md:px-6 xs:px-2 md:w-[95%] xs:w-full mx-auto">

        {data?.map((message, i) => {
          return (
            //  <div className={`text-start p-2 bg-[#d0d4da97] rounded-2xl  ${message.role === 'user' ? 'self-end' : 'self-start'}`} key={message.id||i}>
            //   {message.role === 'user' ?message.content : <Markdown >{message.content}</Markdown>}
            //  </div>
            message.role === "user" ? (
              <div
                className={`text-start p-2 bg-[#dbdbdd] rounded-l-2xl rounded-br-2xl flex items-start gap-2  self-end relative m-2`}
                key={message.id || i}
                style={{borderTopRightRadius:"8px"}}
              >
                <span className="pr-2">{message.content}</span>
                <div className="absolute bottom-[20px] right-[-5px] bg-[#dbdbdd]   -z-20 h-4 w-4 rotate-45 text-xs text-gray-500" >

                </div>
              </div>
            ) : (
              <div className={`  self-start relative`} key={message.id || i}>
                {/* <div className='w-10 h-8 flex items-center justify-center'>
                                  <LogoIcon />
                                 </div> */}
                <div className="  text-start  p-2 bg-[#dbdbdd]  rounded-r-2xl rounded-bl-2xl w-full overflow-x-auto text-wrap"
                                style={{borderTopLeftRadius:"10px"}}

                >
                  {/* <Markdown >{message.content}</Markdown> */}
                  <MarkdownRenderer content={message.content} />
                  <div className="absolute top-[6px] left-[-6px] bg-[#dbdbdd]   z-20 h-4 w-4 rotate-45 text-xs text-gray-500" > </div>
                </div>
              </div>
            )
          );
        })}
        <div ref={divRef}></div>
      </div>
      </div>
    </div>
     }
    </>
  );
};

export default page;
