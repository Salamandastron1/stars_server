/*eslint-disable*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const environment = 'testing';
const config  = require('../knexfile')[environment];
const database = require('knex')(config);

const { expect } = chai;

chai.use(chaiHttp);

describe('app', () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => database.seed.run())
      .then(() => done())
      .catch(err => console.log(err.message))
      .done();
  })
  afterEach(done => {
    database.migrate
      .rollback()
      .then(() => done())
      .catch(err => console.log(err.message))
      .done();
  })
})