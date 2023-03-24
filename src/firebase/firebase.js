import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, collection, addDoc, onSnapshot, getDoc, query, orderBy, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEsOdBUjXpKtAyKE_lu176hTveMhERM0M",
  authDomain: "fitness-app-455b2.firebaseapp.com",
  projectId: "fitness-app-455b2",
  storageBucket: "fitness-app-455b2.appspot.com",
  messagingSenderId: "303612266920",
  appId: "1:303612266920:web:d8763270ace763353f759d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { collection, doc, addDoc, onSnapshot, getDoc, query, orderBy, deleteDoc };


