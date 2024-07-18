import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './firebaseConfig'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out:', error)
      throw error
    }
  }

  const value = {
    currentUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
