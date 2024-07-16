import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

function Expenses({ expenses }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Despesas
      </Typography>
      <List>
        {expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${expense.description} - ${
                expense.category
              }: R$${expense.amount.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Expenses
