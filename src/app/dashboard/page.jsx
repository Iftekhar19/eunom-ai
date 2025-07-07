"use client";
import React, { useEffect, useRef, useState } from "react";

import NoGenScreen from "@/components/NoGenScreen";
import PromptBox from "@/components/PromptBox";
import PromptBox2 from "@/components/PromptBox2";
import GenerateIcon from "@/components/GenerateIcon";
import PromptBoxIcon from "@/components/PromptBoxIcon";
import { useUserAuth } from "../context/userAuthContext";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { genContent } from "@/utils/genContent";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
import LogoIcon from "@/components/LogoIcon";
import LogoText from "@/components/Logo";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
const page = () => {
  const user = useUserAuth();
  const {toggleSidebarHandler,toggleSidebar} = user;
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const temp = useRef(null);
  // const user = useUserAuth();
  // const [sideBarData, setSidebarData] = useState(data);
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  // const [isFirst,setIsFirst]=useState(true)
  // const router = useRouter()
  //   useEffect(()=>
  // {

  //   console.log(user)
  //  if(user && user?.user?.hasOwnProperty("uid"))
  //  {
  //    console.log("there is")
  //  }
  //  else{
  // router.push("/signup")
  //  console.log("nothing is there")
  //  }

  // },[user])

  const onSend = async function (e) {
    // console.log("Message sent:", prompt);
    // console.log( user?.user?.uid);

    e.preventDefault(); // Prevent default form submission
    if (!prompt.trim()) {
      console.log("Prompt is empty, not sending.");
      return; // Don't send if prompt is empty
    }
    // Here you can add your logic to send the prompt

    try {
      setLoading(true);

      const aiResponse = await genContent(prompt);
      const cleanedContent = aiResponse.replace(
        /```(\w+)?\n([^\n]+)\n```/g,
        (_, lang, code) =>
          code.length < 30
            ? "`" + code + "`"
            : "```" + (lang || "") + "\n" + code + "\n```"
      );

      // 1. Create a new chat document
      const chatRef = await addDoc(collection(db, "chats"), {
        title: prompt.slice(0, 30) + "...",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: user?.user?.uid,
        model: "gemini-pro",
        timestamp: serverTimestamp(),
      });

      console.log("Chat created with ID:", chatRef.id);
      //  message ref
      const messageRef = collection(db, "chats", chatRef.id, "messages");
      // 2. Add user message
      await addDoc(messageRef, {
        role: "user",
        content: prompt,
        timestamp: serverTimestamp(),
      });

      // 3. Add AI response
      await addDoc(messageRef, {
        role: "ai",
        content: cleanedContent,
        timestamp: serverTimestamp(),
      });
      setPrompt(""); // Clear the prompt after sending
      // Add your send logic here
      console.log("Messages saved!");
      setLoading(false);
      // Redirect to the chat page
      router.push(`/dashboard/chats/${chatRef.id}`);
      return chatRef.id;
    } catch (error) {
      console.error("Error creating chat:", error);
      // setLoading(false);
    }
  };
  const onImageUpload = function (file) {
    console.log("Add image clicked", file);
    // Add your image upload logic here
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    let base64Image;
    reader.onloadend = () => {
      setSelectedFile(reader.result.split(",")[1]); // Get base64 without prefix
      // base64Image = reader.result.split(',')[1]; // Get base64 without prefix
    };
    if (e.target.files[0]) {
      setBlobUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      router.push("/signin", { scroll: false });
    }
  }, []);
  return (
    <section className="flex-1  ">
      <div className="max-w-[1000px] w-full h-full mx-auto  overflow-y-auto flex flex-col  items-center">
          <div className=" w-full xs:flex md:hidden justify-between items-center shadow-md border-b-2 border-gray-200">
        <div className="flex flex-1 items-center gap-2 md:pl-6 xs:pl-2 py-3  ">
          <LogoIcon />
          <LogoText />
        </div>
       {!toggleSidebar? <MdMenu className='w-10 h-10 mr-2'  onClick={toggleSidebarHandler} />:
        <AiOutlineClose className='w-8 h-8 mr-2' onClick={toggleSidebarHandler}/>}

      </div>
        {loading ? (
          <div className="w-full flex-1 ">
            <LoadingPage />
          </div>
        ) : (
          <NoGenScreen />
        )}

        <div className="xs:w-full md:w-3/4">
          <form
            name="prompt"
            className="flex items-center  gap-2 w-full py-2  rounded-lg border border-gray-300 shadow-md bg-white mt-2 overflow-hidden px-2"
          >
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <button
              onClick={handleAddImageClick}
              className="p-2 rounded-full hover:bg-gray-200 transition flex justify-center items-center"
              disabled={isUploading}
            >
              <PromptBoxIcon className="inline-block " />
              {/* <Paperclip className="w-5 h-5 text-gray-600" /> */}
            </button>

            <textarea
              name=""
              id=""
              className="flex-1 resize-none border-none outline-none p-2 bg-transparent max-h-60 overflow-y-auto"
              rows={1}
              placeholder="Type your message..."
              style={{
                height: "auto",
                minHeight: "40px",
              }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              form="prompt"
              type="submit"
              className="bg-blue-600 text-white  p-2 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={isUploading || !prompt.trim()}
              onClick={onSend}
            >
              <GenerateIcon />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
