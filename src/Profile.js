import React, { useState } from 'react'
import { auth } from './firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { useAuth } from './auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Profile() {
  const { currentUser } = useAuth()
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '')

  const handleUpdateProfile = async e => {
    e.preventDefault()
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL
      })
      alert('Perfil atualizado com sucesso!')
    } catch (error) {
      alert('Erro ao atualizar perfil: ' + error.message)
    }
  }

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      <Typography variant="h4">Perfil</Typography>
      <form onSubmit={handleUpdateProfile}>
        <TextField
          label="Nome"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL da Foto"
          value={photoURL}
          onChange={e => setPhotoURL(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Atualizar Perfil
        </Button>
      </form>
    </div>
  )
}

export default Profile
