// pacientes.js

const pacientes = [
  {
    id: 1,
    nomeCompleto: 'Ana Clara',
    genero: 'Feminino',
    dataNascimento: '1990-05-15',
    cpf: '123.456.789-01',
    rgOrgaoExpedidor: 'SSP-SC',
    estadoCivil: 'Solteiro(a)',
    telefone: '(48) 9 8765-4321',
    email: 'usuario1@reactive.com',
    naturalidade: 'Santa Catarina',
    contatoEmergencia: '(48) 9 1234-5678',
    alergias: 'Nenhuma',
    cuidadosEspecificos: 'Nenhum',
    convenio: 'Unimed',
    numeroConvenio: 'UNI123456',
    validadeConvenio: '2024-12-31',
    endereco: {
      cep: '01000-000',
      cidade: 'Santa Catarina',
      estado: 'SC',
      logradouro: 'Av. Beira Mar Norte',
      numero: '103',
      complemento: 'Apto 401',
      bairro: 'Centro',
      pontoReferencia: 'Próximo ao calçadão'
    },
    statusSistema: 'ativo',
  },
  {
  id: 2,
  nomeCompleto: 'Rodolfo Padilha',
  genero: 'Masculino',
  dataNascimento: '1985-08-20',
  cpf: '987.654.321-00',
  rgOrgaoExpedidor: 'SSP-SC',
  estadoCivil: 'Casado(a)',
  telefone: '(48) 9 5555-7777',
  email: 'usuario2@reactive.com',
  naturalidade: 'Santa Catarina',
  contatoEmergencia: '(48) 9 9999-8888',
  alergias: 'Poeira',
  cuidadosEspecificos: 'Nenhum',
  convenio: 'Amil',
  numeroConvenio: 'AMIL7890',
  validadeConvenio: '2023-10-15',
  endereco: {
    cep: '20000-000',
    cidade: 'Santa Catarina',
    estado: 'SC',
    logradouro: 'Avenida Mauro Ramos',
    numero: '204',
    complemento: 'Apto 2',
    bairro: 'Centro',
    pontoReferencia: 'Próximo à igreja Matriz'
  },
  statusSistema: 'ativo',
},
{
  id: 3,
  nomeCompleto: 'Ana Paula dos Santos',
  genero: 'Feminino',
  dataNascimento: '1978-03-10',
  cpf: '111.222.333-44',
  rgOrgaoExpedidor: 'SSP-SC',
  estadoCivil: 'Casado(a)',
  telefone: '(48) 9 7777-8888',
  email: 'usuario3@reactive.com',
  naturalidade: 'Santa Catarina',
  contatoEmergencia: '(48) 9 9999-1111',
  alergias: 'Nenhum',
  cuidadosEspecificos: 'Hipertensão',
  convenio: 'Unimed',
  numeroConvenio: 'UNI555555',
  validadeConvenio: '2024-08-31',
  endereco: {
    cep: '30000-000',
    cidade: 'Santa Catarina',
    estado: 'SC',
    logradouro: 'Av. das Rendeiras',
    numero: '100',
    complemento: 'Apto 304',
    bairro: 'Lagoa da Conceição',
    pontoReferencia: 'Próximo à Cafeteria Cultura'
  },
  statusSistema: 'ativo',
}
];
   
  function cadastrarPaciente(req, res) {
    const {
      nomeCompleto,
      genero,
      dataNascimento,
      cpf,
      rgOrgaoExpedidor,
      estadoCivil,
      telefone,
      email,
      naturalidade,
      contatoEmergencia,
      alergias,
      cuidadosEspecificos,
      convenio,
      numeroConvenio,
      validadeConvenio,
      endereco,
    } = req.body;

    if (
      !nomeCompleto ||
      nomeCompleto.length < 8 ||
      nomeCompleto.length > 64 ||
      !genero ||
      !dataNascimento ||
      !cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) ||
      !rgOrgaoExpedidor ||
      !estadoCivil ||
      !telefone.match(/^\(\d{2}\) 9 \d{4}-\d{5}$/) ||
      !email ||
      !naturalidade ||
      !contatoEmergencia.match(/^\(\d{2}\) 9 \d{4}-\d{5}$/) ||
      !endereco ||
      !endereco.cep ||
      !endereco.cidade ||
      !endereco.estado ||
      !endereco.logradouro ||
      !endereco.numero ||
      !endereco.complemento ||
      !endereco.bairro ||
      !endereco.pontoReferencia
    ) {
      return res.status(400).json({ erro: 'Dados de paciente inválidos ou ausentes.' });
    }
  
    const cpfExiste = pacientes.some((p) => p.cpf === cpf);
    const emailExiste = pacientes.some((p) => p.email === email);
  
    if (cpfExiste || emailExiste) {
      return res.status(409).json({ erro: 'CPF e/ou E-mail já cadastrados.' });
    }
  
    const novoPaciente = {
      id: pacientes.length + 1,
      nomeCompleto,
      genero,
      dataNascimento,
      cpf,
      rgOrgaoExpedidor,
      estadoCivil,
      telefone,
      email,
      naturalidade,
      contatoEmergencia,
      alergias,
      cuidadosEspecificos,
      convenio,
      numeroConvenio,
      validadeConvenio,
      endereco,
      statusSistema: 'ativo',
    };
  
    pacientes.push(novoPaciente);
  
    return res.status(201).json({ mensagem: 'Paciente cadastrado com sucesso.' });
  }
  
  function atualizarPaciente(req, res) {
  const pacienteId = parseInt(req.params.id);
  const {
    nomeCompleto,
    genero,
    dataNascimento,
    estadoCivil,
    telefone,
    email,
    naturalidade,
    contatoEmergencia,
    alergias,
    cuidadosEspecificos,
    convenio,
    numeroConvenio,
    validadeConvenio,
    endereco,
  } = req.body;

  if (
    !nomeCompleto ||
    nomeCompleto.length < 8 ||
    nomeCompleto.length > 64 ||
    !genero ||
    !dataNascimento ||
    !estadoCivil ||
    !telefone.match(/^\(\d{2}\) 9 \d{4}-\d{5}$/) ||
    !email ||
    !naturalidade ||
    !contatoEmergencia.match(/^\(\d{2}\) 9 \d{4}-\d{5}$/) ||
    !endereco ||
    !endereco.cep ||
    !endereco.cidade ||
    !endereco.estado ||
    !endereco.logradouro ||
    !endereco.numero ||
    !endereco.complemento ||
    !endereco.bairro ||
    !endereco.pontoReferencia
  ) {
    return res.status(400).json({ erro: 'Dados de paciente inválidos ou ausentes.' });
  }

  const pacienteExistente = pacientes.find((p) => p.id === pacienteId);
  if (!pacienteExistente) {
    return res.status(400).json({ erro: 'Paciente não encontrado.' });
  }

  pacienteExistente.nomeCompleto = nomeCompleto;
  pacienteExistente.genero = genero;
  pacienteExistente.dataNascimento = dataNascimento;
  pacienteExistente.estadoCivil = estadoCivil;
  pacienteExistente.telefone = telefone;
  pacienteExistente.email = email;
  pacienteExistente.naturalidade = naturalidade;
  pacienteExistente.contatoEmergencia = contatoEmergencia;
  pacienteExistente.alergias = alergias;
  pacienteExistente.cuidadosEspecificos = cuidadosEspecificos;
  pacienteExistente.convenio = convenio;
  pacienteExistente.numeroConvenio = numeroConvenio;
  pacienteExistente.validadeConvenio = validadeConvenio;
  pacienteExistente.endereco = endereco;

  return res.status(200).json({ mensagem: 'Paciente atualizado com sucesso.' });
}

function listarPacientes(req, res) {
  try {
    if (pacientes.length === 0) {
      return res.status(200).json({ mensagem: 'Nenhum paciente cadastrado.' });
    }
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

function listaPacientePorId(req, res) {
  const pacienteId = parseInt(req.params.id);
  const paciente = pacientes.find((p) => p.id === pacienteId);

  if (!paciente) {
    return res.status(404).json({ erro: 'Paciente não encontrado.' });
  }
  return res.status(200).json(paciente);
}

function deletarPaciente(req, res) {
  const pacienteId = parseInt(req.params.id);
  const pacienteIndex = pacientes.findIndex((p) => p.id === pacienteId);

  if (pacienteIndex === -1) {
    return res.status(404).json({ erro: 'Paciente não encontrado.' });
  }
  pacientes.splice(pacienteIndex, 1);

  return res.status(202).json({ mensagem: 'Paciente deletado com sucesso.' });
}

  module.exports = {
    cadastrarPaciente,
    atualizarPaciente,
    listarPacientes,
    listaPacientePorId,
    deletarPaciente,
  };
  