'use strict';

var config = require('../config'),
express = require('express'),
db = require('../services/database'),
Message = require('../models/message'),
User = require('../models/user');

// The admin controller.
var AdminController = {};

// Logic to get all users in the db
AdminController.allUsers = function(req, res, next) {
  User.findAll().then(users_raw => {
    // console.log(JSON.parse(JSON.stringify(users_raw)));
    let users = JSON.parse(JSON.stringify(users_raw));
    res.status(200).send(users);
  }).catch(function(error) {
    console.log(error);
  })
}

// logic to ban a user
AdminController.banUser = function(req, res, next) {
  console.log(req.body)
  var potentialUser = { where: { username: req.body.username } };
  User.findOne(potentialUser).then(function(user){
    if (user) {
      user.update({
        isFlagged: 1
      });
      res.status(200).send(user);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

// logic to ban a user
AdminController.unbanUser = function(req, res, next) {
  console.log(req.body)
  var potentialUser = { where: { username: req.body.username } };
  User.findOne(potentialUser).then(function(user){
    if (user) {
      user.update({
        isFlagged: 0
      });
      res.status(200).send(user);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

// logic to promote a user to admin
AdminController.promoteUser = function(req, res, next) {
  var potentialUser = { where: { username: req.body.username } };
  User.findOne(potentialUser).then(function(user){
    if (user) {
      user.update({
        role: 4
      });
      res.status(200).send(user);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

// logic to demote a user to standard user
AdminController.demoteUser = function(req, res, next) {
  var potentialUser = { where: { username: req.body.username } };
  User.findOne(potentialUser).then(function(user){
    if (user) {
      user.update({
        role: 2
      });
      res.status(200).send(user);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

AdminController.allMessages = function(req, res, next) {
  Message.findAll().then(message_raw => {
    let messages = JSON.parse(JSON.stringify(message_raw));
    res.status(200).send(messages);
  }).catch(function(error) {
    console.log(error);
  })
}

AdminController.allPrevMessages = function(req, res, next) {
  Message.findAll().then(message_raw => {
    let messages = JSON.parse(JSON.stringify(message_raw));
    res.status(200).send(messages);
  }).catch(function(error) {
    console.log(error);
  })
}

module.exports = AdminController;
