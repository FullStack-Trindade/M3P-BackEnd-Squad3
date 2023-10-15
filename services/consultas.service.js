// consultas.js

const consultas = [];
   
function cadastrarConsulta(req, res) {
  const {
    motivoConsulta,
    descricaoProblema,
    dosagemPrecaucoes,
    statusSistema
  } = req.body;

  if (
    !motivoConsulta ||
    motivoConsulta.length < 8 ||
    motivoConsulta.length > 64 ||
    !descricaoProblema ||
    descricaoProblema.length < 16 ||
    descricaoProblema.length > 1024 ||
    !dosagemPrecaucoes ||
    dosagemPrecaucoes.length < 16 ||
    dosagemPrecaucoes.length > 256 ||
    typeof statusSistema !== 'boolean'
  ) {
    return res.status(400).json({ erro: 'Dados da consulta inválidos ou ausentes.' });
  }

  const novaConsulta = {
    id: consultas.length + 1,
    motivoConsulta,
    descricaoProblema,
    dosagemPrecaucoes,
    statusSistema,
    dataConsulta: new Date(),
    horarioConsulta: new Date().toLocaleTimeString(),
  };

  consultas.push(novaConsulta);

  return res.status(201).json({ mensagem: 'Consulta criada com sucesso.' });
}

function atualizarConsulta(req, res) {
  const consultaId = parseInt(req.params.id);
  const {
    motivoConsulta,
    descricaoProblema,
    dosagemPrecaucoes,
    statusSistema
  } = req.body;

  if (
    !motivoConsulta ||
    motivoConsulta.length < 8 ||
    motivoConsulta.length > 64 ||
    !descricaoProblema ||
    descricaoProblema.length < 16 ||
    descricaoProblema.length > 1024 ||
    !dosagemPrecaucoes ||
    dosagemPrecaucoes.length < 16 ||
    dosagemPrecaucoes.length > 256 ||
    typeof statusSistema !== 'boolean'
  ) {
    return res.status(400).json({ erro: 'Dados da consulta inválidos ou ausentes.' });
  }

  const consultaExistente = consultas.find((consulta) => consulta.id === consultaId);

  if (!consultaExistente) {
    return res.status(400).json({ erro: 'Consulta não encontrada.' });
  }

  consultaExistente.motivoConsulta = motivoConsulta;
  consultaExistente.descricaoProblema = descricaoProblema;
  consultaExistente.dosagemPrecaucoes = dosagemPrecaucoes;
  consultaExistente.statusSistema = statusSistema;

  return res.status(200).json({ mensagem: 'Consulta atualizada com sucesso.' });
}

function listarConsultas(req, res) {
  const usuarioId = req.query.userId;

  if (usuarioId) {
    const consultasDoUsuario = consultas.filter((consulta) => consulta.usuarioId === usuarioId);

    if (consultasDoUsuario.length === 0) {
      return res.status(400).json({ erro: 'Não foram encontradas consultas para o usuário especificado.' });
    }

    return res.status(200).json(consultasDoUsuario);
  } else {
    return res.status(200).json(consultas);
  }
}

function deletarConsulta(req, res) {
  const consultaId = parseInt(req.params.id);

  const consultaIndex = consultas.findIndex((consulta) => consulta.id === consultaId);

  if (consultaIndex === -1) {
    return res.status(400).json({ erro: 'Consulta não encontrada.' });
  }

  consultas.splice(consultaIndex, 1);

  return res.status(202).json({ mensagem: 'Consulta excluída com sucesso.' });
}

  module.exports = {
    cadastrarConsulta,
    atualizarConsulta,
    listarConsultas,
    deletarConsulta,
  };
  