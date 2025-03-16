import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMsNniXmBKbkCDipeFQj8EAWVa1bX4qYY",
  authDomain: "healthify-58a0f.firebaseapp.com",
  projectId: "healthify-58a0f",
  storageBucket: "healthify-58a0f.firebasestorage.app",
  messagingSenderId: "569892689328",
  appId: "1:569892689328:web:02f1294f85ef7dee923275"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, db, setDoc, doc };
