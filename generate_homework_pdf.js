const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\d4987ff5-2557-4794-97e5-1064263f6649";
const prevArtDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\31b5b653-c9f8-44c3-9ff0-bd917c0056ac";
const targetDir = "c:\\Users\\FASTNOTE BRASÍLIA\\Desktop\\hospital\\hospital-system";

function getBase64Image(filePath) {
  if (fs.existsSync(filePath)) {
    const bitmap = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${bitmap.toString('base64')}`;
  }
  return '';
}

// Logo Escola do Futuro
const logoPath = path.join(artDir, 'media__1787339489028.png');
const imgLogo = getBase64Image(logoPath);

// Screenshots da aplicação
const imgLogin = getBase64Image(path.join(prevArtDir, 'screen_login.png'));
const imgAtendimento = getBase64Image(path.join(prevArtDir, 'screen_atendimento.png'));
const imgTriagem = getBase64Image(path.join(prevArtDir, 'screen_triagem.png'));
const imgMedico = getBase64Image(path.join(prevArtDir, 'screen_medico.png'));
const imgTv = getBase64Image(path.join(prevArtDir, 'screen_tv.png'));

const pdfCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;600&display=swap');

  @page {
    size: A4 portrait;
    margin: 12mm 12mm 15mm 12mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  body {
    background-color: #ffffff;
    color: #1e293b;
    font-size: 11px;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
  }

  .page {
    page-break-after: always;
    position: relative;
    padding-bottom: 20px;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Header principal com logo */
  .header-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    color: white;
    padding: 16px 20px;
    border-radius: 10px;
    margin-bottom: 18px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  }

  .header-logo-container {
    background: white;
    padding: 8px 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .header-logo {
    max-height: 48px;
    width: auto;
    object-fit: contain;
  }

  .header-title-box {
    text-align: right;
  }

  .header-title-box h1 {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #ffffff;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  .header-title-box h2 {
    font-size: 12.5px;
    font-weight: 600;
    color: #38bdf8;
  }

  .header-title-box p {
    font-size: 10px;
    color: #94a3b8;
    margin-top: 2px;
  }

  /* Barra de Informações do Aluno */
  .student-bar {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 5px solid #0284c7;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 12px;
    font-size: 10.5px;
  }

  .student-bar div strong {
    color: #0f172a;
    font-weight: 700;
  }

  .due-date-badge {
    background: #ef4444;
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
    font-weight: 800;
    display: inline-block;
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.3px;
  }

  /* Seções e Cards */
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
    margin-top: 16px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .section-icon {
    background: #0284c7;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
  }

  .step-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .step-title {
    font-size: 12.5px;
    font-weight: 700;
    color: #0369a1;
  }

  .badge-tag {
    background: #e0f2fe;
    color: #0369a1;
    font-size: 9.5px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  p {
    margin-bottom: 8px;
    color: #334155;
    font-size: 10.5px;
  }

  ul, ol {
    margin-left: 18px;
    margin-bottom: 10px;
    color: #334155;
    font-size: 10.5px;
  }

  li {
    margin-bottom: 4px;
  }

  /* Blocos de Código */
  .code-block {
    background: #0f172a;
    color: #f8fafc;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: 'Fira Code', monospace;
    font-size: 9.5px;
    line-height: 1.45;
    margin: 8px 0;
    overflow-x: auto;
    border-left: 4px solid #38bdf8;
  }

  .code-title {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }

  .diff-add { color: #4ade80; }
  .diff-del { color: #f87171; }
  .diff-comment { color: #94a3b8; font-style: italic; }
  .diff-keyword { color: #38bdf8; font-weight: bold; }

  /* Mockup de Interface Visual */
  .mockup-window {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px 0;
    background: #f8fafc;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .mockup-header {
    background: #e2e8f0;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #f59e0b; }
  .dot-green { background: #10b981; }

  .mockup-title {
    font-size: 9.5px;
    font-weight: 600;
    color: #475569;
    margin-left: 8px;
  }

  .mockup-body {
    padding: 10px;
    background: #ffffff;
  }

  .mockup-img {
    width: 100%;
    max-height: 180px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  /* Tabela de Critérios de Avaliação */
  .eval-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 10px;
  }

  .eval-table th {
    background: #0f172a;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 700;
  }

  .eval-table td {
    padding: 7px 10px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
  }

  .eval-table tr:nth-child(even) {
    background: #f8fafc;
  }

  /* Caixa do Desafio Prático */
  .challenge-box {
    background: #f0fdf4;
    border: 2px dashed #16a34a;
    border-radius: 10px;
    padding: 14px 18px;
    margin-top: 15px;
  }

  .challenge-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .challenge-title {
    font-size: 13.5px;
    font-weight: 800;
    color: #15803d;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .submission-field {
    margin-top: 10px;
    background: white;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    padding: 8px 12px;
  }

  .submission-label {
    font-weight: 700;
    color: #166534;
    font-size: 10px;
    margin-bottom: 4px;
    display: block;
  }

  .submission-line {
    border-bottom: 1.5px solid #86efac;
    height: 22px;
    margin-bottom: 6px;
  }

  /* Rodapé da Página */
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 6px;
  }
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Atividade para Casa - Deploy Hospital System</title>
  <style>${pdfCSS}</style>
</head>
<body>

  <!-- ==================== PÁGINA 1 ==================== -->
  <div class="page">
    
    <!-- Header Banner com Logo -->
    <div class="header-banner">
      <div class="header-logo-container">
        ${imgLogo ? `<img src="${imgLogo}" class="header-logo" alt="Escola do Futuro">` : `<strong style="color:#0f172a; font-size:16px;">ESCOLA DO FUTURO</strong>`}
      </div>
      <div class="header-title-box">
        <h1>Atividade Prática para Casa</h1>
        <h2>DEPLOY DO HOSPITAL SYSTEM NA NUVEM (RENDER & GITHUB)</h2>
        <p>Desenvolvimento Web, APIs Node.js e Cloud Computing</p>
      </div>
    </div>

    <!-- Barra de Identificação do Aluno -->
    <div class="student-bar">
      <div><strong>Nome do Aluno:</strong> _____________________________________</div>
      <div><strong>Turma:</strong> Full Stack / Backend</div>
      <div>
        <span class="due-date-badge">📅 ENTREGA: 28/08/2026</span>
      </div>
    </div>

    <!-- Apresentação do Desafio -->
    <div class="step-card" style="background: #f0f9ff; border-color: #bae6fd;">
      <div class="step-title" style="color: #0284c7; font-size: 13px;">
        🎯 Objetivo da Atividade
      </div>
      <p style="margin-top: 6px;">
        Nesta atividade para casa, você colocará em prática todos os conceitos de versionamento de código e publicação de sistemas na nuvem! 
        Você irá pegar o projeto completo <strong>Hospital System</strong>, realizar as adaptações técnicas necessárias para execução em servidores cloud, publicar o código-fonte no seu <strong>GitHub</strong> e realizar o deploy gratuito do Web Service na plataforma <strong>Render.com</strong>.
      </p>
      <p style="margin-bottom:0;">
        Ao final, seu sistema estará acessível publicamente na internet com um link de produção (ex: <code>https://hospital-system-seu-nome.onrender.com</code>), pronto para ser compartilhado e avaliado.
      </p>
    </div>

    <div class="section-title">
      <span class="section-icon">1</span>
      Etapa 1: Modificações Obrigatórias no Código-Fonte
    </div>

    <p>
      Antes de enviar o código para o GitHub e Render, é necessário realizar <strong>4 ajustes fundamentais</strong> no projeto para garantir que o servidor inicialize corretamente no ambiente de nuvem e receba as requisições do front-end sem erros.
    </p>

    <!-- Ajuste 1 -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">1.1. Porta Dinâmica do Servidor Express (backend/server.js)</span>
        <span class="badge-tag">Backend</span>
      </div>
      <p>
        <strong>Problema:</strong> No seu computador local, o servidor rodava fixo na porta <code>3000</code>. Na nuvem, o Render atribui uma porta dinâmica através da variável de ambiente <code>process.env.PORT</code>.
      </p>
      <div class="code-title">Arquivo: backend/server.js (Substitua no final do arquivo)</div>
      <div class="code-block">
<span class="diff-comment">// ❌ ANTES (Porta fixa - falha no Render):</span>
<span class="diff-del">app.listen(3000, () => { console.log("Servidor rodando..."); });</span>

<span class="diff-comment">// ✅ DEPOIS (Porta dinâmica com fallback para 3000):</span>
<span class="diff-add">const PORT = process.env.PORT || 3000;</span>
<span class="diff-add">app.listen(PORT, () => {</span>
<span class="diff-add">  console.log('🏥 Hospital Pro rodando na porta ' + PORT);</span>
<span class="diff-add">});</span>
      </div>
    </div>

    <!-- Ajuste 2 -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">1.2. Configuração do Script de Inicialização (package.json)</span>
        <span class="badge-tag">Configuração</span>
      </div>
      <p>
        <strong>Problema:</strong> O Render executa automaticamente o comando <code>npm start</code> ao ligar o serviço. Precisamos indicar que o arquivo principal de execução é o <code>backend/server.js</code>.
      </p>
      <div class="code-title">Arquivo: package.json</div>
      <div class="code-block">
{
  <span class="diff-keyword">"name"</span>: <span class="diff-add">"hospital-system"</span>,
  <span class="diff-keyword">"version"</span>: <span class="diff-add">"1.0.0"</span>,
  <span class="diff-keyword">"main"</span>: <span class="diff-add">"backend/server.js"</span>,
  <span class="diff-keyword">"scripts"</span>: {
    <span class="diff-keyword">"start"</span>: <span class="diff-add">"node backend/server.js"</span>
  },
  <span class="diff-keyword">"dependencies"</span>: {
    <span class="diff-keyword">"cors"</span>: <span class="diff-add">"^2.8.5"</span>,
    <span class="diff-keyword">"express"</span>: <span class="diff-add">"^5.2.1"</span>
  }
}
      </div>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web</span>
      <span>Página 1 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 2 ==================== -->
  <div class="page">

    <!-- Header reduzido para páginas seguintes -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:6px; margin-bottom:14px;">
      <div style="display:flex; align-items:center; gap:10px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:28px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:12px;">HOSPITAL SYSTEM • ATIVIDADE DE DEPLOY</span>
      </div>
      <span class="due-date-badge" style="font-size:9.5px;">ENTREGA: 28/08/2026</span>
    </div>

    <!-- Ajuste 3 -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">1.3. Rotas Relativas no Front-End (Remove Hardcode de localhost)</span>
        <span class="badge-tag">Front-End</span>
      </div>
      <p>
        <strong>Problema:</strong> As requisições <code>fetch("http://localhost:3000/...")</code> tentam acessar a máquina do usuário final em vez do servidor na nuvem.
      </p>
      <p>
        <strong>Solução:</strong> Altere todos os <code>fetch</code> para caminhos relativos (iniciando com <code>/</code>). O Express serve o front-end na mesma origem da API!
      </p>
      <div class="code-title">Arquivos: frontend/index.html e frontend/atendimento.html</div>
      <div class="code-block">
<span class="diff-comment">// ❌ ANTES (Em index.html e atendimento.html):</span>
<span class="diff-del">fetch("http://localhost:3000/login", { ... })</span>
<span class="diff-del">fetch("http://localhost:3000/atendimento", { ... })</span>

<span class="diff-comment">// ✅ DEPOIS (Caminhos relativos em todas as páginas HTML):</span>
<span class="diff-add">fetch("/login", { ... })</span>
<span class="diff-add">fetch("/atendimento", { ... })</span>
<span class="diff-add">fetch("/triagem", { ... })</span>
<span class="diff-add">fetch("/tv/chamar", { ... })</span>
      </div>
    </div>

    <!-- Ajuste 4 -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">1.4. Criação do Arquivo .gitignore</span>
        <span class="badge-tag">Git</span>
      </div>
      <p>
        Crie um arquivo chamado <code>.gitignore</code> na raiz do projeto para impedir o envio da pasta <code>node_modules</code> (que é recriada no Render durante a instalação):
      </p>
      <div class="code-title">Arquivo: .gitignore (na raiz do projeto)</div>
      <div class="code-block">
node_modules/
.env
.DS_Store
*.log
      </div>
    </div>

    <div class="section-title">
      <span class="section-icon">2</span>
      Etapa 2: Versionamento no Git e Envio para o GitHub
    </div>

    <p>
      Siga o passo a passo abaixo no terminal do VS Code para criar seu repositório no GitHub:
    </p>

    <div class="step-card">
      <div class="step-header">
        <span class="step-title">2.1. Comandos no Terminal (VS Code)</span>
        <span class="badge-tag">CLI Terminal</span>
      </div>
      <p>Abra o terminal na pasta do projeto <code>hospital-system</code> e digite os comandos na sequência:</p>
      <div class="code-block">
<span class="diff-comment"># 1. Inicializar o repositório Git local</span>
git init

<span class="diff-comment"># 2. Adicionar todos os arquivos ao versionamento</span>
git add .

<span class="diff-comment"># 3. Criar o primeiro commit da versão cloud</span>
git commit -m "feat: configuracao completa para deploy no Render"

<span class="diff-comment"># 4. Renomear a branch principal para main</span>
git branch -M main

<span class="diff-comment"># 5. Vincular com seu repositório do GitHub (Substitua SEU-USUARIO)</span>
git remote add origin https://github.com/SEU-USUARIO/hospital-system.git

<span class="diff-comment"># 6. Enviar os arquivos para o GitHub</span>
git push -u origin main
      </div>
    </div>

    <!-- Mockup da Tela do GitHub -->
    <div class="mockup-window">
      <div class="mockup-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="mockup-title">GitHub - Repositório Publicado (github.com/seu-usuario/hospital-system)</span>
      </div>
      <div class="mockup-body">
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:10px; font-family:monospace; font-size:10px;">
          <div style="color:#0969da; font-weight:bold; margin-bottom:6px;">📁 hospital-system / main</div>
          <div style="display:grid; grid-template-columns:160px 1fr 100px; gap:8px; border-bottom:1px solid #e2e8f0; padding:3px 0;">
            <span>📁 api/</span><span style="color:#57606a;">fix: endpoints serverless</span><span style="color:#57606a; text-align:right;">há 1 hora</span>
          </div>
          <div style="display:grid; grid-template-columns:160px 1fr 100px; gap:8px; border-bottom:1px solid #e2e8f0; padding:3px 0;">
            <span>📁 backend/</span><span style="color:#57606a;">feat: server.js com porta dinamica</span><span style="color:#57606a; text-align:right;">há 10 min</span>
          </div>
          <div style="display:grid; grid-template-columns:160px 1fr 100px; gap:8px; border-bottom:1px solid #e2e8f0; padding:3px 0;">
            <span>📁 frontend/</span><span style="color:#57606a;">fix: fetch com caminhos relativos</span><span style="color:#57606a; text-align:right;">há 10 min</span>
          </div>
          <div style="display:grid; grid-template-columns:160px 1fr 100px; gap:8px; border-bottom:1px solid #e2e8f0; padding:3px 0;">
            <span>📄 .gitignore</span><span style="color:#57606a;">add: ignore node_modules</span><span style="color:#57606a; text-align:right;">há 5 min</span>
          </div>
          <div style="display:grid; grid-template-columns:160px 1fr 100px; gap:8px; padding:3px 0;">
            <span>📄 package.json</span><span style="color:#57606a;">feat: script start configurado</span><span style="color:#57606a; text-align:right;">há 5 min</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web</span>
      <span>Página 2 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 3 ==================== -->
  <div class="page">

    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:6px; margin-bottom:14px;">
      <div style="display:flex; align-items:center; gap:10px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:28px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:12px;">HOSPITAL SYSTEM • ATIVIDADE DE DEPLOY</span>
      </div>
      <span class="due-date-badge" style="font-size:9.5px;">ENTREGA: 28/08/2026</span>
    </div>

    <div class="section-title">
      <span class="section-icon">3</span>
      Etapa 3: Criar Web Service e Conectar no Render.com
    </div>

    <p>Siga os passos detalhados na plataforma Render para publicar a aplicação gratuitamente:</p>

    <div class="step-card">
      <div class="step-header">
        <span class="step-title">3.1. Login e Seleção do Serviço</span>
        <span class="badge-tag">Render Cloud</span>
      </div>
      <ol>
        <li>Acesse <strong>https://render.com</strong> e clique em <strong>"Sign in"</strong>. Escolha <strong>"Sign in with GitHub"</strong> para autorizar o acesso.</li>
        <li>No Dashboard do Render, clique no botão azul <strong>"New +"</strong> no topo e selecione <strong>"Web Service"</strong>.</li>
        <li>Escolha a opção <strong>"Build and deploy from a Git repository"</strong> e clique em Next.</li>
        <li>Selecione o seu repositório <code>hospital-system</code> na lista do GitHub.</li>
      </ol>
    </div>

    <!-- Tabela de Configurações do Render -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">3.2. Preenchimento do Formulário de Deploy no Render</span>
        <span class="badge-tag">Configuração Web Service</span>
      </div>
      <p>Preencha os campos exatamente com os valores abaixo:</p>
      
      <table class="eval-table">
        <thead>
          <tr>
            <th>Campo no Render</th>
            <th>Valor a Preencher</th>
            <th>Explicação / Finalidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td><code>hospital-system-seu-nome</code></td>
            <td>Nome único que definirá seu link público URL.</td>
          </tr>
          <tr>
            <td><strong>Region</strong></td>
            <td><code>Oregon (US West)</code></td>
            <td>Servidor em nuvem gratuito sem custos.</td>
          </tr>
          <tr>
            <td><strong>Branch</strong></td>
            <td><code>main</code></td>
            <td>Branch padrão do seu GitHub.</td>
          </tr>
          <tr>
            <td><strong>Root Directory</strong></td>
            <td><em>(deixar em branco)</em></td>
            <td>O Render usará a raiz do projeto.</td>
          </tr>
          <tr>
            <td><strong>Runtime</strong></td>
            <td><code>Node</code></td>
            <td>Ambiente de execução JavaScript.</td>
          </tr>
          <tr>
            <td><strong>Build Command</strong></td>
            <td><code>npm install</code></td>
            <td>Instala as dependências express e cors.</td>
          </tr>
          <tr>
            <td><strong>Start Command</strong></td>
            <td><code>node backend/server.js</code></td>
            <td>Inicia o servidor HTTP do Hospital System.</td>
          </tr>
          <tr>
            <td><strong>Instance Type</strong></td>
            <td><code>Free ($0 / month)</code></td>
            <td>Plano 100% Gratuito da nuvem.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mockup da Tela do Render com Deploy Concluído -->
    <div class="mockup-window">
      <div class="mockup-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="mockup-title">Render Dashboard - Web Service "hospital-system" [LIVE]</span>
      </div>
      <div class="mockup-body" style="background:#0f172a; color:#f8fafc; font-family:'Fira Code', monospace; font-size:9.5px; padding:12px;">
        <div style="color:#10b981; font-weight:bold; margin-bottom:6px;">==> Build successful 🎉</div>
        <div>==> Deploying service...</div>
        <div>==> Running 'node backend/server.js'</div>
        <div style="color:#38bdf8; font-weight:bold;">🏥 Hospital Pro rodando na porta 10000</div>
        <div style="color:#10b981; font-weight:bold; margin-top:6px;">==> Your service is live 🚀 at https://hospital-system-seu-nome.onrender.com</div>
      </div>
    </div>

    <div class="section-title">
      <span class="section-icon">4</span>
      Etapa 4: Validação do Sistema na Nuvem
    </div>

    <div class="step-card">
      <p>
        Abra a sua URL gerada no Render (ex: <code>https://hospital-system-seu-nome.onrender.com</code>) no navegador e realize o fluxo completo para garantir o funcionamento:
      </p>
      <ul>
        <li><strong>Tela de Login (<code>/</code>):</strong> Acesse com usuário <code>triagem</code> e senha <code>123</code>.</li>
        <li><strong>Atendimento (<code>/atendimento.html</code>):</strong> Cadastre um novo paciente teste.</li>
        <li><strong>Triagem (<code>/triagem.html</code>):</strong> Selecione o paciente, registre a febre/sintoma e clique em <strong>📺 Chamar na TV</strong>.</li>
        <li><strong>Mídia Indoor / TV (<code>/tv.html</code>):</strong> Verifique se a chamada aparece com a animação piscante em tempo real!</li>
      </ul>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web</span>
      <span>Página 3 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 4 ==================== -->
  <div class="page">

    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:6px; margin-bottom:14px;">
      <div style="display:flex; align-items:center; gap:10px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:28px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:12px;">HOSPITAL SYSTEM • ATIVIDADE DE DEPLOY</span>
      </div>
      <span class="due-date-badge" style="font-size:9.5px;">ENTREGA: 28/08/2026</span>
    </div>

    <!-- Interface Visual do Sistema Funcionando na Nuvem -->
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px;">
      <div class="mockup-window">
        <div class="mockup-header">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="mockup-title">Triagem Hospitalar (Cloud)</span>
        </div>
        <div class="mockup-body" style="text-align:center;">
          ${imgTriagem ? `<img src="${imgTriagem}" class="mockup-img" alt="Triagem">` : `<div style="padding:20px; color:#666;">Tela de Triagem</div>`}
        </div>
      </div>

      <div class="mockup-window">
        <div class="mockup-header">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="mockup-title">Mídia Indoor - TV (Cloud em Tempo Real)</span>
        </div>
        <div class="mockup-body" style="text-align:center;">
          ${imgTv ? `<img src="${imgTv}" class="mockup-img" alt="TV">` : `<div style="padding:20px; color:#666;">Tela da TV</div>`}
        </div>
      </div>
    </div>

    <!-- Tabela de Critérios de Avaliação -->
    <div class="step-card" style="margin-bottom:12px;">
      <div class="step-title" style="margin-bottom:6px;">📊 Critérios de Avaliação e Pontuação</div>
      <table class="eval-table">
        <thead>
          <tr>
            <th>Item Avaliado</th>
            <th>Descrição do Critério</th>
            <th>Pontuação Máxima</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ajustes de Código</strong></td>
            <td>Substituição correta da porta para <code>process.env.PORT</code>, rotas relativas e <code>package.json</code>.</td>
            <td><strong>2.0 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>GitHub Versionado</strong></td>
            <td> Repositório público no GitHub estruturado sem incluir a pasta <code>node_modules</code>.</td>
            <td><strong>3.0 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Deploy no Render</strong></td>
            <td>Web Service ativo no Render com Build e Start Command executando sem erros.</td>
            <td><strong>3.0 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Integração TV & API</strong></td>
            <td>Link público funcionando na nuvem com capacidade de chamar pacientes na tela da TV.</td>
            <td><strong>2.0 Pontos</strong></td>
          </tr>
          <tr style="background:#e0f2fe; font-weight:bold;">
            <td colspan="2"><strong>NOTA MÁXIMA TOTAL</strong></td>
            <td style="color:#0369a1;"><strong>10.0 Pontos</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CAIXA DE DESAFIO E SUBMISSÃO DA ATIVIDADE -->
    <div class="challenge-box">
      <div class="challenge-header">
        <div class="challenge-title">
          <span>🏆 DESAFIO PRÁTICO: FORMULÁRIO DE ENTREGA DO ALUNO</span>
        </div>
        <span class="due-date-badge" style="background:#15803d; font-size:10.5px;">
          📅 DATA DE ENTREGA IMPRETERÍVEL: 28/08/2026
        </span>
      </div>

      <p style="color:#14532d; font-weight:600;">
        Instruções: Preencha os campos abaixo com os links da sua aplicação hospedada e entregue este documento impresso ou envie o arquivo PDF preenchido para o professor até o dia <strong>28/08/2026</strong>.
      </p>

      <div class="submission-field">
        <span class="submission-label">1. Link Público do Repositório no GitHub:</span>
        <div class="submission-line">
          <span style="font-family:monospace; color:#334155; font-size:10px;">https://github.com/____________________________________________________________________</span>
        </div>
      </div>

      <div class="submission-field">
        <span class="submission-label">2. Link Público da Aplicação Ativa no Render (URL Live):</span>
        <div class="submission-line">
          <span style="font-family:monospace; color:#334155; font-size:10px;">https://___________________________________________________________________.onrender.com</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:8px;">
        <div class="submission-field">
          <span class="submission-label">Data do Envio / Teste:</span>
          <div class="submission-line">
            <span style="color:#334155; font-size:10px;">_____ / _____ / 2026</span>
          </div>
        </div>
        <div class="submission-field">
          <span class="submission-label">Assinatura do Aluno:</span>
          <div class="submission-line">
            <span style="color:#334155; font-size:10px;">_________________________________________</span>
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web</span>
      <span>Página 4 de 4</span>
    </div>

  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log("🚀 Gerando PDF da Atividade para Casa (GitHub + Render) com Logo da Escola...");

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const filename = "Atividade_Para_Casa_Deploy_GitHub_Render_Hospital_System.pdf";
  const pdfPathTarget = path.join(targetDir, filename);
  const pdfPathArt = path.join(artDir, filename);

  await page.pdf({
    path: pdfPathTarget,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });

  fs.copyFileSync(pdfPathTarget, pdfPathArt);
  console.log(`✅ PDF gerado e salvo em:\n1. ${pdfPathTarget}\n2. ${pdfPathArt}`);

  await browser.close();
  console.log("🎉 PDF criado com sucesso total!");
}

generatePDF().catch(err => {
  console.error("❌ Erro ao gerar o PDF:", err);
  process.exit(1);
});
