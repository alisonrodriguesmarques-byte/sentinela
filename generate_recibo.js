const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generateReciboPDF() {
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Recibo de Pagamento - Parcela 4/4</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 20mm 20mm 20mm 20mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #000000;
      background-color: #ffffff;
      font-size: 15px;
      line-height: 1.6;
      padding: 40px 30px;
    }
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 25px;
    }
    .title-area h1 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #000000;
    }
    .title-area h2 {
      font-size: 20px;
      font-weight: bold;
      color: #000000;
    }
    .value-box {
      border: 1px solid #000000;
      padding: 6px 22px;
      font-size: 16px;
      background: #ffffff;
      white-space: nowrap;
      margin-top: 35px;
    }
    .content-body {
      margin-top: 25px;
    }
    .content-body p {
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 1.65;
      color: #000000;
    }
    .date-line {
      text-align: right;
      margin-top: 15px;
      font-size: 15px;
      color: #000000;
    }
  </style>
</head>
<body>
  <div class="header-container">
    <div class="title-area">
      <h1>Recibo de Pagamento</h1>
      <h2>Parcela 4/4</h2>
    </div>
    <div class="value-box">
      R$ 2.000,00
    </div>
  </div>

  <div class="content-body">
    <p>Recebi(emos) de <strong>Neto Rodrigues</strong>, a importância de <strong>dois mil reais</strong>, referente à <strong>CRM POLITICO</strong>.</p>
    <p>Para maior clareza, firmo(amos) o presente recibo, que comprova o recebimento integral do valor mencionado, a pagar da ultima parcela ,concedendo <strong>quitação plena, geral e irrevogável</strong> pela quantia a receber.</p>
    <p>Pagamento a receber através da chave Pix: <strong>ubiratanvjunior@hotmail.com</strong>.</p>
  </div>

  <div class="date-line">
    Brasília/DF, 04 de setembro de 2026.
  </div>
</body>
</html>`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const targetDir = "c:\\Users\\FASTNOTE BRASÍLIA\\Desktop\\hospital\\hospital-system";
  const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\be7da5f9-4cf4-4f8b-bd96-806f00209a99";

  const pdfPath1 = path.join(targetDir, "Recibo_de_Pagamento_Parcela_4_4.pdf");
  const pdfPath2 = path.join(targetDir, "Atividade_Para_Casa_Desafio_Nova_Plataforma_Deploy.pdf");
  const previewPath = path.join(artDir, "recibo_preview.png");

  await page.pdf({
    path: pdfPath1,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });

  fs.copyFileSync(pdfPath1, pdfPath2);

  await page.screenshot({ path: previewPath, fullPage: true });

  await browser.close();
  console.log(`✅ PDF gerado com sucesso em:\n- ${pdfPath1}\n- ${pdfPath2}\n📸 Preview salvo em: ${previewPath}`);
}

generateReciboPDF().catch(err => {
  console.error("❌ Erro:", err);
  process.exit(1);
});
