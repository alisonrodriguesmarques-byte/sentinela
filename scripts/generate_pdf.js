const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('Iniciando compilação do PDF do Portfólio...');

  const htmlPath = path.join(__dirname, '../docs/portfolio_document.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  // Converte as imagens em base64 Data URI para garantir renderização 100% perfeita no PDF
  const assetsDir = path.join(__dirname, '../docs/assets');
  const imageNames = [
    '01_login.png',
    '02_atendimento.png',
    '03_triagem.png',
    '04_medico.png',
    '05_tv.png',
    '06_medicacoes.png'
  ];

  for (const imgName of imageNames) {
    const imgPath = path.join(assetsDir, imgName);
    if (fs.existsSync(imgPath)) {
      const imgBase64 = fs.readFileSync(imgPath).toString('base64');
      const dataUri = `data:image/png;base64,${imgBase64}`;
      htmlContent = htmlContent.replace(new RegExp(`assets/${imgName}`, 'g'), dataUri);
    }
  }

  // Grava versão temporária consolidada
  const tempHtmlPath = path.join(__dirname, '../docs/portfolio_temp.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  
  const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // PDF no root e em docs/
  const outputPdfRoot = path.join(__dirname, '../Portfolio_Sistema_Hospitalar_Sentinela.pdf');
  const outputPdfDocs = path.join(__dirname, '../docs/Portfolio_Sistema_Hospitalar_Sentinela.pdf');

  await page.pdf({
    path: outputPdfRoot,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 8pt; color: #94a3b8; font-family: Inter, Arial, sans-serif; width: 100%; display: flex; justify-content: space-between; padding: 0 15mm;">
        <span>Hospital Pro • Projeto Final Sentinela — Orientador: Prof. Ubiratan</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `
  });

  // Copia também para docs/
  fs.copyFileSync(outputPdfRoot, outputPdfDocs);

  // Remove arquivo temporário
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  await browser.close();

  console.log(`✅ PDF gerado com sucesso em: \n - ${outputPdfRoot}\n - ${outputPdfDocs}`);
}

generatePDF().catch(err => {
  console.error('Erro ao gerar PDF:', err);
  process.exit(1);
});
