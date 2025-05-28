'use client'
import React from 'react'

const InputBox = ({type,placeholder,value,onChange,name,errorMessage,...props}) => {
  return (
    <div className='flex flex-col gap-1'>

      <input className={`outline-[#5982e3c8] w-full  py-4 px-5 rounded-[24px] border-[1px] border-[#DFE5EE]`} type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />
    {
      errorMessage && (
        <span className='text-red-500 font-[400] text-[12px] ml-3 inline-block'>{errorMessage}</span>
      )
    }
    </div>
      
   
  )
}

export default InputBox
