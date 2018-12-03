'use strict';

var config = require('../config'),
express = require('express'),
db = require('../services/database'),
User = require('../models/user');

// The admin controller.
var AdminController = {};

AdminController.allUsers = function(req, res, next) {
  User.findAll().then(users_raw => {
    // console.log(JSON.parse(JSON.stringify(users_raw)));
    let users = JSON.parse(JSON.stringify(users_raw));
    res.status(200).send(users);
  }).catch(function(error) {
    console.log(error);
  })
}

module.exports = AdminController;
