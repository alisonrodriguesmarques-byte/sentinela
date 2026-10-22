const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\31b5b653-c9f8-44c3-9ff0-bd917c0056ac";
const targetDir = "c:\\Users\\FASTNOTE BRASÍLIA\\Desktop\\hospital\\hospital-system";

const sigaCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  @page {
    size: A4;
    margin: 12mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
  }

  body {
    background: #f4f6f9;
    color: #333;
    font-size: 12px;
  }

  .siga-page {
    page-break-after: always;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0;
    margin-bottom: 20px;
  }

  .siga-header-top {
    background: #1b6ca8;
    color: white;
    text-align: center;
    padding: 10px;
  }

  .siga-header-top h1 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .siga-header-top p {
    font-size: 12px;
    font-weight: 500;
  }

  .siga-body {
    padding: 16px;
  }

  .siga-course-title {
    text-align: center;
    color: #005691;
    font-size: 13.5px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .siga-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
  }

  .siga-btn {
    background: #005691;
    color: white;
    padding: 6px 16px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
  }

  .siga-tabs {
    display: flex;
    border-bottom: 2px solid #005691;
    margin-bottom: 15px;
  }

  .siga-tab {
    padding: 8px 16px;
    font-size: 12px;
    font-weight: bold;
    color: #555;
    background: #e9ecef;
    border: 1px solid #ccc;
    border-bottom: none;
    margin-right: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .siga-tab.active {
    background: #6c757d;
    color: white;
    border-color: #6c757d;
  }

  .siga-form {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 14px;
    background: #ffffff;
  }

  .siga-field {
    margin-bottom: 14px;
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 10px;
    align-items: start;
  }

  .siga-label {
    font-weight: 700;
    color: #212529;
    font-size: 12px;
    padding-top: 6px;
  }

  .siga-textarea {
    width: 100%;
    min-height: 75px;
    padding: 8px 10px;
    border: 1px solid #4a90e2;
    border-radius: 4px;
    font-size: 12px;
    color: #212529;
    background: #ffffff;
    line-height: 1.45;
  }

  .siga-footer-note {
    color: #dc3545;
    font-size: 11px;
    margin-top: 10px;
  }
`;

const sigaPlanosData = [
  // AULA 1
  {
    num: 1,
    title: "Aula 01 - Arquitetura de APIs REST & Introdução ao Hospital System",
    objetivo: "Apresentar a arquitetura de APIs REST, a relação Cliente-Servidor e a visão geral do projeto Hospital System. Demonstrar o funcionamento do runtime Node.js e o protocolo HTTP.",
    metodologia: "Aula expositiva e demonstrativa com uso do laboratório de informática. Apresentação do fluxo de requisições HTTP entre o navegador e o servidor Node.js.",
    recursos: "Uso do laboratório de informática, computadores com Node.js, VS Code e navegadores instalados, retroprojetor.",
    bibliografia: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview\nhttps://nodejs.org/docs/latest/api/\nhttps://expressjs.com/pt-br/",
    avaliacao: "Contínua e avaliativa através do acompanhamento da execução dos primeiros comandos Node.js no terminal."
  },
  // AULA 2
  {
    num: 2,
    title: "Aula 02 - Estrutura HTML5 & Formulários de Atendimento",
    objetivo: "Demonstrar a construção de formulários HTML5 semânticos para a Recepção do hospital, explorando inputs, selects, botões e mapeamento de IDs para o JavaScript.",
    metodologia: "Aula prática no VS Code desenvolvendo a estrutura dos arquivos index.html e atendimento.html do Hospital System.",
    recursos: "Laboratório de informática, VS Code, navegadores web, projeto Hospital System.",
    bibliografia: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/form\nhttps://w3schools.com/html/",
    avaliacao: "Contínua e avaliativa mediante o desenvolvimento do formulário de cadastro de pacientes com novos campos."
  },
  // AULA 3
  {
    num: 3,
    title: "Aula 03 - Estilização CSS3 & Protocolo de Urgência Manchester",
    objetivo: "Aplicar estilização avançada em CSS3 nos formulários e cartões do hospital, implementando as classes visuais do Protocolo de Manchester (Verde, Amarelo, Vermelho).",
    metodologia: "Aula prática guiada alterando o arquivo style.css para criar containers centralizados, sombras, bordas arredondadas e badges de risco.",
    recursos: "Laboratório de informática, VS Code, arquivo style.css do projeto.",
    bibliografia: "https://developer.mozilla.org/pt-BR/docs/Web/CSS\nhttps://css-tricks.com/",
    avaliacao: "Contínua e avaliativa pela criação da nova classe de risco intermediário (.laranja) no arquivo CSS."
  },
  // AULA 4
  {
    num: 4,
    title: "Aula 04 - Front-End Dinâmico: DOM, Eventos e Fetch API",
    objetivo: "Ensinar a manipulação do DOM e o envio de dados via requisições assíncronas HTTP usando a Fetch API (fetch POST/GET) com objetos serializados em JSON.",
    metodologia: "Demonstração prática da comunicação entre o botão do HTML e a rota do servidor usando a função cadastrar() e JSON.stringify().",
    recursos: "Laboratório de informática, computadores com acesso à internet e VS Code.",
    bibliografia: "https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API\nhttps://javascript.info/fetch",
    avaliacao: "Contínua e avaliativa com a implementação de validação de CPF no front-end em JavaScript."
  },
  // AULA 5
  {
    num: 5,
    title: "Aula 05 - O Coração do Back-End: Servidor Node.js & Express",
    objetivo: "Construir o servidor HTTP principal em Node.js usando o framework Express, configurando a porta 3000, Middlewares (express.json, cors, static) e rotas REST.",
    metodologia: "Desenvolvimento ao vivo no arquivo backend/server.js explicando req.body, res.json e middlewares compartilhados.",
    recursos: "Laboratório de informática, Node.js, Express, Postman/Navegador.",
    bibliografia: "https://expressjs.com/pt-br/starter/hello-world.html\nhttps://github.com/expressjs/express",
    avaliacao: "Contínua e avaliativa através da criação bem-sucedida de uma nova rota GET /estatisticas no Express."
  },
  // AULA 6
  {
    num: 6,
    title: "Aula 06 - Persistência de Dados em Arquivos JSON & SQL",
    objetivo: "Ensinar o armazenamento permanente de dados utilizando o módulo nativo fs do Node.js para leitura e escrita no arquivo db.json, além de comparar com tabelas SQL.",
    metodologia: "Construção das funções readDB() e writeDB() com fs.readFileSync e fs.writeFileSync e análise do esquema do banco de dados.",
    recursos: "Laboratório de informática, VS Code, arquivo backend/db.json.",
    bibliografia: "https://nodejs.org/api/fs.html\nhttps://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON",
    avaliacao: "Contínua e avaliativa mediante o acompanhamento da gravação dos cadastros no arquivo db.json."
  },
  // AULA 7
  {
    num: 7,
    title: "Aula 07 - Regras de Negócio e Rota de Triagem Hospitalar",
    objetivo: "Implementar o algoritmo de triagem de enfermagem para classificação automática de risco baseada em temperatura e sintomas, além das rotas /triagem e /triagens.",
    metodologia: "Construção da lógica de decisão no servidor e atualização periódica com setInterval na página triagem.html.",
    recursos: "Laboratório de informática, VS Code e servidor Hospital System ativo.",
    bibliografia: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
    avaliacao: "Contínua e avaliativa com a gravação e exibição da hora formatada do registro da triagem."
  },
  // AULA 8
  {
    num: 8,
    title: "Aula 08 - Módulo Médico, Prontuários & Lista de Medicações",
    objetivo: "Desenvolver o módulo médico para atendimento do prontuário eletrônico, verificação de alertas de alergias e prescrição de remédios pré-aprovados (/consulta e /lista-medicacoes).",
    metodologia: "Aula prática integrando a seleção de pacientes no painel médico com a dispensa de medicamentos na tela medicacoes.html.",
    recursos: "Laboratório de informática, navegadores web e servidor Express.",
    bibliografia: "https://expressjs.com/pt-br/guide/routing.html",
    avaliacao: "Contínua e avaliativa com a inclusão de novos medicamentos no catálogo do hospital."
  },
  // AULA 9
  {
    num: 9,
    title: "Aula 09 - Junção dos Projetos & Mídia Indoor em Tempo Real",
    objetivo: "Aula de retomada do projeto sentinela realizando a junção do projeto anterior de mídia indoor. Criar o painel da TV onde os pacientes serão chamados pela triagem e médico em tempo real.",
    metodologia: "Aula elaborada para demonstrar a junção de um projeto já finalizado com outro em andamento, as ligações, os frameworks e middlewares em comum, mantendo o fluxo do projeto inicial.",
    recursos: "Uso do laboratório de informática, com os computadores com os devidos programas instalados e acesso a internet, github, render, vscode.",
    bibliografia: "https://github.com/\nhttps://render.com/\nhttps://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference",
    avaliacao: "continua e avaliativa"
  },
  // AULA 10
  {
    num: 10,
    title: "Aula 10 - Deploy do Hospital System na Nuvem (Render & GitHub)",
    objetivo: "Realizar o versionamento do projeto no GitHub e a publicação completa da API e do Front-End na nuvem usando a plataforma Render.com.",
    metodologia: "Passo a passo prático realizando commit do projeto no Git, criação do repositório no GitHub e publicação do Web Service no Render.",
    recursos: "Laboratório de informática, conta no GitHub, plataforma Render.com, Git CLI.",
    bibliografia: "https://render.com/docs\nhttps://docs.github.com/pt",
    avaliacao: "Contínua e avaliativa através da validação da URL pública do sistema hospedado no Render."
  }
];

async function generateSigaPDF() {
  console.log("🚀 Gerando PDF dos 10 Planos de Aula no Padrão SIGA...");

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let pagesHTML = "";

  sigaPlanosData.forEach(p => {
    pagesHTML += `
      <div class="siga-page">
        <div class="siga-header-top">
          <h1>SIGA - Módulo do Professor</h1>
          <p>PROFESSOR(A): UBIRATAN VALENTIM DOS SANTOS &nbsp;|&nbsp; CPF: 722.813.161-49 &nbsp;|&nbsp; DATA: 16/08/2026</p>
        </div>

        <div class="siga-body">
          <div class="siga-course-title">
            PAULO RENATO DE SOUZA - TEC-PAURENAT-DWC-C-I1-2025<br>
            BACK-END: DESENVOLVIMENTO DE API (280HR) * DIÁRIO DE AULA ${p.num} *
          </div>

          <div class="siga-actions">
            <button class="siga-btn">Salvar</button>
            <button class="siga-btn" style="background:#dc3545;">Excluir</button>
            <button class="siga-btn" style="background:#6c757d;">Voltar</button>
          </div>

          <div class="siga-tabs">
            <div class="siga-tab">Aula</div>
            <div class="siga-tab active">Plano de Aula (${p.title})</div>
            <div class="siga-tab">Professores de Apoio</div>
          </div>

          <div class="siga-form">
            <div class="siga-field">
              <div class="siga-label">Objetivo</div>
              <div class="siga-textarea">${p.objetivo}</div>
            </div>

            <div class="siga-field">
              <div class="siga-label">Metodologia</div>
              <div class="siga-textarea">${p.metodologia}</div>
            </div>

            <div class="siga-field">
              <div class="siga-label">Recursos Didáticos</div>
              <div class="siga-textarea">${p.recursos}</div>
            </div>

            <div class="siga-field">
              <div class="siga-label">Bibliografia</div>
              <div class="siga-textarea" style="white-space:pre-wrap;">${p.bibliografia}</div>
            </div>

            <div class="siga-field">
              <div class="siga-label">Avaliação</div>
              <div class="siga-textarea">${p.avaliacao}</div>
            </div>

            <div class="siga-footer-note">* Campos obrigatórios preenchidos no SIGA</div>
          </div>
        </div>
      </div>
    `;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Planos de Aula SIGA - Hospital System</title>
      <style>${sigaCSS}</style>
    </head>
    <body>
      ${pagesHTML}
    </body>
    </html>
  `;

  const page = await browser.newPage();
  await page.setContent(fullHTML, { waitUntil: 'networkidle0' });

  const filename = "Planos_de_Aula_SIGA_Hospital_System.pdf";
  const pdfPathTarget = path.join(targetDir, filename);
  const pdfPathArt = path.join(artDir, filename);

  await page.pdf({
    path: pdfPathTarget,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });

  fs.copyFileSync(pdfPathTarget, pdfPathArt);
  console.log(`✅ Salvo: ${pdfPathTarget}`);

  await browser.close();
  console.log("🎉 Documento dos Planos de Aula SIGA em PDF gerado com sucesso!");
}

generateSigaPDF().catch(err => {
  console.error("❌ Erro ao gerar PDF do SIGA:", err);
  process.exit(1);
});
