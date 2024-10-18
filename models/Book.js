const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../config/database.config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  authors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  isbn: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  coverImage: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.STRING,
  },
});

module.exports = Book;