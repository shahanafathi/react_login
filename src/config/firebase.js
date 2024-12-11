
import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBjd7_uU365ekX7nijYPwig2XbwGDFrn9o",
  authDomain: "login-ddc65.firebaseapp.com",
  projectId: "login-ddc65",
  storageBucket: "login-ddc65.firebasestorage.app",
  messagingSenderId: "475313882641",
  appId: "1:475313882641:web:cf5e710b79600b82a9d3b0",
  measurementId: "G-S3MGWT1T07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    const auth=  getAuth(app)
    export const db = getFirestore(app)

export { auth, RecaptchaVerifier, signInWithPhoneNumber };