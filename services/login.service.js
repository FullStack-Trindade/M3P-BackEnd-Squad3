//login.js
const users = [
    { id: 1, email: 'usuario1@reactive.com', senha: 'react1234' },
    { id: 2, email: 'usuario2@reactive.com', senha: 'react5678' },
    { id: 3, email: 'usuario3@reactive.com', senha: 'react9101' }
  ];
  
  function login(req, res) {
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
  }
  
  module.exports = {
    login,
  };
  