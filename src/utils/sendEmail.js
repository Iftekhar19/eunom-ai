import emailjs from "@emailjs/browser";
export async function sendEmail(email,otp)
{
 try {
    console.log(email)
  let res=await  emailjs.send('service_iixjm4a','template_duf6qg6',{otp,user_email:email},{publicKey:"wemf-8dmd8eDPEKVg"})
    console.log(res)
 } catch (error) {
    console.log(error)
    
 }
}