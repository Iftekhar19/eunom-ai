// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket:process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID


  apiKey: "AIzaSyDPgzgSdnzXSJSDYODDUDnV_MYb8grUNrA",
  authDomain: "eunom-ai-e2d13.firebaseapp.com",
  projectId: "eunom-ai-e2d13",
  storageBucket: "eunom-ai-e2d13.firebasestorage.app",
  messagingSenderId: "556084970007",
  appId: "1:556084970007:web:356ad5f79780437cb05252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth=getAuth(app)
let db=getFirestore(app);
export {auth,db}