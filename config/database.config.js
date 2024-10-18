const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'your_database_user';
const DB_PASS = process.env.DB_PASS || 'your_database_password';
const DB_NAME = process.env.DB_NAME || 'your_database_name';

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
};