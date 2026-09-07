const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Reset to the original state first
content = content.replace(/export const app = express\(\);\nconst PORT = 3000;\n\nasync function startServer\(\) {/g, 'async function startServer() {');

// Now, we want to extract everything between `const PORT = 3000;` and `// Vite middleware for development`
const startIdx = content.indexOf('async function startServer() {');
const endIdx = content.indexOf('  // Vite middleware for development');

if (startIdx !== -1 && endIdx !== -1) {
  const beforeStart = content.slice(0, startIdx);
  const insideStart = content.slice(startIdx, endIdx);
  const afterStart = content.slice(endIdx);
  
  const innerContent = insideStart.replace('async function startServer() {', '').trim();
  
  const newContent = `${beforeStart}

export const app = express();

${innerContent.replace('const app = express();\n', '').replace('const PORT = 3000;\n', '')}

async function startServer() {
  const PORT = process.env.PORT || 3000;
${afterStart.replace('startServer();', 'if (!process.env.VERCEL) {\n  startServer();\n}')}
`;

  fs.writeFileSync('server.ts', newContent);
}

