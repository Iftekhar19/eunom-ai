import { db } from "@/config/firebase.config"
import { collection, getDocs, limit, query, where } from "firebase/firestore"

export async function checkUser(email)
{
    try {
       let res=await getDocs(query(collection(db,"users"),where("email","==",email),limit(1)))
       if(!res.empty)
       {
        return true
       } 
    } catch (error) {
        // console.log(error.message)
        // setCredentials(old=>{
        //     return {...old,apiError:error.message}
        // })
        return false
    }
}