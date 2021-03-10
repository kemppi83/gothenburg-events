const express = require('express');
const cors = require('cors');
// const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET /');
  res.json('Hellou World!');
});

module.exports.app = app;
