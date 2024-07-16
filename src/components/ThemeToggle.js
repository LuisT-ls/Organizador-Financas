import React from 'react'
import Button from '@mui/material/Button'

function ThemeToggle() {
  const toggleTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme')
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  return (
    <Button onClick={toggleTheme} variant="contained" color="primary">
      Alternar Tema
    </Button>
  )
}

export default ThemeToggle
