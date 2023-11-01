// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGrQIrAexyDoS9W8tjmbIc1oGnEWazSMs",
    authDomain: "anchor-personal-finance.firebaseapp.com",
    projectId: "anchor-personal-finance",
    storageBucket: "anchor-personal-finance.appspot.com",
    messagingSenderId: "783751139370",
    appId: "1:783751139370:web:441f046be54c5656a63353"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;