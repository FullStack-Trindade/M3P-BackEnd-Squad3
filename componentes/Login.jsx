import React, { useState } from 'react';
import { login } from './services/login.service';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const response = await login({ email, senha });

    if (response.status === 200) {
      console.log('Login bem-sucedido!');
    } else {
      console.error('Erro de login:', response.data.erro);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
