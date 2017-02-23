const express = require('express')
const app = express();
const path = require('path');
const http = require('http');
const environment = process.env.NODE_ENV || 'development';
const port =  process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const server = http.createServer(app)
.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
