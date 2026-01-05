import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
       apiKey: "AIzaSyAuQDhCkSYu-8doAClB9WHlRz9X6htQUIM",
       authDomain: "plaintext-45a88.firebaseapp.com",
       projectId: "plaintext-45a88",
       storageBucket: "plaintext-45a88.firebasestorage.app",
       messagingSenderId: "56010561580",
       appId: "1:56010561580:web:8ae0cb69d121828c305989",
       measurementId: "G-5KFGKYMMPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ส่งออกตัวแปรไปใช้งานในหน้าอื่น
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// ฟังก์ชัน Login ด้วย Google
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// ฟังก์ชัน Logout
export const logout = () => signOut(auth);