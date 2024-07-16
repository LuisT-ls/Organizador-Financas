// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth' // Importação necessária para autenticação
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
const analytics = getAnalytics(app) // eslint-disable-line no-unused-vars
const db = getFirestore(app) // Inicializa o banco de dados
const auth = getAuth(app) // Inicializa a autenticação

export { db, auth } // Exporta auth para ser utilizado em outros módulos
