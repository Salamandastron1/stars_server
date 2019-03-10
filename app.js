const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const corsOptions = {
  origin: 'https://salamandastron1.github.io/hubble-bubble/',
  optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routes(app);

module.exports = app;
