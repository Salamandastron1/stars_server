const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

const User = {
  find() {
    database.where();

    return Promise.resolve({ stars: 2, username: 'meow' });
  },
};

module.exports = User;
