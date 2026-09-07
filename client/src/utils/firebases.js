import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseKey = import.meta.env.VITE_FIREBASE_KEY;
// console.log(firebaseKey);


const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "fazar-ai.firebaseapp.com",
  projectId: "fazar-ai",
  storageBucket: "fazar-ai.firebasestorage.app",
  messagingSenderId: "205746476761",
  appId: "1:205746476761:web:afb79718b53506f38f50c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth, provider}