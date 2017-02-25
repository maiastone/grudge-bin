const express = require('express')
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const md5 = require('md5');
const moment = require('moment');
const environment = process.env.NODE_ENV || 'development';
const port =  process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.locals.grudges = []

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
    date: moment().format('MMM Do YYYY HH:mm')
  };
  if (!req.body.name) {
    return res.status(422).send({
      error: 'No new grudge provided'
    });
  }
  app.locals.grudges.push(newGrudge);
  res.status(201).json(app.locals.grudges)
})

app.get('/api/grudges/:id', (req, res) => {
  const { id } = req.params;
  const grudge = app.locals.grudges.filter(function(grudge) {
    if (grudge.id === id) {
      return grudge;
    }
  })
  res.status(201).json(grudge)
})

app.patch('/api/grudges/:id', (req, res) => {
  const { id } = req.params
  const { forgiven } = req.body
  const updatedGrudges = app.locals.grudges.map(grudge => {
    if (grudge.id === id) {
      grudge.forgiven = true;
    }
    return grudge
  })
  app.locals.grudges = updatedGrudges
  res.status(200).json(updatedGrudges)
})

const server = http.createServer(app)
.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

module.exports = app;
