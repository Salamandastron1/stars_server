const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../knexfile')[environment];

const database = knex(config);

const Avatar = {
  retrieve({ stars }) {
    return database('avatars')
      .where('threshold', '<', stars)
      .select('avatar_url');
  },
  create(avatar) {
    return database('avatars')
      .insert(avatar, ['id']);
  },
  update(update) {
    return database('avatars')
      .insert(update, Object.keys(update));
  },
  remove() {

  },
};

module.exports = Avatar;
