const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '../src/data.ts');
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/period:\s*'([^']+) – ([^']+)'/g, (match, p1, p2, offset) => {
  // Only replace inside experiences and organizations
  // education block ends around line 38.
  if (offset > 1500 && offset < 10000) {
    return `start_period: '${p1}',\n      end_period: '${p2}'`;
  }
  return match;
});

fs.writeFileSync(p, c);
console.log('Done!');
