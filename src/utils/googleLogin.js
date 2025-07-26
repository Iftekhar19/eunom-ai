import { auth, db } from "@/config/firebaseClient";
import {signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "./setCookie";
export async function googleLogin(credentials,setCredentials){
  
    const provider=new GoogleAuthProvider()
    try {
      
        let res=await  signInWithPopup(auth,provider)
        console.log(res)
        await setDoc(doc(db,"users",res.user.uid),{
          name:res.user.displayName||"", 
          email:res.user.email,
          phone:res.user.phoneNumber||"",
          profilePic:res.user.photoURL||"",
          uid:res.user.uid
         })
         localStorage.setItem("uid",JSON.stringify(res.user.uid))
        //  await setCookie(res._tokenResponse.idToken)
         window.location.pathname="/dashboard"
      } catch (error) {
        console.log(error)
        setCredentials({
          ...credentials,
          apiError:error.message
        })
      }
}
const provider=new GoogleAuthProvider();