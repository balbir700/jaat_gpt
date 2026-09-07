// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jaat-gpt.firebaseapp.com",
  projectId: "jaat-gpt",
  storageBucket: "jaat-gpt.firebasestorage.app",
  messagingSenderId: "660771306430",
  appId: "1:660771306430:web:af25b86a87a0e80131d7ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
