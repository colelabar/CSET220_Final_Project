'use strict';

// checks for the correct access level and user role in auth checks

exports.allowOnly = function(accessLevel, callback) {
  console.log('it made it to Allow Only');
  function checkUserRole(req, res) {
    if(!(accessLevel & req.user.role)) {
      console.log(req.user);
      res.sendStatus(403);
      return;
    }

    callback(req, res);
  }

  return checkUserRole;
};
