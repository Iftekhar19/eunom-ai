import React from 'react'

const LoginButton = ({label,icon,...props}) => {
  return (
    <button {...props} className='border-[1px]  border-[#DFE5EE] rounded-3xl py-4 px-5 flex items-center justify-center gap-2 w-full'>
      {icon } {label}
    </button>
  )
}

export default LoginButton
