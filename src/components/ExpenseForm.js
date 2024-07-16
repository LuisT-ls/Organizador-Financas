import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

function ExpenseForm({ setExpenses }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { description, amount: parseFloat(amount), category }
    ])
    setDescription('')
    setAmount('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Valor"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Categoria"
        value={category}
        onChange={e => setCategory(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="Alimentação">Alimentação</MenuItem>
        <MenuItem value="Moradia">Moradia</MenuItem>
        <MenuItem value="Lazer">Lazer</MenuItem>
        <MenuItem value="Saúde">Saúde</MenuItem>
        <MenuItem value="Transporte">Transporte</MenuItem>
        <MenuItem value="Outros">Outros</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Adicionar
      </Button>
    </form>
  )
}

export default ExpenseForm
