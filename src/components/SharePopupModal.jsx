import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Button} from "@nextui-org/react";


export default function SharePopupModal({isOpen,onOpen2,onOpenChange,children}) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}
    //  className="w-[595px]"
     size="2xl"
      >
        <ModalContent
        className=" xs:p-3 sm:p-6 md:p-10"
        >
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1 ">{}</ModalHeader> */}
              <ModalBody className=" ">
                <div className=" bg-[] min-h-[100px] ">
                 
                {children}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center gap-6  ">
                <Button  className="text-[#fff] inline-block h-[53px] flex-1 border-[1px] border-[#DFE7EE] btn-bg   font-[700] text-[16px] px-[16px] rounded-[45px]" onPress={onClose}>
                  Done
                </Button>
            
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

