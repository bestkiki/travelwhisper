// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Firebase Console에서 받은 설정값을 여기에 넣으세요
  apiKey: "AIzaSyBlH0P8m1rz-6pmoT63AZ-6vVWzHh5wu04",
  authDomain: "travel-whisper.firebaseapp.com",
  projectId: "travel-whisper",
  storageBucket: "travel-whisper.firebasestorage.app",
  messagingSenderId: "616044416343",
  appId: "1:616044416343:web:b1eb17c9fb6830f7c9c212",
  measurementId: "G-C0R9X57019"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);