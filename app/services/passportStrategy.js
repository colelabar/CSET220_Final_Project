'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./../models/user'),
  config = require('./../config');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  var options = {};

  options.secretOrKey = config.keys.secret;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  options.ignoreExpiration = false;

  // Find a user matching the username and return that user back to the AuthController

  passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
    User.findOne({ where: { username: JWTPayload.username } })
      .then(function(user) {
        if(!user) {
          callback(null, false);
          return;
        } else {

        callback(null, user);
      }
    });
  }));
}

module.exports = hookJWTStrategy;
