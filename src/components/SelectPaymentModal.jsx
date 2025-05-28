import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import CloseIcon from "./CloseIcon";
import VisaIcon from "./VisaIcon";
import AddPaymentDetailsControls from "./AddPaymentDetailsControls";

export default function SelectPaymentModal({ isOpen, onOpen, onOpenChange }) {
  //   const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedDetails,setSelectedDetails]=useState("1")
  const [values,setValues]=useState({
    cardNumber:"",
    expiryMnY:"",
    cvv:"",
    city:""
  })
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
                  <span className="font-[700]  text-[24px] text-[#1B2559]">
                    Select a payment method
                  </span>
                  {/* <span onClick={onClose}>X</span> */}
                  <CloseIcon className="cursor-pointer" onClick={onClose} />
                </div>
              </ModalHeader>
              <ModalBody className="px-0">
                <div className="flex flex-col gap-7 w-full">
                  <div className="text-[16px] font-[400] text-[#718096]">
                    <p>
                      Select a payment method to use with your ChatGPT Plus
                      Subscription plan.
                    </p>
                  </div>
                  <div>
                    <RadioGroup
                     onChange={(e)=>setSelectedDetails(e.target.value)}
                     value={selectedDetails}
                    >
                      <Radio value="1" className="w-full">
                        <div className="w-full flex items-center gap-7 ">
                            <div className="flex items-center gap-1 text-[16px] font-[500] text-[#1B2559]">
                              <VisaIcon/>
                              <p>Visa ... 7654</p>
                            </div>
                            <div className="text-[16px] font-[500] text-[#1B2559]">
                            Expire 05/2036
                            </div>
                        </div>
                      </Radio>
                      <Radio
                        value="new"
                        className="text-[16px] font-[500] text-[#1B2559] mt-5"
                      >
                        Add Payment Method
                      </Radio>
                    </RadioGroup>
                  </div>
                  {selectedDetails=="new"&&(
                       <>
                    
                       <div>
                        <AddPaymentDetailsControls values={values} setValues={setValues}/>
                       </div>
                     </>
                    )}
               
                </div>
              </ModalBody>
              <ModalFooter className="px-0 ">
                <Button
                  className="w-full h-[52px] rounded-[45px] text-[#fff] text-[16px] font-[700]"
                  variant="light"
                  onPress={onClose}
                  style={{
                    background:
                      "linear-gradient(180deg, #0575E6 0%, #2948FF 100%)",
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
