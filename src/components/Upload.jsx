import React, { useRef } from 'react';

import { IKContext, IKImage, IKUpload } from '@imagekit/next';

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_URLENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBKEY; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


const Upload = ({setImg,setScroll,setData}) => {

    const IKRef=useRef(null)
    const onError = err => {
        console.log("Error", err);
        setImg(pre=>({...pre,isLoading:false}))
        
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg(pre=>({...pre,isLoading:false,dbDate:res}))
         setTimeout(()=>
        {
          setScroll(prev=>!prev) 
        },1000)
        setData((prev)=>
        {
          let temp=[...prev]
       temp[temp.length-1].isLoading=false;
       temp[temp.length-1].dbDate=res;
       return temp
        })
        
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
        setImg(pre=>({...pre,isLoading:true}))
      };
      
      const onUploadStart = evt => {
        console.log("Start", evt);
        const file =evt.target.files[0]
        const reader=new FileReader();
        // console.log(reader)
        reader.onloadend=()=>
          {
          // console.log(file)
          setImg(pre=>({...pre,isLoading:true,aiData:{
             inlineData:{
              data:reader.result.split(",")[1],
              mimeType:file.type
             }
          }}))
        }
        reader.readAsDataURL(file)
        setData((prev)=>
          {
            let temp=[...prev]
            temp.push({
              by:"by-user",
              type:"image",
              isLoading:true
            })
            return temp;
          })
         
      };
 
  return (
    <div>
          
      <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName={true}
          style={{display:"none"}}
          ref={IKRef}
          accept='image/*'
        />
        <label htmlFor="" onClick={()=>{IKRef?.current?.click()}} className='cursor-pointer'>
            <img src="/attachment.png" alt="" className='w-[20px] h-[20px] ml-2' />
        </label>
      </IKContext>

    </div>
  )
}

export default Upload