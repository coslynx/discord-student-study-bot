const { Sequelize, DataTypes } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../config/database.config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  guildId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['manageNotes', 'manageBooks', 'manageResources', 'manageGroups'],
  },
  // Add other user-specific fields as needed
});

module.exports = User;