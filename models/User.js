const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

const User = {
  find({ email, password }) {
    return database('users')
      .where({
        email,
        password,
      })
      .select('username', 'stars')
      .then((data) => {
        if (data.length) {
          return data;
        }
        return null;
      })
      .catch(err => err);
  },
  create({ email, password }) {
    return database('users')
      .insert({ email, password }, 'id')
      .then(id => id)
      .catch(err => err);
  },
};

module.exports = User;
