import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box
} from '@mui/material'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/') // Redireciona para o dashboard
    } catch (error) {
      setError(
        'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
      )
    }
  }

  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Paper style={{ padding: 32 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 16 }}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
