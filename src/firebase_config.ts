// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_1V2L0UYzjcQ3EtXt580fWh39iv303YU",
  authDomain: "renebae-test.firebaseapp.com",
  projectId: "renebae-test",
  storageBucket: "renebae-test.appspot.com",
  messagingSenderId: "1043526991216",
  appId: "1:1043526991216:web:d57858e4e4b24e9f77e3b5"
};

// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);

export default firebaseInit;