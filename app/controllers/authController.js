'use strict';

var jwt = require('jsonwebtoken'),
http = require('http'),
bcrypt = require('bcryptjs'),
cookieParser = require('cookie-parser');


var config = require('../config'),
db = require('../services/database'),
User = require('../models/user');

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
  console.log(req.body.email);
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
        res.redirect('/login');
        // res.status(201).json({ message: 'Account created!' });
      });
    }).catch(function(error) {
      res.status(403).json({ message: 'Username or email already exists!' });
    });
  }
}

AuthController.authenticateUser = function(req, res, next) {
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
            const token = jwt.sign(
              { username: user.username },
              config.keys.secret,
              { expiresIn: '30m' }
            );
            user.save().then(function(){
              res.cookie('auth_token', token);
              return res.json({ user: User.toAuthJSON});
            }).catch(next);
            // res.status(200).send('Everything is alright');
          } else {
            res.redirect('/login');
          }
        });
      }
    }).catch(function(error) {
      res.status(500).json({ message: 'There was an error!' });
    });
  }
}

AuthController.verifyToken = function(req, res, next) {
  if(!req.cookies.auth_token) {
    console.log('no token');
    res.redirect('/401');
  } else {
    jwt.verify(req.cookies.auth_token, config.keys.secret, (err, decoded)=>{
      if(err){
        res.status(403).json({
          message:"Wrong Token"
      });
      } else {
        req.decoded=decoded;
        res.set({username: decoded.username})
        console.log(req.decoded);
        console.log(req.decoded.username);
        next()
      }
    });
  }
}

AuthController.ensureAuthenticated = function(req, res, next) {
  if (!(req.cookies.auth_token && req.body.username)) {
    res.end;
    // res.redirect('/login');
  } else {
    console.log('it made it to the auth check');
  }
  next()
}


module.exports = AuthController;
