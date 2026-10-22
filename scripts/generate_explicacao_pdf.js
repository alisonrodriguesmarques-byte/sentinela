const puppeteer = require('puppeteer');
const path = require('path');

async function generateExplanationPDF() {
  console.log('Gerando PDF do passo a passo...');

  const htmlPath = path.join(__dirname, '../docs/explicacao_triagem.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const outputPdfPath = path.join(__dirname, '../passo_a_passo_triagem.pdf');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
  });

  await browser.close();
  console.log(`PDF gerado com sucesso em: ${outputPdfPath}`);
}

generateExplanationPDF().catch(err => {
  console.error('Erro ao gerar PDF:', err);
  process.exit(1);
});
