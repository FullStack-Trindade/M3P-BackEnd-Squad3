import React, { useState, useEffect } from 'react';
import {
  cadastrarConsulta,
  atualizarConsulta,
  listarConsultas,
  deletarConsulta,
} from './services/consultas.service';

function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [novaConsulta, setNovaConsulta] = useState({
    motivoConsulta: '',
    descricaoProblema: '',
    dosagemPrecaucoes: '',
    statusSistema: true,
  });

  useEffect(() => {
    async function fetchConsultas() {
      const response = await listarConsultas();
      setConsultas(response.data);
    }

    fetchConsultas();
  }, []);

  const handleCadastrarConsulta = async () => {
    const response = await cadastrarConsulta(novaConsulta);
    if (response.status === 201) {
      const consultasAtualizadas = await listarConsultas();
      setConsultas(consultasAtualizadas.data);
      setNovaConsulta({
        motivoConsulta: '',
        descricaoProblema: '',
        dosagemPrecaucoes: '',
        statusSistema: true,
      });
    } else {
      console.error('Erro ao cadastrar consulta:', response.data.erro);
    }
  };

  const handleAtualizarConsulta = async (consultaId) => {
    const response = await atualizarConsulta(consultaId, novaConsulta);
    if (response.status === 200) {
      const consultasAtualizadas = await listarConsultas();
      setConsultas(consultasAtualizadas.data);
    } else {
      console.error('Erro ao atualizar consulta:', response.data.erro);
    }
  };

  const handleDeletarConsulta = async (consultaId) => {
    const response = await deletarConsulta(consultaId);
    if (response.status === 202) {
      const consultasAtualizadas = await listarConsultas();
      setConsultas(consultasAtualizadas.data);
    } else {
      console.error('Erro ao excluir consulta:', response.data.erro);
    }
  };

  return (
    <div>
      <h1>Lista de Consultas</h1>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.id}>
            {consulta.motivoConsulta}
            <button onClick={() => handleDeletarConsulta(consulta.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Cadastrar Nova Consulta</h2>
      <input
        type="text"
        placeholder="Motivo da Consulta"
        value={novaConsulta.motivoConsulta}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, motivoConsulta: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição do Problema"
        value={novaConsulta.descricaoProblema}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, descricaoProblema: e.target.value })}
      />
      <input
        type="text"
        placeholder="Dosagem e Precauções"
        value={novaConsulta.dosagemPrecaucoes}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, dosagemPrecaucoes: e.target.value })}
      />
      <button onClick={handleCadastrarConsulta}>Cadastrar</button>
    </div>
  );
}

export default Consultas;
