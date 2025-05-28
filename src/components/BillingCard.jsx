import React from 'react'

const BillingCard = ({title,children}) => {
  return (
    <div className='w-full flex flex-col gap-7'>
            <h1 className='pb-2 pt-1 border-b border-[#DFE5EE] text-[#1B2559] font-[600] text-[12px]'>{title}</h1> 
            {children}
    </div>
  )
}

export default BillingCard
