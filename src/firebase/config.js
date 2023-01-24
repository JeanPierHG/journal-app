// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPfZ_sgCIS0dOMjyEKYVUMuP-OCMAnp9A',
  authDomain: 'react-cursos-b41e1.firebaseapp.com',
  projectId: 'react-cursos-b41e1',
  storageBucket: 'react-cursos-b41e1.appspot.com',
  messagingSenderId: '124681934573',
  appId: '1:124681934573:web:31dd4b59e3c809c0d21ee4',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
