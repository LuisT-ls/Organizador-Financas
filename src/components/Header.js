import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { FaMoneyBillWave } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useAuth } from '../auth'
import ThemeToggle from './ThemeToggle'

function Header() {
  const { currentUser } = useAuth()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          component={Link}
          to="/"
        >
          <FaMoneyBillWave />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Organizador de Finanças
        </Typography>
        <ThemeToggle />
        {!currentUser && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Registrar
            </Button>
          </>
        )}
        {currentUser && <Logout />}
      </Toolbar>
    </AppBar>
  )
}

export default Header
