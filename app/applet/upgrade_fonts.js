import fs from 'fs';

function upgrade(file) {
  let content = fs.readFileSync(file, 'utf8');

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

  for (const [oldVal, newVal] of Object.entries(map)) {
    content = content.replace(new RegExp(`font-size:\\s*${oldVal}`, 'g'), `font-size: ${newVal}`);
    content = content.replace(new RegExp(`fontSize:\\s*['"]${oldVal}['"]`, 'g'), `fontSize: '${newVal}'`);
  }

  fs.writeFileSync(file, content);
}

upgrade('src/index.css');
upgrade('src/App.tsx');
upgrade('src/components/Chatbot.tsx');
console.log('Fonts upgraded');
