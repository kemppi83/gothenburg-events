const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const helper = require('./helper');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const searchQuery = req.url.replace('/', '');
  const url = `${process.env.API_URL}${searchQuery}`;
  const result = await fetch(url, {
    method: 'get',
    headers: { Authorization: process.env.API_AUTH },
  });
  const data = await result.json();

  res.json({
    pagination: helper.extractPagination(data),
    content: helper.extractPreview(data.content),
    query: req.query,
  });
});

app.get('/:id', async (req, res) => {
  const url = `${process.env.API_URL}/${req.params.id}`;
  const result = await fetch(url, {
    method: 'get',
    headers: { Authorization: process.env.API_AUTH },
  });
  const data = await result.json();

  res.json({
    content: helper.extractDetails(data.content),
  });
});

module.exports.app = app;
