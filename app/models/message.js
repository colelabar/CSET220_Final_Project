// The Message model
'use strict';

var Sequelize = require('sequelize');

var config = require('../config'),
db = require('../services/database');

// The model schema
var modelDefinition = {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.INTEGER,
    autoIncrement: true
  },

  username: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },

  message: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  }
};

// Define the User model
var MessageModel = db.define('message', modelDefinition);

module.exports = MessageModel;
