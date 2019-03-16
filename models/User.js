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
      .select('username', 'stars', 'id')
      .then((data) => {
        if (data.length) {
          return data;
        }
        return null;
      });
  },
  create({ email, password }) {
    return database('users')
      .insert({ email, password }, 'id');
  },
  async update(id, stars) {
    const oldStars = await database('users').where('id', id).select('stars')
    stars += oldStars[0].stars;
    
    return database('users')
      .where('id', id)
      .update({ stars }, ['stars']);
  },
};

module.exports = User;
