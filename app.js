//app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;

const loginService = require('./services/login.service');
const usuariosService = require('./services/usuarios.service');

app.use(bodyParser.json());

app.post('/api/usuarios/login', loginService.login);
app.patch('/api/usuarios/resetarsenha', usuariosService.resetarSenha);
app.post('/api/usuarios', usuariosService.cadastrarUsuario);
app.put('/api/usuarios/:id', usuariosService.atualizarUsuario);
app.get('/api/usuarios', usuariosService.listarUsuarios);
app.delete('/api/usuarios/:id', usuariosService.deletarUsuario);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});