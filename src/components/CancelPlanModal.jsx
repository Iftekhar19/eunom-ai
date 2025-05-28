import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CloseIcon from "./CloseIcon";


export default function CancelPlanModal({ isOpen, onOpen, onOpenChange }) {
  //   const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="max-w-[595px] w-full p-0 xs:max-h-[98dvh] md:max-h-[85dvh]"
        hideCloseButton={true}
        backdrop="blur"
      >
        <ModalContent className="py-[24px] xs:px-5 md:px-[40px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b px-0">
                <div className="flex items-center justify-between">
                  <span className="font-[700]  text-[24px] text-[#1B2559]">Cancel your plan</span>
                  {/* <span onClick={onClose}>X</span> */}
                  <CloseIcon className="cursor-pointer" onClick={onClose} />
                </div>
              </ModalHeader>
              <ModalBody className="px-0">
                <div className="flex flex-col gap-7 w-full">
                 <div className="flex items-center ">
                    <div className="flex flex-col justify-between text-[#1B2559] flex-1">
                        <p className="text-[14px] font-[600] ">ChatGPT Plus Subscription</p>
                        <h1 className="text-[28px] font-[700]">$25 per month</h1>
                    </div>
                        <Button className="bg-[#EAEFF4] w-[152px] flex justify-center items-center h-[44px] rounded-[45px] text-[14px] font-[700] text-[#718096]">Current Plan</Button>
                 </div>
                    <div className="text-[14px] font-[500] text-[#718096]">
                 Your plan will be canceled, but is still available until the end of your billing period on <span className="font-[700] text-[#1B2559]">12 May 2024</span>.
                 </div>
                 <div className="text-[14px] font-[500] text-[#718096]">
                 If you change your mind, you can renew your subscription.
                 </div>
                </div>
              </ModalBody>
              <ModalFooter className="px-0 ">
                <Button className="w-full rounded-[45px] h-[52px] text-[#fff] text-[16px] font-[700]"  variant="light" onPress={onClose} style={{
                    background: "linear-gradient(180deg, #EE6A5F 0%, #D45146 100%)"

                }}>
                Cancel Plan
                </Button>
                
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
