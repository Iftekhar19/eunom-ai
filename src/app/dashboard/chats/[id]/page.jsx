'use client'
import PromptBox2 from '@/components/PromptBox2'
import React, { useEffect } from 'react'

const page = () => {
  const divRef = React.useRef(null);
  const [isFirst, setIsFirst] = React.useState(true);
  const [sideBarData, setSideBarData] = React.useState([]);
  const [data, setData] = React.useState([])
  const onSend = (message) => {
    console.log("Message sent:", message);
    // Add your send logic here
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])
  return (
    
      <section className="flex-1  w-full h-full ">
        <div className="xs:w-full md:w-3/4  h-full mx-auto overflow-y-auto flex flex-col items-center ">
          <div className=" text-sm  flex-1 w-full border flex flex-col gap-5 pt-3 overflow-y-auto">
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] ml-auto">Chat Page Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis porro itaque dolores sunt, blanditiis autem cumque molestiae repellat magnam accusamus.</div>
            <div className="text-start p-2 bg-[#d0d4da97] rounded-2xl max-w-[60%] mr-auto">This is a placeholder for the chat interface. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident sunt quo tenetur quaerat asperiores!</div>
              <div ref={divRef}>

          </div>
          </div>
        
          {/* Add your chat components here */}
           <div className='w-full'>

          <PromptBox2 
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          setSideBarData={setSideBarData}
          setData={setData}
          />
           </div>
        </div>
      </section>
    
  )
}

export default page