import { Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import VisaIcon from './VisaIcon'
import AxIcon from './AxIcon'
import MasterCardIcon from './MasterCardIcon'
import CardIconGroup from './CardIconGroup'

const AddPaymentDetailsControls = ({values,setValues}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center h-[52px] w-full rounded-3xl border border-[#DFE5EE] pr-5'>
            <input type="text" name='cardNumber' value={values.cardNumber} onChange={(e)=>setValues((old)=>({...old,[e.target.name]:e.target.value}))} className='flex-1 h-full px-5 rounded-3xl border-none outline-none text-[16px] font-[500] text-[#B0BAC9]' placeholder='Card Number'/>
            <div className='flex items-center'>
            <CardIconGroup/>
            </div>
      </div>
      <div className='grid xs:grid-cols-1 md:grid-cols-2 items-center text-[16px] font-[500] text-[#B0BAC9] gap-2 w-full'>
        <input type="text" name='expiryMnY' value={values.expiryMnY} onChange={(e)=>setValues((old)=>({...old,[e.target.name]:e.target.value}))} className='flex-1 rounded-3xl border border-[#DFE5EE] h-[52px] outline-none pl-5' placeholder='MM/YY' />
        <input type="text" name='cvv' value={values.cvv} onChange={(e)=>setValues((old)=>({...old,[e.target.name]:e.target.value}))} className='flex-1 rounded-3xl border border-[#DFE5EE] h-[52px] outline-none pl-5' placeholder='CVC' />
      </div>
      <div className='flex'>
      {/* <input type="text" name='city' value={values.city} className='flex-1 rounded-3xl border border-[#DFE5EE] py-3 outline-none pl-5' placeholder='Dublin' /> */}
      <Select className='bg-[#fff]' style={{background:"#fff",border:"1px solid #DFE5EE",padding:"0px 10px 0px 20px",height:"52px"}}
      radius='full'
      defaultSelectedKeys={["0"]}
      aria-label='sdkhsdkf'
      onChange={()=>console.log("hello")}
      >
        <SelectItem value={0} key={0} className='bg-[#fff] '>
         Dublin
        </SelectItem>
      </Select>
      </div>
       {/* <Input
          type="text"
        //   label="Email"
          placeholder="you@example.com"
        //   labelPlacement="outside"
        variant='flat'
        color='#FFFFFF'
        radius='lg'
        className=' h-[52px]'
          endContent={
            <div className='flex items-center'>
            <VisaIcon/>
            </div>
          }
        /> */}
    </div>
  )
}

export default AddPaymentDetailsControls
