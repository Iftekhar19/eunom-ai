import { auth, db } from "@/config/firebase.config";
import {signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
export async function googleLogin(credentials,setCredentials){
  
    const provider=new GoogleAuthProvider()
    try {
      
        let res=await  signInWithPopup(auth,provider)
        
        await setDoc(doc(db,"users",res.user.uid),{
          name:res.user.displayName||"", 
          email:res.user.email,
          phone:res.user.phoneNumber||"",
          profilePic:res.user.photoURL||"",
          uid:res.user.uid
         })
         window.location.pathname="/"
      } catch (error) {
        console.log(error)
        setCredentials({
          ...credentials,
          apiError:error.message
        })
      }
}
const provider=new GoogleAuthProvider();