import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDJZDNnCzZ3hTkD0_Kcws4LlR0_3fTBozE',
  authDomain: 'organizador-financas.firebaseapp.com',
  projectId: 'organizador-financas',
  storageBucket: 'organizador-financas.appspot.com',
  messagingSenderId: '178293865579',
  appId: '1:178293865579:web:c553b4052e2395bf1a452e',
  measurementId: 'G-8D7RKF442H'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app)

export { db, auth }
