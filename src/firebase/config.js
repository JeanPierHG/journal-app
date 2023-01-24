// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const { VITE_APIID_FIREBASE, VITE_APIKEY_FIREBASE } = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_APIKEY_FIREBASE,
  authDomain: 'react-cursos-b41e1.firebaseapp.com',
  projectId: 'react-cursos-b41e1',
  storageBucket: 'react-cursos-b41e1.appspot.com',
  messagingSenderId: '124681934573',
  appId: VITE_APIID_FIREBASE,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
