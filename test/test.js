const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const assert = require('assert');
var should = chai.should();
var server = require('../app/server.js');
var api = require('../app/routes/api.js');

// inititalize the use of Chai's submodules
chai.use(chaiHttp);

// test suite for the API routes
describe('API tests', () => {
  it('Should return a list of users in the system', () => {
    chai.request(api)
      .get('/user/users')
      .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('Should return a dataset of total messages sent for the visualization', () => {
    chai.request(api)
      .get('/messageovertime')
      .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });

  it('Should return the chat page route', () => {
    chai.request(api)
      .get('/chat')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the admin page route', () => {
    chai.request(api)
      .get('/admin')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });
});

// test suite for the standard routes
describe('Route tests', () => {
  it('Should return the homepage route', () => {
    chai.request(server)
      .get('/')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the login page route', () => {
    chai.request(server)
      .get('/login')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the signup page route', () => {
    chai.request(server)
      .get('/signup')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the privacy policy page route', () => {
    chai.request(server)
      .get('/privacy')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the 401 page route', () => {
    chai.request(server)
      .get('/401')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });

  it('Should return the 403 page route', () => {
    chai.request(server)
      .get('/403')
      .end(function(err, res){
      res.should.have.status(200);
    });
  });
});
