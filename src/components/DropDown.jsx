import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";

const DropDown = ({data,value,setValues,name,isBilling,setCountryIndex,countryIndex}) => {
  const changeHandler=(e)=>
    {

      const {name,value}=e.target;
      // console.log(value)
      if(isBilling)
        {
         setCountryIndex(value)
        }
     setValues((old)=>({...old,[name]:data[+value]?.country||data[+value]}))
    }
  return (
    <Select 
    
          radius='full'  
             name={name}
             value={data}
             scrollShadowProps={{
              isEnabled: false
            }}
             onChange={changeHandler}
    className=' rounded-3xl border border-[#DFE5EE] outline-none w-full '
    style={{background:"#fff",height:"52px"}}
    selectedKeys={[countryIndex]}
    aria-label='this is'
          >
            {data?.map((c,index) => (
              <SelectItem   key={index} value={{index}}>
                {c.country||c}
               
              </SelectItem>
            ))}
            
          </Select>
  )
}

export default DropDown
