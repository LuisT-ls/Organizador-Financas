import React from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  FaChartLine,
  FaPiggyBank,
  FaShoppingCart,
  FaHeartbeat,
  FaCar
} from 'react-icons/fa'

function Sidebar() {
  return (
    <aside className="sidebar">
      <List component="nav">
        <ListItem button component={Link} to="/expenses">
          <ListItemIcon>
            <FaChartLine />
          </ListItemIcon>
          <ListItemText primary="Despesas" />
        </ListItem>
        <ListItem button component={Link} to="/income">
          <ListItemIcon>
            <FaPiggyBank />
          </ListItemIcon>
          <ListItemText primary="Receitas" />
        </ListItem>
        <ListItem button component={Link} to="/savings">
          <ListItemIcon>
            <FaPiggyBank />
          </ListItemIcon>
          <ListItemText primary="Poupança" />
        </ListItem>
        <ListItem button component={Link} to="/fixed-costs">
          <ListItemIcon>
            <FaShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Gastos Fixos" />
        </ListItem>
        <ListItem button component={Link} to="/leisure-expenses">
          <ListItemIcon>
            <FaHeartbeat />
          </ListItemIcon>
          <ListItemText primary="Gastos com Lazer" />
        </ListItem>
        <ListItem button component={Link} to="/emergency-fund">
          <ListItemIcon>
            <FaCar />
          </ListItemIcon>
          <ListItemText primary="Fundo de Emergência" />
        </ListItem>
      </List>
    </aside>
  )
}

export default Sidebar
