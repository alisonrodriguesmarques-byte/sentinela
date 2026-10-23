const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\31b5b653-c9f8-44c3-9ff0-bd917c0056ac";
const targetDir = "c:\\Users\\FASTNOTE BRASÍLIA\\Desktop\\hospital\\hospital-system";

function getBase64Image(filename) {
  const filePath = path.join(artDir, filename);
  if (fs.existsSync(filePath)) {
    const bitmap = fs.readFileSync(filePath);
    return `data:image/png;base64,${bitmap.toString('base64')}`;
  }
  return '';
}

const imgLogin = getBase64Image('screen_login.png');
const imgAtendimento = getBase64Image('screen_atendimento.png');
const imgTriagem = getBase64Image('screen_triagem.png');
const imgMedico = getBase64Image('screen_medico.png');
const imgTv = getBase64Image('screen_tv.png');

const cssA4 = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;600&display=swap');
  
  @page {
    size: A4;
    margin: 15mm 12mm 15mm 12mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.5;
    font-size: 12px;
  }

  .cover-page {
    page-break-after: always;
    height: 250mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    border-radius: 16px;
  }

  .cover-header {
    border-bottom: 2px solid #334155;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cover-title-group h1 {
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .cover-title-group h2 {
    font-size: 18px;
    color: #38bdf8;
    font-weight: 600;
  }

  .cover-box {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
  }

  .cover-box h3 {
    color: #7dd3fc;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .cover-box ul {
    padding-left: 20px;
    color: #cbd5e1;
    font-size: 13px;
    line-height: 1.7;
  }

  .cover-footer {
    border-top: 1px solid #334155;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
  }

  .file-section {
    page-break-before: always;
    margin-top: 10px;
  }

  .file-header {
    background: #0f172a;
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .file-header h2 {
    font-size: 16px;
    color: #38bdf8;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .file-badge {
    background: #0284c7;
    color: white;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 12px;
    font-weight: 700;
  }

  .code-container {
    background: #020617;
    color: #e2e8f0;
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Fira Code', monospace;
    font-size: 11.5px;
    line-height: 1.5;
    margin-bottom: 15px;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .line-num {
    color: #64748b;
    display: inline-block;
    width: 35px;
    user-select: none;
  }

  .kw { color: #f43f5e; font-weight: bold; }
  .fn { color: #38bdf8; font-weight: bold; }
  .str { color: #4ade80; }
  .cm { color: #64748b; font-style: italic; }
  .at { color: #fbbf24; }

  .explanation-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 11.5px;
  }

  .explanation-table th {
    background: #1e293b;
    color: #f8fafc;
    text-align: left;
    padding: 8px 10px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .explanation-table td {
    padding: 9px 10px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
  }

  .explanation-table tr:nth-child(even) td {
    background: #f8fafc;
  }

  .badge-line {
    background: #0284c7;
    color: white;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 11px;
    display: inline-block;
  }

  .code-inline {
    font-family: 'Fira Code', monospace;
    background: #f1f5f9;
    color: #0f172a;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 11px;
    border: 1px solid #cbd5e1;
  }

  .tag-imp {
    color: #0369a1;
    font-weight: 600;
  }
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Explicação do Código Linha por Linha - Hospital System</title>
  <style>${cssA4}</style>
</head>
<body>

  <!-- CAPA -->
  <div class="cover-page">
    <div class="cover-header">
      <span>🏥 HOSPITAL SYSTEM</span>
      <span>MATERIAL DE APOIO DIDÁTICO</span>
    </div>
    
    <div class="cover-title-group">
      <div style="font-size: 50px; margin-bottom: 10px;">📖</div>
      <h1>GUIA DEFINITIVO: EXPLICAÇÃO DO CÓDIGO LINHA POR LINHA</h1>
      <h2>Hospital System • Análise Completa de Front-End, Back-End & Banco de Dados</h2>
    </div>

    <div class="cover-box">
      <h3>🎯 Objetivo deste Manual</h3>
      <p>Este guia foi elaborado para apoiar professores e alunos na compreensão minuciosa de cada instrução do sistema hospitalar.</p>
      <br>
      <ul>
        <li><strong>Detalhamento 100% Completo:</strong> Cada linha do Back-End em Node.js/Express, Front-End HTML5/JS e CSS3 analisada individualmente.</li>
        <li><strong>Didática Simplificada:</strong> Explicação em linguagem acessível sobre o funcionamento de cada comando e sua utilidade real no hospital.</li>
        <li><strong>Referência de Arquivos:</strong> Mapeamento direto entre o arquivo físico e sua função na arquitetura da aplicação.</li>
      </ul>
    </div>

    <div class="cover-footer">
      <span>Curso Prático de Desenvolvimento Web Full Stack</span>
      <span>Hospital System v1.0</span>
    </div>
  </div>

  <!-- SEÇÃO 1: BACKEND/SERVER.JS -->
  <div class="file-section">
    <div class="file-header">
      <h2>⚙️ 1. backend/server.js (Servidor Back-End Node.js & Express)</h2>
      <span class="file-badge">192 LINHAS DE CÓDIGO</span>
    </div>

    <p style="margin-bottom:10px; color:#475569;">
      O arquivo <code class="code-inline">backend/server.js</code> é o cérebro central do hospital. Ele é responsável por subir o servidor HTTP na porta 3000, processar as requisições enviadas pelos computadores da recepção, triagem e consultórios médicos, e gravar/ler as informações no arquivo de banco de dados <code class="code-inline">db.json</code>.
    </p>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 1-4</span></td>
          <td><code class="code-inline">const express = require("express");<br>const fs = require("fs");<br>const path = require("path");<br>const cors = require("cors");</code></td>
          <td>
            <strong>O que faz:</strong> Importa as bibliotecas necessárias para o servidor funcionar via a função <code class="code-inline">require()</code> do Node.js.<br>
            <span class="tag-imp">🎯 Importância:</span> Carrega o framework Express (servidor web), o módulo <code class="code-inline">fs</code> (para ler/escrever arquivos no computador), o <code class="code-inline">path</code> (para organizar caminhos de pastas) e o <code class="code-inline">cors</code> (para permitir que o navegador acesse a API).
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 6-9</span></td>
          <td><code class="code-inline">const app = express();<br>app.use(express.json());<br>app.use(cors());</code></td>
          <td>
            <strong>O que faz:</strong> Cria a aplicação do Express e configura dois middlewares cruciais.<br>
            <span class="tag-imp">🎯 Importância:</span> <code class="code-inline">express.json()</code> ensina o servidor a entender dados em formato JSON enviados pelo front-end (transformando em <code class="code-inline">req.body</code>). O <code class="code-inline">cors()</code> libera o acesso de navegadores em portas diferentes sem bloqueio de segurança.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 11</span></td>
          <td><code class="code-inline">app.use(express.static(path.join(__dirname, "../frontend")));</code></td>
          <td>
            <strong>O que faz:</strong> Transforma a pasta <code class="code-inline">frontend</code> em um servidor de arquivos estáticos.<br>
            <span class="tag-imp">🎯 Importância:</span> Permite que o navegador abra as páginas HTML, CSS e JS direto pelo servidor na URL <code class="code-inline">http://localhost:3000</code>.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 13</span></td>
          <td><code class="code-inline">const DB_FILE = path.join(__dirname, "db.json");</code></td>
          <td>
            <strong>O que faz:</strong> Cria a variável com o caminho absoluto exato até o arquivo do banco de dados <code class="code-inline">db.json</code>.<br>
            <span class="tag-imp">🎯 Importância:</span> Evita erros de caminho de pasta independente de onde o servidor for executado.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 15-30</span></td>
          <td><code class="code-inline">function readDB() { ... }</code></td>
          <td>
            <strong>O que faz:</strong> Função utilitária para ler o banco de dados do disco.<br>
            <span class="tag-imp">🎯 Importância:</span> Se o arquivo <code class="code-inline">db.json</code> não existir, cria a estrutura inicial zerada (<code class="code-inline">usuarios</code>, <code class="code-inline">pacientes</code>, <code class="code-inline">triagens</code>, <code class="code-inline">consultas</code>). Caso exista, usa <code class="code-inline">JSON.parse(fs.readFileSync(...))</code> para transformar o texto em um objeto JS utilizável.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 32-34</span></td>
          <td><code class="code-inline">function writeDB(data) {<br>&nbsp;&nbsp;fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Função utilitária para salvar o banco no disco.<br>
            <span class="tag-imp">🎯 Importância:</span> Converte o objeto JS de volta em texto JSON formatado (<code class="code-inline">JSON.stringify(data, null, 2)</code>) e grava fisicamente no arquivo <code class="code-inline">db.json</code>. Garante a persistência permanente dos dados do hospital.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 36-50</span></td>
          <td><code class="code-inline">app.post("/login", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota de autenticação de usuários (Recepção, Triagem ou Médico).<br>
            <span class="tag-imp">🎯 Importância:</span> Procura no banco (<code class="code-inline">db.usuarios.find</code>) um usuário com o login e senha enviados. Se não encontrar, retorna erro HTTP 401 (Não Autorizado). Se encontrar, retorna o perfil do usuário para o navegador redirecionar a tela.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 52-69</span></td>
          <td><code class="code-inline">app.post("/atendimento", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota para cadastrar um novo paciente na Recepção.<br>
            <span class="tag-imp">🎯 Importância:</span> Cria o objeto do paciente contendo um ID único em milissegundos (<code class="code-inline">Date.now()</code>), nome, CPF, tipo ("Convenio" ou "Particular") e define o <code class="code-inline">status: "triagem"</code>. Adiciona ao array com <code class="code-inline">db.pacientes.push()</code> e salva no disco.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 71-75</span></td>
          <td><code class="code-inline">app.get("/pacientes", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota HTTP GET que devolve a lista de todos os pacientes cadastrados.<br>
            <span class="tag-imp">🎯 Importância:</span> Utilizada pela tela de Triagem para descobrir quem acabou de passar pela recepção e precisa ser classificado.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 77-107</span></td>
          <td><code class="code-inline">app.post("/triagem", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota de salvamento da Triagem de Enfermagem.<br>
            <span class="tag-imp">🎯 Importância:</span> Analisa a temperatura (se >= 39°C força risco "vermelho"; se >= 38°C "amarelo"; se vazio "verde"). Salva o histórico de sintomas, alergias e observações do paciente com status <code class="code-inline">"aguardando_medico"</code>.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 109-113</span></td>
          <td><code class="code-inline">app.get("/triagens", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota HTTP GET que retorna todas as triagens salvas.<br>
            <span class="tag-imp">🎯 Importância:</span> Alimenta o painel do médico em tempo real com a fila de pacientes prontos para serem atendidos.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 115-136</span></td>
          <td><code class="code-inline">app.post("/tv/chamar", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota que envia o paciente para a TV do saguão do hospital.<br>
            <span class="tag-imp">🎯 Importância:</span> Registra a chamada atual com horário formatado (<code class="code-inline">toLocaleTimeString</code>). Adiciona a chamada no início do histórico com <code class="code-inline">unshift()</code> e limita o histórico em 5 itens com <code class="code-inline">pop()</code>.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 138-146</span></td>
          <td><code class="code-inline">app.get("/tv/chamada", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota de consulta utilizada pela TV.<br>
            <span class="tag-imp">🎯 Importância:</span> A TV consulta esta rota a cada 2 segundos via polling para saber quem deve aparecer em destaque na tela.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 148-162</span></td>
          <td><code class="code-inline">app.get("/lista-medicacoes", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Retorna uma lista de 10 medicamentos pré-aprovados pelo hospital.<br>
            <span class="tag-imp">🎯 Importância:</span> Alimenta o menu suspenso do médico (Dipirona, Paracetamol, Amoxicilina, Buscopan, etc.), padronizando as prescrições.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 164-181</span></td>
          <td><code class="code-inline">app.post("/consulta", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Rota de registro da consulta médica finalizada.<br>
            <span class="tag-imp">🎯 Importância:</span> Salva o diagnóstico, o remédio selecionado e as observações no array <code class="code-inline">db.consultas</code>.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 183-187</span></td>
          <td><code class="code-inline">app.get("/medicacoes", (req, res) => { ... });</code></td>
          <td>
            <strong>O que faz:</strong> Retorna todas as prescrições gravadas no banco.<br>
            <span class="tag-imp">🎯 Importância:</span> Utilizada pela tela <code class="code-inline">medicacoes.html</code> da farmácia do hospital para liberar os remédios.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 189-192</span></td>
          <td><code class="code-inline">app.listen(3000, () => { console.log(...) });</code></td>
          <td>
            <strong>O que faz:</strong> Inicializa a escuta de conexões HTTP na porta 3000.<br>
            <span class="tag-imp">🎯 Importância:</span> Mantém o servidor Node.js ativo e rodando continuamente.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 2: FRONTEND/INDEX.HTML -->
  <div class="file-section">
    <div class="file-header">
      <h2>🔐 2. frontend/index.html (Tela de Login)</h2>
      <span class="file-badge">33 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 1-5</span></td>
          <td><code class="code-inline">&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;<br>&lt;link rel="stylesheet" href="style.css"&gt;&lt;/head&gt;</code></td>
          <td>
            <strong>O que faz:</strong> Define o documento como HTML5 e vincula a folha de estilos CSS.<br>
            <span class="tag-imp">🎯 Importância:</span> Carrega as regras visuais padronizadas do sistema.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 7-12</span></td>
          <td><code class="code-inline">&lt;div class="container"&gt;<br>&nbsp;&nbsp;&lt;h2&gt;🏥 Sistema Hospitalar&lt;/h2&gt;<br>&nbsp;&nbsp;&lt;input id="usuario" placeholder="Usuário"&gt;<br>&nbsp;&nbsp;&lt;input id="senha" type="password" placeholder="Senha"&gt;<br>&nbsp;&nbsp;&lt;button onclick="login()"&gt;Entrar&lt;/button&gt;<br>&lt;/div&gt;</code></td>
          <td>
            <strong>O que faz:</strong> Cria a caixa de login centralizada com dois campos de entrada e o botão.<br>
            <span class="tag-imp">🎯 Importância:</span> O atributo <code class="code-inline">type="password"</code> oculta a senha na tela. O <code class="code-inline">onclick="login()"</code> vincula a ação de clicar ao JavaScript.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 15-30</span></td>
          <td><code class="code-inline">function login() {<br>&nbsp;&nbsp;fetch("http://localhost:3000/login", { ... })<br>&nbsp;&nbsp;.then(r => r.json())<br>&nbsp;&nbsp;.then(data => { ... });<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Função JS que lê os dados dos inputs e faz um requisição POST com <code class="code-inline">fetch()</code>.<br>
            <span class="tag-imp">🎯 Importância:</span> Se o backend retornar que o usuário é do tipo "triagem", envia para <code class="code-inline">triagem.html</code>; se for "medico", envia para <code class="code-inline">medico.html</code>; se for "atendimento", envia para <code class="code-inline">atendimento.html</code> usando <code class="code-inline">location.href</code>.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 3: FRONTEND/ATENDIMENTO.HTML -->
  <div class="file-section">
    <div class="file-header">
      <h2>🏥 3. frontend/atendimento.html (Recepção & Cadastro de Paciente)</h2>
      <span class="file-badge">36 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 5-19</span></td>
          <td><code class="code-inline">&lt;input id="nome" placeholder="Nome"&gt;<br>&lt;input id="cpf" placeholder="CPF"&gt;<br>&lt;select id="tipo"&gt;...&lt;/select&gt;<br>&lt;button onclick="cadastrar()"&gt;Cadastrar&lt;/button&gt;</code></td>
          <td>
            <strong>O que faz:</strong> Formulário de recepção hospitalar para capturar dados do paciente.<br>
            <span class="tag-imp">🎯 Importância:</span> O menu <code class="code-inline">&lt;select&gt;</code> restringe o cadastro entre "Convenio" e "Particular".
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 22-33</span></td>
          <td><code class="code-inline">function cadastrar() {<br>&nbsp;&nbsp;fetch("http://localhost:3000/atendimento", { ... });<br>&nbsp;&nbsp;alert("Paciente enviado para triagem");<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Captura <code class="code-inline">nome.value</code>, <code class="code-inline">cpf.value</code> e <code class="code-inline">tipo.value</code> e envia como JSON para o servidor.<br>
            <span class="tag-imp">🎯 Importância:</span> Insere o paciente na fila oficial do hospital para ser chamado pela triagem.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 4: FRONTEND/TRIAGEM.HTML -->
  <div class="file-section">
    <div class="file-header">
      <h2>🌡️ 4. frontend/triagem.html (Classificação de Risco Manchester)</h2>
      <span class="file-badge">212 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 72</span></td>
          <td><code class="code-inline">&lt;button onclick="window.open('tv.html','_blank')"&gt;📺 Abrir Tela da TV&lt;/button&gt;</code></td>
          <td>
            <strong>O que faz:</strong> Botão no cabeçalho que abre a tela da TV Mídia Indoor em uma nova aba do navegador.<br>
            <span class="tag-imp">🎯 Importância:</span> Permite que o enfermeiro projete a TV em um segundo monitor no saguão.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 121-153</span></td>
          <td><code class="code-inline">function carregarPacientes() { ... }</code></td>
          <td>
            <strong>O que faz:</strong> Busca via GET na rota <code class="code-inline">/pacientes</code> todos os cadastrados na recepção.<br>
            <span class="tag-imp">🎯 Importância:</span> Filtra apenas quem tem <code class="code-inline">status === "triagem"</code> e desenha os cartões na tela com o botão "📺 Chamar na TV".
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 156-170</span></td>
          <td><code class="code-inline">function chamarNaTV(nome) {<br>&nbsp;&nbsp;fetch("/tv/chamar", { method: "POST", body: JSON.stringify({ localTipo: "GUICHÊ", localNumero: "01", paciente: nome }) });<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Dispara a chamada do paciente para o Guichê 01 da triagem.<br>
            <span class="tag-imp">🎯 Importância:</span> Faz a mensagem e o nome do paciente surgirem piscando na TV do saguão.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 172-179</span></td>
          <td><code class="code-inline">function classificarRisco(sintoma, temperatura) { ... }</code></td>
          <td>
            <strong>O que faz:</strong> Algoritmo de classificação de urgência médica.<br>
            <span class="tag-imp">🎯 Importância:</span> Retorna "vermelho" se a temperatura for >= 39°C ou se o sintoma for grave (Infarto, AVC); "amarelo" para febre/vômito; "verde" para o restante.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 207</span></td>
          <td><code class="code-inline">setInterval(carregarPacientes, 10000);</code></td>
          <td>
            <strong>O que faz:</strong> Executa a função <code class="code-inline">carregarPacientes()</code> a cada 10 segundos.<br>
            <span class="tag-imp">🎯 Importância:</span> Atualiza a lista da triagem automaticamente sempre que um novo paciente é cadastrado na recepção.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 5: FRONTEND/MEDICO.HTML -->
  <div class="file-section">
    <div class="file-header">
      <h2>🩺 5. frontend/medico.html (Painel Médico & Prontuário)</h2>
      <span class="file-badge">198 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 61-65</span></td>
          <td><code class="code-inline">&lt;input type="text" id="consultorio-num" value="01"&gt;</code></td>
          <td>
            <strong>O que faz:</strong> Campo para o médico indicar o número do seu consultório.<br>
            <span class="tag-imp">🎯 Importância:</span> Esse número é enviado para a TV quando o médico chama o paciente.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 124-139</span></td>
          <td><code class="code-inline">function chamarNaTV(nome) {<br>&nbsp;&nbsp;const consultorio = document.getElementById("consultorio-num").value;<br>&nbsp;&nbsp;fetch("/tv/chamar", { body: JSON.stringify({ localTipo: "CONSULTÓRIO", localNumero: consultorio, paciente: nome }) });<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Notifica na TV que o paciente deve entrar no consultório indicado.<br>
            <span class="tag-imp">🎯 Importância:</span> Direciona o paciente da sala de espera direto ao consultório médico correto.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 141-149</span></td>
          <td><code class="code-inline">function selecionar(index) {<br>&nbsp;&nbsp;if (t.alergia && t.alergia !== "Nenhuma") {<br>&nbsp;&nbsp;&nbsp;&nbsp;alert("⚠️ Paciente possui alergia: " + t.alergia);<br>&nbsp;&nbsp;}<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Transfere os dados do paciente para o formulário de consulta.<br>
            <span class="tag-imp">🎯 Importância:</span> Emite um aviso em pop-up de segurança caso o paciente possua alergias a medicamentos.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 6: FRONTEND/TV.HTML -->
  <div class="file-section">
    <div class="file-header">
      <h2>📺 6. frontend/tv.html (Painel Mídia Indoor da TV)</h2>
      <span class="file-badge">195 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 117-121</span></td>
          <td><code class="code-inline">@keyframes flash {<br>&nbsp;&nbsp;0%, 100% { opacity: 1; }<br>&nbsp;&nbsp;50% { opacity: 0.3; }<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Regra de animação CSS de pisca-pisca.<br>
            <span class="tag-imp">🎯 Importância:</span> Chama a atenção visual dos pacientes no saguão quando um novo nome é anunciado.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 153-186</span></td>
          <td><code class="code-inline">function atualizar() {<br>&nbsp;&nbsp;fetch("/tv/chamada").then(r => r.json()).then(data => { ... });<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Função de Polling que consulta o servidor periodicamente.<br>
            <span class="tag-imp">🎯 Importância:</span> Se <code class="code-inline">chamada.id !== ultimoId</code>, força o reflow do DOM (<code class="code-inline">void patientBox.offsetWidth</code>) e ativa a classe <code class="code-inline">flash</code>.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 190</span></td>
          <td><code class="code-inline">setInterval(atualizar, 2000);</code></td>
          <td>
            <strong>O que faz:</strong> Polling contínuo de 2 em 2 segundos.<br>
            <span class="tag-imp">🎯 Importância:</span> Garante atualização quase instantânea das chamadas da TV sem necessidade de WebSockets complexos.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SEÇÃO 7: FRONTEND/CSS/STYLE.CSS -->
  <div class="file-section">
    <div class="file-header">
      <h2>🎨 7. frontend/css/style.css (Estilos Globais do Sistema)</h2>
      <span class="file-badge">72 LINHAS DE CÓDIGO</span>
    </div>

    <table class="explanation-table">
      <thead>
        <tr>
          <th style="width: 10%;">Linha(s)</th>
          <th style="width: 35%;">Código Fonte</th>
          <th style="width: 55%;">Explicação Didática & Importância no Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge-line">L 7-15</span></td>
          <td><code class="code-inline">.container {<br>&nbsp;&nbsp;width:90%; max-width:900px;<br>&nbsp;&nbsp;margin:20px auto; background:white;<br>&nbsp;&nbsp;padding:20px; border-radius:12px;<br>&nbsp;&nbsp;box-shadow:0 5px 20px rgba(0,0,0,0.1);<br>}</code></td>
          <td>
            <strong>O que faz:</strong> Define o cartão central de todas as telas do sistema.<br>
            <span class="tag-imp">🎯 Importância:</span> Centraliza os formulários no monitor, aplicando bordas arredondadas e sombra suave.
          </td>
        </tr>

        <tr>
          <td><span class="badge-line">L 54-72</span></td>
          <td><code class="code-inline">.verde { background:#2ecc71; color:white; }<br>.amarelo { background:#f1c40f; }<br>.vermelho { background:#e74c3c; color:white; }</code></td>
          <td>
            <strong>O que faz:</strong> Classes das cores de urgência da Triagem de Manchester.<br>
            <span class="tag-imp">🎯 Importância:</span> Injetadas dinamicamente via JS nos cartões de paciente para identificação rápida por médicos e enfermeiros.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</body>
</html>
`;

async function generateHandbookPDF() {
  console.log("🚀 Gerando PDF do Manual de Explicação do Código Linha por Linha...");

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const filename = "Explicacao_Codigo_Linha_por_Linha_Hospital_System.pdf";
  const pdfPathTarget = path.join(targetDir, filename);
  const pdfPathArt = path.join(artDir, filename);

  await page.pdf({
    path: pdfPathTarget,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '12mm', bottom: '15mm', left: '12mm' }
  });

  fs.copyFileSync(pdfPathTarget, pdfPathArt);
  console.log(`✅ Salvo: ${pdfPathTarget}`);

  await browser.close();
  console.log("🎉 Manual em PDF gerado com sucesso!");
}

generateHandbookPDF().catch(err => {
  console.error("❌ Erro ao gerar PDF:", err);
  process.exit(1);
});
