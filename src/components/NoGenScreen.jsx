import React from 'react'

const NoGenScreen = () => {
  return (
    <section className='flex-1 bg-[] overflow-x-auto w-full flex flex-col'>
       <div className='flex-1 flex justify-center items-center'>
        <div className='flex flex-col gap-7 justify-center items-center'>
                <h1 className='font-[700] text-[20px] leading-[26.78px] text-[#1B2559] tracking-widest'>EUNOM<span className='text-[blue]'>AI</span></h1>
       <span className='text-[24px] font-[600] text-[#1B2559] text-center'>Good day! How may I assist you today?</span>
        </div>
       </div>

       <section className='grid xs:grid-cols-1 xs:gap-2 sm:gap-4 sm:grid-cols-2 text-[14px] font-[400] text-[#718096]'>
         <div className='bg-[#DFEBF8] h-[76px] p-4 xs:hidden md:flex flex-col justify-center items-center rounded-lg'>
            <span>Answer all your questions.</span>
            <span>(Just ask me anything you like )</span>
         </div>
         <div className='bg-[#DFEBF8] h-[76px] p-4 flex flex-col justify-center items-center rounded-lg'>
            <span>Generate all the text you want.</span>
            <span>(Complete step-by-step website compliance) </span>
         </div>         <div className='bg-[#DFEBF8] h-[76px] p-4 xs:hidden md:flex flex-col justify-center items-center rounded-lg'>
            <span>Answer all your questions.</span>
            <span>(Just ask me anything you like )</span>
         </div>
         <div className='bg-[#DFEBF8] h-[76px] p-4 flex flex-col justify-center items-center rounded-lg'>
            <span>Generate all the text you want.</span>
            <span>(Complete step-by-step website compliance)</span>
         </div>       </section>
    </section>
  )
}

export default NoGenScreen
