import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function ExpensesList({ expenses, setExpenses }) {
  if (!expenses || expenses.length === 0) {
    return <p>Nenhuma despesa encontrada.</p>
  }

  const handleDelete = index => {
    const newExpenses = expenses.filter((_, i) => i !== index)
    setExpenses(newExpenses)
  }

  const handleEdit = index => {
    // Implementar lógica de edição
  }

  return (
    <List>
      {expenses.map((expense, index) => (
        <ListItem
          key={index}
          secondaryAction={
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
          }
        >
          <ListItemText
            primary={`${expense.description} - ${
              expense.category
            }: R$${expense.amount.toFixed(2)}`}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default ExpensesList
