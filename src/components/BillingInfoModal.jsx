import React, { useEffect, useState } from "react";
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
import InputControl from "./InputControl";
import DropDown from "./DropDown";
import ContactInputControl from "./ContactInputControl";

export default function BillingInfoModal({ isOpen, onOpen, onOpenChange }) {

  const [selectedDetails,setSelectedDetails]=useState("0")
  const [values,setValues]=useState({
    name:"",
    contact:"",
    country:"",
    city:"",
    addressLine1:"",
    addressLine2:"",
    postcode:""
  })

  const [countryIndex,setCountryIndex]=useState(0)
  const [cityIndex,setCityIndex]=useState(0)

  const [states,setStates]=useState([])

  useEffect(()=>
{
    (async()=>{
        try {
            let d=await fetch("https://countriesnow.space/api/v0.1/countries")  
            d=await d.json();
            // console.log(d)
            setStates(d?.data||[])
            setValues({...values,country:d?.data[0]?.country,city:d?.data[0]?.cities[0]})
            
        } catch (error) {
           console.log(error) 
        }
     
    })()

},[])
useEffect(()=>
{
// console.log(values)
},[values])
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
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
                  Billing Information
                  </span>
                  {/* <span onClick={onClose}>X</span> */}
                  <CloseIcon className="cursor-pointer" onClick={onClose} />
                </div>
              </ModalHeader>
              <ModalBody className="px-0  pt-4 overflow-y-auto">
                <div className="flex flex-col gap-6 w-full">
                 <div className="flex flex-col gap-2">
                    <InputControl value={values.name} placeholder={"Name"} setValues={setValues} name={"name"}/>
                    <ContactInputControl value={values.contact} name={"contact"}/>
                 </div>
                 <div className="flex flex-col gap-2">
                  <label className="text-[16px] font-[400] pl-2 text-[#737373]">Address</label>
                  <DropDown name={"country"} value={values.country} setValues={setValues} isBilling={true} setCountryIndex={setCountryIndex} countryIndex={countryIndex} data={states}/>
                  <InputControl value={values.addressLine1} placeholder={"Address Line 1"} setValues={setValues} name={"addressLine1"}/>
                  <InputControl value={values.addressLine2} placeholder={"Address Line 2"} setValues={setValues} name={"addressLine2"}/>
                  {/* <InputControl value={values.city} placeholder={"City"} setValues={setValues} name={"city"}/> */}
                  <InputControl value={values.postcode} placeholder={"Postcode"} setValues={setValues} name={"postcode"}/>
                  <DropDown name={"city"} value={values.city} setValues={setValues} setCountryIndex={setCityIndex} countryIndex={cityIndex} isBilling={true} data={states[countryIndex]?.cities}/>
                 </div>
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
