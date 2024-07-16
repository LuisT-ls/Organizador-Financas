import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

function Income({ income }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Receitas
      </Typography>
      <List>
        {income.map((inc, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${inc.source}: R$${inc.amount.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Income
