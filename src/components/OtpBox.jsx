"use client";
import React, { useEffect, useRef, useState } from "react";

const OtpBox = ({ length = 6, credentials, setCredendials, otp, setOtp }) => {
  const otpRef = useRef([]);
//   console.log(otpRef);

  const OtpHandleChange = (e, index) => {
    const value = e.target.value;
    if(isNaN(value)) return
    let tempOtp= [...otp]
    tempOtp[index]=value.substring(value.length-1)
    setOtp(tempOtp)

    if(value && index<(6-1) && otpRef.current[index+1])
    {
        otpRef.current[index+1].focus()
    }
   
  };
  const otpHandleClick = (index) => {
    otpRef.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      otpRef.current[otp.indexOf("")].focus();
    }
  };
  const HandleKeyDown = (e, index) => {
    // if(e.key==="Backspace" && !otp[index]  && index>0 &&otpRef.current[index-1] )
    // {
       
    //     otpRef.current[index-1].focus()
    // }
    // const value = e.target.value;
    // if(value && index>(0) && otpRef.current[index-1])
    // {
    //     otpRef.current[index-1].focus()
    // }
    if (
        e.key === "Backspace" &&
        !otp[index] &&
        index > 0 &&
        otpRef.current[index - 1]
      ) {
        // Move focus to the previous input field on backspace
        otpRef.current[index - 1].focus();
      }
  };
  useEffect(() => {
    if(otpRef.current[0])
    {
        otpRef.current[0].focus() 
    }
  },[]);
  return (
    <div className="w-full  flex items-center gap-2 px-4 justify-center">
      {otp.map((data, index) => {
        return (
          <input
            type="text"
            onWheel={(e) => e.target.blur()}
            ref={(input) => (otpRef.current[index] = input)}
            onChange={(e) => OtpHandleChange(e, index)}
            onClick={() => otpHandleClick(index)}
            onKeyDown={(e) => HandleKeyDown(e, index)}
            key={index}
            value={otp[index]}
            className="xs:max-w-[50px] sm:max-w-[60px] px-4 py-5 text-center  rounded-[24px] border-[1px] border-[#DFE5EE] outline-[#6767f0df]"
          />
        );
      })}
    </div>
  );
};

export default OtpBox;
