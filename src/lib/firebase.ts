import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGnZi4i8GoSr0Kuvkypn5MV273AAyL_W4",
  authDomain: "tu-credito-rd.firebaseapp.com",
  projectId: "tu-credito-rd",
  storageBucket: "tu-credito-rd.firebasestorage.app",
  messagingSenderId: "244614046556",
  appId: "1:244614046556:web:8e90e0193b08b1665e1799",
  measurementId: "G-Z6K6KT774T",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export { app };
