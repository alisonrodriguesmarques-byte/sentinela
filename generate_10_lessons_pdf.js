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
const imgMedicacoes = getBase64Image('screen_medicacoes.png');

function renderHeader(aulaNum, aulaTitle) {
  return `
    <div class="slide-header">
      <div class="brand">
        <span class="hospital-icon">🏥</span>
        <span class="brand-text">HOSPITAL SYSTEM • CURSO BACK-END & API (280H)</span>
      </div>
      <div class="aula-badge">AULA ${aulaNum} | 50 MIN</div>
    </div>
  `;
}

function renderFooter(slideNum, totalSlides) {
  return `
    <div class="slide-footer">
      <span>Material Didático para Retroprojetor • Formato 16:9</span>
      <span>Slide ${slideNum} de ${totalSlides}</span>
    </div>
  `;
}

const commonCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Fira+Code:wght@400;600&display=swap');
  
  @page {
    size: 297mm 167mm;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f172a;
    color: #f8fafc;
    -webkit-print-color-adjust: exact;
  }

  .slide {
    width: 297mm;
    height: 167mm;
    page-break-after: always;
    page-break-inside: avoid;
    padding: 14mm 16mm 10mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    overflow: hidden;
  }

  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #334155;
    padding-bottom: 10px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hospital-icon { font-size: 22px; }
  .brand-text { font-size: 13px; font-weight: 700; color: #38bdf8; letter-spacing: 1px; }

  .aula-badge {
    background: #0284c7;
    color: white;
    font-size: 12px;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }

  .slide-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #334155;
    padding-top: 8px;
    font-size: 11px;
    color: #94a3b8;
  }

  .slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 12px 0;
  }

  .slide-title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .slide-title .accent { color: #38bdf8; }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    align-items: center;
  }

  .grid-2-code {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 16px;
    align-items: stretch;
  }

  .card-box {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }

  .card-box h3 {
    font-size: 17px;
    color: #38bdf8;
    margin-bottom: 8px;
  }

  .card-box p, .card-box li {
    font-size: 13.5px;
    color: #cbd5e1;
    line-height: 1.5;
    margin-bottom: 6px;
  }

  .code-block {
    background: #020617;
    border: 1px solid #1e293b;
    border-left: 4px solid #38bdf8;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    color: #e2e8f0;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
  }

  .code-keyword { color: #f43f5e; font-weight: bold; }
  .code-func { color: #38bdf8; font-weight: bold; }
  .code-str { color: #4ade80; }
  .code-comment { color: #64748b; font-style: italic; }
  .code-attr { color: #fbbf24; }

  .highlight-card {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%);
    border: 1px solid #0284c7;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
  }

  .highlight-card h4 {
    color: #38bdf8;
    font-size: 14px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .highlight-card p {
    font-size: 13px;
    color: #cbd5e1;
  }

  .img-container {
    background: #000;
    border: 2px solid #334155;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    text-align: center;
  }

  .img-container img {
    width: 100%;
    max-height: 100mm;
    object-fit: contain;
    display: block;
  }

  .cover-slide {
    background: linear-gradient(135deg, #0284c7 0%, #0f172a 100%);
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
  }

  .cover-title {
    font-size: 38px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 14px;
    line-height: 1.2;
  }

  .cover-subtitle {
    font-size: 20px;
    color: #7dd3fc;
    margin-bottom: 25px;
  }

  .cover-meta {
    display: flex;
    gap: 20px;
    justify-content: center;
    background: rgba(15, 23, 42, 0.6);
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .desafio-box {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border: 2px solid #6366f1;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }

  .desafio-box h3 {
    color: #a5b4fc;
    font-size: 22px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .desafio-box ol, .desafio-box ul {
    padding-left: 20px;
    color: #e0e7ff;
    font-size: 15px;
    line-height: 1.6;
  }

  code {
    font-family: 'Fira Code', monospace;
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const aulasData = [
  // AULA 1
  {
    id: 1,
    title: "Aula 01: Arquitetura de APIs REST & Introdução ao Hospital System",
    filename: "Aula_01_Arquitetura_REST_e_NodeJS.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">💻</div>
        <h1 class="cover-title">AULA 01: Arquitetura de APIs REST & Node.js</h1>
        <h2 class="cover-subtitle">Visão Geral do Hospital System • Relação Cliente-Servidor e Protocolo HTTP</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: APIs REST, Verbos HTTP & Node.js Runtime</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Arquitetura REST")}
        <div class="slide-content">
          <h2 class="slide-title">1. O Conceito de <span class="accent">API REST</span> no Hospital</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🌐 O Protocolo HTTP</h3>
              <p>• <strong>GET:</strong> Solicita e busca dados (ex: consultar lista de pacientes ou triagens).</p>
              <p>• <strong>POST:</strong> Envia novos dados para serem salvos (ex: cadastrar paciente, salvar triagem ou consulta).</p>
              <p>• <strong>Payload JSON:</strong> Formato universal de troca de dados entre o front-end e o back-end.</p>
            </div>
            <div class="card-box">
              <h3>⚙️ O papel do Node.js</h3>
              <p>• Ambiente de execução JavaScript fora do navegador.</p>
              <p>• Escuta a porta HTTP 3000 (<code>http://localhost:3000</code>).</p>
              <p>• Processa requisições de múltiplos setores do hospital simultaneamente.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Visão Geral do Projeto")}
        <div class="slide-content">
          <h2 class="slide-title">2. Fluxo Geral do <span class="accent">Hospital System</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgLogin}" alt="Tela de Login">
            </div>
            <div class="card-box">
              <h3>🔄 Ciclo Completo de Atendimento</h3>
              <p>1. <strong>Recepção:</strong> Cadastra paciente (POST /atendimento).</p>
              <p>2. <strong>Triagem:</strong> Enfermeiro classifica urgência e chama na TV (POST /triagem e POST /tv/chamar).</p>
              <p>3. <strong>Médico:</strong> Realiza atendimento, verifica alergias e prescreve medicamentos (POST /consulta).</p>
              <p>4. <strong>TV Mídia Indoor:</strong> Exibe chamadas em tempo real na sala de espera (GET /tv/chamada).</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Análise do package.json")}
        <div class="slide-content">
          <h2 class="slide-title">3. Configuração do Projeto: <span class="accent">package.json</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
{
  <span class="code-attr">"name"</span>: <span class="code-str">"hospital-system"</span>,
  <span class="code-attr">"version"</span>: <span class="code-str">"1.0.0"</span>,
  <span class="code-attr">"main"</span>: <span class="code-str">"api/index.js"</span>,
  <span class="code-attr">"scripts"</span>: {
    <span class="code-attr">"start"</span>: <span class="code-str">"node api/index.js"</span>
  },
  <span class="code-attr">"dependencies"</span>: {
    <span class="code-attr">"cors"</span>: <span class="code-str">"^2.8.5"</span>,
    <span class="code-attr">"express"</span>: <span class="code-str">"^5.2.1"</span>
  }
}
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Express Framework</h4>
                <p>Biblioteca que simplifica a criação do servidor HTTP e gerenciamento de rotas e middlewares.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 CORS (Cross-Origin Resource Sharing)</h4>
                <p>Permite que requisições vindas de navegadores web externos acessem a API sem bloqueios de segurança.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Desafio da Aula 1")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 01 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Verificando o ambiente Node.js no laboratório!</p>
            <ol>
              <li>Abra o terminal no VS Code na pasta do projeto.</li>
              <li>Execute o comando <code style="color:#7dd3fc;">node -v</code> para confirmar a versão do Node.js instalada.</li>
              <li>Execute <code style="color:#4ade80;">npm start</code> para iniciar o servidor do hospital na porta 3000.</li>
              <li>Abra o navegador em <code style="color:#fbbf24;">http://localhost:3000/index.html</code> e confirme o carregamento da tela inicial!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 2
  {
    id: 2,
    title: "Aula 02: Estrutura HTML5 & Formulários de Atendimento",
    filename: "Aula_02_Estrutura_HTML5_e_Formularios.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">🏥</div>
        <h1 class="cover-title">AULA 02: Estrutura HTML5 & Formulários</h1>
        <h2 class="cover-subtitle">Entrada de Dados na Recepção • Login e Cadastro de Pacientes</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: HTML5, Inputs, Selects e Atributos ID</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Formulários na Recepção")}
        <div class="slide-content">
          <h2 class="slide-title">1. Estrutura da Recepção: <span class="accent">atendimento.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgAtendimento}" alt="Tela de Atendimento">
            </div>
            <div class="card-box">
              <h3>📋 Elementos de Entrada de Dados</h3>
              <p>• <strong>&lt;input id="nome"&gt;:</strong> Captura o nome completo do paciente.</p>
              <p>• <strong>&lt;input id="cpf"&gt;:</strong> Registra o documento oficial do paciente.</p>
              <p>• <strong>&lt;select id="tipo"&gt;:</strong> Define o tipo de atendimento (Convenio ou Particular).</p>
              <p>• <strong>&lt;button onclick="cadastrar()"&gt;:</strong> Dispara o envio dos dados.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Análise do Código HTML")}
        <div class="slide-content">
          <h2 class="slide-title">2. Código HTML5: <span class="accent">frontend/atendimento.html</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
&lt;<span class="code-keyword">div</span> <span class="code-attr">class</span>=<span class="code-str">"container"</span>&gt;
  &lt;<span class="code-keyword">h2</span>&gt;Atendimento&lt;/<span class="code-keyword">h2</span>&gt;

  &lt;<span class="code-keyword">input</span> <span class="code-attr">id</span>=<span class="code-str">"nome"</span> <span class="code-attr">placeholder</span>=<span class="code-str">"Nome"</span>&gt;
  &lt;<span class="code-keyword">input</span> <span class="code-attr">id</span>=<span class="code-str">"cpf"</span> <span class="code-attr">placeholder</span>=<span class="code-str">"CPF"</span>&gt;

  &lt;<span class="code-keyword">select</span> <span class="code-attr">id</span>=<span class="code-str">"tipo"</span>&gt;
    &lt;<span class="code-keyword">option</span>&gt;Convenio&lt;/<span class="code-keyword">option</span>&gt;
    &lt;<span class="code-keyword">option</span>&gt;Particular&lt;/<span class="code-keyword">option</span>&gt;
  &lt;/<span class="code-keyword">select</span>&gt;

  &lt;<span class="code-keyword">button</span> <span class="code-attr">onclick</span>=<span class="code-str">"cadastrar()"</span>&gt;Cadastrar&lt;/<span class="code-keyword">button</span>&gt;
&lt;/<span class="code-keyword">div</span>&gt;
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 O Atributo "id"</h4>
                <p>Mapeia a identidade única do elemento para o JavaScript capturar os dados digitados.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 A Tag &lt;select&gt;</h4>
                <p>Restringe a escolha a opções válidas evitando dados errados no banco.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Validação e Usabilidade")}
        <div class="slide-content">
          <h2 class="slide-title">3. Importância da <span class="accent">Semântica HTML</span></h2>
          <div class="card-box">
            <h3>🔑 Por que a estrutura HTML é vital?</h3>
            <p>1. <strong>Integridade dos Dados:</strong> Se um campo não possuir ID ou Name correto, o JavaScript não conseguirá ler o valor digitado.</p>
            <p>2. <strong>Produtividade do Atendente:</strong> Placeholders e menus de seleção tornam o cadastro rápido no guichê de entrada.</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Desafio da Aula 2")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 02 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Aprimorando o formulário de cadastro de pacientes!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/atendimento.html</code>.</li>
              <li>Adicione um campo para telefone do paciente: <code style="color:#f43f5e;">&lt;input id="telefone" placeholder="Telefone"&gt;</code>.</li>
              <li>Adicione um campo de prioridade legal: <code style="color:#4ade80;">&lt;select id="prioridade"&gt;&lt;option&gt;Normal&lt;/option&gt;&lt;option&gt;Idoso 60+&lt;/option&gt;&lt;/select&gt;</code>.</li>
              <li>Verifique a renderização no navegador!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 3
  {
    id: 3,
    title: "Aula 03: Estilização CSS3 & Protocolo de Urgência Manchester",
    filename: "Aula_03_Estilizacao_CSS3_e_Manchester.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">🎨</div>
        <h1 class="cover-title">AULA 03: Estilização CSS3 & Manchester</h1>
        <h2 class="cover-subtitle">Design de Formulários, Layout Responsivo & Cores de Urgência Hospitalar</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: CSS3, Box Model, Flexbox & Badges de Risco</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Protocolo de Manchester")}
        <div class="slide-content">
          <h2 class="slide-title">1. Comunicação Visual com <span class="accent">CSS3</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🚨 O Sistema de Manchester</h3>
              <p>• <strong>.verde:</strong> Risco Baixo (Pouco Urgente).</p>
              <p>• <strong>.amarelo:</strong> Risco Médio (Urgente).</p>
              <p>• <strong>.vermelho:</strong> Emergência Gravíssima (Atendimento Imediato).</p>
            </div>
            <div class="card-box">
              <h3>📐 Regras Visuais Globais</h3>
              <p>• Centralização com <code class="code-inline">margin: 20px auto</code>.</p>
              <p>• Sombra suave com <code class="code-inline">box-shadow</code>.</p>
              <p>• Cantos arredondados com <code class="code-inline">border-radius: 12px</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Análise do style.css")}
        <div class="slide-content">
          <h2 class="slide-title">2. Código CSS: <span class="accent">frontend/css/style.css</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
.<span class="code-func">container</span> {
  <span class="code-attr">width</span>: <span class="code-str">90%</span>; <span class="code-attr">max-width</span>: <span class="code-str">900px</span>;
  <span class="code-attr">margin</span>: <span class="code-str">20px auto</span>;
  <span class="code-attr">background</span>: <span class="code-str">white</span>;
  <span class="code-attr">border-radius</span>: <span class="code-str">12px</span>;
}

.<span class="code-func">verde</span> { <span class="code-attr">background</span>: <span class="code-str">#2ecc71</span>; <span class="code-attr">color</span>: <span class="code-str">white</span>; }
.<span class="code-func">amarelo</span> { <span class="code-attr">background</span>: <span class="code-str">#f1c40f</span>; }
.<span class="code-func">vermelho</span> { <span class="code-attr">background</span>: <span class="code-str">#e74c3c</span>; <span class="code-attr">color</span>: <span class="code-str">white</span>; }
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Badges Dinâmicos</h4>
                <p>As classes de cores são injetadas pelo JavaScript nos cartões do médico e da triagem.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Segurança do Paciente</h4>
                <p>Cresce a velocidade de identificação visual de casos graves pelo médico de plantão.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Tela de Triagem Estilizada")}
        <div class="slide-content">
          <h2 class="slide-title">3. Aplicação em Tela: <span class="accent">triagem.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgTriagem}" alt="Painel de Triagem">
            </div>
            <div class="card-box">
              <h3>🎨 Design Visual Limpo</h3>
              <p>• Campos largos facilitam preenchimento rápido em momentos de emergência.</p>
              <p>• Badges coloridos destacam a urgência sem necessidade de leitura exaustiva.</p>
            </div>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Desafio da Aula 3")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 03 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Criando nova classe de risco visual!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/css/style.css</code>.</li>
              <li>Crie a classe de risco intermediário: <code style="color:#f43f5e;">.laranja { background: #e67e22; color: white; padding: 5px 10px; border-radius: 6px; }</code>.</li>
              <li>Adicione efeito suave nos botões: <code style="color:#4ade80;">button { transition: background 0.3s ease; }</code>.</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 4
  {
    id: 4,
    title: "Aula 04: Front-End Dinâmico: DOM, Eventos e Fetch API",
    filename: "Aula_04_FrontEnd_Dinamico_DOM_e_Fetch.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">⚡</div>
        <h1 class="cover-title">AULA 04: Front-End Dinâmico com JavaScript</h1>
        <h2 class="cover-subtitle">Manipulação do DOM, Captura de Inputs e Requisições HTTP com Fetch API</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: JS ES6+, Eventos, DOM, JSON & fetch()</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Fetch API Assíncrono")}
        <div class="slide-content">
          <h2 class="slide-title">1. Comunicação Front-End & <span class="accent">Back-End</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🎯 Captura de Dados</h3>
              <p>• Leitura de inputs via <code class="code-inline">nome.value</code> e <code class="code-inline">cpf.value</code>.</p>
              <p>• Empacotamento em objetos JavaScript.</p>
            </div>
            <div class="card-box">
              <h3>🌐 Envio Assíncrono</h3>
              <p>• <code class="code-inline">fetch("http://localhost:3000/atendimento", { method: "POST", ... })</code>.</p>
              <p>• Conversão para texto JSON com <code class="code-inline">JSON.stringify()</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Código da Função cadastrar()")}
        <div class="slide-content">
          <h2 class="slide-title">2. Código JavaScript: <span class="accent">atendimento.html</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-keyword">function</span> <span class="code-func">cadastrar</span>() {
  <span class="code-func">fetch</span>(<span class="code-str">"http://localhost:3000/atendimento"</span>, {
    <span class="code-attr">method</span>: <span class="code-str">"POST"</span>,
    <span class="code-attr">headers</span>: { <span class="code-str">"Content-Type"</span>: <span class="code-str">"application/json"</span> },
    <span class="code-attr">body</span>: JSON.<span class="code-func">stringify</span>({
      <span class="code-attr">nome</span>: nome.value,
      <span class="code-attr">cpf</span>: cpf.value,
      <span class="code-attr">tipo</span>: tipo.value
    })
  });
  <span class="code-func">alert</span>(<span class="code-str">"Paciente enviado para triagem"</span>);
}
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 method: "POST"</h4>
                <p>Indica ao servidor que estamos enviando dados para criar um novo registro.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 JSON.stringify()</h4>
                <p>Converte o objeto JS em string JSON para trafegar na rede HTTP.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Fluxo de Redirecionamento")}
        <div class="slide-content">
          <h2 class="slide-title">3. Tela de Login: <span class="accent">index.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgLogin}" alt="Tela de Login">
            </div>
            <div class="card-box">
              <h3>🔑 Autenticação em 4 Passos</h3>
              <p>1. O usuário clica em "Entrar".</p>
              <p>2. O JS envia login e senha para <code class="code-inline">/login</code>.</p>
              <p>3. O servidor responde com o tipo do usuário.</p>
              <p>4. O JS redireciona via <code class="code-inline">location.href</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Desafio da Aula 4")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 04 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Validação de segurança no Front-End!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/atendimento.html</code>.</li>
              <li>Na função <code style="color:#4ade80;">cadastrar()</code>, valide se o CPF tem 11 dígitos:
                <br><code style="color:#f43f5e;">if (cpf.value.length !== 11) { alert("CPF deve ter 11 dígitos!"); return; }</code>
              </li>
              <li>Teste tentar cadastrar um CPF inválido!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 5
  {
    id: 5,
    title: "Aula 05: O Coração do Back-End: Servidor Node.js & Express",
    filename: "Aula_05_Servidor_NodeJS_e_Express.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">🚀</div>
        <h1 class="cover-title">AULA 05: O Coração do Back-End</h1>
        <h2 class="cover-subtitle">Servidor HTTP em Node.js, Framework Express & Middlewares</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Express, Middlewares, Rotas & req/res</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Estrutura do Servidor Express")}
        <div class="slide-content">
          <h2 class="slide-title">1. Middlewares & Rotas em <span class="accent">server.js</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>⚡ Middlewares Principais</h3>
              <p>• <code class="code-inline">express.json()</code>: Converte o corpo da requisição em <code class="code-inline">req.body</code>.</p>
              <p>• <code class="code-inline">cors()</code>: Libera acesso externo do navegador.</p>
              <p>• <code class="code-inline">express.static()</code>: Serve a pasta frontend.</p>
            </div>
            <div class="card-box">
              <h3>🌐 O Ciclo Request / Response</h3>
              <p>• <strong>req (Request):</strong> Dados enviados pelo cliente (<code class="code-inline">req.body</code>, <code class="code-inline">req.params</code>).</p>
              <p>• <strong>res (Response):</strong> Métodos de resposta (<code class="code-inline">res.json()</code>, <code class="code-inline">res.status()</code>).</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Análise de Rota Express")}
        <div class="slide-content">
          <h2 class="slide-title">2. Código Back-End: <span class="accent">backend/server.js</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
app.<span class="code-func">post</span>(<span class="code-str">"/atendimento"</span>, (req, res) =&gt; {
  <span class="code-keyword">const</span> db = <span class="code-func">readDB</span>();

  <span class="code-keyword">const</span> paciente = {
    <span class="code-attr">id</span>: Date.<span class="code-func">now</span>(),
    <span class="code-attr">nome</span>: req.body.nome,
    <span class="code-attr">cpf</span>: req.body.cpf,
    <span class="code-attr">tipo</span>: req.body.tipo,
    <span class="code-attr">status</span>: <span class="code-str">"triagem"</span>,
    <span class="code-attr">createdAt</span>: <span class="code-keyword">new</span> Date()
  };

  db.pacientes.<span class="code-func">push</span>(paciente);
  <span class="code-func">writeDB</span>(db);
  res.<span class="code-func">json</span>(paciente);
});
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Date.now()</h4>
                <p>Gera um identificador numérico único baseado no horário atual em milissegundos.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 res.json(paciente)</h4>
                <p>Retorna o paciente cadastrado como JSON com status HTTP 200 OK.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Importância Central")}
        <div class="slide-content">
          <h2 class="slide-title">3. Por que o Back-End é o <span class="accent">Cérebro</span>?</h2>
          <div class="card-box">
            <h3>🧠 Centralização de Dados e Segurança</h3>
            <p>1. Impede manipulações maliciosas no navegador do cliente.</p>
            <p>2. Garante que recepção, triagem, médicos e TV acessem a mesma base de dados atualizada.</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Desafio da Aula 5")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 05 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Criando nova rota no Express!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/server.js</code>.</li>
              <li>Crie a rota: <code style="color:#4ade80;">app.get("/estatisticas", (req, res) => { const db = readDB(); res.json({ totalPacientes: db.pacientes.length }); });</code>.</li>
              <li>Teste abrindo <code style="color:#fbbf24;">http://localhost:3000/estatisticas</code> no navegador!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 6
  {
    id: 6,
    title: "Aula 06: Persistência de Dados em Arquivos JSON & SQL",
    filename: "Aula_06_Persistencia_de_Dados_JSON_e_SQL.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">💾</div>
        <h1 class="cover-title">AULA 06: Persistência de Dados</h1>
        <h2 class="cover-subtitle">Módulo File System (fs), Leitura/Escrita de JSON e Estrutura Relacional SQL</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Módulo fs, JSON.parse, JSON.stringify & SQL</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Banco de Dados JSON")}
        <div class="slide-content">
          <h2 class="slide-title">1. Módulo File System (<span class="accent">fs</span>) em Node.js</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>📖 Funções readDB() e writeDB()</h3>
              <p>• <code class="code-inline">fs.existsSync(DB_FILE)</code>: Verifica se o banco já existe no disco.</p>
              <p>• <code class="code-inline">JSON.parse(fs.readFileSync(...))</code>: Converte texto do arquivo em objeto JS.</p>
              <p>• <code class="code-inline">fs.writeFileSync(...)</code>: Salva dados formatados de volta no arquivo <code class="code-inline">db.json</code>.</p>
            </div>
            <div class="card-box">
              <h3>🗄️ Equivalente em SQL</h3>
              <p>• Arquivo <code class="code-inline">database.sql</code> pronto para migração em bancos relacionais (PostgreSQL/MySQL).</p>
              <p>• Tabelas: <code class="code-inline">pacientes</code>, <code class="code-inline">triagens</code>, <code class="code-inline">consultas</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Estrutura do db.json")}
        <div class="slide-content">
          <h2 class="slide-title">2. Estrutura do Banco: <span class="accent">backend/db.json</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
{
  <span class="code-attr">"usuarios"</span>: [
    { <span class="code-attr">"usuario"</span>: <span class="code-str">"admin"</span>, <span class="code-attr">"senha"</span>: <span class="code-str">"123"</span> }
  ],
  <span class="code-attr">"pacientes"</span>: [
    { <span class="code-attr">"id"</span>: 177128, <span class="code-attr">"nome"</span>: <span class="code-str">"Carlos"</span>, <span class="code-attr">"status"</span>: <span class="code-str">"triagem"</span> }
  ],
  <span class="code-attr">"triagens"</span>: [],
  <span class="code-attr">"consultas"</span>: []
}
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Persistência Permanente</h4>
                <p>Mesmo desligando o servidor, os registros permanecem salvos em disco.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Segurança da Persistência")}
        <div class="slide-content">
          <h2 class="slide-title">3. Tratamento de Arquivo Inexistente</h2>
          <div class="card-box">
            <h3>🛡️ Função readDB() Segura</h3>
            <p>Se o arquivo <code class="code-inline">db.json</code> for apagado por engano, a função <code class="code-inline">readDB()</code> recria automaticamente o esquema inicial de coleções zeradas sem derrubar a API.</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Desafio da Aula 6")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 06 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Inspecionando o arquivo de banco de dados!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/db.json</code> no VS Code.</li>
              <li>Cadastre um novo paciente na tela de Atendimento.</li>
              <li>Observe o aparecimento instantâneo do novo objeto salvo no arquivo <code style="color:#4ade80;">db.json</code>!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 7
  {
    id: 7,
    title: "Aula 07: Regras de Negócio e Rota de Triagem Hospitalar",
    filename: "Aula_07_Regras_de_Negocio_e_Triagem.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">🌡️</div>
        <h1 class="cover-title">AULA 07: Regras de Negócio na Triagem</h1>
        <h2 class="cover-subtitle">Classificação Automática por Sintoma/Temperatura & Rotas da Enfermagem</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Algoritmo Manchester, /triagem & /triagens</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(7, "Algoritmo de Risco")}
        <div class="slide-content">
          <h2 class="slide-title">1. Algoritmo de Decisão: <span class="accent">classificarRisco()</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🚨 Regras de Decisão de Saúde</h3>
              <p>• Se <code class="code-inline">temperatura >= 39°C</code>: Classifica em <strong>VERMELHO</strong>.</p>
              <p>• Se sintoma pertence a <code class="code-inline">["infarto", "avc", "convulsao"]</code>: Classifica em <strong>VERMELHO</strong>.</p>
              <p>• Se sintoma pertence a <code class="code-inline">["febre", "vomito", "diarreia"]</code>: Classifica em <strong>AMARELO</strong>.</p>
              <p>• Demais casos: Classifica em <strong>VERDE</strong>.</p>
            </div>
            <div class="img-container">
              <img src="${imgTriagem}" alt="Painel de Triagem">
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(7, "Código da Triagem")}
        <div class="slide-content">
          <h2 class="slide-title">2. Rota HTTP: <span class="accent">POST /triagem</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
app.<span class="code-func">post</span>(<span class="code-str">"/triagem"</span>, (req, res) =&gt; {
  <span class="code-keyword">const</span> db = <span class="code-func">readDB</span>();
  <span class="code-keyword">let</span> risco = req.body.risco;

  <span class="code-keyword">if</span> (req.body.temperatura &gt;= <span class="code-str">39</span>) risco = <span class="code-str">"vermelho"</span>;
  <span class="code-keyword">else if</span> (req.body.temperatura &gt;= <span class="code-str">38</span>) risco = <span class="code-str">"amarelo"</span>;
  <span class="code-keyword">else if</span> (!risco) risco = <span class="code-str">"verde"</span>;

  <span class="code-keyword">const</span> triagem = {
    <span class="code-attr">id</span>: Date.<span class="code-func">now</span>(),
    <span class="code-attr">nome</span>: req.body.nome,
    <span class="code-attr">sintoma</span>: req.body.sintoma,
    <span class="code-attr">temperatura</span>: req.body.temperatura,
    <span class="code-attr">risco</span>, <span class="code-attr">status</span>: <span class="code-str">"aguardando_medico"</span>
  };
  db.triagens.<span class="code-func">push</span>(triagem);
  <span class="code-func">writeDB</span>(db);
  res.<span class="code-func">json</span>(triagem);
});
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Validação Dupla</h4>
                <p>O risco é validado tanto no front-end em JS quanto confirmado no back-end pelo Express.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(7, "Atualização Automática")}
        <div class="slide-content">
          <h2 class="slide-title">3. Atualização da Fila: <span class="accent">setInterval</span></h2>
          <div class="card-box">
            <h3>🔄 Polling de Pacientes Cadastrados</h3>
            <p> A página da triagem consulta <code class="code-inline">GET /pacientes</code> a cada 10 segundos (<code class="code-inline">setInterval(carregarPacientes, 10000)</code>) trazendo novos cadastros da recepção automaticamente.</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(7, "Desafio da Aula 7")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 07 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Adicionando hora formatada na triagem!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/server.js</code>.</li>
              <li>Na rota <code style="color:#4ade80;">/triagem</code>, inclua o campo: <code style="color:#f43f5e;">horaFormatada: new Date().toLocaleTimeString("pt-BR")</code>.</li>
              <li>Salve uma triagem e confirme no arquivo <code style="color:#fbbf24;">db.json</code> o salvamento da hora!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 8
  {
    id: 8,
    title: "Aula 08: Módulo Médico, Prontuários & Lista de Medicações",
    filename: "Aula_08_Modulo_Medico_e_Prescricoes.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">🩺</div>
        <h1 class="cover-title">AULA 08: Módulo Médico & Prescrições</h1>
        <h2 class="cover-subtitle">Prontuário Eletrônico, Alertas de Alergias & Catálogo de Remédios</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: /consulta, /lista-medicacoes & /medicacoes</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(8, "Painel Médico")}
        <div class="slide-content">
          <h2 class="slide-title">1. Atendimento Médico em <span class="accent">medico.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgMedico}" alt="Painel Médico">
            </div>
            <div class="card-box">
              <h3>💊 Funcionalidades do Médico</h3>
              <p>• <strong>Visualização de Fila:</strong> Exibe cartões coloridos conforme a triagem.</p>
              <p>• <strong>Alerta de Alergia:</strong> Exibe pop-up <code class="code-inline">alert()</code> de aviso antes de prescrever remédios.</p>
              <p>• <strong>Catálogo de Remédios:</strong> Carrega opções vindas da rota <code class="code-inline">/lista-medicacoes</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(8, "Prescrição e Farmácia")}
        <div class="slide-content">
          <h2 class="slide-title">2. Telas em Ação: <span class="accent">medicacoes.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgMedicacoes}" alt="Medicações Prescritas">
            </div>
            <div class="card-box">
              <h3>📦 Rota /consulta e Farmácia</h3>
              <p>• A rota <code class="code-inline">POST /consulta</code> grava a receita médica no banco de dados.</p>
              <p>• A página <code class="code-inline">medicacoes.html</code> busca os dados via <code class="code-inline">GET /medicacoes</code> para a farmácia preparar o remédio.</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(8, "Código da Rota de Consulta")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código Back-End: <span class="accent">POST /consulta</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
app.<span class="code-func">post</span>(<span class="code-str">"/consulta"</span>, (req, res) =&gt; {
  <span class="code-keyword">const</span> db = <span class="code-func">readDB</span>();
  <span class="code-keyword">const</span> consulta = {
    <span class="code-attr">id</span>: Date.<span class="code-func">now</span>(),
    <span class="code-attr">paciente</span>: req.body.paciente,
    <span class="code-attr">diagnostico</span>: req.body.diagnostico,
    <span class="code-attr">medicacao</span>: req.body.medicacao,
    <span class="code-attr">obs</span>: req.body.obs,
    <span class="code-attr">createdAt</span>: <span class="code-keyword">new</span> Date()
  };
  db.consultas.<span class="code-func">push</span>(consulta);
  <span class="code-func">writeDB</span>(db);
  res.<span class="code-func">json</span>(consulta);
});
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Segurança Farmacêutica</h4>
                <p>Padroniza a medicação dispensada evitando erros manuais de dosagem.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(8, "Desafio da Aula 8")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 08 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Adicionando novo medicamento à lista oficial!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/server.js</code>.</li>
              <li>Na rota <code style="color:#4ade80;">GET /lista-medicacoes</code>, adicione <code style="color:#f43f5e;">"Dipirona 500mg"</code> e <code style="color:#f43f5e;">"Dexametasona"</code> no array.</li>
              <li>Abra a tela do médico e confirme o aparecimento do novo remédio no menu suspenso!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 9
  {
    id: 9,
    title: "Aula 09: Junção dos Projetos & Mídia Indoor em Tempo Real",
    filename: "Aula_09_Juncao_Projetos_e_Midia_Indoor.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">📺</div>
        <h1 class="cover-title">AULA 09: Junção de Projetos & Mídia Indoor</h1>
        <h2 class="cover-subtitle">Integração da TV do Saguão, Polling HTTP de 2s e Animações DOM</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: /tv/chamar, /tv/chamada, Polling 2s & Flash CSS</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(9, "Mídia Indoor TV")}
        <div class="slide-content">
          <h2 class="slide-title">1. A Tela da TV: <span class="accent">tv.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgTv}" alt="Mídia Indoor TV">
            </div>
            <div class="card-box">
              <h3>📢 Sistema de Chamadas em Tempo Real</h3>
              <p>• <strong>Guichê / Consultório:</strong> Exibe o local para onde o paciente deve se dirigir.</p>
              <p>• <strong>Nome em Destaque:</strong> Fonte gigante em cor contrastante.</p>
              <p>• <strong>Histórico Lateral:</strong> Mantém os últimos 5 pacientes visíveis com fila FIFO (<code class="code-inline">unshift</code> / <code class="code-inline">pop</code>).</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(9, "Código da Chamada da TV")}
        <div class="slide-content">
          <h2 class="slide-title">2. Código Back-End: <span class="accent">POST /tv/chamar</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
app.<span class="code-func">post</span>(<span class="code-str">"/tv/chamar"</span>, (req, res) =&gt; {
  <span class="code-keyword">const</span> db = <span class="code-func">readDB</span>();
  <span class="code-keyword">const</span> chamada = {
    <span class="code-attr">id</span>: Date.<span class="code-func">now</span>().<span class="code-func">toString</span>(),
    <span class="code-attr">localTipo</span>: req.body.localTipo,
    <span class="code-attr">localNumero</span>: req.body.localNumero,
    <span class="code-attr">paciente</span>: req.body.paciente,
    <span class="code-attr">hora</span>: <span class="code-keyword">new</span> Date().<span class="code-func">toLocaleTimeString</span>(<span class="code-str">"pt-BR"</span>)
  };
  db.tv_chamada = chamada;
  db.tv_historico.<span class="code-func">unshift</span>(chamada);
  <span class="code-keyword">if</span> (db.tv_historico.length &gt; <span class="code-str">5</span>) db.tv_historico.<span class="code-func">pop</span>();
  <span class="code-func">writeDB</span>(db);
  res.<span class="code-func">json</span>(chamada);
});
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Estrutura FIFO</h4>
                <p><code class="code-inline">unshift</code> insere no início do histórico e <code class="code-inline">pop</code> remove o 6º item mantendo no máximo 5 chamadas.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(9, "Efeito Pisca-Pisca DOM")}
        <div class="slide-content">
          <h2 class="slide-title">3. Animação de Chamada: <span class="accent">Reflow CSS</span></h2>
          <div class="card-box">
            <h3>⚡ Reiniciando a Animação no JS</h3>
            <p>Quando a TV detecta um novo chamado (<code class="code-inline">chamada.id !== ultimoId</code>), ela remove a classe <code class="code-inline">flash</code>, executa <code class="code-inline">void patientBox.offsetWidth</code> para forçar o navegador a recalcular o layout (reflow) e adiciona a classe <code class="code-inline">flash</code> novamente!</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(9, "Desafio da Aula 9")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 09 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Adicionando locução de voz em português na TV!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/tv.html</code>.</li>
              <li>Dentro da função <code style="color:#4ade80;">atualizar()</code>, no bloco de nova chamada, adicione:
                <br><code style="color:#f43f5e;">const msg = new SpeechSynthesisUtterance("Paciente " + chamada.paciente + ", comparecer ao " + chamada.localTipo + " " + chamada.localNumero);</code>
                <br><code style="color:#f43f5e;">window.speechSynthesis.speak(msg);</code>
              </li>
              <li>Chame um paciente no painel médico e ouça a TV narrar em voz alta! 🔊</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  },

  // AULA 10
  {
    id: 10,
    title: "Aula 10: Deploy do Hospital System na Nuvem (Render & GitHub)",
    filename: "Aula_10_Deploy_Render_e_GitHub.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 50px; margin-bottom: 10px;">☁️</div>
        <h1 class="cover-title">AULA 10: Deploy na Nuvem (Render & GitHub)</h1>
        <h2 class="cover-subtitle">Publicação da API Back-End e Front-End na Internet • Projeto Concluído</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Git/GitHub, Deploy no Render, vercel.json & Produção</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(10, "Passo a Passo do Deploy")}
        <div class="slide-content">
          <h2 class="slide-title">1. Publicação do Projeto em <span class="accent">Produção</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>📦 Passo 1: Repositório GitHub</h3>
              <p>• Criar repositório público ou privado no GitHub.</p>
              <p>• Fazer o push dos arquivos (<code class="code-inline">git add .</code>, <code class="code-inline">git commit</code>, <code class="code-inline">git push</code>).</p>
            </div>
            <div class="card-box">
              <h3>☁️ Passo 2: Web Service no Render</h3>
              <p>• Conectar a conta do GitHub ao Render.com.</p>
              <p>• Selecionar a opção <strong>Web Service</strong>.</p>
              <p>• Configurar o Build Command: <code class="code-inline">npm install</code>.</p>
              <p>• Configurar o Start Command: <code class="code-inline">node api/index.js</code> ou <code class="code-inline">node backend/server.js</code>.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(10, "Configuração do vercel.json")}
        <div class="slide-content">
          <h2 class="slide-title">2. Arquivo de Deploy: <span class="accent">vercel.json</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
{
  <span class="code-attr">"version"</span>: 2,
  <span class="code-attr">"builds"</span>: [
    {
      <span class="code-attr">"src"</span>: <span class="code-str">"api/index.js"</span>,
      <span class="code-attr">"use"</span>: <span class="code-str">"@vercel/node"</span>
    }
  ],
  <span class="code-attr">"routes"</span>: [
    {
      <span class="code-attr">"src"</span>: <span class="code-str">"/(.*)"</span>,
      <span class="code-attr">"dest"</span>: <span class="code-str">"api/index.js"</span>
    }
  ]
}
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 Roteamento Serverless</h4>
                <p>Redireciona todas as requisições recebidas para a função da API em ambiente de nuvem.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(10, "Projeto Finalizado")}
        <div class="slide-content">
          <h2 class="slide-title">3. Parabéns! Sistema <span class="accent">Online na Nuvem</span></h2>
          <div class="card-box">
            <h3>🎉 Conclusão do Curso de Back-End</h3>
            <p>O Hospital System está totalmente operacional com Recepção, Triagem Manchester, Painel Médico, Prontuário, Mídia Indoor e hospedado na nuvem na internet para acesso público!</p>
          </div>
        </div>
        ${renderFooter(4, 5)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(10, "Desafio da Aula 10")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 10 (50 MIN)</h3>
            <p style="margin-bottom:10px;">Testando a API publicada na nuvem!</p>
            <ol>
              <li>Acesse o Render.com e obtenha a URL pública gerada (ex: <code style="color:#7dd3fc;">https://hospital-system.onrender.com</code>).</li>
              <li>Abra o endpoint <code style="color:#4ade80;">/pacientes</code> da sua API publicada no celular!</li>
              <li>Comemore a conclusão do curso Full-Stack de Hospital System! 🚀</li>
            </ol>
          </div>
        </div>
        ${renderFooter(5, 5)}
      </div>
      `
    ]
  }
];

async function generatePDFs() {
  console.log("🚀 Gerando PDFs das 10 Aulas para Retroprojetor (16:9)...");

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let allSlidesHTML = "";

  for (const aula of aulasData) {
    console.log(`⏳ Gerando PDF: ${aula.filename}...`);
    const page = await browser.newPage();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>${aula.title}</title>
        <style>${commonCSS}</style>
      </head>
      <body>
        ${aula.slides.join('')}
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfPathTarget = path.join(targetDir, aula.filename);
    const pdfPathArt = path.join(artDir, aula.filename);

    await page.pdf({
      path: pdfPathTarget,
      width: '297mm',
      height: '167mm',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    fs.copyFileSync(pdfPathTarget, pdfPathArt);
    console.log(`✅ Salvo: ${pdfPathTarget}`);
    await page.close();

    allSlidesHTML += aula.slides.join('');
  }

  // GERAR PDF COMPILADO COM TODAS AS 10 AULAS
  console.log("⏳ Gerando PDF Compilado: Curso_Completo_Hospital_System_10_Aulas.pdf...");
  const pageAll = await browser.newPage();
  const compiledHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Curso Completo Hospital System - 10 Aulas</title>
      <style>${commonCSS}</style>
    </head>
    <body>
      ${allSlidesHTML}
    </body>
    </html>
  `;
  await pageAll.setContent(compiledHTML, { waitUntil: 'networkidle0' });

  const compiledFilename = "Curso_Completo_Hospital_System_10_Aulas.pdf";
  const compiledPathTarget = path.join(targetDir, compiledFilename);
  const compiledPathArt = path.join(artDir, compiledFilename);

  await pageAll.pdf({
    path: compiledPathTarget,
    width: '297mm',
    height: '167mm',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  fs.copyFileSync(compiledPathTarget, compiledPathArt);
  console.log(`✅ Salvo Compilado: ${compiledPathTarget}`);
  await pageAll.close();

  await browser.close();
  console.log("🎉 Todos os 10 PDFs e o compilado foram gerados com sucesso!");
}

generatePDFs().catch(err => {
  console.error("❌ Erro ao gerar PDFs:", err);
  process.exit(1);
});
