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
  })
  afterEach(function (done) {
    database.migrate.rollback()
      .then(function () {
        done();
      });
    
  });
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
    describe('GET', () => {
      it('should return a user', done => {
        chai.request(app)
          .get('/api/v1/users')
          .send({
            email: 'drakeathon@yahoo.com',
            password: 'fakeandgaytest',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('array');
            expect(response.body[0]).to.have.property('username');
            expect(response.body[0]).to.have.property('stars');
            done();
          })
      })
      it('should return an error if password is wrong', done => {
        chai.request(app)
          .get('/api/v1/users')
          .send({
            email: 'drakeathon@yahoo.com',
            password: 'meowmixmeowmix',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(401);
            expect(response.body).to.have.property('message');
            done();
          })
      })
    })
    // describe('POST', () => {
    //   it('should create a user', done => {
    //     chai.request(app)
    //       .post('/api/v1/users')
    //       .send({
    //         email: 'jimparody@yahoo.com',
    //         password: 'Wicked1!',
    //       })
    //       .end((err, response) => {
    //         expect(err).to.be.null;
    //         expect(response).to.be.json;
    //         expect(response).to.have.status(200);
    //         expect(response.body).to.be.a('array');
    //         expect(response)
    //         done();
    //       })
    //   })
    // })
  })
})