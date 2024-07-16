import React from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch(error => {
        console.error('Erro ao fazer logout: ', error)
      })
  }

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Logout
