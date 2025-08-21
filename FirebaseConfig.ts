// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth} from "firebase/auth"
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpP5PUQQlBkUCrsE-gsHUL6qMfRS2vLFM",
  authDomain: "auth-pam-a3a0b.firebaseapp.com",
  projectId: "auth-pam-a3a0b",
  storageBucket: "auth-pam-a3a0b.firebasestorage.app",
  messagingSenderId: "708555225483",
  appId: "1:708555225483:web:c0a4faeb1bd221f28e978e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore();