"use client";
import LoadingPage from "@/components/LoadingPage";
import LogoText from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import MarkdownRenderer from "@/components/MarkDownRenderer";
import PromptBox2 from "@/components/PromptBox2";
import { db } from "@/config/firebaseClient";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { MdMenu } from "react-icons/md";

import { useUserAuth } from "@/app/context/userAuthContext";
// import Markdown from 'react-markdown';

const page = () => {
  const [chatLoading, setChatLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const divRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const user = useUserAuth();
  const router = useRouter();
  const { toggleSidebarHandler, toggleSidebar } = user;
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      router.push("/signin", { scroll: false });
    }
  }, []);
  useEffect(() => {
    const messagesRef = collection(db, "chats", params.id, "messages");
    setChatLoading(true);
    // setLoading(true);
    const q = query(messagesRef, orderBy("timestamp", "asc")); // ASC = oldest to newest
    const snapshot = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(messages);
      setData(messages);
      if (loading) setLoading(false);
    });
    setChatLoading(false);

    // setLoading(false);
    return snapshot;
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLoading, data]);
  return (
    <section className="flex-1 bg-[] flex flex-col w-full h-full ">
      <div className=" w-full xs:flex md:hidden justify-between items-center shadow-md border-b-2 border-gray-200">
        <div className="flex flex-1 items-center gap-2 md:pl-6 xs:pl-2 py-3  ">
          <LogoIcon />
          <LogoText />
        </div>
        {!toggleSidebar ? (
          <MdMenu className="w-10 h-10 mr-2" onClick={toggleSidebarHandler} />
        ) : (
          <AiOutlineClose
            className="w-8 h-8 mr-2"
            onClick={toggleSidebarHandler}
          />
        )}
      </div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="xs:w-full md:w-3/4 h-full mx-auto flex flex-col items-center">
          <div className="text-sm flex-1 flex flex-col gap-5 pt-3 overflow-y-auto w-full px-2">
            {data?.map((message, i) => {
              return (
                message.role === "user" ? (
                  <div
                    className="text-start p-2 bg-[#a6a8ab97] rounded-2xl flex items-start gap-2 self-end break-words max-w-full"
                    key={message.id || i}
                    style={{ wordBreak: "break-word", maxWidth: "90vw" }}
                  >
                    <span>{message.text}</span>
                  </div>
                ) : (
                  <div className="self-start max-w-full" key={message.id || i}>
                    <div className="text-start p-2 bg-[#cfd1d4ce] rounded-2xl w-full break-words max-w-full"
                      style={{ wordBreak: "break-word", maxWidth: "95vw" }}>
                      <MarkdownRenderer content={message.text} />
                    </div>
                  </div>
                )
              );
            })}
            {chatLoading && (
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              </div>
            )}
            <div ref={divRef}></div>
          </div>

          {/* Add your chat components here */}
          <div className="w-full pb-2">
            <PromptBox2
              // isFirst={isFirst}
              // setIsFirst={setIsFirst}
              // setSideBarData={setSideBarData}
              loading={loading}
              setChatLoading={setChatLoading}
              setLoading={setLoading}
              history={data}
              setData={setData}
            />
          </div>
        </div>
      )}
    </section>
  );
};



export default page;
