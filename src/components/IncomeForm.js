import React, { useState } from 'react'
import { useGlobalState } from '../context/GlobalState'
import { TextField, Button, Paper, Grid } from '@mui/material'

function IncomeForm() {
  const { income, setIncome } = useGlobalState()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const newIncome = { description, amount: parseFloat(amount) }
    setIncome([...income, newIncome])
    setDescription('')
    setAmount('')
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
              Adicionar Receita
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default IncomeForm
