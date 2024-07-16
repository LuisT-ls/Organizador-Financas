import React, { useState } from 'react'
import { TextField, Button, Grid } from '@mui/material'

function IncomeForm({ setIncome }) {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setIncome(prevIncome => [
      ...prevIncome,
      { source, amount: parseFloat(amount) }
    ])
    setSource('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Fonte"
            value={source}
            onChange={e => setSource(e.target.value)}
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
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default IncomeForm
