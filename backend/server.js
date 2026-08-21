const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const DB = path.join(__dirname, "db.json");

function readDB() {
    if (!fs.existsSync(DB)) {
        return {
            usuarios: [],
            pacientes: [],
            triagens: [],
            consultas: [],
            tv: null,
            historicoTV: []
        };
    }

    const db = JSON.parse(fs.readFileSync(DB, "utf8"));

    db.usuarios ||= [];
    db.pacientes ||= [];
    db.triagens ||= [];
    db.consultas ||= [];
    db.historicoTV ||= [];
    db.tv ||= null;

    return db;
}

function writeDB(db) {
    fs.writeFileSync(DB, JSON.stringify(db, null, 2));
}

/* LOGIN */
app.post("/login", (req, res) => {
    const db = readDB();

    const user = db.usuarios.find(u =>
        u.usuario === req.body.usuario &&
        u.senha === req.body.senha
    );

    if (!user)
        return res.status(401).json({ erro: "Login inválido" });

    res.json(user);
});

/* CADASTRAR PACIENTE */
app.post("/atendimento", (req, res) => {
    const db = readDB();

    const paciente = {
        id: Date.now(),
        nome: req.body.nome,
        cpf: req.body.cpf || "",
        tipo: req.body.tipo || "",
        status: "triagem",
        createdAt: new Date().toISOString()
    };

    db.pacientes.push(paciente);
    writeDB(db);

    res.json(paciente);
});

/* LISTAR PACIENTES */
app.get("/pacientes", (req, res) => {
    res.json(readDB().pacientes);
});

/* SALVAR TRIAGEM */
app.post("/triagem", (req, res) => {
    const db = readDB();

    const pacienteId = req.body.pacienteId || null;
    const temperatura = Number(req.body.temperatura) || 0;

    let risco = req.body.risco || "verde";

    if (temperatura >= 39) risco = "vermelho";
    else if (temperatura >= 38) risco = "amarelo";

    const triagem = {
        id: Date.now(),
        pacienteId,
        nome: req.body.nome,
        idade: req.body.idade,
        sexo: req.body.sexo,
        peso: req.body.peso,
        altura: req.body.altura,
        sintoma: req.body.sintoma,
        temperatura,
        pressao: req.body.pressao,
        frequencia: req.body.frequencia,
        saturacao: req.body.saturacao,
        alergia: req.body.alergia,
        medicamentos: req.body.medicamentos,
        doencas: req.body.doencas,
        observacao: req.body.observacao,
        risco,
        status: "aguardando_medico",
        createdAt: new Date().toISOString()
    };

    db.triagens.push(triagem);

    const paciente = db.pacientes.find(p =>
        pacienteId
            ? String(p.id) === String(pacienteId)
            : p.nome?.toLowerCase() === req.body.nome?.toLowerCase()
              && p.status === "triagem"
    );

    if (paciente) {
        paciente.status = "aguardando_medico";
        paciente.triagemId = triagem.id;
    }

    writeDB(db);
    res.json(triagem);
});

/* TRIAGENS */
app.get("/triagens", (req, res) => {
    res.json(readDB().triagens);
});

/* CONSULTA */
app.post("/consulta", (req, res) => {
    const db = readDB();

    const consulta = {
        id: Date.now(),
        pacienteId: req.body.pacienteId || null,
        paciente: req.body.paciente,
        diagnostico: req.body.diagnostico,
        medicacao: req.body.medicacao,
        obs: req.body.obs,
        createdAt: new Date().toISOString()
    };

    db.consultas.push(consulta);

    const paciente = db.pacientes.find(p =>
        String(p.id) === String(consulta.pacienteId)
    );

    if (paciente) {
        paciente.status = "atendido";
        paciente.consultaId = consulta.id;
    }

    writeDB(db);
    res.json(consulta);
});

/* CHAMAR NA TV */
app.post("/tv/chamar", (req, res) => {
    const db = readDB();

    const chamada = {
        id: Date.now(),
        localTipo: req.body.localTipo || "GUICHÊ",
        localNumero: req.body.localNumero || "01",
        paciente: req.body.paciente || "",
        criadaEm: new Date().toISOString()
    };

    db.tv = chamada;
    db.historicoTV.unshift(chamada);
    db.historicoTV = db.historicoTV.slice(0, 10);

    writeDB(db);

    res.json({
        sucesso: true,
        chamada
    });
});

/* TV - ATUAL */
app.get("/tv/chamada", (req, res) => {
    const db = readDB();

    res.json({
        chamada: db.tv,
        historico: db.historicoTV
    });
});

/* LIMPAR TV */
app.post("/tv/limpar", (req, res) => {
    const db = readDB();

    db.tv = null;

    writeDB(db);

    res.json({ sucesso: true });
});

const POST = process.env.POST || 3000;

app.listen(POST, () => {
  console.log(`🏥 Hospital Pro rodando em ${POST}`);
});