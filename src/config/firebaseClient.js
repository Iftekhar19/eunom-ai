// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID


  // apiKey: "AIzaSyDPgzgSdnzXSJSDYODDUDnV_MYb8grUNrA",
  // authDomain: "eunom-ai-e2d13.firebaseapp.com",
  // projectId: "eunom-ai-e2d13",
  // storageBucket: "eunom-ai-e2d13.firebasestorage.app",
  // messagingSenderId: "556084970007",
  // appId: "1:556084970007:web:356ad5f79780437cb05252"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let auth=getAuth(app)
let db=getFirestore(app);
export {auth,db}