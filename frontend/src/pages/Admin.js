import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, TextField, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function Admin() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editProfile, setEditProfile] = useState({});
  const [editProject, setEditProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '', technologiesUsed: '' });

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/login');
    axios.get(`${API_URL}/profile`).then(res => {
      setProfile(res.data);
      setEditProfile(res.data);
    });
    axios.get(`${API_URL}/projects`).then(res => setProjects(res.data));
  }, [navigate]);

  const handleProfileChange = e => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    axios.put(`${API_URL}/profile`, editProfile).then(res => setProfile(res.data));
  };

  const handleProjectChange = e => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };

  const saveProject = () => {
    if (editProject.id) {
      axios.put(`${API_URL}/projects/${editProject.id}`, editProject).then(() => {
        axios.get(`${API_URL}/projects`).then(res => setProjects(res.data));
        setEditProject(null);
      });
    } else {
      axios.post(`${API_URL}/projects`, editProject).then(() => {
        axios.get(`${API_URL}/projects`).then(res => setProjects(res.data));
        setEditProject(null);
      });
    }
  };

  const deleteProject = id => {
    axios.delete(`${API_URL}/projects/${id}`).then(() => {
      setProjects(projects.filter(p => p.id !== id));
    });
  };

  if (!profile) return <div>Cargando...</div>;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #5f4be5 60%, #d4ff7f 40%)', p: 4 }}>
      <Paper sx={{ p: 4, mb: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Editar Perfil</Typography>
        <Grid container spacing={2}>
          {Object.keys(editProfile).filter(key => key !== 'id').map(key => (
            <Grid item xs={12} md={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={editProfile[key] || ''}
                onChange={handleProfileChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" onClick={saveProfile}>Guardar Cambios</Button>
      </Paper>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Proyectos</Typography>
          <Button variant="contained" color="secondary" onClick={() => { setEditProject({ title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '', technologiesUsed: '' }); setOpenDialog(true); }}>Agregar Proyecto</Button>
        </Box>
        <Grid container spacing={2}>
          {projects.map(project => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
                <Typography>{project.description}</Typography>
                <Button size="small" onClick={() => { setEditProject(project); setOpenDialog(true); }}>Editar</Button>
                <Button size="small" color="error" onClick={() => deleteProject(project.id)}>Eliminar</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Dialog open={!!editProject} onClose={() => setEditProject(null)}>
        <DialogTitle>{editProject && editProject.id ? 'Editar Proyecto' : 'Agregar Proyecto'}</DialogTitle>
        <DialogContent>
          {editProject && Object.keys(newProject).map(key => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={editProject[key] || ''}
              onChange={handleProjectChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProject(null)}>Cancelar</Button>
          <Button onClick={saveProject} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Admin; 