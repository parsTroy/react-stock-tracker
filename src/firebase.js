// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjfLfMmRnsIu8uj2lK3FRdlGajaV0Xc8U",
  authDomain: "react-stockbase.firebaseapp.com",
  projectId: "react-stockbase",
  storageBucket: "react-stockbase.appspot.com",
  messagingSenderId: "102780361797",
  appId: "1:102780361797:web:3bebcf5c7a2cb1db2c972c",
  // measurementId: "G-RRZ4DZN3J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;