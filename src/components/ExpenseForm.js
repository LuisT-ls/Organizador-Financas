import React, { useState } from 'react'
import { useGlobalState } from '../context/GlobalState'
import { TextField, Button, Paper, Grid } from '@mui/material'
import { db } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../auth'

function ExpenseForm() {
  const { expenses, setExpenses } = useGlobalState()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const { currentUser } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!currentUser) {
      console.error('No user logged in')
      return
    }

    const newExpense = {
      description,
      amount: parseFloat(amount),
      userId: currentUser.uid,
      createdAt: new Date()
    }

    try {
      const docRef = await addDoc(collection(db, 'expenses'), newExpense)
      setExpenses([...expenses, { ...newExpense, id: docRef.id }])
      setDescription('')
      setAmount('')
    } catch (error) {
      console.error('Error adding expense: ', error)
    }
  }

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Valor"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar Despesa
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ExpenseForm
