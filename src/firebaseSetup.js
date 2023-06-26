// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV1OMHCFtW1c_3a04ljMySAWO2pQjyBsQ",
  authDomain: "character-finder-3b6c2.firebaseapp.com",
  projectId: "character-finder-3b6c2",
  storageBucket: "character-finder-3b6c2.appspot.com",
  messagingSenderId: "568076698828",
  appId: "1:568076698828:web:4b380fd944b3e65ed86e69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);