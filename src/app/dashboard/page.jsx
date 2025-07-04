"use client";
import React from "react";

import NoGenScreen from "@/components/NoGenScreen";
import PromptBox from "@/components/PromptBox";
import PromptBox2 from "@/components/PromptBox2";
const page = () => {
  // const temp = useRef(null);
  // const user = useUserAuth();
  // const [sideBarData, setSidebarData] = useState(data);
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  // const [isFirst,setIsFirst]=useState(true)
  // const router = useRouter()
  //   useEffect(()=>
  // {
 
  //   console.log(user)
  //  if(user && user?.user?.hasOwnProperty("uid"))
  //  {
  //    console.log("there is")
  //  }
  //  else{
  // router.push("/signup")
  //  console.log("nothing is there")
  //  }
 

  // },[user])

  const onSend=function(message) {
    console.log("Message sent:", message);
    // Add your send logic here
  }
  const onImageUpload=function(file) {
    console.log("Add image clicked",file);
    // Add your image upload logic here
  }
  return (
      <section className="flex-1  ">
          <div className="max-w-[1000px] w-full h-full mx-auto  overflow-y-auto flex flex-col  items-center">
           <NoGenScreen/>
           {/* <PromptBox setIsFirst={setIsFirst} isFirst={isFirst} setSideBarData={setSidebarData}/> */}
           {/* <PromptBox setIsFirst={setIsFirst} isFirst={isFirst} setSideBarData={setSidebarData}/> */}
           <div className="xs:w-full md:w-3/4">

           <PromptBox2 onSend={onSend} onImageUpload={onImageUpload}/>
           </div>
          </div>
        </section>
  );
};

export default page;
