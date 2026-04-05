// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "wewear-",
    storageBucket: "wewear-",
    messagingSenderId: "0",
    appId: "1",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth, provider };
