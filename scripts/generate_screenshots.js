const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../docs/assets');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Iniciando captura de telas...');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: {
      width: 1366,
      height: 768,
      deviceScaleFactor: 2 // 2x DPI para máxima nitidez no PDF
    }
  });

  const page = await browser.newPage();

  // 1. TELA DE LOGIN (index.html)
  console.log('Capturando Tela 1: Login...');
  const indexUrl = 'file:///' + path.join(__dirname, '../frontend/index.html').replace(/\\/g, '/');
  await page.goto(indexUrl, { waitUntil: 'networkidle0' });
  
  // Customiza visual para captura realista
  await page.evaluate(() => {
    const user = document.getElementById('usuario');
    const pass = document.getElementById('senha');
    if (user) user.value = 'dr.ricardo_medico';
    if (pass) pass.value = '••••••••••••';
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01_login.png'),
    fullPage: false
  });

  // 2. TELA DE ATENDIMENTO / RECEPÇÃO (atendimento.html)
  console.log('Capturando Tela 2: Atendimento / Recepção...');
  const atendimentoUrl = 'file:///' + path.join(__dirname, '../frontend/atendimento.html').replace(/\\/g, '/');
  await page.goto(atendimentoUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const tipo = document.getElementById('tipo');
    if (nome) nome.value = 'Mariana Rios de Oliveira';
    if (cpf) cpf.value = '342.891.708-45';
    if (tipo) tipo.value = 'Convenio';
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02_atendimento.png'),
    fullPage: false
  });

  // 3. TELA DE TRIAGEM (triagem.html)
  console.log('Capturando Tela 3: Triagem...');
  const triagemUrl = 'file:///' + path.join(__dirname, '../frontend/triagem.html').replace(/\\/g, '/');
  await page.goto(triagemUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    // Popula fila de pacientes
    const filaDiv = document.getElementById('fila-pacientes');
    if (filaDiv) {
      filaDiv.innerHTML = `
        <div class="fila-item">
          <div>
            <strong>Mariana Rios de Oliveira</strong><br>
            <small>CPF: 342.891.708-45 | Tipo: Convênio (Bradesco Saúde)</small>
          </div>
          <button class="btn-tv" style="background:#28a745; color:white; border:none; padding:8px 14px; border-radius:5px;">📺 Chamar na TV</button>
        </div>
        <div class="fila-item">
          <div>
            <strong>Carlos Eduardo de Souza</strong><br>
            <small>CPF: 189.542.901-12 | Tipo: Particular</small>
          </div>
          <button class="btn-tv" style="background:#28a745; color:white; border:none; padding:8px 14px; border-radius:5px;">📺 Chamar na TV</button>
        </div>
        <div class="fila-item">
          <div>
            <strong>Roberto Alencar Castro</strong><br>
            <small>CPF: 512.983.410-88 | Tipo: Convênio (Unimed)</small>
          </div>
          <button class="btn-tv" style="background:#28a745; color:white; border:none; padding:8px 14px; border-radius:5px;">📺 Chamar na TV</button>
        </div>
      `;
    }

    // Popula formulário de triagem com avaliação crítica
    const nome = document.getElementById('nome');
    const sintoma = document.getElementById('sintoma');
    const temp = document.getElementById('temp');
    const alergia = document.getElementById('alergia');
    const obs = document.getElementById('observacao');
    const res = document.getElementById('resultado');

    if (nome) nome.value = 'Mariana Rios de Oliveira';
    if (sintoma) sintoma.value = 'falta_ar_grave';
    if (temp) temp.value = '39.4';
    if (alergia) alergia.value = 'Dipirona, Anti-inflamatórios não esteroides (AINEs)';
    if (obs) obs.value = 'Paciente refere dispneia súbita moderada a grave há 2 horas associada a picos febris e cefaleia intensa.';
    if (res) {
      res.className = 'vermelho';
      res.style.marginTop = '15px';
      res.style.fontWeight = 'bold';
      res.style.fontSize = '18px';
      res.style.textAlign = 'center';
      res.innerHTML = '🚨 Classificação: VERMELHO (EMERGÊNCIA IMEDIATA)';
    }
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '03_triagem.png'),
    fullPage: false
  });

  // 4. TELA DO PAINEL MÉDICO (medico.html)
  console.log('Capturando Tela 4: Painel Médico...');
  const medicoUrl = 'file:///' + path.join(__dirname, '../frontend/medico.html').replace(/\\/g, '/');
  await page.goto(medicoUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const triagensDiv = document.getElementById('triagens');
    if (triagensDiv) {
      triagensDiv.innerHTML = `
        <div class="card" style="border-left: 6px solid #e74c3c; margin-bottom:12px; padding:15px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); background:white;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#1e293b;">Mariana Rios de Oliveira</h3>
            <span class="vermelho" style="background:#e74c3c; color:white; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:12px;">EMERGÊNCIA - VERMELHO</span>
          </div>
          <p style="margin:6px 0;"><b>Sintoma:</b> Falta de ar grave | <b>Temperatura:</b> 39.4°C</p>
          <p style="margin:6px 0; color:#c0392b;"><b>⚠️ Alergias:</b> Dipirona, AINEs</p>
          <p style="margin:6px 0; color:#555;"><b>Obs Enfermagem:</b> Dispneia súbita com febre alta e taquipneia.</p>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button style="background:#3498db; color:white; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Atender Paciente</button>
            <button class="btn-tv" style="background:#28a745; color:white; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">📺 Chamar no Consultório 01</button>
          </div>
        </div>
        <div class="card" style="border-left: 6px solid #f1c40f; margin-bottom:12px; padding:15px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); background:white;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#1e293b;">Carlos Eduardo de Souza</h3>
            <span class="amarelo" style="background:#f1c40f; color:#333; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:12px;">URGENTE - AMARELO</span>
          </div>
          <p style="margin:6px 0;"><b>Sintoma:</b> Febre persistente com vômito | <b>Temperatura:</b> 38.3°C</p>
          <p style="margin:6px 0;"><b>Alergias:</b> Nenhuma relatada</p>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <button style="background:#3498db; color:white; border:none; padding:8px 16px; border-radius:5px;">Atender Paciente</button>
            <button class="btn-tv" style="background:#28a745; color:white; border:none; padding:8px 16px; border-radius:5px;">📺 Chamar no Consultório 01</button>
          </div>
        </div>
      `;
    }

    // Preenche dados do formulário de consulta
    const paciente = document.getElementById('paciente');
    const diagnostico = document.getElementById('diagnostico');
    const selectMed = document.getElementById('medicacao');
    const obs = document.getElementById('obs');

    if (paciente) paciente.value = 'Mariana Rios de Oliveira';
    if (diagnostico) diagnostico.value = 'Broncopneumonia bacteriana aguda (CID-10 J18.0) + Crise Asmática';
    if (selectMed) {
      selectMed.innerHTML = `
        <option value="Amoxicilina" selected>Amoxicilina 875mg + Clavulanato 125mg</option>
        <option value="Paracetamol">Paracetamol 750mg</option>
        <option value="Soro fisiológico">Soro fisiológico 0.9% 500ml</option>
      `;
    }
    if (obs) obs.value = 'Prescrita inalação com broncodilatador na emergência. Manter hidratação e retorno em 48h. Evitar AINEs devido a alergia registrada.';
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04_medico.png'),
    fullPage: false
  });

  // 5. TELA DE MÍDIA INDOOR / TV (tv.html)
  console.log('Capturando Tela 5: Painel de TV (Mídia Indoor)...');
  const tvUrl = 'file:///' + path.join(__dirname, '../frontend/tv.html').replace(/\\/g, '/');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(tvUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const localTipo = document.getElementById('local-tipo');
    const localNum = document.getElementById('local-numero');
    const paciente = document.getElementById('patient-name');
    const histList = document.getElementById('history-list');

    if (localTipo) localTipo.innerText = 'CONSULTÓRIO';
    if (localNum) localNum.innerText = '01';
    if (paciente) paciente.innerText = 'MARIANA RIOS DE OLIVEIRA';
    if (histList) {
      histList.innerHTML = `
        <li>CONS. 02 - Roberto Alencar Castro</li>
        <li>GUIC. 01 - Carlos Eduardo de Souza</li>
        <li>CONS. 01 - Patrícia Lima Meireles</li>
        <li>GUIC. 02 - José Fernando Silva</li>
      `;
    }
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05_tv.png'),
    fullPage: false
  });

  // 6. TELA DE FARMÁCIA / MEDICAÇÕES (medicacoes.html)
  console.log('Capturando Tela 6: Farmácia e Medicações...');
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 2 });
  const medUrl = 'file:///' + path.join(__dirname, '../frontend/medicacoes.html').replace(/\\/g, '/');
  await page.goto(medUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const listDiv = document.getElementById('listaMedicacoes');
    if (listDiv) {
      listDiv.innerHTML = `
        <div class="card" style="border-left:5px solid #28a745; margin-bottom:15px; padding:16px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); background:white;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#1e293b;">Mariana Rios de Oliveira</h3>
            <span style="background:#e0f2fe; color:#0369a1; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:12px;">Status: Liberado p/ Dispensação</span>
          </div>
          <p style="margin:8px 0 4px 0;"><b>💊 Medicação Prescrita:</b> <span style="color:#0f766e; font-weight:bold; font-size:15px;">Amoxicilina 875mg + Clavulanato 125mg (1 comprimido a cada 12h por 7 dias)</span></p>
          <p style="margin:4px 0;"><b>🩺 Diagnóstico:</b> Broncopneumonia bacteriana aguda (CID-10 J18.0)</p>
          <p style="margin:4px 0; color:#555;"><b>📝 Instruções & Observações:</b> Inalação com broncodilatador realizada. Atenção: Paciente alérgica a Dipirona e AINEs.</p>
        </div>
        <div class="card" style="border-left:5px solid #3b82f6; margin-bottom:15px; padding:16px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); background:white;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#1e293b;">Carlos Eduardo de Souza</h3>
            <span style="background:#fef3c7; color:#b45309; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:12px;">Status: Em Separação</span>
          </div>
          <p style="margin:8px 0 4px 0;"><b>💊 Medicação Prescrita:</b> <span style="color:#0f766e; font-weight:bold; font-size:15px;">Paracetamol 750mg + Ondansetrona 8mg</span></p>
          <p style="margin:4px 0;"><b>🩺 Diagnóstico:</b> Gastroenterite aguda infecciosa com febre</p>
          <p style="margin:4px 0; color:#555;"><b>📝 Instruções & Observações:</b> Hidratação oral intensa com soro de reidratação.</p>
        </div>
        <div class="card" style="border-left:5px solid #6b7280; margin-bottom:15px; padding:16px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); background:white;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#1e293b;">Roberto Alencar Castro</h3>
            <span style="background:#dcfce7; color:#15803d; padding:4px 10px; border-radius:6px; font-weight:bold; font-size:12px;">Status: Dispensado</span>
          </div>
          <p style="margin:8px 0 4px 0;"><b>💊 Medicação Prescrita:</b> <span style="color:#0f766e; font-weight:bold; font-size:15px;">Omeprazol 40mg + Buscopan Composto</span></p>
          <p style="margin:4px 0;"><b>🩺 Diagnóstico:</b> Epigastralgia aguda / Dispepsia funcional</p>
          <p style="margin:4px 0; color:#555;"><b>📝 Instruções & Observações:</b> Tomar em jejum pela manhã.</p>
        </div>
      `;
    }
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06_medicacoes.png'),
    fullPage: false
  });

  await browser.close();
  console.log('✅ Todas as 6 capturas de tela foram geradas com sucesso em docs/assets/!');
}

captureScreenshots().catch(err => {
  console.error('Erro na captura:', err);
  process.exit(1);
});
