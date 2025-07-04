import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import CloseIcon from "./CloseIcon";
import PlanCard from "./PlanCard";
import Link from "next/link";

export default function UserPlanModal({ isOpen, onOpen, onOpenChange }) {
  //   const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="max-w-[595px] w-full p-0"
        hideCloseButton={true}
        backdrop="blur"
      >
        <ModalContent className="py-[24px] xs:px-5 md:px-[40px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b px-0">
                <div className="flex items-center justify-between">
                  <span>Upgrade your plan</span>
                  {/* <span onClick={onClose}>X</span> */}
                  <CloseIcon className="cursor-pointer" onClick={onClose} />
                </div>
              </ModalHeader>
              <ModalBody className="px-0">
                <div className="flex flex-col gap-2 w-full">
                  <PlanCard>
                    {/* left */}
                    <div className="flex flex-col gap-2 ">
                      <span className="inline-block py-2 px-4 bg-[#1EC56C14] rounded-3xl w-min whitespace-nowrap text-[#1EC56C] text-[10px] font-[700] uppercase">
                        1 month
                      </span>
                      <h1 className="text-[#1B2559] font-[700] text-[24px]">
                        $25/month
                      </h1>
                      <p className="text-[12px] font-[500] text-[#718096] flex flex-col">
                        <span>$25* every 1 month </span>
                        <span>* VAT and local taxes may apply</span>
                      </p>
                    </div>
                    {/* right */}

                    <div>
                      <Link href={`/billing?plan=25&duration=1m`} className="bg-[#EAEFF4] font-[700] text-[#718096] text-[14px] capitalize  px-4 rounded-[45px]  h-[45px] flex justify-center items-center">
                       your current plan
                      </Link>
                    </div>
                  </PlanCard>
                  <PlanCard>
                    {/* left */}
                    <div className="flex flex-col gap-2 ">
                      <span className="inline-block py-2 px-4 bg-[#E99E2D14] rounded-3xl w-min whitespace-nowrap text-[#E99E2D] text-[10px] font-[700] uppercase">
                        6 month
                      </span>
                      <h1 className="text-[#1B2559] font-[700] text-[24px]">
                        $20/month
                      </h1>
                      <p className="text-[12px] font-[500] text-[#718096] flex flex-col">
                        <span>$120* every 6 month </span>
                        <span>* VAT and local taxes may apply</span>
                      </p>
                    </div>
                    {/* right */}

                    <div>
                      <button className="btn-bg font-[700] capitalize text-[#fff] text-[14px]  px-4 rounded-[45px]  h-[45px] flex justify-center items-center">
                        upgrade now
                      </button>
                    </div>
                  </PlanCard>
                  <PlanCard>
                    {/* left */}
                    <div className="flex flex-col gap-2 ">
                      <span className="inline-block py-2 px-4 bg-[#9256F514] rounded-3xl w-min whitespace-nowrap text-[#9256F5] text-[10px] font-[700] uppercase">
                        12 month
                      </span>
                      <h1 className="text-[#1B2559] font-[700] text-[24px]">
                        $15/month
                      </h1>
                      <p className="text-[12px] font-[500] text-[#718096] flex flex-col">
                        <span>$180* every 12 month </span>
                        <span>* VAT and local taxes may apply</span>
                      </p>
                    </div>
                    {/* right */}

                    <div>
                    <button className="btn-bg font-[700] capitalize text-[#fff] text-[14px]  px-4 rounded-[45px]  h-[45px] flex justify-center items-center">
                        upgrade now
                      </button>
                    </div>
                  </PlanCard>
                </div>
              </ModalBody>
              <ModalFooter className="px-0 border-t">
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
                <div className="w-full text-[#718096] font-[500] text-[12px] flex flex-col justify-center items-center gap-1">
                  <span className="underline">Manage my subscription</span>
                  <span>I need help with a billing issue</span>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
