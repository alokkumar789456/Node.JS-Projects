const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME;
const name = process.env.NAME;
const password = process.env.PASSWORD;
const localhost = process.env.HOST;
const port = process.env.DBPORT;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(dbName, name, password, {
  host: localhost,
  port: port,
  dialect: dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DataBase Authenticated Successfully");
  })
  .catch((err) => {
    console.error("DataBase Was Not Authenticated! ", err.message);
  });

sequelize
  .sync()
  .then(() => {
    console.log("DataBase was Synced Successfully");
  })
  .catch((err) => {
    console.error("DataBase Did Not sync Properly ", err.message);
  });

module.exports = sequelize;
