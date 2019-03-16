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
      })
      .catch(error => console.log(error))
    // process.removeListener();
    
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
            expect(response.body[0]).to.have.property('id');
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
    describe('POST', () => {
      it('should create a user', done => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            email: 'jimparody@yahoo.com',
            password: 'Wicked1!',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(201);
            expect(response.body).to.be.a('array');
            expect(response.body[0]).to.be.a('number')
            done();
          })
      })
      it('it should deny if there are more params than required', done => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            email: 'drakeathon@yahoo.com',
            password: 'fakeandgaytest',
            evil: 'gonnafuckyoshit'
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.be.a('string');
            done()
          })
        
      })
      it('should deny if params are missing', done => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            email: 'drakeathon@yahoo.com',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.be.a('string');
            done()
          })
      })
      it('should deny if user exists', done => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            email: 'drakeathon@yahoo.com',
            password: 'fakeandgaytest',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(500);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.be.a('string');
            done()
          })
      })
    })
    describe('PUT', () => {
      it('should update the amount of stars a user has', done => {
        chai.request(app)
          .put('/api/v1/users/1')
          .send({
            stars: 3,
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.have.status(204);
            done()
          })
      })
    })
  })
  process.removeAllListeners();
})