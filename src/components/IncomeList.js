import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function IncomeList({ income, setIncome }) {
  const [editIndex, setEditIndex] = useState(-1)
  const [editSource, setEditSource] = useState('')
  const [editAmount, setEditAmount] = useState('')

  if (!income || income.length === 0) {
    return <p>Nenhuma renda encontrada.</p>
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
  )
}

export default IncomeList
