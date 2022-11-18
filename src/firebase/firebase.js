// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBSOLj65lTXMmLTfyBul5ZwLSgW5WkBmMI",
  authDomain: "nutri-doctor.firebaseapp.com",
  projectId: "nutri-doctor",
  storageBucket: "nutri-doctor.appspot.com",
  messagingSenderId: "137106084445",
  appId: "1:137106084445:web:d357174772da930e9833b4",
  measurementId: "G-Z1M5XQ2QPP",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
