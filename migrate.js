import fs from 'fs';

const map = {
  '0.7rem': '0.85rem',
  '0.72rem': '0.85rem',
  '0.75rem': '0.9rem',
  '0.8rem': '0.95rem',
  '0.82rem': '0.95rem',
  '0.85rem': '1rem',
  '0.9rem': '1.05rem',
  '0.92rem': '1.05rem',
  '0.95rem': '1.1rem',
  '1rem': '1.15rem',
  '1.05rem': '1.15rem',
  '16px': '18px'
};

for (let file of ['src/index.css', 'src/App.tsx', 'src/components/Chatbot.tsx']) {
  if (!fs.existsSync(file)) continue;
  let c = fs.readFileSync(file, 'utf8');
  for (const [o, n] of Object.entries(map)) {
    c = c.replace(new RegExp(`font-size:\\s*${o}`, 'g'), `font-size: ${n}`);
    c = c.replace(new RegExp(`fontSize:\\s*['"]${o}['"]`, 'g'), `fontSize: '${n}'`);
  }
  fs.writeFileSync(file, c);
}
console.log('Done');
