import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@heroui/react";
import { emailValidation } from "@/utils/emaiValidatiom";
import { checkUser } from "@/utils/checkUser";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export default function ForgotPasswordModal({isOpen,onOpen,onOpenChange}) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [email, setEmail] = React.useState("")
const [errors,setErrors]=React.useState({
    emailError:"",
    apiError:""
})
const [responseMessage,setResponseMessage]=useState({
    issError:false,
    err:""
})
const [loading,setLoading]=useState(false)
const sendVerificationLink=async()=>
{
    if(email.trim()=="")
    {
      setErrors({...errors,emailError:"Email is required"})
      return;
    }
    if(!emailValidation(email.trim()))
    {
        setErrors({...errors,emailError:"Invalid email"})
        return;
    }
    try {
        setLoading(true)
        let res=await checkUser(email)
        if(!res)
        {
            throw new Error("Email does not exist")
        }
        else{
         await  sendPasswordResetEmail(auth,email) 
         setResponseMessage({
            ...responseMessage,
            err:`Password reset link has been sent to the ${email} please check your email rest password`
         })
         setLoading(false)
        }
    } catch (error) {
         setLoading(false)
         setErrors({
            ...error,
            apiError:error.message
         })
    }
}
  return (
    <>
      
      <Modal 
      placement={"bottom"}
      isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent  >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Forgot Password</ModalHeader>
              <ModalBody  >
               <div className="xs:h-[70vh] sm:h-[200px] flex flex-col gap-2 ">
                {
                    (errors.emailError || errors.apiError) && <p className="text-red-500 font-[400] text-[12px]"> {errors.emailError || errors.apiError}</p>
                }
                <div className="w-full flex gap-1 items-center">
                    <input className="flex-1 px-2 py-3 outline-[#5982e3c8]  border-[1px] border-[#DFE5EE]" type="text" placeholder="Enter Email Address" value={email} onChange={(e)=>setEmail(e.target.value.trim())} />
                    <button className={` px-2 py-3 btn-bg text-white ${loading?"pointer-events-none":"pointer-events-auto"}`} onClick={sendVerificationLink}>Send Link</button>
                </div>

                <div>
                {
                    responseMessage.err && <p className="text-green-500 font-[400] text-[14px]"> {responseMessage.err }</p>
}
                </div>
               </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
