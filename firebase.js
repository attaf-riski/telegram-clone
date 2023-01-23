import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQsKBtLbgw7_TMQ0gAU7qECN3WmruUNzY",

  authDomain: "telegram-clone-dbc36.firebaseapp.com",

  projectId: "telegram-clone-dbc36",

  storageBucket: "telegram-clone-dbc36.appspot.com",

  messagingSenderId: "331594693705",

  appId: "1:331594693705:web:c3e3b5b969d6f18b371398",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
