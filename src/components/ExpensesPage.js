import React, { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useGlobalState } from '../context/GlobalState'

function ExpensesPage() {
  const { expenses, setExpenses } = useGlobalState()
  const [editIndex, setEditIndex] = useState(-1)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { description, amount: parseFloat(amount), category }
    ])
    setDescription('')
    setAmount('')
    setCategory('')
  }

  const handleDelete = index => {
    const newExpenses = expenses.filter((_, i) => i !== index)
    setExpenses(newExpenses)
  }

  const handleEdit = index => {
    setEditIndex(index)
    setEditDescription(expenses[index].description)
    setEditAmount(expenses[index].amount)
    setEditCategory(expenses[index].category)
  }

  const handleSave = index => {
    const newExpenses = expenses.map((expense, i) =>
      i === index
        ? {
            description: editDescription,
            amount: parseFloat(editAmount),
            category: editCategory
          }
        : expense
    )
    setExpenses(newExpenses)
    setEditIndex(-1)
    setEditDescription('')
    setEditAmount('')
    setEditCategory('')
  }

  const handleCancel = () => {
    setEditIndex(-1)
    setEditDescription('')
    setEditAmount('')
    setEditCategory('')
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4">Despesas</Typography>
            <form onSubmit={handleAdd}>
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
                <MenuItem value="Educação">Educação</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Adicionar
              </Button>
            </form>
            <List>
              {expenses.map((expense, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      {editIndex === index ? (
                        <>
                          <IconButton
                            edge="end"
                            aria-label="save"
                            onClick={() => handleSave(index)}
                          >
                            <Button variant="contained" color="primary">
                              Salvar
                            </Button>
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="cancel"
                            onClick={handleCancel}
                          >
                            <Button variant="contained" color="secondary">
                              Cancelar
                            </Button>
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEdit(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </>
                  }
                >
                  {editIndex === index ? (
                    <div>
                      <TextField
                        label="Descrição"
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      <TextField
                        label="Valor"
                        type="number"
                        value={editAmount}
                        onChange={e => setEditAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      <TextField
                        select
                        label="Categoria"
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      >
                        <MenuItem value="Alimentação">Alimentação</MenuItem>
                        <MenuItem value="Moradia">Moradia</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                        <MenuItem value="Saúde">Saúde</MenuItem>
                        <MenuItem value="Transporte">Transporte</MenuItem>
                        <MenuItem value="Educação">Educação</MenuItem>
                      </TextField>
                    </div>
                  ) : (
                    <ListItemText
                      primary={`${expense.description} - ${
                        expense.category
                      }: R$${expense.amount.toFixed(2)}`}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ExpensesPage
