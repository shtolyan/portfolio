// Rebuild: NODE_PATH=/path/to/node_modules node scripts/build-social-card.cjs
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const photo = fs.readFileSync(path.join(root, 'assets/anatoly-voxel.jpg')).toString('base64');
const glyphs = {
 A:['01110','10001','10001','11111','10001','10001','10001'], N:['10001','11001','11001','10101','10011','10011','10001'],
 T:['11111','00100','00100','00100','00100','00100','00100'], O:['01110','10001','10001','10001','10001','10001','01110'],
 L:['10000','10000','10000','10000','10000','10000','11111'], Y:['10001','10001','01010','00100','00100','00100','00100'],
 S:['01111','10000','10000','01110','00001','00001','11110'], H:['10001','10001','10001','11111','10001','10001','10001'],
 E:['11111','10000','10000','11110','10000','10000','11111'], I:['11111','00100','00100','00100','00100','00100','11111']
};
function pixel(text,x,y,s){return [...text].map((ch,i)=>glyphs[ch].map((row,r)=>[...row].map((bit,col)=>bit==='1'?`<rect x="${x+(i*6+col)*s}" y="${y+r*s}" width="${s}" height="${s}"/>`:'').join('')).join('')).join('')}
let grid='';for(let x=24;x<1200;x+=32)for(let y=22;y<620;y+=32)if((x*3+y*7)%13<2)grid+=`<rect x="${x}" y="${y}" width="4" height="4" fill="#284d3d"/>`;
let ground='';for(let i=0;i<40;i++){const h=[16,16,24,40,32,24,16,24,32,48][i%10];ground+=`<rect x="${i*32}" y="${630-h}" width="32" height="${h}" fill="#365e40"/>`}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#16382f"/>${grid}
<rect x="64" y="64" width="12" height="12" fill="#c4ee85"/>
<text x="92" y="77" fill="#dce8d4" font-family="Arial, sans-serif" font-size="16" letter-spacing="3">GAME DEVELOPMENT PORTFOLIO</text>
<g fill="#c4ee85">${pixel('ANATOLY',64,132,6)}${pixel('SHESHENIN',64,194,6)}</g>
<text x="64" y="301" fill="#fffef6" font-family="Arial, sans-serif" font-size="44" font-weight="bold">Senior Unity Developer</text>
<text x="64" y="355" fill="#dce8d4" font-family="Arial, sans-serif" font-size="27">Built to play. Made to run.</text>
<rect x="64" y="390" width="550" height="1" fill="#46634f"/>
<text x="64" y="432" fill="#c4ee85" font-family="Arial, sans-serif" font-size="21">Game AI · Multiplayer · Performance · Team Lead</text>
<text x="64" y="470" fill="#dce8d4" font-family="Arial, sans-serif" font-size="20">15 → 60 FPS · 10M+ downloads · ~10 years in games</text>
<rect x="730" y="92" width="414" height="442" fill="#0d251d"/>
<rect x="718" y="80" width="414" height="442" fill="#c4ee85"/>
<rect x="725" y="113" width="400" height="400" fill="#e8efda"/>
<text x="735" y="102" font-family="Arial, sans-serif" font-weight="bold" font-size="13" letter-spacing="2" fill="#16382f">CREATOR PROFILE</text>
<rect x="1095" y="92" width="8" height="8" fill="#16382f"/><rect x="1110" y="92" width="8" height="8" fill="#16382f"/>
<image x="725" y="113" width="400" height="400" xlink:href="data:image/jpeg;base64,${photo}"/>
<rect x="711" y="513" width="16" height="16" fill="#fffef6"/><rect x="1125" y="73" width="14" height="14" fill="#fffef6"/>
<text x="64" y="560" font-family="Arial, sans-serif" font-size="19" fill="#dce8d4">shtolyan.github.io/portfolio</text>
<text x="1129" y="560" text-anchor="end" font-family="Arial, sans-serif" font-size="17" fill="#dce8d4">MOBILE / PC / WEBGL / VR</text>
${ground}</svg>`;
sharp(Buffer.from(svg)).jpeg({quality:90,mozjpeg:true}).toFile(path.join(root,'assets/portfolio-social-v2.jpg')).then(info=>console.log(info));
