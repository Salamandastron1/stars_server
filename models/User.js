const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

const User = {
  find(email, password) {
    return database.where({
      email,
      password,
    })
      .select('username', 'stars')
      .catch(err => console.log(err.message));
  },
};

module.exports = User;
