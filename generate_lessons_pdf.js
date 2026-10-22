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
        <span class="brand-text">HOSPITAL SYSTEM • CURSO DE DESENVOLVIMENTO WEB & BACK-END</span>
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
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .slide-title .accent { color: #38bdf8; }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
  }

  .grid-2-code {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 18px;
    align-items: stretch;
  }

  .card-box {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }

  .card-box h3 {
    font-size: 18px;
    color: #38bdf8;
    margin-bottom: 10px;
  }

  .card-box p, .card-box li {
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  .code-block {
    background: #020617;
    border: 1px solid #1e293b;
    border-left: 4px solid #38bdf8;
    border-radius: 8px;
    padding: 14px;
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    color: #e2e8f0;
    line-height: 1.5;
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
    padding: 14px;
    margin-bottom: 12px;
  }

  .highlight-card h4 {
    color: #38bdf8;
    font-size: 15px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
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
    max-height: 105mm;
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
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .cover-subtitle {
    font-size: 22px;
    color: #7dd3fc;
    margin-bottom: 30px;
  }

  .cover-meta {
    display: flex;
    gap: 20px;
    justify-content: center;
    background: rgba(15, 23, 42, 0.6);
    padding: 12px 24px;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.2);
  }

  .cover-meta item {
    font-size: 14px;
    color: #f1f5f9;
    font-weight: 600;
  }

  .desafio-box {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border: 2px solid #6366f1;
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }

  .desafio-box h3 {
    color: #a5b4fc;
    font-size: 24px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .desafio-box ol, .desafio-box ul {
    padding-left: 24px;
    color: #e0e7ff;
    font-size: 16px;
    line-height: 1.7;
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
    title: "Aula 01: Arquitetura Web & Estrutura HTML5 na Recepção",
    filename: "Aula_01_Arquitetura_e_HTML.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">🏥</div>
        <h1 class="cover-title">AULA 01: Arquitetura Web & Estrutura HTML5</h1>
        <h2 class="cover-subtitle">Sistema Hospitalar • Módulo Recepção & Entrada de Dados</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: HTML5, Formulários e Modelo Cliente-Servidor</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Arquitetura Web")}
        <div class="slide-content">
          <h2 class="slide-title">1. Modelo <span class="accent">Cliente-Servidor</span> na Web</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>💻 O Cliente (Navegador Front-End)</h3>
              <p>• O navegador (Chrome, Edge) carrega o HTML, CSS e JavaScript.</p>
              <p>• Responsável pela interface gráfica interativa do recepcionista.</p>
              <p>• Captura os dados do paciente digitados nos formulários.</p>
              <p>• Envia requisições HTTP para a API Back-End.</p>
            </div>
            <div class="card-box">
              <h3>⚙️ O Servidor (Node.js Back-End)</h3>
              <p>• Executa continuamente na porta 3000 (<code>http://localhost:3000</code>).</p>
              <p>• Processa os dados recebidos e valida a autenticação.</p>
              <p>• Armazena informações no banco de dados (<code>db.json</code>).</p>
              <p>• Retorna respostas formatadas em JSON.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Interface de Login e Atendimento")}
        <div class="slide-content">
          <h2 class="slide-title">2. Telas da Recepção no <span class="accent">Hospital System</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgLogin}" alt="Tela de Login">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Tela de Login (index.html)</div>
            </div>
            <div class="img-container">
              <img src="${imgAtendimento}" alt="Tela de Atendimento">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Tela de Atendimento (atendimento.html)</div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Análise do Código HTML")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código HTML5: <span class="accent">atendimento.html</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-comment">&lt;!-- Estrutura do Formulário de Atendimento --&gt;</span>
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
                <p>Funciona como a identidade única do elemento. O JavaScript usa <code>id="nome"</code> para ler exatamente o que foi digitado.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 O Elemento &lt;select&gt;</h4>
                <p>Cria um menu suspenso de opções. Evita erros de digitação restringindo o tipo de atendimento a "Convenio" ou "Particular".</p>
              </div>
              <div class="highlight-card">
                <h4>📌 O Evento "onclick"</h4>
                <p>Dispara a função JavaScript <code>cadastrar()</code> no momento em que o recepcionista clica no botão.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Importância da Estrutura HTML")}
        <div class="slide-content">
          <h2 class="slide-title">4. Importância do <span class="accent">HTML Semântico</span></h2>
          <div class="card-box" style="margin-bottom:14px;">
            <h3>🔑 Por que a estrutura precisa ser exata?</h3>
            <p>1. <strong>Coleta Correta de Dados:</strong> Se faltar o <code>id</code> em um input, o JavaScript não conseguirá capturar o nome ou CPF do paciente.</p>
            <p>2. <strong>Acessibilidade e Usabilidade:</strong> O atributo <code>placeholder</code> orienta o recepcionista sobre qual dado inserir (ex: "Nome", "CPF").</p>
            <p>3. <strong>Integração com o Back-End:</strong> O HTML é o ponto inicial da jornada dos dados no hospital. Dados incorretos no HTML poluem o banco de dados.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(1, "Desafio da Aula 1")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 01 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Agora é a sua vez de evoluir o formulário da Recepção do Hospital!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/atendimento.html</code>.</li>
              <li>Adicione um novo campo de entrada para capturar o celular do paciente: <br><code style="color:#f43f5e;">&lt;input id="telefone" placeholder="Telefone do Paciente"&gt;</code></li>
              <li>Adicione um campo de seleção de prioridade legal:
                <br><code style="color:#4ade80;">&lt;select id="prioridade"&gt;&lt;option&gt;Normal&lt;/option&gt;&lt;option&gt;Idoso (60+)&lt;/option&gt;&lt;option&gt;PCD&lt;/option&gt;&lt;/select&gt;</code>
              </li>
              <li>Teste a exibição da página no seu navegador e certifique-se de que os campos aparecem alinhados!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  },

  // AULA 2
  {
    id: 2,
    title: "Aula 02: Estilização Profissional com CSS3 & Sistema de Manchester",
    filename: "Aula_02_Estilizacao_com_CSS3.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">🎨</div>
        <h1 class="cover-title">AULA 02: Estilização Profissional com CSS3</h1>
        <h2 class="cover-subtitle">Design de Formulários & Protocolo de Manchester (Cores de Urgência)</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: CSS3, Box Model, Flexbox e Badges de Risco</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Fundamentos do CSS")}
        <div class="slide-content">
          <h2 class="slide-title">1. O Papel do <span class="accent">CSS3</span> no Hospital System</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>📐 Estilização da Interface (.container)</h3>
              <p>• O CSS define a apresentação visual de todos os módulos.</p>
              <p>• Centraliza os formulários com margens automáticas (<code>margin: 20px auto</code>).</p>
              <p>• Aplica sombras suaves (<code>box-shadow</code>) e cantos arredondados (<code>border-radius: 12px</code>).</p>
            </div>
            <div class="card-box">
              <h3>🚨 Comunicação Visual de Emergência</h3>
              <p>• O sistema de triagem exige identificação imediata de risco.</p>
              <p>• As cores são configuradas via classes CSS:</p>
              <p><span style="background:#2ecc71; color:white; padding:2px 8px; border-radius:4px;">.verde</span> Risco Baixo (Pouco Urgente)</p>
              <p><span style="background:#f1c40f; color:black; padding:2px 8px; border-radius:4px;">.amarelo</span> Risco Médio (Urgente)</p>
              <p><span style="background:#e74c3c; color:white; padding:2px 8px; border-radius:4px;">.vermelho</span> Emergência Gravíssima</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Visual do Sistema")}
        <div class="slide-content">
          <h2 class="slide-title">2. APLICAÇÃO PRÁTICA DO CSS: <span class="accent">style.css</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgTriagem}" alt="Tela de Triagem Estilizada">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Painel de Triagem com Badges de Manchester</div>
            </div>
            <div class="card-box">
              <h3>💡 Por que a Estilização Importa?</h3>
              <p>Um sistema hospitalar não pode ser poluído nem confuso.</p>
              <p>• <strong>Legibilidade:</strong> Inputs largos de 100% facilitam a digitação rápida em momentos de estresse.</p>
              <p>• <strong>Hierarquia Visual:</strong> Botões com cores destacadas (<code>#3498db</code>) chamam a atenção para as ações principais.</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Detalhamento de Código CSS")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código CSS: <span class="accent">frontend/css/style.css</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-comment">/* Container Principal */</span>
.<span class="code-func">container</span> {
  <span class="code-attr">width</span>: <span class="code-str">90%</span>;
  <span class="code-attr">max-width</span>: <span class="code-str">900px</span>;
  <span class="code-attr">margin</span>: <span class="code-str">20px auto</span>;
  <span class="code-attr">background</span>: <span class="code-str">white</span>;
  <span class="code-attr">border-radius</span>: <span class="code-str">12px</span>;
}

<span class="code-comment">/* Classes do Protocolo de Manchester */</span>
.<span class="code-func">verde</span> { <span class="code-attr">background</span>: <span class="code-str">#2ecc71</span>; <span class="code-attr">color</span>: <span class="code-str">white</span>; }
.<span class="code-func">amarelo</span> { <span class="code-attr">background</span>: <span class="code-str">#f1c40f</span>; }
.<span class="code-func">vermelho</span> { <span class="code-attr">background</span>: <span class="code-str">#e74c3c</span>; <span class="code-attr">color</span>: <span class="code-str">white</span>; }
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 "margin: 20px auto"</h4>
                <p>Centraliza horizontalmente o formulário na tela do computador da recepção ou médico.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Badges de Risco</h4>
                <p>As classes <code>.verde</code>, <code>.amarelo</code> e <code>.vermelho</code> são injetadas dinamicamente no HTML pelo JavaScript após a classificação do paciente.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Pseudo-classe ":hover"</h4>
                <p>Muda a cor do botão ao passar o mouse, confirmando ao usuário que o elemento é clicável.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Design System no Hospital")}
        <div class="slide-content">
          <h2 class="slide-title">4. Importância do <span class="accent">Design System</span> Hospitalar</h2>
          <div class="card-box">
            <h3>🛡️ Evitando Erros Críticos de Saúde com CSS</h3>
            <p>• O CSS é um aliado da segurança do paciente!</p>
            <p>• Cores padronizadas garantem que qualquer médico, em qualquer plantão, identifique instantaneamente que o paciente marcado em <strong>VERMELHO</strong> precisa de atendimento imediato sem precisar ler textos longos.</p>
            <p>• O espaçamento entre elementos previne cliques acidentais em botões errados.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(2, "Desafio da Aula 2")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 02 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Sua missão é estender as regras visuais do arquivo <code style="color:#7dd3fc;">frontend/css/style.css</code>!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">style.css</code>.</li>
              <li>Crie uma nova classe para risco muito urgente (Laranja):
                <br><code style="color:#f43f5e;">.laranja { background: #e67e22; color: white; padding: 5px 10px; border-radius: 6px; }</code>
              </li>
              <li>Adicione um efeito de transição suave nos botões:
                <br><code style="color:#4ade80;">button { transition: background 0.3s ease; }</code>
              </li>
              <li>Abra a página de Triagem e teste aplicar a classe <code style="color:#fbbf24;">laranja</code> manualmente em uma div para ver o resultado!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  },

  // AULA 3
  {
    id: 3,
    title: "Aula 03: JavaScript Front-End: Eventos, DOM e Fetch API",
    filename: "Aula_03_JavaScript_FrontEnd_e_Fetch.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">⚡</div>
        <h1 class="cover-title">AULA 03: JavaScript no Front-End</h1>
        <h2 class="cover-subtitle">Manipulação do DOM, Captura de Inputs e Requisições HTTP com Fetch API</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: JS ES6+, Manipulação do DOM, JSON & fetch()</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Lógica Front-End")}
        <div class="slide-content">
          <h2 class="slide-title">1. Como o JavaScript <span class="accent">Dá Vida</span> às Páginas</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🎯 Manipulação do DOM</h3>
              <p>• O JavaScript lê os dados digitados pelo usuário acessando o valor das propriedades (<code>nome.value</code>, <code>cpf.value</code>).</p>
              <p>• Modifica a tela em tempo real sem recarregar a página.</p>
            </div>
            <div class="card-box">
              <h3>🌐 Comunicação via Fetch API</h3>
              <p>• A função <code>fetch()</code> envia requisições HTTP assíncronas ao servidor.</p>
              <p>• Converte objetos JavaScript em JSON (<code>JSON.stringify</code>).</p>
              <p>• Recebe respostas da API e redireciona o usuário (<code>location.href</code>).</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Exemplo Prático de Login")}
        <div class="slide-content">
          <h2 class="slide-title">2. Fluxo de Autenticação no <span class="accent">index.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgLogin}" alt="Login Screen">
            </div>
            <div class="card-box">
              <h3>🔄 O que acontece ao clicar em "Entrar"?</h3>
              <p>1. O botão chama <code>onclick="login()"</code>;</p>
              <p>2. A função envia <code>usuario.value</code> e <code>senha.value</code> para <code>http://localhost:3000/login</code>;</p>
              <p>3. O servidor responde com o tipo do usuário ("triagem", "medico" ou "atendimento");</p>
              <p>4. O navegador redireciona para a página correspondente!</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Detalhamento da Função cadastrar()")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código JavaScript: <span class="accent">atendimento.html</span></h2>
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
                <p>Informa ao servidor back-end que este comando serve para CRIAR um novo registro de paciente.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 JSON.stringify(...)</h4>
                <p>Empacota os dados do paciente em um formato de texto leve (JSON) que trafega pela rede até a API.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 headers: Content-Type</h4>
                <p>Avisa o servidor que a carga útil da mensagem está em formato JSON.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Importância do Fetch API")}
        <div class="slide-content">
          <h2 class="slide-title">4. Importância do <span class="accent">Fetch Assíncrono</span></h2>
          <div class="card-box">
            <h3>🚀 Por que usar Requisições Assíncronas?</h3>
            <p>• O navegador não "congela" enquanto aguarda a resposta do servidor.</p>
            <p>• Permite atualizar listas de espera no hospital sem piscar a tela inteira.</p>
            <p>• Torna a experiência do médico e recepcionista rápida e fluida.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(3, "Desafio da Aula 3")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 03 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Vamos implementar uma validação de segurança de dados no Front-End!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/atendimento.html</code>.</li>
              <li>Altere a função <code style="color:#4ade80;">cadastrar()</code> para checar se o CPF tem 11 caracteres antes de fazer o fetch:
                <br><code style="color:#f43f5e;">if (cpf.value.length !== 11) { alert("Erro: O CPF deve possuir exatamente 11 dígitos!"); return; }</code>
              </li>
              <li>Teste tentar cadastrar um paciente com CPF "123" e confirme se o sistema bloqueia o envio!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  },

  // AULA 4
  {
    id: 4,
    title: "Aula 04: O Coração do Sistema: Back-End com Node.js & Express",
    filename: "Aula_04_Backend_NodeJS_e_Express.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">🚀</div>
        <h1 class="cover-title">AULA 04: O Coração do Sistema - Back-End</h1>
        <h2 class="cover-subtitle">Servidor Web com Node.js, Express, Rotas REST e Persistência JSON</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Node.js, Express, Middlewares & Arquivos JSON</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Arquitetura Back-End")}
        <div class="slide-content">
          <h2 class="slide-title">1. O que é o <span class="accent">Back-End</span> em Node.js?</h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🟢 O Runtime Node.js</h3>
              <p>• Permite executar código JavaScript diretamente no servidor.</p>
              <p>• Ouve requisições HTTP na porta 3000 (<code>http://localhost:3000</code>).</p>
              <p>• Gerencia o acesso ao sistema de arquivos do computador (<code>fs</code>).</p>
            </div>
            <div class="card-box">
              <h3>⚡ O Framework Express</h3>
              <p>• Simplifica a criação de rotas (<code>app.post</code>, <code>app.get</code>).</p>
              <p>• Middlewares como <code>express.json()</code> processam dados recebidos.</p>
              <p>• Habilita o <code>cors()</code> para permitir conexões de qualquer navegador.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Banco de Dados em JSON")}
        <div class="slide-content">
          <h2 class="slide-title">2. Banco de Dados Persistente: <span class="accent">db.json</span></h2>
          <div class="grid-2">
            <div class="code-block">
<span class="code-comment">// Estrutura do arquivo backend/db.json</span>
{
  <span class="code-attr">"usuarios"</span>: [
    { <span class="code-attr">"usuario"</span>: <span class="code-str">"admin"</span>, <span class="code-attr">"senha"</span>: <span class="code-str">"123"</span>, <span class="code-attr">"tipo"</span>: <span class="code-str">"triagem"</span> }
  ],
  <span class="code-attr">"pacientes"</span>: [
    {
      <span class="code-attr">"id"</span>: 177128129,
      <span class="code-attr">"nome"</span>: <span class="code-str">"Carlos Silva"</span>,
      <span class="code-attr">"cpf"</span>: <span class="code-str">"11122233344"</span>,
      <span class="code-attr">"status"</span>: <span class="code-str">"triagem"</span>
    }
  ],
  <span class="code-attr">"triagens"</span>: [],
  <span class="code-attr">"consultas"</span>: []
}
            </div>
            <div class="card-box">
              <h3>💾 Persistência com Módulo <code>fs</code></h3>
              <p>• <strong>readDB():</strong> Lê o arquivo de texto <code>db.json</code> e o converte em um objeto JS com <code>JSON.parse()</code>.</p>
              <p>• <strong>writeDB():</strong> Grava qualquer alteração de volta no disco com <code>fs.writeFileSync()</code>.</p>
              <p>• Isso garante que os dados do hospital não sejam perdidos ao reiniciar o computador!</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Detalhamento do Servidor Express")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código Back-End: <span class="accent">backend/server.js</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-comment">// Rota de Cadastro de Pacientes na Recepção</span>
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
                <h4>📌 req.body</h4>
                <p>Contém o objeto de dados enviado pelo front-end através do <code>fetch()</code>. O Express disponibiliza isso graças ao <code>express.json()</code>.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Date.now()</h4>
                <p>Gera um identificador único numérico baseado nos milissegundos atuais para evitar IDs duplicados.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 res.json(paciente)</h4>
                <p>Responde ao navegador do cliente com os dados do paciente recém-salvo e o código HTTP 200 (OK).</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Importância Central do Back-End")}
        <div class="slide-content">
          <h2 class="slide-title">4. Por que o Back-End é a Parte <span class="accent">Mais Importante</span>?</h2>
          <div class="card-box">
            <h3>🧠 O Cérebro Centralizador do Hospital</h3>
            <p>1. <strong>Regra de Negócio Única:</strong> Se a triagem dependesse do navegador do cliente, qualquer um poderia alterar a cor do paciente burlando a fila. O Back-End centraliza e protege a lógica.</p>
            <p>2. <strong>Sincronização entre Setores:</strong> O Back-End permite que a Recepção cadastre o paciente, a Triagem o classifique, o Médico atenda e a TV do saguão o chame, tudo integrado sobre a mesma base de dados.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(4, "Desafio da Aula 4")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 04 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Vamos criar uma nova rota de API no Back-End em Express!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/server.js</code>.</li>
              <li>Crie uma nova rota HTTP GET para retornar estatísticas do hospital:
                <br><code style="color:#4ade80;">app.get("/estatisticas", (req, res) => { const db = readDB(); res.json({ totalPacientes: db.pacientes.length }); });</code>
              </li>
              <li>Abra o navegador no endereço <code style="color:#fbbf24;">http://localhost:3000/estatisticas</code> e veja a contagem de pacientes em tempo real!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  },

  // AULA 5
  {
    id: 5,
    title: "Aula 05: Regras de Negócio e Rotas Avançadas: Triagem & Médicos",
    filename: "Aula_05_Regras_de_Negocio_Triagem_e_Medicos.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">🩺</div>
        <h1 class="cover-title">AULA 05: Regras de Negócio & Rotas Avançadas</h1>
        <h2 class="cover-subtitle">Classificação Automática de Risco, Prontuário e Prescrição Médica</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Algoritmos de Decisão, Protocolo Manchester & Rotas Médicas</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Triagem e Atendimento Médico")}
        <div class="slide-content">
          <h2 class="slide-title">1. O Algoritmo de <span class="accent">Classificação de Risco</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>🌡️ Parâmetros Avaliados na Triagem</h3>
              <p>• Temperatura Corporal (ex: >= 39°C é emergência vermelha).</p>
              <p>• Lista de Sintomas Graves: Infarto, AVC, Convulsão, Hemorragia, Falta de Ar Grave.</p>
              <p>• Histórico de Alergias do Paciente.</p>
            </div>
            <div class="card-box">
              <h3>💊 Módulo Médico e Medicações</h3>
              <p>• O médico visualiza os pacientes com suas respectivas cores de risco.</p>
              <p>• O sistema emite alertas em pop-up se o paciente tiver alergias.</p>
              <p>• O médico registra diagnóstico e seleciona medicações de uma lista padronizada do hospital.</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Telas de Triagem e Médico")}
        <div class="slide-content">
          <h2 class="slide-title">2. Telas em Ação: <span class="accent">Triagem, Médico & Medicações</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgMedico}" alt="Painel Medico">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Painel Médico (medico.html)</div>
            </div>
            <div class="img-container">
              <img src="${imgMedicacoes}" alt="Medicações Prescritas">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Prescrições Médicas (medicacoes.html)</div>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Código da Classificação de Risco")}
        <div class="slide-content">
          <h2 class="slide-title">3. Algoritmo de Triagem: <span class="accent">triagem.html</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-keyword">function</span> <span class="code-func">classificarRisco</span>(sintoma, temperatura) {
  <span class="code-keyword">const</span> vermelhos = [<span class="code-str">"infarto"</span>,<span class="code-str">"avc"</span>,<span class="code-str">"convulsao"</span>,<span class="code-str">"hemorragia"</span>];
  <span class="code-keyword">const</span> amarelos = [<span class="code-str">"febre"</span>,<span class="code-str">"vomito"</span>,<span class="code-str">"diarreia"</span>];

  <span class="code-keyword">if</span> (temperatura &gt;= <span class="code-str">39</span>) <span class="code-keyword">return</span> <span class="code-str">"vermelho"</span>;
  <span class="code-keyword">if</span> (vermelhos.<span class="code-func">includes</span>(sintoma)) <span class="code-keyword">return</span> <span class="code-str">"vermelho"</span>;
  <span class="code-keyword">if</span> (amarelos.<span class="code-func">includes</span>(sintoma)) <span class="code-keyword">return</span> <span class="code-str">"amarelo"</span>;

  <span class="code-keyword">return</span> <span class="code-str">"verde"</span>;
}
            </div>
            <div>
              <div class="highlight-card">
                <h4>📌 vermelhos.includes(...)</h4>
                <p>Verifica se o sintoma digitado pertence à lista de emergências gravíssimas.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Avaliação de Temperatura</h4>
                <p>Febre alta igual ou superior a 39°C força classificação imediata como Vermelho, garantindo atendimento urgente.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Rota /consulta (server.js)</h4>
                <p>Grava a consulta médica no banco de dados vinculando o diagnóstico e os medicamentos prescrevidos ao paciente.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Segurança Médica")}
        <div class="slide-content">
          <h2 class="slide-title">4. Importância das <span class="accent">Regras Médicas</span> no Código</h2>
          <div class="card-box">
            <h3>🛡️ Como a Programação Salva Vidas no Hospital</h3>
            <p>• <strong>Prevenção de Alergias:</strong> O painel médico checa o campo <code>alergia</code> antes de permitir a seleção de medicação, alertando o médico na tela.</p>
            <p>• <strong>Padronização de Medicamentos:</strong> A rota <code>/lista-medicacoes</code> fornece um catálogo restrito (Dipirona, Paracetamol, Amoxicilina), evitando erros de dosagem por digitação manual.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(5, "Desafio da Aula 5")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 05 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Vamos aprimorar o registro de triagem do paciente no Back-End!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">backend/server.js</code>.</li>
              <li>Localize a rota <code style="color:#4ade80;">app.post("/triagem", ...)</code>.</li>
              <li>Adicione a propriedade <code style="color:#f43f5e;">horaFormatada: new Date().toLocaleTimeString("pt-BR")</code> dentro do objeto triagem antes de salvar no banco.</li>
              <li>No painel médico (<code style="color:#7dd3fc;">medico.html</code>), exiba essa hora formatada no cartão do paciente!</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  },

  // AULA 6
  {
    id: 6,
    title: "Aula 06: Mídia Indoor em Tempo Real & Sistema de TV Hospitalar",
    filename: "Aula_06_Midia_Indoor_TV_em_Tempo_Real.pdf",
    slides: [
      `
      <div class="slide cover-slide">
        <div style="font-size: 60px; margin-bottom: 10px;">📺</div>
        <h1 class="cover-title">AULA 06: Mídia Indoor em Tempo Real & Painel TV</h1>
        <h2 class="cover-subtitle">Sistema de Chamada de Pacientes, Polling HTTP e Animações DOM</h2>
        <div class="cover-meta">
          <span>⏱️ Duração: 50 Minutos</span>
          <span>🎯 Foco: Polling (setInterval), Filas FIFO & Animações Reflow</span>
        </div>
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Mídia Indoor")}
        <div class="slide-content">
          <h2 class="slide-title">1. Como Funciona a <span class="accent">TV da Sala de Espera</span></h2>
          <div class="grid-2">
            <div class="card-box">
              <h3>📡 O Conceito de Polling HTTP</h3>
              <p>• A TV no saguão do hospital fica ligada consultando o servidor a cada 2 segundos (<code>setInterval(atualizar, 2000)</code>).</p>
              <p>• Quando a triagem ou o médico clica em "Chamar na TV", o servidor registra a nova chamada.</p>
            </div>
            <div class="card-box">
              <h3>🔔 Atualização e Efeito Flash</h3>
              <p>• Ao identificar um novo chamado (<code>chamada.id !== ultimoId</code>), a TV pisca a tela usando animação CSS <code>@keyframes flash</code>.</p>
              <p>• O histórico armazena as últimas 5 chamadas usando estrutura de fila circular FIFO (<code>unshift</code> e <code>pop</code>).</p>
            </div>
          </div>
        </div>
        ${renderFooter(2, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Interface da TV")}
        <div class="slide-content">
          <h2 class="slide-title">2. A Tela da TV: <span class="accent">tv.html</span></h2>
          <div class="grid-2">
            <div class="img-container">
              <img src="${imgTv}" alt="Mídia Indoor TV">
              <div style="padding:6px; font-size:12px; color:#94a3b8; background:#1e293b;">Tela da TV em Alta Resolução (tv.html)</div>
            </div>
            <div class="card-box">
              <h3>📺 Recursos da Interface</h3>
              <p>• <strong>Indicador de Local:</strong> Exibe se a chamada é para GUICHÊ ou CONSULTÓRIO 01.</p>
              <p>• <strong>Destaque para o Nome:</strong> Fonte gigante em destaque para leitura fácil a metros de distância.</p>
              <p>• <strong>Histórico Lateral:</strong> Mantém visíveis os últimos pacientes chamados.</p>
            </div>
          </div>
        </div>
        ${renderFooter(3, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Código da Chamada na TV")}
        <div class="slide-content">
          <h2 class="slide-title">3. Código Back-End e Polling: <span class="accent">tv.html & server.js</span></h2>
          <div class="grid-2-code">
            <div class="code-block">
<span class="code-comment">// Rota /tv/chamar no backend/server.js</span>
app.<span class="code-func">post</span>(<span class="code-str">"/tv/chamar"</span>, (req, res) =&gt; {
  <span class="code-keyword">const</span> db = <span class="code-func">readDB</span>();
  <span class="code-keyword">const</span> chamada = {
    <span class="code-attr">id</span>: Date.<span class="code-func">now</span>().<span class="code-func">toString</span>(),
    <span class="code-attr">localTipo</span>: req.body.localTipo,
    <span class="code-attr">localNumero</span>: req.body.localNumero,
    <span class="code-attr">paciente</span>: req.body.paciente
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
                <h4>📌 unshift() e pop()</h4>
                <p><code>unshift</code> coloca a nova chamada no topo da lista, e <code>pop</code> remove a 6ª chamada para manter apenas as 5 mais recentes.</p>
              </div>
              <div class="highlight-card">
                <h4>📌 Truque de Reflow em JS</h4>
                <p><code>void patientBox.offsetWidth;</code> força o navegador a recalcular o layout para reiniciar a animação pisca-pisca mesmo quando chama o mesmo nome.</p>
              </div>
            </div>
          </div>
        </div>
        ${renderFooter(4, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Importância do Sistema de TV")}
        <div class="slide-content">
          <h2 class="slide-title">4. Importância da <span class="accent">Comunicação em Tempo Real</span></h2>
          <div class="card-box">
            <h3>📢 Organização e Redução de Aglomerações</h3>
            <p>• Em um hospital de grande porte, chamar pacientes em voz alta gera ruído e confusão.</p>
            <p>• O painel digital garante chamada clara e auditável em qualquer lugar da recepção.</p>
            <p>• A integração direta com a Triagem e o Consultório faz o atendimento fluir sem atrasos.</p>
          </div>
        </div>
        ${renderFooter(5, 6)}
      </div>
      `,
      `
      <div class="slide">
        ${renderHeader(6, "Desafio da Aula 6")}
        <div class="slide-content">
          <div class="desafio-box">
            <h3>🎯 DESAFIO PRÁTICO DA AULA 06 (50 MIN)</h3>
            <p style="margin-bottom:12px;">Vamos adicionar síntese de voz (Sintetizador por Voz em Português) na TV!</p>
            <ol>
              <li>Abra o arquivo <code style="color:#7dd3fc;">frontend/tv.html</code>.</li>
              <li>Na função <code style="color:#4ade80;">atualizar()</code>, dentro do bloco onde detecta nova chamada (<code style="color:#f43f5e;">chamada.id !== ultimoId</code>), adicione:
                <br><code style="color:#fbbf24;">const mensagem = new SpeechSynthesisUtterance("Atenção paciente " + chamada.paciente + ", comparecer ao " + chamada.localTipo + " " + chamada.localNumero);</code>
                <br><code style="color:#fbbf24;">window.speechSynthesis.speak(mensagem);</code>
              </li>
              <li>Abra a TV, chame um paciente no painel médico e ouça o navegador narrando a chamada em voz alta! 🔊</li>
            </ol>
          </div>
        </div>
        ${renderFooter(6, 6)}
      </div>
      `
    ]
  }
];

async function generatePDFs() {
  console.log("🚀 Iniciando geração dos PDFs de Aulas em Formato Retroprojetor 16:9...");

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

    // Copiar para diretório de artefatos também
    fs.copyFileSync(pdfPathTarget, pdfPathArt);

    console.log(`✅ Salvo: ${pdfPathTarget}`);
    await page.close();

    allSlidesHTML += aula.slides.join('');
  }

  // GERAR PDF COMPILADO COM TODAS AS 6 AULAS
  console.log("⏳ Gerando PDF Compilado: Curso_Completo_Hospital_System_6_Aulas.pdf...");
  const pageAll = await browser.newPage();
  const compiledHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Curso Completo Hospital System - 6 Aulas</title>
      <style>${commonCSS}</style>
    </head>
    <body>
      ${allSlidesHTML}
    </body>
    </html>
  `;
  await pageAll.setContent(compiledHTML, { waitUntil: 'networkidle0' });

  const compiledFilename = "Curso_Completo_Hospital_System_6_Aulas.pdf";
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
  console.log("🎉 Todos os 6 PDFs e o compilado foram gerados com sucesso!");
}

generatePDFs().catch(err => {
  console.error("❌ Erro ao gerar PDFs:", err);
  process.exit(1);
});
