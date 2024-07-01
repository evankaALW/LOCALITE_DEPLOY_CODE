const { Sequelize } = require('sequelize');
require('dotenv').config();
//code to make connection with the MySQL db by providing mysql credentials, connection made with help of sequelize library
const seque = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect: process.env.DIALECT
    }
);

seque.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = seque;
