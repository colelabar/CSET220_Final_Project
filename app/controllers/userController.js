'use strict';

// The user controller.
var UserController = {
  index: function(req, res) {
    res.status(200).json({ message: 'Welcome to the chat room' + req.user.username + '!' });
  }
};

module.exports = UserController;
