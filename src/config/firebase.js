// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89x-NtoWB3cUvaiCv7IIH_1zdcqLpNuM",
  authDomain: "dashboard-project-f347d.firebaseapp.com",
  projectId: "dashboard-project-f347d",
  storageBucket: "dashboard-project-f347d.appspot.com",
  messagingSenderId: "501614400342",
  appId: "1:501614400342:web:6ba11bdf21d1f693353cf7",
  measurementId: "G-JRDN0LDDS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);

export { auth };