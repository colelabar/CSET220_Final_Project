'use strict';

var config = require('./../config'),
    Sequelize = require('sequelize');

    // Initialize Sequelized DB

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);
