import { chromium } from 'playwright';
const B='http://localhost:3111';
const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const c=await br.newContext({viewport:{width:900,height:900},deviceScaleFactor:2});
await c.request.post(B+'/api/login',{data:{password:'test123'}});
const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(B+'/',{waitUntil:'networkidle'});
await p.click('#mundo-onboarding'); await p.waitForSelector('.route');
await p.click('#route-onb-s1'); await p.waitForSelector('.leccion');
await p.waitForTimeout(250);
const nFiles=await p.$$eval('.leccion .ev-file', els=>els.length);
const firstCardFiles=await p.$$eval('.leccion:first-of-type .ev-file span:first-child', els=>els.map(e=>e.textContent));
console.log('errores:', errs.length?errs:'NINGUNO');
console.log('archivos en 1a actividad:', firstCardFiles);
// recorte de la primera actividad
const card=await p.$('.leccion');
await card.screenshot({path:'/tmp/card20.png'});
await br.close();
