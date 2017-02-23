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
});

app.post('/api/grudges', (req, res) => {
  const newGrudge = {
    id: md5(req.body.name),
    name: req.body.name,
    offense: req.body.offense,
    forgiven: false,
    date: Date.now()
  };
  if (!req.body.name) {
    return res.status(422).send({
      error: 'No new grudge provided'
    });
  }
  app.locals.grudges.push(newGrudge);
  res.status(201).json(app.locals.grudges)
})

const server = http.createServer(app)
.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
