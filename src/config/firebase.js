// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfXjqy_7LPuGa-8Is0WR9Y0MMfETnX5dg",
  authDomain: "vite-contact-2710c.firebaseapp.com",
  projectId: "vite-contact-2710c",
  storageBucket: "vite-contact-2710c.appspot.com",
  messagingSenderId: "554868445498",
  appId: "1:554868445498:web:4cf7c4d9e7be6ffb9b8003",
  measurementId: "G-9JRWR9XH45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);