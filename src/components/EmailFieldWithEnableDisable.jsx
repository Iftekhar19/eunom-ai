
import React, { useState } from 'react'


const EmailFieldWithEnableDisable = ({value,errorMessage,...props}) => {
    const [passwordToggle,setPasswordToggle]=useState(false)
  return (
    <div className='flex flex-col gap-1'>

    <div className='flex relative items-center w-full rounded-[24px] overflow-hidden   '>
      <input {...props} type='text' readOnly={!passwordToggle} value={value} className={ ` ${!passwordToggle?"bg-[#c9c7c77d]":"bg-transparent"} outline-[#5982e3c8] rounded-[24px] border-[1px] border-[#DFE5EE] w-full h-full py-5  px-5  `}/>
      <span onClick={()=>setPasswordToggle(!passwordToggle)} className='absolute cursor-pointer top-[20px] z-10 right-3'>{<button className='text-[#5982e3c8]' onClick={()=>setPasswordToggle(!passwordToggle)}>edit</button>}</span>
    </div>
    {
        errorMessage&& <span className='text-red-500 font-[400] text-[12px] ml-3 inline-block'>{errorMessage}</span>
    }
    
    </div>
  )
}
export default EmailFieldWithEnableDisable
