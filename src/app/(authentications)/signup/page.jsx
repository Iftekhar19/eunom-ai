"use client";
import AppleIcon from '@/components/AppleIcon';
import Button from '@/components/Button';
import LoginButton from '@/components/GoogleButton';
import GoogleIcon from '@/components/GoogleIcon';
import InputBox from '@/components/InputBox';
import Logo from '@/components/Logo';
import MsIcon from '@/components/MsIcon';
import OtpBox from '@/components/OtpBox';
import { emailValidation } from '@/utils/emaiValidatiom';
import { generateOTP } from '@/utils/otpGeneration';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendEmail } from '@/utils/sendEmail';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '@/config/firebase.config';
import { useUserAuth } from '@/app/context/userAuthContext';
import PasswordField from '@/components/PasswordField';
import {Spinner} from "@heroui/react";
import * as Yup from "yup"
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where } from 'firebase/firestore';
import { googleLogin } from '@/utils/googleLogin';
import { checkUser } from '@/utils/checkUser';
import AuthLogo from '@/components/AuthLogo';
const page = () => {
  // const provider=new GoogleAuthProvider();
  const router=useRouter();
  const user=useUserAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    
    password: "",
    confirmPassword:"",
    isOtpGenerated:false,
    otp:"",
    apiError:""
  });
  const [error,setError]=useState({
    email:"",
    password:"",
    confirmPassword:""
  })
  const [otp,setOtp]=useState(new Array(6).fill(""))

  const [loading,setLoading]=useState(false)
 
  const validationSchema=Yup.object({
    email:Yup.string()
    .required("Email is required")
      .email('Invalid email'),
      password:Yup.string().required("Password is required")
      .min(6,"Password must be atleast 6 characters"),
      confirmPassword:Yup.string().oneOf([Yup.ref("password")],"password must match").required("Confirm password is required")
  })
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({email:credentials.email,password:credentials.password,confirmPassword:credentials.confirmPassword},{abortEarly:false})
      
    } catch (error) {
      console.log(error.inner)
      const newError={};
      error.inner.forEach((err)=>
    {
      newError[err.path]=err.message
    })
    setError(newError);
    return
      
    }
    setLoading(true)
    try {
      
      // let res=await getDocs(query(collection(db,"users"),where("email","==",credentials.email.trim())),limit(1))
      // if(!res.empty)
      // {
      //   setCredentials({
      //     ...credentials,
      //     apiError:"Account already exist"
      //   })
      //   setLoading(false)
      //   return;
      // }
      // else
      // {
      //   // console.log(res.)
      // }
     let res= await checkUser(credentials.email)
      if(res)
      {
        throw new Error("Account already Exist")
      }
    } catch (error) {
      // console.log(error)
      setCredentials({
        ...credentials,
        apiError:error.message
      })
      // console.log(error)
      setLoading(false);
      return;
    }

    try {
        // setLoading(true)
          let otp=generateOTP();
             await  sendEmail(credentials.email,otp)
        
        setCredentials({
          ...credentials,
          apiError:"",
          otp,
          isOtpGenerated:true
        })
        
    } catch (error) {
        setLoading(false)
        setCredentials({
          ...credentials,
          apiError:error.message
        })
    }
    setLoading(false)
    // let temp=false;
    // if(credentials.email.trim()=="")
    // {
    //   setCredentials({
    //     ...credentials,
    //     emailError:"Email is required"
    //   })
    //   temp=true;
    // }
    // if(!emailValidation(credentials.email))
    // {
    //   alert(true)
    //   setCredentials({
    //     ...credentials,
    //     emailError:"Invalid email"
    //   })
    //   temp=true;
    // }
    // if(credentials.password.trim()=="")
    // {
    //   setCredentials({
    //     ...credentials,
    //     passwordError:"Password is required"
    //   })
    //   temp=true;
    // }
    // if(credentials.confirmPasswordError.trim()=="")
    // {
    //   setCredentials({
    //     ...credentials,
    //     confirmPasswordError:"Confirm password is required"
    //   })
    //   temp=true;
    // }
    // if(credentials.password!==credentials.confirmPassword)
    // {
    //   setCredentials({
    //     ...credentials,
    //     confirmPasswordError:"Password does not match"
    //   })
    //   temp=true;
    // }
    // if(!temp)
    // {
    //   setLoading(true)

    //   let otp=generateOTP();
    //   try {
    //     // await  sendEmail(credentials.email,otp)
        
    //     setCredentials({
    //       ...credentials,
    //       otp,
    //       // isOtpGenerated:true
    //     })
    //     console.log(otp)
    //   } catch (error) {
       
    //     console.log(error)
    //   }
    //   setTimeout(()=>
    // {

    //   setLoading(false)
    // },3000)
      
    // }
    
  };

  const handleOtpSubmit=async(e)=>
  {
 e.preventDefault();
 if(credentials.otp===otp.join(""))
 {
  setLoading(true)
  try {
    
  let res= await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
  console.log(" user cred-->",res)
  await setDoc(doc(db,"users",res.user.uid),{
   name:res.user.displayName||"", 
   email:res.user.email,
   phone:res.user.phoneNumber||"",
   profilePic:res.user.photoURL||"",
   uid:res.user.uid
  })
    router.push('/',{ scroll: false })
  } catch (error) {
    setCredentials({
      ...credentials,
      apiError:error.message
    })
  }
  setLoading(false)
 }
 else{
  setCredentials({
    ...credentials,
    apiError:"Invalid OTP"
  })
 }
  }
  useEffect(()=>
  {
    console.log(user)
    if(user && user?.user?.hasOwnProperty("uid"))
    {
      router.push('/dashboard',{scroll:false})
    }
    else{
      console.log("not present")
    }
  
  },[user])

  // const signingoogle=async()=>
  // {
  //   try {
      
  //     let res=await  signInWithPopup(auth,provider)
  //     console.log(user)
  //     await setDoc(doc(db,"users",res.user.uid),{
  //       name:res.user.displayName||"", 
  //       email:res.user.email,
  //       phone:res.user.phoneNumber||"",
  //       profilePic:res.user.photoURL||"",
  //       uid:res.user.uid
  //      })
  //      router.push("/",{scroll:false})
  //   } catch (error) {
  //     setCredentials({
  //       ...credentials,
  //       apiError:error.message
  //     })
  //   }
  // }
  return (
    <div className="min-h-[100dvh] py-5  gap-5 w-full app-bg flex justify-center items-center flex-col">
      {/* <Logo  /> */}
      <AuthLogo/>

     {
      credentials.isOtpGenerated?(
        <section className=" rounded-2xl max-w-[471px] w-full bg-[#FFFFFF] login-box-shadow xs:p-[20px] md:p-[40px] flex flex-col gap-[36px]">
          <section className="flex justify-center items-center flex-col gap-1">
            <h1 className="text-[#1B2559] font-[700] text-[24px]">
            OTP Verification
            </h1>
            <p className="text-[#718096] font-[500] text-xs">
            We sent an otp to {credentials.email}
            </p>
            {
              credentials.apiError &&(
                <p className='text-red-500 font-[400] text-[14px] text-center'>{credentials.apiError}</p>
              )
            }
          </section>
          <section className=' '>
           <OtpBox otp={otp} setOtp={setOtp} length={6}/>
          </section>
          <section className='flex flex-col items-center gap-3'>
          <span className="text-[#718096] font-[500] text-xs">Don’t received the otp? <span className='text-[#1A5CF4] font-[500] text-[14px] '>Resend OTP</span></span>
          <Button 
           handler={(e)=>{handleOtpSubmit(e)}}
           text={"verify"}
           disable={loading}
           className={`text-white font-[700] ${loading?"pointer-events-none":"pointer-events-auto"}`}
           icon={loading?<Spinner size="md" color="default" className="text-white "/>:""}
          />
          </section>
        </section>
      ):(
       
        <section className=" rounded-2xl max-w-[471px] w-full bg-[#FFFFFF] login-box-shadow xs:p-[20px] md:p-[40px]  flex flex-col gap-[36px]">
          <section className="flex justify-center items-center flex-col gap-1">
            <h1 className="text-[#1B2559] font-[700] text-[24px]">
               Create An Account
            </h1>
            <p className="text-[#718096] font-[500] text-xs">
              Enter your registered email address to login.
            </p>
            {
              credentials.apiError &&(
                <p className='text-red-500 font-[400] text-[14px] text-center'>{credentials.apiError}</p>
              )
            }
          </section>
          <section className="flex flex-col gap-[24px]">
            <div className='flex flex-col gap-3'>
  
            
            <InputBox
              className={"w-full"}
              type={"email"}
              value={credentials.email}
              placeholder={"Enter your Email"}
              name={"email"}
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                });
              }}
              errorMessage={error.email}
            />
  
           
              
                {/* <InputBox
                  className={"w-full"}
                  type={"password"}
                  value={credentials.password}
                  placeholder={"Password"}
                  name={"password"}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  errorMessage={credentials.passwordError}
                /> */}
                <PasswordField value={credentials.password}
                   onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name={"password"}
                  placeholder={"Enter Password"}
                  errorMessage={error.password}
                />
                {/* <InputBox
                  className={"w-full"}
                  type={"password"}
                  value={credentials.confirmPassword}
                  placeholder={"Confirm Password"}
                  name={"confirmPassword"}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  errorMessage={credentials.confirmPasswordError}
                /> */}

<PasswordField value={credentials.confirmPassword}
                   onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name={"confirmPassword"}
                  placeholder={"Enter confirm Password"}
                  errorMessage={error.confirmPassword}
                />
           </div>
            <div className="flex flex-col gap-[16px] items-center">
              <Button
                handler={submitHandler}
                text={"Continue"}
                disable={loading}
                className={`text-white font-[700] ${loading?"pointer-events-none":"pointer-events-auto"}`}
                icon={loading?<Spinner size="md"  color="default" className="text-white "/>:""}
              />
              <p className="text-[#718096] font-[500] text-[14px]">
                Don't have an account? 
                {/* <span className="text-[#1A5CF4]  text-[14px]] font-[700] text-[14px]">
                  Sign Up
                </span> */}
                <Link className="text-[#1A5CF4]  text-[14px]] font-[700] text-[14px]" href={"/signin"}> Sign In</Link>
              </p>
            </div>
           
                <div className="flex items-center gap-5">
                  <span className="bg-[#B0BAC9] h-[1px] flex-1"></span>
                  <span className="text-[#B0BAC9]">OR</span>
                  <span className="bg-[#B0BAC9] h-[1px] flex-1"></span>
                </div>
                {/* third party login provider */}
                <section className="flex flex-col gap-2">
                  <LoginButton
                    label={"Continue with Google"}
                    onClick={()=>googleLogin(credentials,setCredentials)}
                    icon={<GoogleIcon />}
                  />
                  <LoginButton
                    label={"Continue with Microsoft"}
                    icon={<MsIcon />}
                  />
                  <LoginButton
                    label={"Continue with Apple"}
                    icon={<AppleIcon />}
                  />
                </section>
           
          </section>
        </section>
        
      )
     }
    </div>
  )
}

export default page
