const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\76f1fb3b-0d8a-4462-b9d3-4f5bd278f62a";

function getBase64Image(filename) {
  const filePath = path.join(artDir, filename);
  if (fs.existsSync(filePath)) {
    const bitmap = fs.readFileSync(filePath);
    return `data:image/png;base64,${bitmap.toString('base64')}`;
  }
  return '';
}

const imgLogo = getBase64Image('escola_logo.png');
const imgLogin = getBase64Image('screen_login.png');
const imgAtendimento = getBase64Image('screen_atendimento.png');
const imgTriagem = getBase64Image('screen_triagem.png');
const imgTv = getBase64Image('screen_tv.png');
const imgMedico = getBase64Image('screen_medico.png');
const imgMedicacoes = getBase64Image('screen_medicacoes.png');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Material Didático - Sistema Hospitalar com Mídia Indoor</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;600&display=swap');
    
    @page {
      size: A4;
      margin: 18mm 15mm 20mm 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.6;
      font-size: 13.5px;
    }

    /* HEADER FIXO DE TODAS AS PÁGINAS */
    .page-header-logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 20px;
    }

    .page-header-logo img {
      height: 38px;
    }

    .page-header-title {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* CAPA DO MATERIAL DIDÁTICO */
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 870px;
      padding: 35px 25px;
      border: 3px solid #005691;
      border-radius: 16px;
      background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
      position: relative;
    }

    .cover-header {
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 20px;
    }

    .cover-logo-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .school-logo {
      max-height: 65px;
      object-fit: contain;
    }

    .badge-remote {
      display: inline-block;
      background: #005691;
      color: #ffffff;
      font-weight: 700;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 6px 14px;
      border-radius: 20px;
    }

    .cover-title {
      font-size: 30px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin-bottom: 10px;
    }

    .cover-subtitle {
      font-size: 15.5px;
      color: #475569;
      font-weight: 500;
    }

    .cover-body {
      margin: 30px 0;
    }

    .info-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #005691;
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 18px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }

    .info-card h4 {
      font-size: 14.5px;
      color: #1e293b;
      margin-bottom: 6px;
    }

    .link-box {
      background: #0f172a;
      color: #38bdf8;
      font-family: 'Fira Code', monospace;
      padding: 10px 14px;
      border-radius: 8px;
      word-break: break-all;
      font-size: 12px;
      margin-top: 6px;
    }

    .cover-footer {
      border-top: 2px solid #cbd5e1;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #475569;
      font-size: 12px;
      font-weight: 600;
    }

    /* CONTEÚDO */
    h1 {
      font-size: 21px;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 20px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h2 {
      font-size: 16.5px;
      color: #005691;
      margin-top: 18px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 14.5px;
      color: #334155;
      margin-top: 14px;
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 12px;
      color: #334155;
      text-align: justify;
    }

    ul, ol {
      margin-left: 20px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 6px;
    }

    /* ESTILO DE CÓDIGO E TERMINAL */
    .terminal-box {
      background: #0f172a;
      color: #f8fafc;
      border-radius: 10px;
      padding: 14px 16px;
      margin: 14px 0;
      font-family: 'Fira Code', monospace;
      font-size: 12.5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-left: 5px solid #22c55e;
    }

    .terminal-header {
      color: #94a3b8;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      border-bottom: 1px solid #334155;
      padding-bottom: 4px;
    }

    .cmd {
      color: #4ade80;
      font-weight: 600;
    }

    .output {
      color: #94a3b8;
    }

    code {
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      border: 1px solid #e2e8f0;
    }

    /* CAPTURAS DE TELA */
    .screen-container {
      margin: 18px 0;
      text-align: center;
      page-break-inside: avoid;
    }

    .screen-img {
      width: 100%;
      max-width: 720px;
      border: 2px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    .screen-caption {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 6px;
      font-style: italic;
    }

    /* ALERTAS DIDÁTICOS */
    .alert-box {
      padding: 14px 18px;
      border-radius: 8px;
      margin: 15px 0;
      font-size: 13px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      page-break-inside: avoid;
    }

    .alert-info {
      background: #eff6ff;
      border-left: 4px solid #005691;
      color: #003366;
    }

    .alert-tip {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      color: #166534;
    }

    .alert-warning {
      background: #fffbeeb;
      border-left: 4px solid #f59e0b;
      color: #92400e;
    }

    /* TABELAS */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 12.5px;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 10px 12px;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    .tag-vermelho {
      background: #ef4444;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 11px;
    }

    .tag-amarelo {
      background: #f59e0b;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 11px;
    }

    .tag-verde {
      background: #10b981;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 11px;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>

  <!-- CAPA -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="cover-logo-wrapper">
        <img src="${imgLogo}" class="school-logo" alt="Escola do Futuro">
        <span class="badge-remote">Guia de Estudo Remoto</span>
      </div>
      <h1 class="cover-title">🏥 Sistema Hospitalar com Mídia Indoor (TV)</h1>
      <p class="cover-subtitle">Material Didático Passo a Passo Ilustrado para Aprendizagem Prática em Casa</p>
    </div>

    <div class="cover-body">
      <div class="info-card">
        <h4>📦 Download do Projeto Pronto</h4>
        <p>Acesse o link oficial do Google Drive para baixar a pasta zipada do projeto completo:</p>
        <div class="link-box">https://drive.google.com/file/d/1_yvQF7wCNax80aJoLbOWVz7fsiMBefJE/view?usp=sharing</div>
      </div>

      <div class="info-card">
        <h4>⚡ Comando de Execução Rápida</h4>
        <p>Para iniciar o sistema no seu computador, abra o terminal e digite:</p>
        <div class="link-box">node backend/server.js</div>
      </div>

      <div class="info-card">
        <h4>🎯 Conteúdo Programático deste Guia</h4>
        <ul style="margin: 5px 0 0 18px; color: #475569;">
          <li><b>Passo 1:</b> Baixando e Executando o Projeto no Terminal</li>
          <li><b>Passo 2:</b> Entendendo a Arquitetura (Node.js, Express e JSON)</li>
          <li><b>Passo 3:</b> Módulo Atendimento (Cadastro do Paciente)</li>
          <li><b>Passo 4:</b> Módulo Triagem &amp; Mídia Indoor (Classificação Manchester e Painel TV)</li>
          <li><b>Passo 5:</b> Módulo Atendimento Médico (Consultório, Alergias e Prescrição)</li>
          <li><b>Passo 6:</b> Módulo Histórico de Medicações e Desafios Práticos</li>
        </ul>
      </div>
    </div>

    <div class="cover-footer">
      <span>Escola do Futuro • Desenvolvimento Web</span>
      <span>Ano Letivo: 2026</span>
    </div>
  </div>

  <!-- CABEÇALHO PADRÃO COM LOGO DA ESCOLA -->
  <div class="page-header-logo">
    <img src="${imgLogo}" alt="Escola do Futuro">
    <span class="page-header-title">Material Didático: Sistema Hospitalar</span>
  </div>

  <!-- SEÇÃO 1: COMO EXECUTAR -->
  <h1>1. Como Baixar e Executar o Projeto em Casa</h1>
  
  <p>Caro aluno, este material foi elaborado para que você consiga acompanhar e executar todo o projeto em sua casa de maneira 100% didática e prática. Siga os passos na ordem abaixo:</p>

  <h2>Passo 1.1: Baixar os Arquivos do Projeto</h2>
  <ol>
    <li>Clique no link ou copie e cole no seu navegador: <br>
      <a href="https://drive.google.com/file/d/1_yvQF7wCNax80aJoLbOWVz7fsiMBefJE/view?usp=sharing" target="_blank">https://drive.google.com/file/d/1_yvQF7wCNax80aJoLbOWVz7fsiMBefJE/view?usp=sharing</a>
    </li>
    <li>Faça o download do arquivo compactado (<code>.zip</code> ou <code>.rar</code>).</li>
    <li>Extraia o conteúdo para uma pasta no seu computador (por exemplo: <code>C:\hospital-system</code> ou na sua Área de Trabalho).</li>
  </ol>

  <h2>Passo 1.2: Abrir o Terminal de Comandos</h2>
  <p>Você pode utilizar o <b>Prompt de Comando (CMD)</b>, o <b>PowerShell</b> do Windows ou o terminal integrado do <b>VS Code</b>.</p>

  <h2>Passo 1.3: Navegar até a Pasta do Projeto</h2>
  <p>No terminal, digite o comando <code>cd</code> seguido do caminho da pasta onde você descompactou o projeto:</p>

  <div class="terminal-box">
    <div class="terminal-header">Terminal / Prompt de Comando</div>
    <span class="cmd">cd "C:\Users\SeuUsuario\Desktop\hospital-system"</span>
  </div>

  <h2>Passo 1.4: Executar o Servidor Backend</h2>
  <p>Digite exatamente o comando indicado no projeto:</p>

  <div class="terminal-box">
    <div class="terminal-header">Terminal</div>
    <span class="cmd">node backend/server.js</span><br>
    <span class="output">🏥 Hospital Pro rodando em http://localhost:3000</span>
  </div>

  <div class="alert-box alert-tip">
    <div>💡 <b>Dica Importante:</b> Mantenha essa janela do terminal aberta durante todos os testes. É ela que mantém o servidor funcionando!</div>
  </div>

  <h2>Passo 1.5: Acessar a Aplicação no Navegador</h2>
  <p>Abra seu navegador (Google Chrome ou Microsoft Edge) e acesse o endereço:</p>
  <p style="text-align:center;"><code>http://localhost:3000</code></p>

  <!-- CAPTURA LOGIN -->
  <div class="screen-container">
    <img src="${imgLogin}" class="screen-img" alt="Tela de Login">
    <div class="screen-caption">Figura 1: Tela de Login do Sistema Hospitalar (index.html)</div>
  </div>

  <div class="page-break"></div>

  <!-- CABEÇALHO SEGUNDA PÁGINA -->
  <div class="page-header-logo">
    <img src="${imgLogo}" alt="Escola do Futuro">
    <span class="page-header-title">Material Didático: Arquitetura &amp; Atendimento</span>
  </div>

  <!-- SEÇÃO 2: ARQUITETURA DO SISTEMA -->
  <h1>2. Estrutura e Arquitetura do Projeto</h1>

  <p>O projeto segue um modelo simplificado de arquitetura cliente-servidor (Full Stack Node.js):</p>

  <table>
    <thead>
      <tr>
        <th>Pasta / Arquivo</th>
        <th>Papel no Sistema</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>backend/server.js</code></td>
        <td>Servidor Web / API REST</td>
        <td>Escrito com Express.js. Gerencia rotas de login, cadastro de pacientes, triagem, prescrição médica e envio das chamadas para a TV. Servidor estático dos HTMLs.</td>
      </tr>
      <tr>
        <td><code>backend/db.json</code></td>
        <td>Banco de Dados JSON</td>
        <td>Simula a gravação persistente em disco de usuários, pacientes, triagens e histórico da TV.</td>
      </tr>
      <tr>
        <td><code>frontend/index.html</code></td>
        <td>Tela de Login</td>
        <td>Ponto de entrada do sistema com login para Atendimento, Triagem e Médico.</td>
      </tr>
      <tr>
        <td><code>frontend/atendimento.html</code></td>
        <td>Módulo 1 - Recepção</td>
        <td>Cadastro do paciente na recepção hospitalar.</td>
      </tr>
      <tr>
        <td><code>frontend/triagem.html</code></td>
        <td>Módulo 2 - Enfermagem</td>
        <td>Classificação de Risco Manchester e chamada do paciente para o Guichê na TV.</td>
      </tr>
      <tr>
        <td><code>frontend/tv.html</code></td>
        <td>Mídias Indoor / Painel TV</td>
        <td>Painel eletrônico que exibe o paciente chamado em tempo real e histórico de chamadas.</td>
      </tr>
      <tr>
        <td><code>frontend/medico.html</code></td>
        <td>Módulo 3 - Consultório</td>
        <td>Atendimento médico, alerta de alergia, prescrição de medicação e chamada na TV.</td>
      </tr>
      <tr>
        <td><code>frontend/medicacoes.html</code></td>
        <td>Histórico de Medicações</td>
        <td>Relatório de todas as medicações prescritas nos atendimentos.</td>
      </tr>
    </tbody>
  </table>

  <!-- SEÇÃO 3: PASSO A PASSO SEQUÊNCIA LÓGICA -->
  <h1>3. Sequência Lógica do Atendimento Passo a Passo</h1>

  <p>Para entender o sistema como no mundo real, você deve seguir a ordem sequencial lógica de um hospital:</p>

  <div class="alert-box alert-info">
    <div>🔄 <b>Sequência do Atendimento:</b><br>
    <b>1º Atendimento (Recepção)</b> ➔ <b>2º Triagem (Enfermagem + Chamada TV)</b> ➔ <b>3º Médico (Consultório + Chamada TV)</b></div>
  </div>

  <h2>ETAPA 1: Cadastro no Atendimento (Recepção)</h2>
  <p>Quando o paciente chega ao hospital, a recepcionista acessa <code>atendimento.html</code> e cadastra os dados básicos:</p>
  <ul>
    <li><b>Nome do Paciente:</b> Nome completo (ex: Carlos Eduardo Santos).</li>
    <li><b>CPF:</b> Documento do paciente.</li>
    <li><b>Tipo:</b> Convênio ou Particular.</li>
  </ul>

  <p>Ao clicar no botão <b>Cadastrar</b>, o JavaScript executa o seguinte envio para o servidor:</p>

  <div class="terminal-box">
    <div class="terminal-header">JavaScript (atendimento.html)</div>
    <span class="cmd">fetch("http://localhost:3000/atendimento", {<br>
    &nbsp;&nbsp;method: "POST",<br>
    &nbsp;&nbsp;headers: {"Content-Type": "application/json"},<br>
    &nbsp;&nbsp;body: JSON.stringify({ nome, cpf, tipo })<br>
    });</span>
  </div>

  <p>O servidor backend grava esse paciente em <code>db.json</code> definindo o status inicial como <code>"triagem"</code>.</p>

  <!-- CAPTURA ATENDIMENTO -->
  <div class="screen-container">
    <img src="${imgAtendimento}" class="screen-img" alt="Módulo Atendimento">
    <div class="screen-caption">Figura 2: Módulo de Cadastro de Pacientes no Atendimento (atendimento.html)</div>
  </div>

  <div class="page-break"></div>

  <!-- CABEÇALHO TERCEIRA PÁGINA -->
  <div class="page-header-logo">
    <img src="${imgLogo}" alt="Escola do Futuro">
    <span class="page-header-title">Material Didático: Triagem &amp; Mídia Indoor</span>
  </div>

  <h2>ETAPA 2: Triagem Hospitalar &amp; Integração Mídia Indoor (<code>tv.html</code>)</h2>
  
  <p>Após o cadastro na recepção, o paciente se dirige à sala de espera da Triagem (Enfermagem). A enfermeira utiliza o arquivo <code>triagem.html</code>.</p>

  <h3>2.1 Visualização da Fila do Atendimento</h3>
  <p>A página da triagem busca automaticamente os pacientes cadastrados via <code>GET /pacientes</code> a cada 10 segundos e mostra quem está aguardando.</p>

  <h3>2.2 Chamando o Paciente na Mídia Indoor (Painel TV)</h3>
  <p>Nesta página foi integrado o projeto de <b>Mídia Indoor (TV)</b>. Existem dois recursos fundamentais:</p>
  <ul>
    <li>Botão <b>"📺 Abrir Tela da TV"</b>: Abre em uma nova aba a tela <code>tv.html</code> (Mídia Indoor).</li>
    <li>Botão <b>"📺 Chamar na TV"</b> (ao lado de cada paciente na fila): Envia uma requisição <code>POST /tv/chamar</code> com o local <code>GUICHÊ 01</code>.</li>
  </ul>

  <!-- CAPTURA TRIAGEM -->
  <div class="screen-container">
    <img src="${imgTriagem}" class="screen-img" alt="Módulo Triagem">
    <div class="screen-caption">Figura 3: Módulo de Triagem com Fila do Atendimento e Chamada na TV (triagem.html)</div>
  </div>

  <!-- CAPTURA TV -->
  <div class="screen-container">
    <img src="${imgTv}" class="screen-img" alt="Painel da TV Mídia Indoor">
    <div class="screen-caption">Figura 4: Painel da Mídia Indoor (tv.html) exibindo a chamada em tempo real com efeito visual</div>
  </div>

  <h3>2.3 Classificação de Risco (Protocolo Manchester)</h3>
  <p>Ao atender o paciente na sala de triagem, o profissional afere a temperatura e seleciona os sintomas. O algoritmo de risco classifica o paciente nas cores:</p>
  <ul>
    <li><span class="tag-vermelho">VERMELHO</span>: Emergência (Temperatura &ge; 39°C ou sintomas graves como Infarto, AVC, Hemorragia).</li>
    <li><span class="tag-amarelo">AMARELO</span>: Urgência (Temperatura &ge; 38°C ou sintomas como Febre, Vômito, Diarreia).</li>
    <li><span class="tag-verde">VERDE</span>: Pouca Urgência (Dor leve, resfriado, tosse).</li>
  </ul>

  <p>Ao salvar a triagem, o paciente é gravado no banco de dados com <code>status: "aguardando_medico"</code>.</p>

  <div class="page-break"></div>

  <!-- CABEÇALHO QUARTA PÁGINA -->
  <div class="page-header-logo">
    <img src="${imgLogo}" alt="Escola do Futuro">
    <span class="page-header-title">Material Didático: Atendimento Médico &amp; Prescrição</span>
  </div>

  <h2>ETAPA 3: Atendimento Médico (<code>medico.html</code>)</h2>

  <p>Com a triagem concluída, o paciente vai para o atendimento médico. O médico acessa a página <code>medico.html</code>.</p>

  <h3>3.1 Chamando o Paciente para o Consultório</h3>
  <p>No topo da tela, o médico informa o número do seu consultório (ex: <b>Consultório 01</b>) e clica em <b>"📺 Chamar na TV"</b>. O painel da TV atualiza instantaneamente para:</p>
  <p style="text-align:center;"><b>CONSULTÓRIO 01 - NOME DO PACIENTE</b></p>

  <h3>3.2 Alerta de Alergias</h3>
  <p>Ao clicar no botão <b>"Atender"</b>, o sistema carrega o nome do paciente no formulário e verifica se ele possui alergias cadastradas na triagem. Se houver alergia (ex: <i>Dipirona</i>), o sistema exibe um alerta preventivo na tela do médico!</p>

  <h3>3.3 Diagnóstico e Prescrição de Medicações</h3>
  <p>O médico escolhe a medicação em um menu suspenso carregado via API (<code>GET /lista-medicacoes</code>) contendo fármacos comuns (Paracetamol, Amoxicilina, Omeprazol, etc.), digita o diagnóstico e clica em <b>Salvar</b>.</p>

  <!-- CAPTURA MEDICO -->
  <div class="screen-container">
    <img src="${imgMedico}" class="screen-img" alt="Painel Médico">
    <div class="screen-caption">Figura 5: Painel de Atendimento Médico com Alerta de Alergia e Prescrição (medico.html)</div>
  </div>

  <h2>ETAPA 4: Histórico de Medicações Prescritas (<code>medicacoes.html</code>)</h2>
  <p>Para consulta da equipe de farmácia hospitalar ou auditoria, a página <code>medicacoes.html</code> lista todas as consultas e prescrições salvas no sistema.</p>

  <!-- CAPTURA MEDICACOES -->
  <div class="screen-container">
    <img src="${imgMedicacoes}" class="screen-img" alt="Histórico de Medicações">
    <div class="screen-caption">Figura 6: Tela de Registro e Consulta de Medicações Prescritas (medicacoes.html)</div>
  </div>

  <div class="page-break"></div>

  <!-- CABEÇALHO QUINTA PÁGINA -->
  <div class="page-header-logo">
    <img src="${imgLogo}" alt="Escola do Futuro">
    <span class="page-header-title">Material Didático: Desafios Práticos</span>
  </div>

  <!-- SEÇÃO 4: EXERCÍCIOS PRÁTICOS -->
  <h1>4. Exercícios Práticos para o Aluno Resolver em Casa</h1>

  <p>Para comprovar que você executou o projeto com sucesso e aprendeu o fluxo, realize os seguintes 4 desafios práticos:</p>

  <div class="info-card">
    <h4>📝 Desafio 1: Cadastrar Novo Paciente no Atendimento</h4>
    <p>Acesse <code>http://localhost:3000/atendimento.html</code>, cadastre um paciente com o seu próprio nome e selecione o tipo "Particular". Verifique se o alerta de confirmação aparece na tela.</p>
  </div>

  <div class="info-card">
    <h4>📺 Desafio 2: Simular Chamada na Mídia Indoor (TV)</h4>
    <p>Abra duas abas no seu navegador: na primeira aba acesse <code>triagem.html</code> e na segunda acesse <code>tv.html</code>. Na aba da Triagem, clique no botão <b>"Chamar na TV"</b> do seu paciente e observe o painel da TV piscando e atualizando na outra aba.</p>
  </div>

  <div class="info-card">
    <h4>🩺 Desafio 3: Testar Classificação Vermelha por Temperatura</h4>
    <p>Na página da Triagem, faça uma triagem para o seu paciente digitando a temperatura de <b>39.8°C</b>. Salve e verifique se a classificação exibida fica em cor <b>VERMELHA</b>.</p>
  </div>

  <div class="info-card">
    <h4>💊 Desafio 4: Consulta Médica com Prescrição de Paracetamol</h4>
    <p>Acesse <code>medico.html</code>, clique em <b>Atender</b> no paciente triado, selecione a medicação <b>Paracetamol</b>, digite um diagnóstico de teste e salve a consulta. Depois acesse <code>medicacoes.html</code> e confirme se a prescrição foi gravada.</p>
  </div>

  <div class="alert-box alert-tip" style="margin-top:30px;">
    <div>🎉 <b>Parabéns!</b> Ao concluir essas etapas, você terá exercitado conceitos práticos de Programação Web, Servidores Node.js, Comunicação Assíncrona via HTTP/JSON e Automação de Painéis de Mídia Indoor!</div>
  </div>

</body>
</html>`;

fs.writeFileSync(path.join(artDir, 'material_didatico_hospital.html'), htmlContent);
console.log("HTML file created successfully with Escola do Futuro logo!");

async function generatePDF() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const htmlPath = path.join(artDir, 'material_didatico_hospital.html');
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(artDir, 'material_didatico_hospital.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });

  console.log(`PDF successfully generated at: ${pdfPath}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
