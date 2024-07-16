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
        } else {
          // Reset states if no data exists for the user
          setExpenses([])
          setIncome([])
          setSavings([])
          setFixedCosts([])
          setLeisureExpenses([])
          setEmergencyFunds([])
        }
      } else {
        // Reset states if no user is logged in
        setExpenses([])
        setIncome([])
        setSavings([])
        setFixedCosts([])
        setLeisureExpenses([])
        setEmergencyFunds([])
      }
    }
    fetchData()
  }, [currentUser])

  useEffect(() => {
    const saveData = async () => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid)
        await setDoc(
          userDoc,
          {
            expenses,
            income,
            savings,
            fixedCosts,
            leisureExpenses,
            emergencyFunds
          },
          { merge: true }
        )
      }
    }
    saveData()
  }, [
    currentUser,
    expenses,
    income,
    savings,
    fixedCosts,
    leisureExpenses,
    emergencyFunds
  ])

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
