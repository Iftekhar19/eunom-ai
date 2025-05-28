import React, { useState } from "react";
import PromptBoxIcon from "./PromptBoxIcon";
import GenerateIcon from "./GenerateIcon";

const MAX_CHARACTER_COUNT = 500;

const PromptBox = ({setIsFirst,isFirst,setSideBarData}) => {
  const [prompt, setPrompt] = useState("");
  const generateContent=async()=>
    {
      if(isFirst)
        {
          setIsFirst(false)
          setSideBarData((old)=>
          {
            let data=[...old]
            data.push({
              id:`${data.length}`,
              text:prompt
            })
            data.reverse()
            return data;
          })
        }

    }
  return (
    <div className="w-full xs:py-2 md:py-6 flex flex-col items-center">
 <div
 className="flex items-center bg-[#FFFFFF] min-h-[60px] rounded-[30px] w-full py-[6px] pl-5 pr-[6px] gap-3"
 style={{ boxShadow: "0px 8px 24px -4px #00000014" }}
 >
 <PromptBoxIcon />
 <div className="flex-1 flex flex-col">
 <textarea
 name=""
 id=""
 onChange={(e) => {
 setPrompt(e.target.value.slice(0, MAX_CHARACTER_COUNT));
            }}
 value={prompt}
 className="resize-none xs:py-1 sm:py-2 outline-none w-full text-[#00000066] font-[500] text-[14px] flex-grow"
 placeholder="Enter your prompt here..." // Added placeholder
 ></textarea>
 <div className="text-right text-xs text-gray-500 mt-1">
            {prompt.length}/{MAX_CHARACTER_COUNT}
 </div>


        </div>

        <button onClick={generateContent} className="flex justify-center items-center h-[48px] w-[48px] rounded-full promptIconBox">
          <GenerateIcon />
        </button>
      </div>
    </div>
  );
};

export default PromptBox;
