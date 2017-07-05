const fs = require('fs');

const config = fs.readFileSync('config.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');

const html = fs.readFileSync('app.html', 'utf8');

const result = html.replace('{{CODE}}', config + '\n\n' + app);

fs.writeFileSync('build.html', result, 'utf8');
