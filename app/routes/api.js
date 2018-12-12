'use strict';

var router = require('express').Router();

var config = require('../config'),
  AuthController = require('../controllers/authController'),
  allowOnly = require('../services/routesHelper').allowOnly,
  UserController = require('../controllers/userController'),
  AdminController = require('../controllers/adminController');

  // Routes for the api and their functionality

var APIRoutes = function(passport) {

  router.post('/user/signup', AuthController.signUp);

  router.post('/user/login', AuthController.authenticateUser);

  router.get('/chat', AuthController.verifyToken);

  router.get('/user/admin', AuthController.verifyToken, AuthController.verifyRole);

  router.get('/user/users', AdminController.allUsers);

  router.get('/messageovertime', AdminController.allMessages);

  router.get('/previousmessages', AdminController.allPrevMessages);

  router.put('/admin/userban', AdminController.banUser);

  router.put('/admin/userunban', AdminController.unbanUser);

  router.put('/admin/userpromote', AdminController.promoteUser);

  router.put('/admin/userdemote', AdminController.demoteUser);



  return router;
};

module.exports = APIRoutes;
