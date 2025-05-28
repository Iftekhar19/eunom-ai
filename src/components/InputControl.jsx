import React from 'react'

const InputControl = ({value,name,setValues,placeholder,...props}) => {
  return (
    <input 
    
    value={value}
    name={name}
    onChange={e => setValues((old)=>{return{...old,[e.target.name]:e.target.value}})}
    placeholder={placeholder}
    {...props}
    className='py-4 px-5 rounded-3xl border border-[#DFE5EE] outline-none'
    />
      
    
  )
}

export default InputControl
