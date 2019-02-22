/*eslint-disable*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const environment = process.env.NODE_ENV || 'testing';
const config  = require('../knexfile')[environment];
const database = require('knex')(config);

const { expect } = chai;

chai.use(chaiHttp);

describe('app', () => {
  describe('/', () => {
    it('should return a list of end points', done => {
      chai.request(app)
        .get('/')
        .end((err, response) => {
          expect(err).to.be.null;
          expect(response).to.be.json;
          expect(response).to.have.status(200);
          done();
        })
    })
  })
  describe('/users', () => {
    beforeEach(done => {
      console.log('before')
      database.migrate
        .rollback()
        .then(() => database.migrate.latest())
        .then(() => database.seed.run())
        .then(() => done())
        .catch(err => console.log(err.message))
        .done();
    })
    it('should return a list of all users', done => {
      const keys = ['id', 'username', 'stars']
      chai.request(app)
        .get('/api/v1/users')
        .send({
          email: 'drakeathon@yahoo.com',
          password: 'fakeandgay',
        })
        .end((err, response) => {
          expect(err).to.be.null;
          expect(response).to.be.json;
          expect(response.body).to.be.a('array');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('username');
          expect(response.body[0]).to.have.property('stars');
          done();
        })
    })
  })
})