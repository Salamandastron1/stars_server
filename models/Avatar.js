const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

const Avatar = {
  retrieve({ stars }) {
    console.log(stars);
    return database('avatars')
      .where('threshold', '<', stars)
      .select('avatar_url');
  },
  create() {
    database.where();
  },
  update() {

  },
  remove() {

  },
};

module.exports = Avatar;
