'use strict';

var jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');

var config = require('../config'),
db = require('../services/database'),
User = require('../models/user');

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
  if(!req.body.email || !req.body.username || !req.body.password) {
    res.json({ message: 'Please provide an email, username, and password.' });
  } else {
    db.sync().then(function() {
      var newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };

      return User.create(newUser).then(function() {
        res.status(201).json({ message: 'Account created!' });
      });
    }).catch(function(error) {
      res.status(403).json({ message: 'Username or email already exists!' });
    });
  }
}

AuthController.authenticateUser = function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.status(404).json({ message: 'Username and password are needed!' });
  } else {
    var username = req.body.username,
    password = req.body.password,
    potentialUser = { where: { username: username } };

    User.findOne(potentialUser).then(function(user) {
      if(!user) {
        res.status(404).json({ message: 'Authentication failed!' });
      } else {
        bcrypt.compare(password, user.password, function(error, isMatch) {
          if(isMatch && !error) {
            var token = jwt.sign(
              { username: user.username },
              config.keys.secret,
              { expiresIn: '30m' }
            );

            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(404).json({ message: 'Login failed!' });
          }
        });
      }
    }).catch(function(error) {
      res.status(500).json({ message: 'There was an error!' });
    });
  }
}


module.exports = AuthController;
