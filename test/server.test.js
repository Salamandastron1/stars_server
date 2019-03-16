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
  describe('avatars', () => {
    describe('GET', () => {
      it('should return an avatar defined by star amount', done => {
        chai.request(app)
          .get('/api/v1/avatar')
          .send({
            stars: 35,
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('array');
            expect(response.body[0]).to.have.property('avatar_url');
            expect(response.body[0].avatar_url).to.be.a('string');
            done()
          })
      })
      it('should reject if extra params are sent', done => {
        chai.request(app)
          .get('/api/v1/avatar')
          .send({
            stars: 35,
            meow: 'meow',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(401);
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.be.a('string');
            done()
          })
      })
      it('should reject if wrong key is sent in the body object', done => {
        chai.request(app)
          .get('/api/v1/avatar')
          .send({
            cat: 32,
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(400)
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Your inquiry must be made with the follow parameters: Object key: stars value: [number]')
            done()
          })
      })
      it('should reject if wrong type of value is sent in the body object', done => {
        chai.request(app)
          .get('/api/v1/avatar')
          .send({
            stars: 'meow',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(400)
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Your inquiry must be made with the follow parameters: Object key: stars value: [number]')
            done()
          })
      })
    })
    describe('POST', () => {
      it('should create a new avatar url', done => {
        chai.request(app)
          .post('/api/v1/avatar')
          .send({
            avatar_url: 'www.meowmix.please',
            threshold: 35
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(201);
            expect(response.body).to.be.a('array');
            expect(response.body[0]).to.have.property('id');
            done()
          })
      })
      it('should reject  post with the wrong keys in body', done => {
        chai.request(app)
          .post('/api/v1/avatar')
          .send({
            avatar: 'urlulrurlstring',
            threshold: 34,
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('message');
            done()
          })
      })
      it('should reject if there are too many keys', done => {
        chai.request(app)
          .post('/api/v1/avatar')
          .send({
            meow: 34,
            threshold: 74,
            avatar_url: 'urlstring',
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message');
            done()
          })
      })
      it('should reject if there are no keys present', done => {
        chai.request(app)
          .post('/api/v1/avatar')
          .send({})
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(403);
            expect(response.body).to.have.property('message');
            done();
          })
      })
    })
    describe('PUT', () => {
      it('should update an parameter if sent', done => {
        chai.request(app)
          .put('/api/v1/avatar')
          .send({
            threshold: 25,
          })
          .end((err, response) => {
            expect(err).to.be.null;
            expect(response).to.be.json;
            expect(response).to.have.status(202);
            console.log(response.body)
            expect(response.body).to.be.a('array')
            done();
          })
      })
    })
  })
  process.removeAllListeners();
})