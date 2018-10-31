'use strict';

var router = require('express').Router();

var config = require('../config'),
    AuthController = require('../controllers/authController');

var APIRoutes = function(passport) {

  router.post('/signup', AuthController.signUp);

  return router;
};

module.exports = APIRoutes;
