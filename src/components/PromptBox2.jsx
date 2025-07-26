// components/PromptBox.js
import { useState, useRef } from "react";
import PromptBoxIcon from "./PromptBoxIcon";
import GenerateIcon from "./GenerateIcon";
import uploadImage from "@/utils/uploadImage";
import { useParams } from "next/navigation";
import { genContent } from "@/utils/genContent";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebaseClient";

export default function PromptBox2({
  setData,
  setLoading,
  loading,
  setChatLoading,
  history,
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const params = useParams();

  const handleSend = async () => {
    if (!prompt || prompt.trim() === "") return;

    await setData((old) => {
      let data = [...old];
      data.push({
        id: `${data.length}`,
        text: prompt,
        role: "user",
        timestamp: new Date().toISOString(),
      });
      return data;
    });
    // setLoading(true);
    setChatLoading(true);
    try {
      const res = await genContent(prompt);
      const cleanedContent = res.replace(
        /```(\w+)?\n([^\n]+)\n```/g,
        (_, lang, code) =>
          code.length < 30
            ? "`" + code + "`"
            : "```" + (lang || "") + "\n" + code + "\n```"
      );

      await addDoc(collection(db, "chats", params.id, "messages"), {
        role: "user",
        text: prompt,
        timestamp: serverTimestamp(),
      });
      await addDoc(collection(db, "chats", params.id, "messages"), {
        role: "model",
        text: cleanedContent,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("Error sending message:", error);
    }
    // setLoading(false);
    setChatLoading(false);
    setPrompt("");
  };

  // Add new user message, send to API, append AI response
  const sendMessage = async (msg) => {
    if (!prompt || prompt.trim() === "") return;

   try {
    setChatLoading(true);
     const updatedHistory = [...history, { role: "user", text: prompt }];
     await setData((old) => {
       let data = [...old];
       data.push({
         id: `${data.length}`,
         text: prompt,
         role: "user",
         timestamp: new Date().toISOString(),
       });
       return data;
     });
     // setPending(true);
     const res = await fetch("/api/generate", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ history: updatedHistory }),
     });
     const data = await res.json();
     const cleanedContent = data.output.replace(
       /```(\w+)?\n([^\n]+)\n```/g,
       (_, lang, code) =>
         code.length < 30
           ? "`" + code + "`"
           : "```" + (lang || "") + "\n" + code + "\n```"
     );
 
     // setData([...updatedHistory, { role: "model", text: data.output }]);
     await addDoc(collection(db, "chats", params.id, "messages"), {
       role: "user",
       text: prompt,
       timestamp: serverTimestamp(),
     });
     await addDoc(collection(db, "chats", params.id, "messages"), {
       role: "model",
       text: cleanedContent,
       timestamp: serverTimestamp(),
     });
     setPrompt("");
   } catch (error) {
    console.log(error.message)
   }
   finally{
    setChatLoading(false);
   }
   
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
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

  const generateContent = async () => {
    // if (isFirst) {
    //   setIsFirst(false)
    //   setSideBarData((old) => {
    //     let data = [...old]
    //     data.push({
    //       id: `${data.length}`,
    //       text: prompt
    //     })
    //     data.reverse()
    //     return data;
    //   })
    // }
    // else {
    //   console.log(prompt)
    // }
    // setPrompt("")

    // if (prompt.trim() !== "") return;
    // console.log(selectedFile);
    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ base64Image: selectedFile }),
    // });

    // const data = await res.json();
    // if (data.url) setUploadedUrl(data.url);
    // else alert("Upload failed");
  };

  return (
    <div className="flex items-end p-2 border rounded-xl shadow-md bg-white mt-2 w-full">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Image Add Button */}
      <button
        onClick={handleAddImageClick}
        className="p-2 rounded-full hover:bg-gray-200 transition flex justify-center items-center"
        disabled={isUploading}
      >
        <PromptBoxIcon className="inline-block " />
        {/* <Paperclip className="w-5 h-5 text-gray-600" /> */}
      </button>

      {/* Textarea with auto-resize */}
      <textarea
        className="flex-1 resize-none border-none outline-none p-2 bg-transparent max-h-60 overflow-y-auto"
        rows={1}
        placeholder="Type your message..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          height: "auto",
          minHeight: "40px",
        }}
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="p-2 rounded-full hover:bg-blue-500 transition text-white bg-blue-600"
      >
        <GenerateIcon />
      </button>
    </div>
  );
}
