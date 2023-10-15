import React, { useState, useEffect } from 'react';
import {
  cadastrarPaciente,
  atualizarPaciente,
  listarPacientes,
  listaPacientePorId,
  deletarPaciente,
} from './services/pacientes.service';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [novoPaciente, setNovoPaciente] = useState({
    nomeCompleto: '',
    genero: '',
    dataNascimento: '',
    cpf: '',
    rgOrgaoExpedidor: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    naturalidade: '',
    contatoEmergencia: '',
    alergias: '',
    cuidadosEspecificos: '',
    convenio: '',
    numeroConvenio: '',
    validadeConvenio: '',
    endereco: {
      cep: '',
      cidade: '',
      estado: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      pontoReferencia: '',
    },
  });

  useEffect(() => {
    async function fetchPacientes() {
      const response = await listarPacientes();
      setPacientes(response.data);
    }

    fetchPacientes();
  }, []);

  const handleCadastrarPaciente = async () => {
    const response = await cadastrarPaciente(novoPaciente);
    if (response.status === 201) {
      const pacientesAtualizados = await listarPacientes();
      setPacientes(pacientesAtualizados.data);
      setNovoPaciente({
        nomeCompleto: '',
        genero: '',
        dataNascimento: '',
        cpf: '',
        rgOrgaoExpedidor: '',
        estadoCivil: '',
        telefone: '',
        email: '',
        naturalidade: '',
        contatoEmergencia: '',
        alergias: '',
        cuidadosEspecificos: '',
        convenio: '',
        numeroConvenio: '',
        validadeConvenio: '',
        endereco: {
          cep: '',
          cidade: '',
          estado: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          pontoReferencia: '',
        },
      });
    } else {
      console.error('Erro ao cadastrar paciente:', response.data.erro);
    }
  };

  const handleAtualizarPaciente = async (pacienteId) => {
    const response = await atualizarPaciente(pacienteId, novoPaciente);
    if (response.status === 200) {
      const pacientesAtualizados = await listarPacientes();
      setPacientes(pacientesAtualizados.data);
    } else {
      console.error('Erro ao atualizar paciente:', response.data.erro);
    }
  };

  const handleExibirPaciente = async (pacienteId) => {
    const response = await listaPacientePorId(pacienteId);
    if (response.status === 200) {
      console.log('Detalhes do paciente:', response.data);
    } else {
      console.error('Erro ao exibir paciente:', response.data.erro);
    }
  };

  const handleDeletarPaciente = async (pacienteId) => {
    const response = await deletarPaciente(pacienteId);
    if (response.status === 202) {
      const pacientesAtualizados = await listarPacientes();
      setPacientes(pacientesAtualizados.data);
    } else {
      console.error('Erro ao excluir paciente:', response.data.erro);
    }
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            {paciente.nomeCompleto} - {paciente.cpf}
            <button onClick={() => handleExibirPaciente(paciente.id)}>Exibir</button>
            <button onClick={() => handleDeletarPaciente(paciente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Cadastrar Novo Paciente</h2>
      {
      /* 
      Adicione os campos de formulário para cadastrar um novo paciente aqui 
      */
      }
      <button onClick={handleCadastrarPaciente}>Cadastrar</button>
    </div>
  );
}

export default Pacientes;
