'use strict';

var jwt = require('jsonwebtoken'),
http = require('http'),
bcrypt = require('bcryptjs'),
cookieParser = require('cookie-parser');


var config = require('../config'),
db = require('../services/database'),
User = require('../models/user');

// The authentication controller
var AuthController = {};

// Register a user by passing their form inputs to the db and returns them to the login screen to log in
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

// function call when a user logs in, finds the user and signs them with a JWT if their credentials are correct. Returns errors if user is not found

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
              res.cookie('role', user.role);
              return res.json({ user: User.toAuthJSON});
            }).catch(error);
            // res.status(200).send('Everything is alright');
          } else if(!isMatch) {
            res.redirect('/login')
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

// Token check to ensure the user has logged in and been assigned a valid token

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
        res.set({
          username: decoded.username,
          role: req.cookies.role
        });
        console.log(req.decoded);
        console.log(req.decoded.username);
        next()
      }
    });
  }
}

// Role check to ensure the user has logged in and possesses the admin role IAW the user row in the db

AuthController.verifyRole = function(req, res, next) {
  if(!req.cookies.role) {
    console.log('no role');
    res.redirect('/401');
  } else if(req.cookies.role != 8) {
    console.log('no admin role');
    res.redirect('/403');
  } else {
    res.set({role: req.cookies.role})
    next()
  }
}

// Extra auth check, fallback in the event that verifyToken doesn't work

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
