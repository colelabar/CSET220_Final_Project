// Application configuration.
'use strict';

var config = module.exports;

// Configurations settings for the database credentials

config.db = {
  user: 'we6djsflotdx49ks',
  password: 'i5h176cgvclrn7ee',
  name: 'sip9mjfac89e2k6u'
};

config.db.details = {
  host: 'i943okdfa47xqzpy.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  dialect: 'mysql'
};

config.keys = {
  secret: 'keyboardcat'
};

// Config settings for the user roles and access levels

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4,     // ...100
    sradmin: 8    // ...1000
};

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin | userRoles.sradmin,   // ...1111
    user: userRoles.user | userRoles.admin | userRoles.sradmin,                       // ...1110
    admin: userRoles.admin | userRoles.sradmin,                                       // ...1100
    sradmin: userRoles.sradmin,                                                       // ...1000
};
