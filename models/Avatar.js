const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

function Avatar() {
  database.find();
}

module.exports = Avatar;
