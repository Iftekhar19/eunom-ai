'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  signInWithPhoneNumber,
  updatePassword,
  EmailAuthProvider,
  linkWithCredential,
  // PhoneAuthProvider
} from "firebase/auth";
import { db,auth } from "@/config/firebase.config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [toggleSidebar, setToggleSidebar] = useState(false);
//   function login(email, password) {
//     return signInWithEmailAndPassword(auth_user, email, password);
//   }

//   function logOut() {
//     return signOut(auth_user);
//   }

//   function signupWithEmail(email, password) {
//     return createUserWithEmailAndPassword(auth_user, email, password);
//   }

//   async function signupPhoneNumber(phone) {
//     // console.log(phone);
//     let appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmationResult = await signInWithPhoneNumber(
//         auth_user,
//         phone,
//         appVerifier
//       );
//       window.confirmationResult = confirmationResult;
//       return confirmationResult;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function resetPassword(email) {
//     return sendPasswordResetEmail(auth_user, email);
//   }

//   function changePassword(password) {
//     return updatePassword(user, password);
//   }

//   async function linkEmail(email, password) {
//     console.log(email, password);
//     const credential = EmailAuthProvider.credential(email, password);
//     // console.log(credential);
//     // return linkWithCredential(user, credential);
//     linkWithCredential(user, credential)
//       .then((usercred) => {
//         const user = usercred.user;
//         console.log("Account linking success", user);
//       })
//       .catch((error) => {
//         console.log("Account linking error", error);
//       });
//   }
//   // "+918691948558"

//   async function linkPhoneNumber(phone) {
//     // console.log(phone);
//     let appVerifier = window.recaptchaVerifier;

//     const confirmationResult = await linkWithPhoneNumber(
//       user,
//       phone,
//       appVerifier
//     );
//     window.confirmationResult = confirmationResult;
//   }

//   function setRecaptureVerifier(phone) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recapture-container",
//       {
//         size: "invisible",
//       },
//       auth_user
//     );

//     return signupPhoneNumber(phone);
//   }

//   async function verifyOtp(otp) {
//     console.log(otp);

//     try {
//       const confirmationResult = window.confirmationResult;
//       return confirmationResult.confirm(otp);
//       // console.log(result.user);
//     } catch (error) {
//       console.log(error);
//     }
//   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentuser) => {
      console.log("Auth", currentuser);

      setUser(currentuser);
    //   if (currentuser && currentuser.hasOwnProperty("uid")) {
    //     currentuser.getIdTokenResult().then(async (idTokenResult) => {
    //       // console.log(idTokenResult.claims);
    //       if (idTokenResult.claims.vendor) {
    //         const snapshot = await getDoc(doc(db, "vendors", currentuser.uid));
    //         setUserDetails(snapshot.data());
    //         // console.log(snapshot.data());
    //       } else {
    //         setUserDetails({});
    //       }
    //     });
    //   } else {
    //     setUserDetails({});
    //   }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleSidebarHandler = () => {
    setToggleSidebar((prev) => !prev);
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        toggleSidebar,
        toggleSidebarHandler,
        // login,
        // logOut,
        // verifyOtp,
        // linkEmail,
        // userDetails,
        // resetPassword,
        // changePassword,
        // linkPhoneNumber,
        // signupWithEmail,
        // signupPhoneNumber,
        // setRecaptureVerifier,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
