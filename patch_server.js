const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace export const app = express()... and async function startServer() { const app = express()...
content = content.replace(/export const app = express\(\);\nconst PORT = 3000;\n\nasync function startServer\(\) {\n  const app = express\(\);\n  const PORT = 3000;/g, 'export const app = express();\nconst PORT = process.env.PORT || 3000;');

// Find the end of startServer and split it
const splitIdx = content.indexOf('  if (process.env.NODE_ENV !== "production") {');
if (splitIdx !== -1) {
  const firstPart = content.slice(0, splitIdx);
  const secondPart = content.slice(splitIdx);
  
  // The first part contains all the app.use and app.get, etc.
  // Wait, startServer() wrapped ALL routes.
  // We want to pull ALL routes out of startServer(), leaving only Vite / static serving and app.listen in startServer().
}
