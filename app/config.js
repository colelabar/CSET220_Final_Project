// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'root',
    password: '',
    name: 'final220'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.keys = {
    secret: 'keyboardcat'
};
