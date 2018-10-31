'use strict';

var jwt = require('jsonwebtoken');

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
          console.log(error)
            // res.status(403).json({ message: 'Username already exists!' });
        });
    }
}

module.exports = AuthController;
