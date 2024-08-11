// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-property-d8502.firebaseapp.com",
  projectId: "mern-property-d8502",
  storageBucket: "mern-property-d8502.appspot.com",
  messagingSenderId: "664039784900",
  appId: "1:664039784900:web:254b681a439981fcd36491"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);



