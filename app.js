const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;

app.use(bodyParser.json());

const users = [
  { id: 1, email: 'usuario1@reactive.com', senha: 'react1234' },
  { id: 2, email: 'usuario2@reactive.com', senha: 'react5678' },
  { id: 3, email: 'usuario3@reactive.com', senha: 'react9101' }
];

app.post('/api/usuarios/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  const user = users.find((u) => u.email === email && u.senha === senha);

  if (user) {
    return res.status(200).json({ mensagem: 'Login bem-sucedido!' });
  } else {
    return res.status(400).json({ erro: 'E-mail ou senha incorretos. Tente novamente!' });
  }
});

app.patch('/api/usuarios/resetarsenha', (req, res) => {
  const { id, email, senha } = req.body;

  if (!id || !email || !senha) {
    return res.status(400).json({ erro: 'Favor informar o ID, e-mail e senha. São campos obrigatórios.' });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ erro: 'Usuário não encontrado.' });
  }

  user.senha = senha;

  return res.status(200).json({ mensagem: 'Senha resetada com sucesso.' });
});

app.post('/api/usuarios', (req, res) => {
  const {
    nomeCompleto,
    genero,
    cpf,
    telefone,
    email,
    senha,
    tipo,
    statusSistema
  } = req.body;

  if (
    !nomeCompleto ||
    nomeCompleto.length < 8 ||
    nomeCompleto.length > 64 ||
    !genero ||
    !cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) ||
    !telefone.match(/^\(\d{2}\) 9 \d{4}-\d{5}$/) ||
    !email ||
    senha.length < 6 ||
    !tipo ||
    typeof statusSistema !== 'boolean'
  ) {
    return res.status(400).json({ erro: 'Dados de usuário inválidos ou ausentes.' });
  }

  const cpfExiste = users.some((u) => u.cpf === cpf);
  const emailExiste = users.some((u) => u.email === email);

  if (cpfExiste || emailExiste) {
    return res.status(409).json({ erro: 'CPF e/ou E-mail já cadastrados.' });
  }

  const novoUsuario = {
    id: users.length + 1,
    nomeCompleto,
    genero,
    cpf,
    telefone,
    email,
    senha,
    tipo,
    statusSistema
  };

  users.push(novoUsuario);

  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
});

app.put('/api/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Pega o ID do usuário a ser atualizado
  const {
    nomeCompleto,
    genero,
    telefone,
    senha,
    tipo
  } = req.body;

  if (
    !nomeCompleto ||
    nomeCompleto.length < 8 ||
    nomeCompleto.length > 64 ||
    !genero ||
    !telefone.match(/^\(\d{2}\) 9 \d{4}-\d{5}/) ||
    !senha || senha.length < 6 ||
    !tipo
  ) {
    return res.status(400).json({ erro: 'Dados de usuário inválidos ou ausentes.' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(400).json({ erro: 'Usuário não encontrado.' });
  }

  users[userIndex] = {
    ...users[userIndex],
    nomeCompleto,
    genero,
    telefone,
    senha,
    tipo
  };

  return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
});

app.get('/api/usuarios', (req, res) => {
  const usuarios = users.map((user) => {
    const { senha, ...usuarioSemSenha } = user;
    return usuarioSemSenha;
  });

  return res.status(200).json(usuarios);
});

app.delete('/api/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(400).json({ erro: 'Usuário não encontrado.' });
  }

  users.splice(userIndex, 1);

  return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
