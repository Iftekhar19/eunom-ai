import React, { useEffect, useState } from 'react'
import DropDownArrow from './DropDownArrow';
import { dialCode } from '@/Data/dialCode';


const ContactInputControl = ({value,setValues,name}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [flags,setFlags]=useState([])
    const [showDropDown,setShowDropdown]=useState(false)
    useEffect(()=>
        {
        (async()=>
        {
         let flags=await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
         let data=await flags.json();
        //  console.log(data?.data)
         setFlags(data?.data||[])
         setSelectedCountry(data?.data[0])
        })()
        },[])
          

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false)
  };
  return (
    <div className='h-[52px] rounded-[45px] border flex items-center px-4 text-[16px] font-[400]  text-[#737373]'>
        <div className='w-[77px] relative'>
         <button className='flex items-center gap-2' onClick={()=>setShowDropdown(!showDropDown)}>
            <img src={selectedCountry?.flag} alt="" className='h-[22px] w-[38px] rounded-[4px]' />
            <DropDownArrow className={showDropDown?"rotate-180":"rotate-0"}/>
         </button>

         {showDropDown&& <div className='absolute border rounded-[10px] shadow-lg z-50 top-[35px] left-0 min-w-[85px] w-full bg-[#fff] flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1'>
             {
                flags.map((flag)=>(
                    <div className='w-full pl-1 pt-1 flex items-center gap-1' onClick={()=>handleCountryChange(flag)}>

                        <img src={flag?.flag} alt="" className='h-[22px] w-[38px]' />
                        <span className='font-[500] text-[12px] whitespace-nowrap'>{dialCode[flag?.name]}</span>
                        {/* {
                            flag?.flag==selectedCountry.flag &&(
                             <img src={checkImg} alt="" className='h-[22px] w-[38px]' />  
                            )
                        } */}
                    </div>
                ))
             }
            </div>}
       
        </div>
        <div className=''>
            {dialCode[selectedCountry?.name]} -
        </div>
        <div className='flex-1 '>
           <input type="number" className='w-full h-[40px] border-nobe outline-none ' />
        </div>
    </div>
  )
}

export default ContactInputControl
