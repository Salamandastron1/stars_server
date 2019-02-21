// Update with your config settings.
/*eslint-disable*/
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/stars',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  testing: {
    client: 'pg',
    connection: 'postgres://localhost/teststar',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/testing',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + "ssl=true",
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/production',
    },
    useNullAsDefault: true,
  }
};
