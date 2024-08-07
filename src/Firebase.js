// src/Firebase.js

// Import the necessary functions from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ku_G864y_TMIoryl_Ho3JsYaKBYiOds",
  authDomain: "telehealth-solution.firebaseapp.com",
  projectId: "telehealth-solution",
  storageBucket: "telehealth-solution.appspot.com",
  messagingSenderId: "997427233480",
  appId: "1:997427233480:web:df0c63eaf7b57a09915bfd",
  measurementId: "G-WL979WFDQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
