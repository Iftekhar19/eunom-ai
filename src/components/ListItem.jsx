'use client'
import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import SaveIcon from "./SaveIcon";
import ThreeDots from "./ThreeDots";
import ShareIcon from "./ShareIcon";
import RenameIcon from "./RenameIcon";
import DeleteIcon from "./DeleteIcon";
import DeletePopupModal from "./DeletePopupModal";
// import {AddNoteIcon} from "./AddNoteIcon.jsx";
// import {CopyDocumentIcon} from "./CopyDocumentIcon.jsx";
// import {EditDocumentIcon} from "./EditDocumentIcon.jsx";
// import {DeleteDocumentIcon} from "./DeleteDocumentIcon.jsx";
import img from "../../public/icons/deleteImage.gif";
import Image from "next/image";
import SharePopupModal from "./SharePopupModal";
import ShareBigIcon from "./ShareBigIcon";
import CopyIcon from "./CopyIcon";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const ListItem = ({ d, deleteSideBarData,params }) => {

  const router=useRouter();
  // console.log(object)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editable,setEditable]=useState(false)
  // const ref=useRef()
  // useEffect(() => {
  //   Array.from(document.querySelectorAll("#li-hover")).map((ele, index) => {
  //     ele?.addEventListener("click", (e) => {
        
  //       document
  //         .querySelectorAll("#li-hover")
  //         ?.forEach((el) => el?.classList?.remove("item-hover"));

  //       e.stopPropagation();

  //       document
  //         .querySelectorAll("#li-hover")
  //         [index]?.classList?.add("item-hover");
  //     });
  //   });
  // }, []);
  // console.log(id)
  useEffect(() => {
    document?.querySelectorAll("#li-hover").forEach((li, index) => {
      li?.addEventListener("mouseover", (e) => {
        // document.querySelectorAll("#li-hover")?.forEach((el)=>el?.classList?.toggle("hide"))
        // console.log(document.querySelectorAll("#li-hover")[index]);
        e.stopPropagation();
        li.classList.add("item-hover2");
        document.querySelectorAll(".hide")[index]?.classList?.add(".hide");
      });
      li.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        li.classList.remove("item-hover2");
        document.querySelectorAll(".hide")[index]?.classList?.remove(".hide");
      });
    });
  }, []);

  const copyText = (elementId) => {
    // Select the element with the provided ID
    var element = document.getElementById(elementId);

    // Get the text content of the element
    var text = element.innerText;

    // Use the Clipboard API to copy the text
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  function toggleEditable(divId) {
    var div = document.getElementById(divId);
    console.log(div)
    // Toggle contentEditable attribute on click
    div.contentEditable = div.contentEditable === 'true' ? 'false' : 'true';
    if (div.contentEditable === 'true') {
        // Focus the div
        div?.focus();
      } else {
        console.log('The div is not set as contentEditable=true.');
      }
    // Add event listener to detect clicks outside the div
    function clickOutsideHandler(event) {
      if (!div.contains(event.target)) {
        div.contentEditable = 'false'; // Set contentEditable to false if clicked outside
        document.removeEventListener('click', clickOutsideHandler); // Remove event listener
      }
    }
  
    // Add event listener for clicks outside the div
    if (div.contentEditable === 'true') {
        
      document.addEventListener('click', clickOutsideHandler);
    }
  }
  
  return (
    <>
   
    
     
      <li
        id="li-hover"
        className={`flex items-center text-[14px] cursor-pointer font-[400] rounded-l-[24px]  
        relative grow overflow-hidden whitespace-nowrap
         ${d.id==(params &&params[0])?"bg-[#e7eaefea] text-[#1A5CF4]":""} 
        capitalize
        pl-[10px]
        `}
      
      >
         <Link
    href={`/dashboard/${d.id}`}
    replace
    className="flex-1 sideLink overflow-hidden text-ellipsis whitespace-nowrap"
    >
        <div className="     py-2 " id={d.id}  >{d.text}</div></Link>
        {
          d.id==(params && params[0]) &&(
<div className="  to-transparent pl-1 bg-[#dfe5ef97] rounded-l-[24px] flex min-w-20 from-60%  items-center gap-1">
          <Menu
            className="flex-1"
            d={d}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            deleteSideBarData={deleteSideBarData}
            copyText={copyText}
            setEditable={setEditable}
            toggleEditable={toggleEditable}
           
          />
          {/* <span className='flex-1'> */}
          <SaveIcon className="flex-1" />
          {/* </span> */}

          <p className="h-[30px]  rounded-l-[100%]  border-l-[2px] border-l-[blue]  flex justify-center items-center ml-2 px-1 pl-2 relative before-dot">
            <span className="w-[15px] h-[15px] rounded-full bg-[blue]"></span>
          </p>
        </div>
          )
        }
        
      </li>
      {/* </Link> */}
      
    </>
  );
};

export default ListItem;
// bg-gradient-to-l

function Menu({
  className,
  isOpen: isOpen2,
  onOpen: onOpen2,
  onOpenChange: onOpneChange2,
  d,
  deleteSideBarData,
  copyText,
  setEditable
  ,
  toggleEditable,

  
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <>
      <Dropdown className={className + " "} placement="center-start">
        <DropdownTrigger onClick={(e) => e.stopPropagation()}>
          <button
            //   variant="bordered"
            className="bg-none border-none outline-none h-full"
          >
            <ThreeDots className="" width={20} />
          </button>
          {/* <span className='px-1'>
            ...
        </span> */}
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          <DropdownItem
            key="new"
            className="text-[14px] font-[500] text-[#1B2559]"
            //   shortcut="⌘N"
            startContent={<ShareIcon />}
            onClick={onOpen}
          >
            Share
          </DropdownItem>
          <DropdownItem
            key="copy"
            className="text-[14px] font-[500] text-[#1B2559]"
            //   shortcut="⌘C"
            startContent={<RenameIcon />}
            onClick={()=>
                {toggleEditable(d.id)
                    // tempref?.current?.focus()
                }
            }
          >
            Rename
          </DropdownItem>
          <DropdownItem
            key="edit"
            className="text-[14px] font-[500] text-[#1B2559]"
            //   shortcut="⌘⇧E"
            startContent={<DeleteIcon height={16} width={16} />}
            onClick={onOpen2}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeletePopupModal
        onOpen={onOpen2}
        isOpen={isOpen2}
        onOpenChange={onOpneChange2}
        deleteSideBarData={deleteSideBarData}
        id={d.id}
        title={"Delete Chat?"}
      >
        <div className="h-full  flex flex-col items-center w-full justify-start gap-6">
          <Image src={img} height={66} width={59} alt="delete image" />
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[#1B2559] font-[700] text-[20px]">
              Delete Chat?
            </span>
            <div className="text-[#718096] font-[500] text-[16px]">
              This will delete {d.text}
            </div>
          </div>
        </div>
      </DeletePopupModal>
      <SharePopupModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="h-full  gap-9 flex flex-col">
          <div>
            <div className="flex gap-4">
              <ShareBigIcon height={72} width={72} />
              <div className="flex flex-1 flex-col items-start gap-2">
                <h1 className="text-[20px] font-[700] text-[#1B2559]">
                  Share Link To Chat
                </h1>
                <p className="text-[#718096] font-[500] text-[16px]">
                  Messages you send after creating your link won't be shared.
                  Anyone with the URL will be able to view the shared chat.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#1B2559] font-[400] text-[14px]">
              Chat Link
            </span>
            <div className="border-[1px] border-[#DFE5EE] py-4 px-5 flex items-center rounded-[24px]">
              <span className="text-[#1B2559] text-[16px] flex-1 text-ellipsis overflow-x-clip font-[500]" id="chat-link">
                aap.eunomai.com/projects/website
              </span>
              <button onClick={()=>copyText("chat-link")} className="text-blue-500 flex items-center gap-1">
                <CopyIcon /> <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      </SharePopupModal>
    </>
  );
}
