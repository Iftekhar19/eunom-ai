import React from 'react'

const PlanCard = ({duration,isActive,price,children}) => {
  return (
    <div className="flex items-center justify-between w-full p-4 border-[1px] border-[#ECF0F6] rounded-2xl">
   {children}
  </div>
  )
}

export default PlanCard
