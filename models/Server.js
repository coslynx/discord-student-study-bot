const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../config/database.config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

const Server = sequelize.define('server', {
  guildId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  prefix: {
    type: Sequelize.STRING,
    defaultValue: '!',
  },
  welcomeMessage: {
    type: Sequelize.TEXT,
    defaultValue: 'Welcome to the server!',
  },
  // Add other server-specific fields as needed
});

module.exports = Server;