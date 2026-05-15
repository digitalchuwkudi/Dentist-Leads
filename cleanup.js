import fs from 'fs';

function cleanup(file, lineStr) {
  if (!fs.existsSync(file)) return;
  let lines = fs.readFileSync(file, 'utf8').split('\n');
  const index = lines.findIndex(l => l.startsWith(lineStr));
  if (index !== -1) {
    fs.writeFileSync(file, lines.slice(0, index).join('\n') + '\n');
  }
}

cleanup('src/App.tsx', '\\n\\n\\n'); 
cleanup('src/index.css', '\\n\\n\\n');

