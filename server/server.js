const express = require('express')
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const md5 = require('md5');
const environment = process.env.NODE_ENV || 'development';
const port =  process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.locals.grudges = [
  {
    id: 1,
    name: 'Creature',
    offense: 'Slimy',
    forgiven: false,
    date: Date.now()
  }
]

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/grudges', (req, res) => {
  const grudges = app.locals.grudges;
  res.json(grudges);
})

const server = http.createServer(app)
.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
