// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5YaJalP0_4KkcO4IM-4tlp9fvvvZgsk8",
  authDomain: "react-blackjack-2d369.firebaseapp.com",
  projectId: "react-blackjack-2d369",
  storageBucket: "react-blackjack-2d369.appspot.com",
  messagingSenderId: "27784874157",
  appId: "1:27784874157:web:7580cffadd1e33e7df9e24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}