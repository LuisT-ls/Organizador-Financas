import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function BudgetAlert({ expenses, budget }) {
  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    )
    if (totalExpenses > budget) {
      toast.warning('Você ultrapassou seu orçamento!')
    }
  }, [expenses, budget])

  return <div />
}

export default BudgetAlert
