
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('avatars', (table) => {
      table.string('threshold');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('avatars', (table) => {
      table.dropColumn('threshold');
    }),
  ]);
};
