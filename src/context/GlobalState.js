import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
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

  const fetchData = useCallback(async () => {
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
  }, [currentUser])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const saveData = useCallback(async () => {
    if (currentUser) {
      try {
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
      } catch (error) {
        console.error('Error saving user data: ', error)
      }
    }
  }, [
    currentUser,
    expenses,
    income,
    savings,
    fixedCosts,
    leisureExpenses,
    emergencyFunds
  ])

  useEffect(() => {
    saveData()
  }, [saveData])

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
        setEmergencyFunds,
        refreshData: fetchData
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext)
