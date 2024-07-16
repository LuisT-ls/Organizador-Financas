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

function FixedCostsPage() {
  const { fixedCosts, setFixedCosts } = useGlobalState()
  const [editIndex, setEditIndex] = useState(-1)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const handleAdd = e => {
    e.preventDefault()
    setFixedCosts(prevCosts => [
      ...prevCosts,
      { description, amount: parseFloat(amount) }
    ])
    setDescription('')
    setAmount('')
  }

  const handleDelete = index => {
    const newCosts = fixedCosts.filter((_, i) => i !== index)
    setFixedCosts(newCosts)
  }

  const handleEdit = index => {
    setEditIndex(index)
    setEditDescription(fixedCosts[index].description)
    setEditAmount(fixedCosts[index].amount)
  }

  const handleSave = index => {
    const newCosts = fixedCosts.map((cost, i) =>
      i === index
        ? { description: editDescription, amount: parseFloat(editAmount) }
        : cost
    )
    setFixedCosts(newCosts)
    setEditIndex(-1)
    setEditDescription('')
    setEditAmount('')
  }

  const handleCancel = () => {
    setEditIndex(-1)
    setEditDescription('')
    setEditAmount('')
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4">Gastos Fixos</Typography>
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
              {fixedCosts.map((cost, index) => (
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
                    </div>
                  ) : (
                    <ListItemText
                      primary={`${cost.description}: R$${cost.amount.toFixed(
                        2
                      )}`}
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

export default FixedCostsPage
