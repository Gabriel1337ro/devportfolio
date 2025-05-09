import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Avatar, Button, Link, Grid, Paper } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/profile`).then(res => setProfile(res.data));
    axios.get(`${API_URL}/projects`).then(res => setProjects(res.data));
  }, []);

  if (!profile) return <div>Cargando...</div>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(90deg, #5f4be5 60%, #d4ff7f 40%)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 6, flex: 1 }}>
        <Box sx={{ flex: 1, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold">{profile.titulo}</Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>{profile.nombre}</Typography>
          <Typography sx={{ mt: 2 }}>{profile.descripcion}</Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="secondary" href={profile.cvInglesUrl} target="_blank" sx={{ mr: 2 }}>Descargar CV Inglés</Button>
            <Button variant="contained" color="secondary" href={profile.cvEspanolUrl} target="_blank">Descargar CV Español</Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Link href={profile.githubUrl} target="_blank" color="inherit" sx={{ mr: 2 }}>GitHub</Link>
            <Link href={profile.linkedinUrl} target="_blank" color="inherit">LinkedIn</Link>
          </Box>
          <Typography sx={{ mt: 3 }}>Ubicación: {profile.ubicacion}</Typography>
          <Typography>Idiomas: {profile.idiomas}</Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Avatar src={profile.fotoPerfilUrl} alt={profile.nombre} sx={{ width: 220, height: 220, border: '6px solid #d4ff7f' }} />
        </Box>
      </Box>
      <Box sx={{ background: '#fff', borderTopLeftRadius: 40, borderTopRightRadius: 40, p: 6, mt: -8 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#5f4be5' }}>Proyectos</Typography>
        <Grid container spacing={4}>
          {projects.map(project => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
                <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
                <Typography sx={{ mb: 1 }}>{project.description}</Typography>
                <Typography variant="body2" color="text.secondary">Tecnologías: {project.technologiesUsed}</Typography>
                <Box sx={{ mt: 2 }}>
                  {project.projectUrl && <Button href={project.projectUrl} target="_blank" size="small" sx={{ mr: 1 }}>Ver Proyecto</Button>}
                  {project.githubUrl && <Button href={project.githubUrl} target="_blank" size="small">GitHub</Button>}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home; 