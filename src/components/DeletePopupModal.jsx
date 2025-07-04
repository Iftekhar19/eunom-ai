import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Button, useDisclosure} from "@heroui/react";


export default function DeletePopupModal({isOpen,onOpen,onOpenChange,children,title,deleteSideBarData,id}) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}
      size="2xl"

      >
        <ModalContent
        // className="w-[471px]  "
        className="p-10"
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">{}</ModalHeader>
              <ModalBody className=" ">
                <div className=" bg-[] min-h-[100px] ">
                 
                {children}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center gap-6 ">
                <Button  className=" inline-block h-[53px] flex-1 border-[1px] border-[#DFE7EE] bg-[#1A5CF40A] text-[#718096] font-[700] text-[16px] px-[16px]" onPress={onClose}>
                  cancel
                </Button>
                <Button className=" text-[white] flex-1 inline-block h-[53px] " onPress={()=>{
                    deleteSideBarData(id);
                    onClose();
                }}
                style={{background: "linear-gradient(180deg, #FF6D6D 0%, #EA4335 100%)"
                }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
