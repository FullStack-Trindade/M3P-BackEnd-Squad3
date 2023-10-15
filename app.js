//app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;

const loginService = require('./services/login.service');
const usuariosService = require('./services/usuarios.service');
const pacientesService = require('./services/pacientes.service');
const consultasService = require('./services/consultas.service');

app.use(bodyParser.json());

app.post('/api/usuarios/login', loginService.login);
app.patch('/api/usuarios/resetarsenha', usuariosService.resetarSenha);
app.post('/api/usuarios', usuariosService.cadastrarUsuario);
app.put('/api/usuarios/:id', usuariosService.atualizarUsuario);
app.get('/api/usuarios', usuariosService.listarUsuarios);
app.delete('/api/usuarios/:id', usuariosService.deletarUsuario);
app.post('/api/pacientes', pacientesService.cadastrarPaciente);
app.put('/api/pacientes/:id', pacientesService.atualizarPaciente);
app.get('/api/pacientes', pacientesService.listarPacientes);
app.get('/api/pacientes/:id', pacientesService.listaPacientePorId);
app.delete('/api/pacientes/:id', pacientesService.deletarPaciente);
app.post('/api/consultas', consultasService.cadastrarConsulta);
app.put('/api/consultas/:id', consultasService.atualizarConsulta);
app.get('/api/consultas/:id', consultasService.listarConsultas);
app.delete('/api/consultas/:id', consultasService.deletarConsulta);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});