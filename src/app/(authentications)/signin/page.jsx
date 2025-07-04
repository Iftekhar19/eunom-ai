"use client";
import Button from "@/components/Button";
import LoginButton from "@/components/GoogleButton";
import InputBox from "@/components/InputBox";
import Logo from "@/components/Logo";
import React, { useEffect, useState } from "react";
import GoogleIcon from "@/components/GoogleIcon";
import MsIcon from "@/components/MsIcon";
import AppleIcon from "@/components/AppleIcon";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userAuthContext";
import { emailValidation } from "@/utils/emaiValidatiom";
import { checkUser } from "@/utils/checkUser";
import PasswordField from "@/components/PasswordField";
import { Spinner } from "@heroui/react";
import { googleLogin } from "@/utils/googleLogin";
import EmailFieldWithEnableDisable from "@/components/EmailFieldWithEnableDisable";
import { useDisclosure } from "@heroui/react";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import LogoIcon from "@/components/LogoIcon";
import AuthLogo from "@/components/AuthLogo";

const page = () => {
  const [loading, setLoading] = useState(false);
  const user = useUserAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    emailError: "",
    isEmailProceed: false,
    password: "",
    passwordError: "",
    apiError: "",
  });
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const submitHandler = async () => {
    if (!credentials.isEmailProceed) {
      let temp = false;
      if (credentials.email == "") {
        setCredentials({
          ...credentials,
          emailError: "Please enter your Email Address",
        });
        temp = true;
      }
      if (!emailValidation(credentials.email)) {
        setCredentials({
          ...credentials,
          emailError: "Please enter valid Email Address",
        });
        temp = true;
      }

      if (temp) return;
      else {
        setCredentials({
          ...credentials,
          apiError:""
        })
        setLoading(true);
        
        try {
          let res = await checkUser(credentials.email);
          console.log(res)
          if (!res) {
            throw new Error("Account does not exists");
          }
          setCredentials({ ...credentials, isEmailProceed: true,apiError:"" });
         
        } catch (error) {
          setCredentials({
            ...credentials,
            apiError: error.message,
          });
          setLoading(false);
          return;
        }
      }
      
    } else {
      setCredentials({
        ...credentials,
        apiError:""
      })
      setLoading(true);
      try {
        let temp = false;
        if (credentials.email == "") {
          setCredentials({
            ...credentials,
            emailError: "Please enter your Email Address",
          });
          temp = true;
        }
        if (!emailValidation(credentials.email)) {
          setCredentials({
            ...credentials,
            emailError: "Please enter valid Email Address",
          });
          temp = true;
        }
        if (credentials.password == "") {
          setCredentials({
            ...credentials,
            passwordError: "Please enter your Password",
          });
          temp = true;
        }
        if (credentials.password.trim().length < 6) {
          setCredentials({
            ...credentials,
            passwordError: "Password must be atleast 6 character",
          });
          temp = true;
        }
        if (temp) {
          setLoading(false);
          return;
        }
        
        await signInWithEmailAndPassword(
          auth,
          credentials.email.trim(),
          credentials.password.trim()
        );
        router.push("/", { scroll: false });
      } catch (error) {
        console.log(error);
        setCredentials({
          ...credentials,
          apiError: error.message,
        });
      }
    }
    setLoading(false)
  };
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
  return (
    <div className="min-h-[100dvh] py-5  gap-5 w-full app-bg flex justify-center items-center flex-col">
      {/* <div className="flex items-center gap-4">
      <LogoIcon />
      <Logo />
      </div> */}
      <AuthLogo/>
      <section className=" rounded-2xl max-w-[471px] w-full bg-[#FFFFFF] login-box-shadow xs:p-[20px] md:p-[40px]  flex flex-col gap-[36px]">
        <section className="flex justify-center items-center flex-col gap-1">
          <h1 className="text-[#1B2559] font-[700] text-[24px]">
            {!credentials.isEmailProceed ? "Welcome Back !" : "Enter Password"}
          </h1>
          <p className="text-[#718096] font-[500] text-xs">
            Enter your registered email address to login.
          </p>
          {credentials.apiError && (
            <p className="text-red-500 font-[400] text-[14px] text-center">
              {credentials.apiError}
            </p>
          )}
        </section>
        <section className="flex flex-col gap-[24px]">
          {
            credentials.isEmailProceed?(
             <EmailFieldWithEnableDisable value={credentials.email} name="email" onChange={e=>setCredentials({...credentials,[e.target.name]:e.target.value})}/>
            ):(
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
            errorMessage={credentials.emailError}
          />
            )
          }
          

          {credentials.isEmailProceed && (
            <div className="flex flex-col gap-1">
              {/* <InputBox
                className={"w-full"}
                type={"password"}
                value={credentials.password}
                placeholder={"Enter your Password"}
                name={"password"}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  });
                }}
              /> */}
              <PasswordField
              value={credentials.password}
              name="password"
              onChange={(e)=>setCredentials({...credentials,[e.target.name]:e.target.value})}
              errorMessage={credentials.passwordError}
              placeholder="Enter your password"
              />
              <span onClick={onOpen} className="text-[#1A5CF4] font-[600] text-[14px]">
                Forget Password?
              </span>
            </div>
          )}

          <div className="flex flex-col gap-[16px] items-center">
            <Button
              handler={submitHandler}
              text={"Continue"}
              className={"text-white font-[700]"}
              icon={loading?<Spinner size="md" color="default" className="text-white "/>:""}
            />
            <p className="text-[#718096] font-[500] text-[14px]">
              Don't have an account? 
              {/* <span className="text-[#1A5CF4]  text-[14px]] font-[700] text-[14px]">
                Sign Up
              </span> */}
              <Link
                className="text-[#1A5CF4]  text-[14px]] font-[700] text-[14px]"
                href={"/signup"}
              >
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
          {!credentials.isEmailProceed && (
            <>
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
            </>
          )}
        </section>
      </section>
      <ForgotPasswordModal
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      email={credentials.email}
      />
    </div>
  );
};

export default page;
