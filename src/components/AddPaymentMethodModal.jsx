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
} from "@heroui/react";
import CloseIcon from "./CloseIcon";
import VisaIcon from "./VisaIcon";
import AddPaymentDetailsControls from "./AddPaymentDetailsControls";

export default function AddPaymentMethodModal({ isOpen, onOpen, onOpenChange }) {
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
                  Add payment method
                  </span>
                  {/* <span onClick={onClose}>X</span> */}
                  <CloseIcon className="cursor-pointer" onClick={onClose} />
                </div>
              </ModalHeader>
              <ModalBody className="px-0 py-5">
                <div className="flex flex-col gap-7 w-full">
                <AddPaymentDetailsControls values={values} setValues={setValues}/>
                 <div
                 className="text-center font-[500] text-[#718096] text-[12px]"
                 >By providing your card information, you allow EunomaAI to charge your card for future payments in accordance with their terms.</div>
                </div>
              </ModalBody>
              <ModalFooter className="px-0 ">
                <Button
                  className="w-full rounded-[45px] h-[52px] text-[#fff] text-[16px] font-[700]"
                  variant="light"
                  onPress={onClose}
                  style={{
                    background:
                      "linear-gradient(180deg, #0575E6 0%, #2948FF 100%)",
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
