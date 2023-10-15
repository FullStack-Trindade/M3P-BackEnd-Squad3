import React, { useState, useEffect } from 'react';
import {
  listarUsuarios,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from './services/usuarios.service';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    nomeCompleto: '',
    genero: '',
    telefone: '',
    senha: '',
    tipo: '',
  });

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await listarUsuarios();
      setUsuarios(response.data);
    }

    fetchUsuarios();
  }, []);

  const handleCadastrarUsuario = async () => {
    const response = await cadastrarUsuario(novoUsuario);
    if (response.status === 201) {
      const usuariosAtualizados = await listarUsuarios();
      setUsuarios(usuariosAtualizados.data);
      setNovoUsuario({
        nomeCompleto: '',
        genero: '',
        telefone: '',
        senha: '',
        tipo: '',
      });
    } else {
      console.error('Erro ao cadastrar usuário:', response.data.erro);
    }
  };

  const handleAtualizarUsuario = async (userId) => {
    const response = await atualizarUsuario(userId, novoUsuario);
    if (response.status === 200) {
      const usuariosAtualizados = await listarUsuarios();
      setUsuarios(usuariosAtualizados.data);
    } else {
      console.error('Erro ao atualizar usuário:', response.data.erro);
    }
  };

  const handleDeletarUsuario = async (userId) => {
    const response = await deletarUsuario(userId);
    if (response.status === 200) {
      const usuariosAtualizados = await listarUsuarios();
      setUsuarios(usuariosAtualizados.data);
    } else {
      console.error('Erro ao excluir usuário:', response.data.erro);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nomeCompleto} - {usuario.email}
            <button onClick={() => handleDeletarUsuario(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Cadastrar Novo Usuário</h2>
      <input
        type="text"
        placeholder="Nome Completo"
        value={novoUsuario.nomeCompleto}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, nomeCompleto: e.target.value })}
      />
      <input
        type="text"
        placeholder="Gênero"
        value={novoUsuario.genero}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, genero: e.target.value })}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={novoUsuario.telefone}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={novoUsuario.senha}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tipo"
        value={novoUsuario.tipo}
        onChange={(e) => setNovoUsuario({ ...novoUsuario, tipo: e.target.value })}
      />
      <button onClick={handleCadastrarUsuario}>Cadastrar</button>
    </div>
  );
}

export default Usuarios;
