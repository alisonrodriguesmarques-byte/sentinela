const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\eb5b2ce4-71f5-4a6e-8440-88be6c00f836";
const logoSourceDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\d4987ff5-2557-4794-97e5-1064263f6649";
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
const logoPath = path.join(logoSourceDir, 'media__1787339489028.png');
const imgLogo = getBase64Image(logoPath);

// Screenshots da aplicação
const imgTriagem = getBase64Image(path.join(prevArtDir, 'screen_triagem.png'));
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
    line-height: 1.48;
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
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%);
    color: white;
    padding: 14px 18px;
    border-radius: 10px;
    margin-bottom: 16px;
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
    max-height: 46px;
    width: auto;
    object-fit: contain;
  }

  .header-title-box {
    text-align: right;
  }

  .header-title-box h1 {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #ffffff;
    margin-bottom: 3px;
    text-transform: uppercase;
  }

  .header-title-box h2 {
    font-size: 12px;
    font-weight: 700;
    color: #38bdf8;
  }

  .header-title-box p {
    font-size: 9.5px;
    color: #cbd5e1;
    margin-top: 2px;
  }

  /* Barra de Informações do Aluno */
  .student-bar {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 5px solid #0284c7;
    border-radius: 6px;
    padding: 9px 14px;
    margin-bottom: 14px;
    display: grid;
    grid-template-columns: 2.2fr 1.3fr 1fr;
    gap: 10px;
    font-size: 10.5px;
    align-items: center;
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
    font-size: 10.5px;
    letter-spacing: 0.3px;
  }

  /* Seções e Cards */
  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13.5px;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 5px;
    margin-top: 14px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .section-icon {
    background: #0284c7;
    color: white;
    width: 22px;
    height: 22px;
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
    padding: 11px 14px;
    margin-bottom: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }

  .step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .step-title {
    font-size: 12px;
    font-weight: 700;
    color: #0369a1;
  }

  .badge-tag {
    background: #e0f2fe;
    color: #0369a1;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  p {
    margin-bottom: 6px;
    color: #334155;
    font-size: 10px;
  }

  ul, ol {
    margin-left: 18px;
    margin-bottom: 8px;
    color: #334155;
    font-size: 10px;
  }

  li {
    margin-bottom: 3px;
  }

  /* Blocos de Código */
  .code-block {
    background: #0f172a;
    color: #f8fafc;
    border-radius: 6px;
    padding: 8px 11px;
    font-family: 'Fira Code', monospace;
    font-size: 9px;
    line-height: 1.4;
    margin: 6px 0;
    overflow-x: auto;
    border-left: 4px solid #38bdf8;
  }

  .code-title {
    font-family: 'Inter', sans-serif;
    font-size: 8.5px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 3px;
    letter-spacing: 0.5px;
  }

  .diff-add { color: #4ade80; }
  .diff-del { color: #f87171; }
  .diff-comment { color: #94a3b8; font-style: italic; }
  .diff-keyword { color: #38bdf8; font-weight: bold; }
  .diff-str { color: #fde047; }

  /* Mockup de Interface Visual */
  .mockup-window {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    margin: 8px 0;
    background: #f8fafc;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .mockup-header {
    background: #e2e8f0;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #f59e0b; }
  .dot-green { background: #10b981; }

  .mockup-title {
    font-size: 9px;
    font-weight: 600;
    color: #475569;
    margin-left: 6px;
  }

  .mockup-body {
    padding: 8px;
    background: #ffffff;
  }

  .mockup-img {
    width: 100%;
    max-height: 160px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  /* Tabela de Critérios e Comparação */
  .eval-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
    font-size: 9.5px;
  }

  .eval-table th {
    background: #0f172a;
    color: white;
    padding: 7px 9px;
    text-align: left;
    font-weight: 700;
  }

  .eval-table td {
    padding: 6px 9px;
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
    border-radius: 9px;
    padding: 12px 15px;
    margin-top: 10px;
  }

  .challenge-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .challenge-title {
    font-size: 13px;
    font-weight: 800;
    color: #15803d;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .submission-field {
    margin-top: 8px;
    background: white;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    padding: 7px 10px;
  }

  .submission-label {
    font-weight: 700;
    color: #166534;
    font-size: 9.5px;
    margin-bottom: 3px;
    display: block;
  }

  .submission-line {
    border-bottom: 1.5px solid #86efac;
    height: 20px;
    margin-bottom: 4px;
  }

  .submission-area {
    border: 1.5px dashed #86efac;
    border-radius: 5px;
    min-height: 54px;
    padding: 6px;
    background: #fafdfb;
    margin-top: 4px;
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
    font-size: 8.5px;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 5px;
  }
`;

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Atividade para Casa - Desafio Deploy Nova Plataforma Cloud</title>
  <style>${pdfCSS}</style>
</head>
<body>

  <!-- ==================== PÁGINA 1 ==================== -->
  <div class="page" id="page1">
    
    <!-- Header Banner com Logo -->
    <div class="header-banner">
      <div class="header-logo-container">
        ${imgLogo ? `<img src="${imgLogo}" class="header-logo" alt="Escola do Futuro">` : `<strong style="color:#0f172a; font-size:15px;">ESCOLA DO FUTURO</strong>`}
      </div>
      <div class="header-title-box">
        <h1>Atividade Prática para Casa</h1>
        <h2>DESAFIO NUVEM: DEPLOY EM NOVA PLATAFORMA CLOUD</h2>
        <p>Desenvolvimento Web, APIs Node.js e Computação em Nuvem</p>
      </div>
    </div>

    <!-- Barra de Identificação do Aluno -->
    <div class="student-bar">
      <div><strong>Nome do Aluno:</strong> _____________________________________</div>
      <div><strong>Turma:</strong> Full Stack / Backend</div>
      <div>
        <span class="due-date-badge">📅 ENTREGA: 04/09/2026</span>
      </div>
    </div>

    <!-- Apresentação do Desafio -->
    <div class="step-card" style="background: #f0f9ff; border-color: #bae6fd;">
      <div class="step-title" style="color: #0284c7; font-size: 12.5px;">
        🚀 Objetivo do Desafio de Computação em Nuvem
      </div>
      <p style="margin-top: 5px;">
        Após realizar o deploy do <strong>Hospital System</strong> na plataforma Render.com, é hora de expandir suas habilidades em <strong>DevOps e Cloud Computing</strong>! O mercado exige flexibilidade para trabalhar com diferentes ecossistemas de hospedagem de aplicações web.
      </p>
      <p style="margin-bottom:0;">
        Nesta atividade, seu objetivo é pesquisar, escolher e publicar o projeto em uma <strong>NOVA PLATAFORMA CLOUD ALTERNATIVA AO RENDER</strong> (ex: Vercel, Railway, Koyeb, Fly.io, Back4App, Netlify, etc.), registrar o passo a passo da configuração e apresentar um <strong>relatório comparativo com as partes mais difíceis</strong> superadas durante o processo.
      </p>
    </div>

    <div class="section-title">
      <span class="section-icon">1</span>
      Etapa 1: Pesquisa e Escolha da Nova Plataforma Cloud
    </div>

    <p>
      Você deve selecionar <strong>uma nova plataforma cloud</strong> que ofereça suporte à execução de Node.js e servidores/APIs web. Abaixo estão algumas opções recomendadas para o desafio:
    </p>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
      <div class="step-card" style="margin-bottom:0;">
        <div class="step-header">
          <span class="step-title">Opção A: Vercel (Serverless)</span>
          <span class="badge-tag">Serverless Cloud</span>
        </div>
        <p>Excelente para hospedagem de APIs Serverless e sites dinâmicos. Requer adaptação do ponto de entrada da API Express e arquivo de configuração (<code>vercel.json</code>).</p>
      </div>

      <div class="step-card" style="margin-bottom:0;">
        <div class="step-header">
          <span class="step-title">Opção B: Railway / Koyeb</span>
          <span class="badge-tag">PaaS Containers</span>
        </div>
        <p>Ambientes PaaS persistentes muito similares ao Render. Permitem executar a aplicação com <code>npm start</code> e porta dinâmica com mínimo ajuste de código.</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
      <div class="step-card" style="margin-bottom:0;">
        <div class="step-header">
          <span class="step-title">Opção C: Fly.io (Containers)</span>
          <span class="badge-tag">Docker / Edge</span>
        </div>
        <p>Plataforma baseada em Micro-VMs/Containers. Requer configuração do arquivo <code>fly.toml</code> ou criação de um <code>Dockerfile</code> leve para o servidor Node.js.</p>
      </div>

      <div class="step-card" style="margin-bottom:0;">
        <div class="step-header">
          <span class="step-title">Opção D: Netlify / Back4App</span>
          <span class="badge-tag">Cloud Alternative</span>
        </div>
        <p>Plataformas alternativas com suporte a Serverless Functions ou instâncias de container para APIs Node.js e hospedagem de arquivos estáticos de front-end.</p>
      </div>
    </div>

    <div class="section-title">
      <span class="section-icon">2</span>
      Etapa 2: Adaptações Técnicas no Código-Fonte
    </div>

    <div class="step-card">
      <div class="step-header">
        <span class="step-title">2.1. Ajuste de Ponto de Entrada (Servidor Persistente vs Serverless)</span>
        <span class="badge-tag">Backend</span>
      </div>
      <p>
        Dependendo da nuvem escolhida, o comportamento do servidor muda:
      </p>
      <ul>
        <li><strong>Em nuvens PaaS (Railway / Koyeb):</strong> O servidor roda contínuo com <code>const PORT = process.env.PORT || 3000;</code> e <code>app.listen(PORT);</code>.</li>
        <li><strong>Em nuvens Serverless (Vercel):</strong> O Express é exportado como função handler sem escutar porta fixa: <code>module.exports = app;</code> (arquivo <code>api/index.js</code>).</li>
      </ul>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web • Computação em Nuvem</span>
      <span>Página 1 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 2 ==================== -->
  <div class="page" id="page2">

    <!-- Header reduzido para páginas seguintes -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:5px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:26px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:11.5px;">HOSPITAL SYSTEM • DESAFIO DEPLOY NOVA NUVEM</span>
      </div>
      <span class="due-date-badge" style="font-size:9px;">ENTREGA: 04/09/2026</span>
    </div>

    <div class="step-card">
      <div class="step-header">
        <span class="step-title">2.2. Exemplo de Arquivo de Configuração (Caso Vercel ou Docker)</span>
        <span class="badge-tag">Configuração Cloud</span>
      </div>
      <p>Se você optar por plataformas Serverless como Vercel, crie o arquivo <code>vercel.json</code> na raiz do projeto:</p>
      <div class="code-title">Arquivo: vercel.json (Exemplo para Vercel)</div>
      <div class="code-block">
{
  <span class="diff-keyword">"version"</span>: 2,
  <span class="diff-keyword">"builds"</span>: [
    { <span class="diff-keyword">"src"</span>: <span class="diff-str">"backend/server.js"</span>, <span class="diff-keyword">"use"</span>: <span class="diff-str">"@vercel/node"</span> }
  ],
  <span class="diff-keyword">"routes"</span>: [
    { <span class="diff-keyword">"src"</span>: <span class="diff-str">"/(.*)"</span>, <span class="diff-keyword">"dest"</span>: <span class="diff-str">"backend/server.js"</span> }
  ]
}
      </div>
    </div>

    <div class="section-title">
      <span class="section-icon">3</span>
      Etapa 3: Roteiro Passo a Passo do Deploy (Instruções da Atividade)
    </div>

    <p>Siga os passos abaixo para realizar e documentar o deploy na sua nova plataforma cloud:</p>

    <div class="step-card">
      <div class="step-header">
        <span class="step-title">3.1. Roteiro Prático de Execução</span>
        <span class="badge-tag">Passo a Passo</span>
      </div>
      <ol>
        <li><strong>Atualizar Repositório Git:</strong> Garanta que todo o código adaptado esteja commitado e enviado no seu GitHub (<code>git push origin main</code>).</li>
        <li><strong>Criar Conta e Conectar GitHub:</strong> Acesse a plataforma escolhida (ex: Vercel.com / Railway.app / Koyeb.com) e autentique com seu GitHub.</li>
        <li><strong>Importar Projeto:</strong> Selecione o repositório <code>hospital-system</code> na lista de projetos da nuvem.</li>
        <li><strong>Configurar Variáveis e Build:</strong> Defina o <strong>Build Command</strong> (<code>npm install</code>) e <strong>Start Command</strong> (<code>node backend/server.js</code>) ou o ponto de entrada da API. Defina variáveis de ambiente se necessário.</li>
        <li><strong>Executar Deploy e Inspecionar Logs:</strong> Clique em Deploy e acompanhe as mensagens no terminal/dashboard até a confirmação de sucesso.</li>
      </ol>
    </div>

    <!-- Mockup de Dashboard de Nuvem Alternativa -->
    <div class="mockup-window">
      <div class="mockup-header">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="mockup-title">Dashboard Cloud - Deploy na Nova Plataforma Alternativa [LIVE]</span>
      </div>
      <div class="mockup-body" style="background:#0f172a; color:#f8fafc; font-family:'Fira Code', monospace; font-size:9px; padding:10px;">
        <div style="color:#38bdf8; font-weight:bold;">[CLOUD BUILD LOG] Inspecting project repository: github.com/seu-usuario/hospital-system...</div>
        <div>==> Installing dependencies with 'npm install'...</div>
        <div>==> Optimizing backend routes and dynamic Express PORT bindings...</div>
        <div style="color:#4ade80; font-weight:bold;">==> Build completed successfully in 18.4s!</div>
        <div style="color:#4ade80; font-weight:bold; margin-top:4px;">🚀 Application live at: https://hospital-system-nova-nuvem.vercel.app (ou .up.railway.app / .koyeb.app)</div>
      </div>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web • Computação em Nuvem</span>
      <span>Página 2 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 3 ==================== -->
  <div class="page" id="page3">

    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:5px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:26px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:11.5px;">HOSPITAL SYSTEM • DESAFIO DEPLOY NOVA NUVEM</span>
      </div>
      <span class="due-date-badge" style="font-size:9px;">ENTREGA: 04/09/2026</span>
    </div>

    <div class="section-title">
      <span class="section-icon">4</span>
      Etapa 4: Relatório Comparativo: Nova Nuvem vs Render.com
    </div>

    <p>
      O coração desta atividade é a <strong>análise crítica das dificuldades encontradas</strong>. Preencha o relatório comparando sua experiência entre o Render.com e a nova plataforma:
    </p>

    <!-- Tabela Comparativa de Características Cloud -->
    <div class="step-card">
      <div class="step-header">
        <span class="step-title">4.1. Tabela Guia de Comparação Técnica entre Plataformas</span>
        <span class="badge-tag">Análise Técnica</span>
      </div>
      <table class="eval-table">
        <thead>
          <tr>
            <th>Critério de Comparação</th>
            <th>Render.com (Referência)</th>
            <th>Nova Plataforma Escolhida pelo Aluno</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Arquitetura Principal</strong></td>
            <td>Web Service Container Persistente (Node.js)</td>
            <td><em>(Preencher: Serverless / Container PaaS / Edge)</em></td>
          </tr>
          <tr>
            <td><strong>Tratamento da Porta (PORT)</strong></td>
            <td>Exige <code>process.env.PORT</code> dinâmico</td>
            <td><em>(Preencher: Automático / Porta fixa / Serverless Handler)</em></td>
          </tr>
          <tr>
            <td><strong>Tempo de Inicialização / Cold Start</strong></td>
            <td>Hiberna após 15 min de inatividade (acorda em ~30s)</td>
            <td><em>(Preencher: Sem hibernação / Resposta instantânea / Cold Start)</em></td>
          </tr>
          <tr>
            <td><strong>Facilidade de Configuração</strong></td>
            <td>Formulário visual simples com Build & Start Command</td>
            <td><em>(Preencher: Exigiu arquivo extra vercel.json/docker/cli)</em></td>
          </tr>
          <tr>
            <td><strong>Maior Dificuldade Enfrentada</strong></td>
            <td>Configurar <code>process.env.PORT</code> e rotas relativas</td>
            <td><em>(Preencher: Qual foi o maior obstáculo técnico superado?)</em></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="step-card" style="background:#fffbe0; border-color:#fef08a;">
      <div class="step-title" style="color:#854d0e; font-size:11.5px; margin-bottom:4px;">
        ⚠️ Perguntas Obrigatórias para o Relatório do Aluno:
      </div>
      <ul style="color:#713f12; margin-bottom:0;">
        <li><strong>Quais foram as partes mais difíceis na nova plataforma comparadas ao Render?</strong> (Ex: erros de rota, permissão CORS, servimento de arquivos HTML estáticos, configuração do script de inicialização ou arquivo de configuração).</li>
        <li><strong>Como foi a velocidade de Build e Deploy na nova nuvem?</strong> Ela foi mais rápida ou mais lenta do que no Render?</li>
        <li><strong>Se você pudesse escolher apenas uma plataforma para colocar um projeto real em produção, qual escolheria e por quê?</strong></li>
      </ul>
    </div>

    <div class="section-title">
      <span class="section-icon">5</span>
      Etapa 5: Validação do Sistema na Nova Nuvem
    </div>

    <div class="step-card">
      <p>
        Abra o novo link público gerado em seu navegador e valide o fluxo completo do <strong>Hospital System</strong>:
      </p>
      <ul>
        <li><strong>Tela de Login (<code>/</code>):</strong> Faça login com usuário <code>triagem</code> e senha <code>123</code>.</li>
        <li><strong>Atendimento (<code>/atendimento.html</code>):</strong> Cadastre um novo paciente para testes na nova nuvem.</li>
        <li><strong>Triagem (<code>/triagem.html</code>):</strong> Registre os sintomas e acione o botão <strong>📺 Chamar na TV</strong>.</li>
        <li><strong>Mídia Indoor / TV (<code>/tv.html</code>):</strong> Confirme a recepção da chamada em tempo real na tela de TV!</li>
      </ul>
    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web • Computação em Nuvem</span>
      <span>Página 3 de 4</span>
    </div>

  </div>

  <!-- ==================== PÁGINA 4 ==================== -->
  <div class="page" id="page4">

    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0284c7; padding-bottom:5px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px;">
        ${imgLogo ? `<img src="${imgLogo}" style="height:26px;" alt="Logo">` : `<strong>ESCOLA DO FUTURO</strong>`}
        <span style="font-weight:700; color:#0f172a; font-size:11.5px;">HOSPITAL SYSTEM • DESAFIO DEPLOY NOVA NUVEM</span>
      </div>
      <span class="due-date-badge" style="font-size:9px;">ENTREGA: 04/09/2026</span>
    </div>

    <!-- Interface Visual do Sistema Funcionando na Nuvem -->
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
      <div class="mockup-window">
        <div class="mockup-header">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="mockup-title">Triagem Hospitalar (Nova Nuvem)</span>
        </div>
        <div class="mockup-body" style="text-align:center;">
          ${imgTriagem ? `<img src="${imgTriagem}" class="mockup-img" alt="Triagem">` : `<div style="padding:15px; color:#666;">Tela de Triagem</div>`}
        </div>
      </div>

      <div class="mockup-window">
        <div class="mockup-header">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="mockup-title">Mídia Indoor - TV (Nova Nuvem em Tempo Real)</span>
        </div>
        <div class="mockup-body" style="text-align:center;">
          ${imgTv ? `<img src="${imgTv}" class="mockup-img" alt="TV">` : `<div style="padding:15px; color:#666;">Tela da TV</div>`}
        </div>
      </div>
    </div>

    <!-- Tabela de Critérios de Avaliação -->
    <div class="step-card" style="margin-bottom:10px;">
      <div class="step-title" style="margin-bottom:4px;">📊 Critérios de Avaliação e Pontuação</div>
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
            <td><strong>Escolha & Justificativa</strong></td>
            <td>Seleção coerente da nova plataforma alternativa ao Render com justificativa técnica.</td>
            <td><strong>1.5 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Adaptações de Código</strong></td>
            <td>Modificações corretas na estrutura do servidor (porta, handler serverless, vercel.json ou docker).</td>
            <td><strong>2.0 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Passo a Passo do Deploy</strong></td>
            <td>Documentação detalhada e organizada do roteiro de deploy executado na nova nuvem.</td>
            <td><strong>2.5 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Relatório Comparativo & Dificuldades</strong></td>
            <td>Análise crítica bem fundamentada sobre os desafios mais difíceis superados vs Render.</td>
            <td><strong>2.5 Pontos</strong></td>
          </tr>
          <tr>
            <td><strong>Aplicação Live e Repositório</strong></td>
            <td>Links públicos ativos no GitHub e na nova nuvem com o fluxo do Hospital System operando.</td>
            <td><strong>1.5 Pontos</strong></td>
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
        <span class="due-date-badge" style="background:#15803d; font-size:10px;">
          📅 DATA DE ENTREGA IMPRETERÍVEL: 04/09/2026
        </span>
      </div>

      <p style="color:#14532d; font-weight:600; font-size:9.5px; margin-bottom:6px;">
        Instruções: Preencha os campos abaixo com as informações da nova nuvem escolhida e entregue este documento impresso ou o arquivo PDF para o professor até o dia <strong>04/09/2026</strong>.
      </p>

      <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:8px;">
        <div class="submission-field">
          <span class="submission-label">1. Nome da Nova Plataforma Cloud Escolhida:</span>
          <div class="submission-line">
            <span style="font-family:monospace; color:#334155; font-size:9.5px;">Ex: Vercel / Railway / Koyeb / Fly.io / Back4App / Outra: ____________</span>
          </div>
        </div>

        <div class="submission-field">
          <span class="submission-label">2. Link Público do Repositório GitHub:</span>
          <div class="submission-line">
            <span style="font-family:monospace; color:#334155; font-size:9.5px;">https://github.com/____________________________________</span>
          </div>
        </div>
      </div>

      <div class="submission-field">
        <span class="submission-label">3. Link Público Live da Aplicação Hospedada na Nova Nuvem (URL Live):</span>
        <div class="submission-line">
          <span style="font-family:monospace; color:#334155; font-size:9.5px;">https://__________________________________________________________________________________</span>
        </div>
      </div>

      <!-- Resposta das Partes Mais Difíceis Comparadas ao Render -->
      <div class="submission-field">
        <span class="submission-label">4. Relatório de Dificuldades: Quais foram as partes MAIS DIFÍCEIS ao comparar com o Render?</span>
        <div class="submission-area">
          <div style="border-bottom:1px dashed #cbd5e1; height:16px; margin-bottom:4px;"></div>
          <div style="border-bottom:1px dashed #cbd5e1; height:16px; margin-bottom:4px;"></div>
          <div style="border-bottom:1px dashed #cbd5e1; height:16px;"></div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:6px;">
        <div class="submission-field">
          <span class="submission-label">Data do Envio / Teste:</span>
          <div class="submission-line">
            <span style="color:#334155; font-size:9.5px;">_____ / _____ / 2026</span>
          </div>
        </div>
        <div class="submission-field">
          <span class="submission-label">Assinatura do Aluno:</span>
          <div class="submission-line">
            <span style="color:#334155; font-size:9.5px;">_________________________________________</span>
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <span>Escola do Futuro • Curso de Desenvolvimento Web • Computação em Nuvem</span>
      <span>Página 4 de 4</span>
    </div>

  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log("🚀 Gerando PDF e capturando páginas para inspeção visual...");

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }); // A4 at 96 DPI
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const filename = "Atividade_Para_Casa_Desafio_Nova_Plataforma_Deploy.pdf";
  const pdfPathTarget = path.join(targetDir, filename);
  const pdfPathArt = path.join(artDir, filename);

  await page.pdf({
    path: pdfPathTarget,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });

  fs.copyFileSync(pdfPathTarget, pdfPathArt);
  console.log(`✅ PDF gerado em:\n1. ${pdfPathTarget}\n2. ${pdfPathArt}`);

  // Capturar screenshots das 4 páginas para verificação visual
  for (let i = 1; i <= 4; i++) {
    const element = await page.$(`#page${i}`);
    if (element) {
      const screenshotPath = path.join(artDir, `preview_page_${i}.png`);
      await element.screenshot({ path: screenshotPath });
      console.log(`📸 Screenshot da página ${i} salva em: ${screenshotPath}`);
    }
  }

  await browser.close();
  console.log("🎉 PDF e screenshots de verificação criados com sucesso!");
}

generatePDF().catch(err => {
  console.error("❌ Erro ao gerar o PDF:", err);
  process.exit(1);
});
