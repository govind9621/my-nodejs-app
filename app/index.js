const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Jenkins CI/CD on K3s with containerd!');
});
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
