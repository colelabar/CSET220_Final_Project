'use strict';

// The user controller.
var UserController = {
  index: function(req, res) {
    console.log(req.user.username + ' has just logged onto the channel!');
  }
};

module.exports = UserController;
