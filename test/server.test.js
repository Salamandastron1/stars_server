/*eslint disable*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../routes/queries');

const environment = 'testing';
const config  = require('../knexfile')[environment];
const database = require('knex')(config)
