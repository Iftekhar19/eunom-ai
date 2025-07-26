import emailjs from "@emailjs/browser";
export async function sendEmail(email,otp)
{
 try {
    console.log(email)
//   let res=await  emailjs.send('service_ydmv817','template_7aq4mbd',{otp,email:email},{publicKey:"I4SSap6aB3coytmc6"})
  let res=await  emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,{otp,email:email},{publicKey:process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID})
    console.log(res)
 } catch (error) {
    console.log(error)
    
 }
}