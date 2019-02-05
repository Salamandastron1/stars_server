const express = require('express');
const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];

const database = knex(config);
const app = express();

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
});

module.exports = app;