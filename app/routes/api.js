'use strict';

var router = require('express').Router();

var config = require('../config'),
  AuthController = require('../controllers/authController'),
  allowOnly = require('../services/routesHelper').allowOnly,
  UserController = require('../controllers/userController'),
  AdminController = require('../controllers/adminController');

  // Routes for the api and their functionality

var APIRoutes = function(passport) {

  router.post('/signup', AuthController.signUp);

  router.post('/login', AuthController.authenticateUser);

  router.get('/chat', AuthController.verifyToken);

  router.get('/admin', AuthController.verifyToken, AuthController.verifyRole);

  router.get('/users', AdminController.allUsers);

  router.get('/messageovertime', AdminController.allMessages);

  router.put('/userban', AdminController.banUser);

  router.put('/userpromote', AdminController.promoteUser);

  router.put('/userdemote', AdminController.demoteUser);



  return router;
};

module.exports = APIRoutes;
