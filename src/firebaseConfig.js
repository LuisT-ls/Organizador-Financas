// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJZDNnCzZ3hTkD0_Kcws4LlR0_3fTBozE',
  authDomain: 'organizador-financas.firebaseapp.com',
  projectId: 'organizador-financas',
  storageBucket: 'organizador-financas.appspot.com',
  messagingSenderId: '178293865579',
  appId: '1:178293865579:web:c553b4052e2395bf1a452e',
  measurementId: 'G-8D7RKF442H'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
