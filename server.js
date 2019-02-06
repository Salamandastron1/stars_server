const express = require('express');
const knex = require('knex');
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = knex(config);
const app = express();
const corsOptions = {
  origin: 'https://salamandastron1.github.io/hubble-bubble/',
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.options('*', cors(corsOptions))

app.get('/signin', )


app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
});

module.exports = app;