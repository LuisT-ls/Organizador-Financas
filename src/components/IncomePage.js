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
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useGlobalState } from '../context/GlobalState'

function IncomePage() {
  const { income, setIncome } = useGlobalState()
  const [editIndex, setEditIndex] = useState(-1)
  const [editSource, setEditSource] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    setIncome(prevIncome => [
      ...prevIncome,
      { source, amount: parseFloat(amount) }
    ])
    setSource('')
    setAmount('')
  }

  const handleDelete = index => {
    const newIncome = income.filter((_, i) => i !== index)
    setIncome(newIncome)
  }

  const handleEdit = index => {
    setEditIndex(index)
    setEditSource(income[index].source)
    setEditAmount(income[index].amount)
  }

  const handleSave = index => {
    const newIncome = income.map((inc, i) =>
      i === index ? { source: editSource, amount: parseFloat(editAmount) } : inc
    )
    setIncome(newIncome)
    setEditIndex(-1)
    setEditSource('')
    setEditAmount('')
  }

  const handleCancel = () => {
    setEditIndex(-1)
    setEditSource('')
    setEditAmount('')
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4">Receitas</Typography>
            <form onSubmit={handleAdd}>
              <TextField
                label="Fonte"
                value={source}
                onChange={e => setSource(e.target.value)}
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
              {income.map((inc, index) => (
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
                        label="Fonte"
                        value={editSource}
                        onChange={e => setEditSource(e.target.value)}
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
                    </div>
                  ) : (
                    <ListItemText
                      primary={`${inc.source}: R$${inc.amount.toFixed(2)}`}
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

export default IncomePage
