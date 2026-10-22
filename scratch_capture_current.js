const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artDir = "C:\\Users\\FASTNOTE BRASÍLIA\\.gemini\\antigravity-ide\\brain\\31b5b653-c9f8-44c3-9ff0-bd917c0056ac";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pages = [
    { url: 'http://localhost:3000/index.html', name: 'screen_login.png' },
    { url: 'http://localhost:3000/atendimento.html', name: 'screen_atendimento.png' },
    { url: 'http://localhost:3000/triagem.html', name: 'screen_triagem.png' },
    { url: 'http://localhost:3000/medico.html', name: 'screen_medico.png' },
    { url: 'http://localhost:3000/tv.html', name: 'screen_tv.png' },
    { url: 'http://localhost:3000/medicacoes.html', name: 'screen_medicacoes.png' }
  ];

  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
    await page.goto(p.url, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 800));
    const outPath = path.join(artDir, p.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved screenshot: ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
