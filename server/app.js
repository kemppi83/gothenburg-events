const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  console.log('GET /');
  const url = 'https://esb.goteborg.se/TEIK/Kalendarium/v1_0/activities';
  const result = await fetch(url, {
    method: 'get',
    headers: { 'Authorization': 'Basic a2FsZW5kYXJpZWFwaTpWNVNcZVdzQA==' },
  });
  const data = await result.json();
  console.log(data);
  res.json(data);
  // res.json('Hellou World!');
});

module.exports.app = app;
