import { useState, useRef, useEffect } from "react";
import SaveIcon from "./SaveIcon";
import ThreeDots from "./ThreeDots";
import ShareIcon from "./ShareIcon";
import RenameIcon from "./RenameIcon";
import DeleteIcon from "./DeleteIcon";
import DeletePopupModal from "./DeletePopupModal";
import SharePopupModal from "./SharePopupModal";
import img from "../../public/icons/deleteImage.gif";
import ShareBigIcon from "./ShareBigIcon";
import CopyIcon from "./CopyIcon";
import { useDisclosure ,  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,} from "@heroui/react";
import Link from "next/link";
import { useParams,useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userAuthContext";

export default function ChatList({ id, title }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const [editable, setEditable] = useState(false);
   const user=useUserAuth();
   const { toggleSidebarHandler } = user;
  const menuRef = useRef(null);
  const router = useRouter();
  const params = useParams();


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
    console.log(div);
    // Toggle contentEditable attribute on click
    div.contentEditable = div.contentEditable === "true" ? "false" : "true";
    if (div.contentEditable === "true") {
      // Focus the div
      div?.focus();
    } else {
      console.log("The div is not set as contentEditable=true.");
    }
    // Add event listener to detect clicks outside the div
    function clickOutsideHandler(event) {
      if (!div.contains(event.target)) {
        div.contentEditable = "false"; // Set contentEditable to false if clicked outside
        document.removeEventListener("click", clickOutsideHandler); // Remove event listener
      }
    }

    // Add event listener for clicks outside the div
    if (div.contentEditable === "true") {
      document.addEventListener("click", clickOutsideHandler);
    }
  }
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li className={`group relative flex items-center justify-between px-4 py-1 rounded-l-md text-sm text-gray-800 hover:bg-gray-200 transition cursor-pointer ${id==params.id ? "bg-gray-200" : ""}`}>
      <span className="truncate pl-1 flex-1 capitalize" onClick={(e)=>
        {
          e.stopPropagation();
          toggleSidebarHandler();
          router.push(`/dashboard/chats/${id}`);
          
        }
      } >{title}</span>
      {/* <Link className="truncate pl-1" href={`/dashboard/chats/${id}`}>{title}</Link> */}

      {/* Three Dots Button */}
      <div className="relative">
       
           <Menu
              className="flex-1 "
              id={id}
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              // deleteSideBarData={deleteSideBarData}
              copyText={copyText}
              setEditable={setEditable}
              toggleEditable={toggleEditable}
              title={title}
            />
      

 
      </div>
    </li>
  );
}

function Menu({
  className,
  isOpen: isOpen2,
  onOpen: onOpen2,
  onOpenChange: onOpneChange2,
   id,
  deleteSideBarData,
  copyText,
  setEditable,
  toggleEditable,
  title,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params=useParams()
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <>
      <Dropdown className={className + " "} placement="center-start">
        <DropdownTrigger onClick={(e) => e.stopPropagation()}>
          <button
            //   variant="bordered"
            className="bg-none border-none outline-none h-auto pt-1"
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
            // onClick={() => {
            //   toggleEditable(d.id);
              
            // }}
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
        // deleteSideBarData={deleteSideBarData}
        
        id={id}
        title={"Delete Chat?"}
      >
        <div className="h-full  flex flex-col items-center w-full justify-start gap-6">
          {/* <Image src={img} height={66} width={59} alt="delete image" /> */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[#1B2559] font-[700] text-[20px]">
              Delete Chat?
            </span>
            <div className="text-[#718096] font-[500] text-[16px]">
              This will delete {title}
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
                  {/* Messages you send after creating your link won't be shared. */}
                  Anyone with the URL will be able to view the shared chat.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#1B2559] font-[400] text-[14px]">
              Chat Link
            </span>
            <div className="border-[1px] border-[#DFE5EE] w-full py-4 px-5 flex items-center rounded-[24px]">
              <span
                className="text-[#1B2559] text-[16px] w-[90%] text-ellipsis overflow-x-clip font-[500] "
                id="chat-link"
              >
                {typeof window !== "undefined"
                  ? `${window.location.origin}/shared/chats/${id}`
                  : ""}
              </span>
              <button
                onClick={() => copyText("chat-link")}
                className="text-blue-500 flex items-center w-[80px] gap-1 "
              >
                <CopyIcon /> <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      </SharePopupModal>
    </>
  );
}

