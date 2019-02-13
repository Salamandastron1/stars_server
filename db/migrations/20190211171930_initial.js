exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username');
      table.string('email').unique();
      table.string('password');
      table.integer('stars');
    }),
    knex.schema.createTable('avatars', table => {
      table.increments('id').primary();
      table.string('avatar_url');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.dropTable('avatars'),
    knex.dropTable('users')
  ])
};
