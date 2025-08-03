// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEHjJ2ZchKyZclrarUCJhC3olEv2JAmQQ",
  authDomain: "topic7-yonghao.firebaseapp.com",
  projectId: "topic7-yonghao",
  storageBucket: "topic7-yonghao.firebasestorage.app",
  messagingSenderId: "5196345123",
  appId: "1:5196345123:web:9f11795fac8cb94b536696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
