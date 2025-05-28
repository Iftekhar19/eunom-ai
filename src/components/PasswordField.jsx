import React, { useState } from 'react'
import EyeIcon from './EyeIcon'
import EyeIconDisable from './EyeIconDisable'

const PasswordField = ({value,errorMessage,...props}) => {
    const [passwordToggle,setPasswordToggle]=useState(false)
  return (
    <div className='flex flex-col gap-1'>

    <div className='flex relative items-center w-full rounded-[24px] overflow-hidden   '>
      <input {...props} type={!passwordToggle?"password" :"text"} value={value} className={` outline-[#5982e3c8] rounded-[24px] border-[1px] border-[#DFE5EE] w-full h-full py-5  px-5  `}/>
      <span onClick={()=>setPasswordToggle(!passwordToggle)} className='absolute cursor-pointer top-[20px] z-10 right-3'>{!passwordToggle?<EyeIconDisable/>:<EyeIcon/>}</span>
    </div>
    {
        errorMessage&& <span className='text-red-500 font-[400] text-[12px] ml-3 inline-block'>{errorMessage}</span>
    }
    
    </div>
  )
}

export default PasswordField
