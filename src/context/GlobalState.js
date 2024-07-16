import React, { createContext, useState, useContext, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth } from '../auth'

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState([])
  const [savings, setSavings] = useState([])
  const [fixedCosts, setFixedCosts] = useState([])
  const [leisureExpenses, setLeisureExpenses] = useState([])
  const [emergencyFunds, setEmergencyFunds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const userDoc = doc(db, 'users', currentUser.uid)
          const docSnap = await getDoc(userDoc)
          if (docSnap.exists()) {
            const data = docSnap.data()
            setExpenses(data.expenses || [])
            setIncome(data.income || [])
            setSavings(data.savings || [])
            setFixedCosts(data.fixedCosts || [])
            setLeisureExpenses(data.leisureExpenses || [])
            setEmergencyFunds(data.emergencyFunds || [])
          }
        } catch (error) {
          console.error('Error fetching user data: ', error)
        }
      }
    }
    fetchData()
  }, [currentUser])

  const saveData = async (dataType, data) => {
    if (currentUser) {
      try {
        const userDoc = doc(db, 'users', currentUser.uid)
        const userDocSnap = await getDoc(userDoc)
        if (userDocSnap.exists()) {
          const currentData = userDocSnap.data()
          await setDoc(
            userDoc,
            {
              ...currentData,
              [dataType]: data
            },
            { merge: true }
          )
        } else {
          await setDoc(userDoc, {
            [dataType]: data
          })
        }
      } catch (error) {
        console.error('Error saving user data: ', error)
      }
    }
  }

  useEffect(() => {
    saveData('expenses', expenses)
  }, [expenses])

  useEffect(() => {
    saveData('income', income)
  }, [income])

  useEffect(() => {
    saveData('savings', savings)
  }, [savings])

  useEffect(() => {
    saveData('fixedCosts', fixedCosts)
  }, [fixedCosts])

  useEffect(() => {
    saveData('leisureExpenses', leisureExpenses)
  }, [leisureExpenses])

  useEffect(() => {
    saveData('emergencyFunds', emergencyFunds)
  }, [emergencyFunds])

  return (
    <GlobalStateContext.Provider
      value={{
        expenses,
        setExpenses,
        income,
        setIncome,
        savings,
        setSavings,
        fixedCosts,
        setFixedCosts,
        leisureExpenses,
        setLeisureExpenses,
        emergencyFunds,
        setEmergencyFunds
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext)
