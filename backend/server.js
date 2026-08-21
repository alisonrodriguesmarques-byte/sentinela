const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// BANCO DE DADOS
const DB_FILE = path.join(__dirname, "db.json");

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return {
      usuarios: [],
      pacientes: [],
      triagens: [],
      consultas: [],
      chamadas: []
    };
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));

  // Garante que chamadas exista mesmo em um db.json antigo
  if (!db.chamadas) {
    db.chamadas = [];
  }

  return db;
}

function writeDB(data) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}


// ======================================================
// LOGIN
// ======================================================

app.post("/login", (req, res) => {
  const db = readDB();

  const user = db.usuarios.find(
    u =>
      u.usuario === req.body.usuario &&
      u.senha === req.body.senha
  );

  if (!user) {
    return res.status(401).json({
      erro: "Login inválido"
    });
  }

  res.json(user);
});


// ======================================================
// ATENDIMENTO
// ======================================================

app.post("/atendimento", (req, res) => {
  const db = readDB();

  const paciente = {
    id: Date.now(),
    nome: req.body.nome,
    cpf: req.body.cpf,
    tipo: req.body.tipo,
    status: "triagem",
    createdAt: new Date()
  };

  db.pacientes.push(paciente);

  writeDB(db);

  res.json(paciente);
});


// ======================================================
// TRIAGEM
// ======================================================

app.post("/triagem", (req, res) => {
  const db = readDB();

  let risco = req.body.risco;

  if (req.body.temperatura >= 39) {
    risco = "vermelho";
  } else if (req.body.temperatura >= 38) {
    risco = "amarelo";
  } else if (!risco) {
    risco = "verde";
  }

  const triagem = {
    id: Date.now(),
    nome: req.body.nome,
    sintoma: req.body.sintoma,
    temperatura: req.body.temperatura,
    alergia: req.body.alergia,
    observacao: req.body.observacao,
    risco: risco,
    status: "aguardando_medico",
    createdAt: new Date()
  };

  db.triagens.push(triagem);

  writeDB(db);

  res.json(triagem);
});


// ======================================================
// LISTAR TRIAGENS
// ======================================================

app.get("/triagens", (req, res) => {
  const db = readDB();

  res.json(db.triagens);
});


// ======================================================
// LISTA DE MEDICAÇÕES
// ======================================================

app.get("/lista-medicacoes", (req, res) => {
  res.json([
    "Dipirona",
    "Paracetamol",
    "Ibuprofeno",
    "Amoxicilina",
    "Azitromicina",
    "Loratadina",
    "Omeprazol",
    "Buscopan",
    "Dramin",
    "Soro fisiológico"
  ]);
});


// ======================================================
// CONSULTA
// ======================================================

app.post("/consulta", (req, res) => {
  const db = readDB();

  const consulta = {
    id: Date.now(),
    paciente: req.body.paciente,
    diagnostico: req.body.diagnostico,
    medicacao: req.body.medicacao,
    obs: req.body.obs,
    createdAt: new Date()
  };

  db.consultas.push(consulta);

  writeDB(db);

  res.json(consulta);
});


// ======================================================
// MEDICAÇÕES
// ======================================================

app.get("/medicacoes", (req, res) => {
  const db = readDB();

  res.json(db.consultas);
});


// ======================================================
// CRIAR CHAMADA PARA A TV
// ======================================================

app.post("/tv/chamada", (req, res) => {
  const db = readDB();

  const chamada = {
    id: Date.now(),

    localTipo:
      req.body.localTipo || "GUICHÊ",

    localNumero:
      req.body.localNumero || "--",

    paciente:
      req.body.paciente || "AGUARDANDO...",

    createdAt: new Date()
  };

  // Coloca a chamada mais recente no início
  db.chamadas.unshift(chamada);

  // Mantém somente as últimas 10 chamadas
  db.chamadas = db.chamadas.slice(0, 10);

  writeDB(db);

  res.json(chamada);
});


const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Servir o frontend
app.use(express.static(path.join(__dirname, "../frontend")));

const DB_FILE = path.join(__dirname, "db.json");

// ======================================================
// BANCO DE DADOS
// ======================================================

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return {
      usuarios: [],
      pacientes: [],
      triagens: [],
      consultas: [],
      chamadas: []
    };
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));

  // Compatibilidade com db.json antigo
  if (!db.usuarios) db.usuarios = [];
  if (!db.pacientes) db.pacientes = [];
  if (!db.triagens) db.triagens = [];
  if (!db.consultas) db.consultas = [];
  if (!db.chamadas) db.chamadas = [];

  return db;
}

function writeDB(data) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}


// ======================================================
// LOGIN
// ======================================================

app.post("/login", (req, res) => {
  const db = readDB();

  const user = db.usuarios.find(
    u =>
      u.usuario === req.body.usuario &&
      u.senha === req.body.senha
  );

  if (!user) {
    return res.status(401).json({
      erro: "Login inválido"
    });
  }

  res.json(user);
});


// ======================================================
// ATENDIMENTO - CADASTRAR PACIENTE
// ======================================================

app.post("/atendimento", (req, res) => {
  const db = readDB();

  const paciente = {
    id: Date.now(),
    nome: req.body.nome,
    cpf: req.body.cpf,
    tipo: req.body.tipo,
    status: "triagem",
    createdAt: new Date()
  };

  db.pacientes.push(paciente);

  writeDB(db);

  res.json(paciente);
});


// ======================================================
// LISTAR PACIENTES
// ======================================================

app.get("/pacientes", (req, res) => {
  const db = readDB();

  res.json(db.pacientes || []);
});


// ======================================================
// TRIAGEM
// ======================================================

app.post("/triagem", (req, res) => {
  const db = readDB();

  let risco = req.body.risco;

  if (req.body.temperatura >= 39) {
    risco = "vermelho";
  } else if (req.body.temperatura >= 38) {
    risco = "amarelo";
  } else if (!risco) {
    risco = "verde";
  }

  const triagem = {
    id: Date.now(),
    nome: req.body.nome,
    sintoma: req.body.sintoma,
    temperatura: req.body.temperatura,
    alergia: req.body.alergia,
    observacao: req.body.observacao,
    risco: risco,
    status: "aguardando_medico",
    createdAt: new Date()
  };

  db.triagens.push(triagem);

  writeDB(db);

  res.json(triagem);
});


// ======================================================
// LISTAR TRIAGENS
// ======================================================

app.get("/triagens", (req, res) => {
  const db = readDB();

  res.json(db.triagens);
});


// ======================================================
// MEDICAÇÕES DISPONÍVEIS
// ======================================================

app.get("/lista-medicacoes", (req, res) => {
  res.json([
    "Dipirona",
    "Paracetamol",
    "Ibuprofeno",
    "Amoxicilina",
    "Azitromicina",
    "Loratadina",
    "Omeprazol",
    "Buscopan",
    "Dramin",
    "Soro fisiológico"
  ]);
});


// ======================================================
// CONSULTA
// ======================================================

app.post("/consulta", (req, res) => {
  const db = readDB();

  const consulta = {
    id: Date.now(),
    paciente: req.body.paciente,
    diagnostico: req.body.diagnostico,
    medicacao: req.body.medicacao,
    obs: req.body.obs,
    createdAt: new Date()
  };

  db.consultas.push(consulta);

  writeDB(db);

  res.json(consulta);
});


// ======================================================
// MEDICAÇÕES / CONSULTAS
// ======================================================

app.get("/medicacoes", (req, res) => {
  const db = readDB();

  res.json(db.consultas);
});


// ======================================================
// CHAMAR PACIENTE NA TV
// ======================================================

app.post("/tv/chamada", (req, res) => {
  const db = readDB();

  const chamada = {
    id: Date.now(),
    localTipo: req.body.localTipo || "GUICHÊ",
    localNumero: req.body.localNumero || "01",
    paciente: req.body.paciente || "AGUARDANDO...",
    createdAt: new Date()
  };

  // Coloca a chamada mais recente no começo
  db.chamadas.unshift(chamada);

  // Mantém apenas as últimas 10
  db.chamadas = db.chamadas.slice(0, 10);

  writeDB(db);

  res.json(chamada);
});


// ======================================================
// TV - CHAMADA ATUAL E HISTÓRICO
// ======================================================

app.get("/tv/chamada", (req, res) => {
  const db = readDB();

  const historico = db.chamadas || [];

  const chamada =
    historico.length > 0
      ? historico[0]
      : null;

  res.json({
    chamada: chamada,
    historico: historico
  });
});


// ======================================================
// LIMPAR HISTÓRICO DA TV
// ======================================================

app.delete("/tv/chamada", (req, res) => {
  const db = readDB();

  db.chamadas = [];

  writeDB(db);

  res.json({
    mensagem: "Histórico de chamadas limpo"
  });
});


// ======================================================
// TESTE
// ======================================================

app.get("/", (req, res) => {
  res.send("🏥 Hospital Pro - Servidor funcionando!");
});


// ======================================================
// INICIAR SERVIDOR
// ======================================================

app.listen(3000, () => {
  console.log("🏥 Hospital Pro rodando em http://localhost:3000");
});