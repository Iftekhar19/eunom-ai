import React from 'react'

const Button = ({text,handler, icon,className,...props}) => {
  return (
    <button {...props} onClick={handler}  className={`${className}  relative py-4 text-center rounded-[45px] w-full btn-bg`}>
      <span>{text}</span> <span className='absolute top-[50%] left-[50%]' style={{transform: 'translate(-50%,-50%)'}}>
        
        {icon? icon:""}
        </span>
    </button>
  )
}

export default Button
