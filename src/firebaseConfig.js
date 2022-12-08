import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAakGTkcX6Yatl8NY-OyHw_am8auKnbC-U",
    authDomain: "kreate-tech-todo.firebaseapp.com",
    projectId: "kreate-tech-todo",
    storageBucket: "kreate-tech-todo.appspot.com",
    messagingSenderId: "927063608030",
    appId: "1:927063608030:web:9092b7a35b175db487504f",
    measurementId: "G-QPG61EP8YX"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);