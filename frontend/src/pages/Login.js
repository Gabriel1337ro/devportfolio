import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123'; // Puedes cambiar esto luego

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #5f4be5 60%, #d4ff7f 40%)' }}>
      <Paper sx={{ p: 4, borderRadius: 4, minWidth: 320 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Login Admin</Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Usuario" fullWidth sx={{ mb: 2 }} value={user} onChange={e => setUser(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth sx={{ mb: 2 }} value={pass} onChange={e => setPass(e.target.value)} />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>Ingresar</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login; 