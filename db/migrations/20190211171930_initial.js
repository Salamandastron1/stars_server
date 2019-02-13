exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username');
      table.string('email').unique();
      table.string('password');
    }
  ])
};

exports.down = function(knex, Promise) {
  
};
