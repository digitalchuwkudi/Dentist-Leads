import fs from 'fs';

for (let file of ['src/index.css', 'src/App.tsx', 'src/components/Chatbot.tsx']) {
  if (!fs.existsSync(file)) continue;
  let c = fs.readFileSync(file, 'utf8');
  
  c = c.replace(/(font-size:\s*|fontSize:\s*['"])([0-9.]+)(rem)(['"]?)/g, (match, prefix, num, unit, suffix) => {
    let n = parseFloat(num);
    if (n < 0.6) return match; 
    let newN;
    if (n === 0.7) newN = 0.85;
    else if (n === 0.72) newN = 0.85;
    else if (n === 0.75) newN = 0.85;
    else if (n === 0.8) newN = 0.95;
    else if (n === 0.82) newN = 0.95;
    else if (n === 0.85) newN = 1;
    else if (n === 0.9) newN = 1.05;
    else if (n === 0.92) newN = 1.05;
    else if (n === 0.95) newN = 1.1;
    else if (n === 1) newN = 1.1;
    else if (n === 1.05) newN = 1.15;
    else return match; 
    
    return `${prefix}${newN}${unit}${suffix}`;
  });
  
  c = c.replace(/(font-size:\s*|fontSize:\s*['"])([0-9]+)(px)(['"]?)/g, (match, prefix, num, unit, suffix) => {
    let n = parseInt(num, 10);
    if (n === 16) return `${prefix}18${unit}${suffix}`;
    return match;
  });

  fs.writeFileSync(file, c);
}
console.log('Upgraded Safely!');
