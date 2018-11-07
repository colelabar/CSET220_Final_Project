'use strict';

var router = require('express').Router();

var config = require('../config'),
  AuthController = require('../controllers/authController'),
  allowOnly = require('../services/routesHelper').allowOnly,
  UserController = require('../controllers/userController'),
  AdminController = require('../controllers/AdminController');

var APIRoutes = function(passport) {

  router.post('/signup', AuthController.signUp);

  router.post('/login', AuthController.authenticateUser);

  router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));

  router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));



  return router;
};

module.exports = APIRoutes;
