const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace(
  "app.get('*', (req, res) => {\n      res.sendFile(path.join(distPath, 'index.html'));\n    });",
  "// 404 for unhandled APIs\n    app.use('/api', (req, res) => { res.status(404).json({ error: 'Not found' }) });\n\n    app.get('*', (req, res) => {\n      res.sendFile(path.join(distPath, 'index.html'));\n    });"
);
fs.writeFileSync('server.ts', content);
