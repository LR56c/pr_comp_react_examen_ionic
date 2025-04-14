// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey           : "AIzaSyA-GJv1G0mpnyMiciaQyaU1nboBZ__HH-k",
  authDomain       : "pr-comp-react-examen.firebaseapp.com",
  projectId        : "pr-comp-react-examen",
  storageBucket    : "pr-comp-react-examen.firebasestorage.app",
  messagingSenderId: "38602855682",
  appId            : "1:38602855682:web:8cd7a9287511b3205e1e1b"
}

import { initializeApp } from "firebase/app"

export const firebase = initializeApp( firebaseConfig )
