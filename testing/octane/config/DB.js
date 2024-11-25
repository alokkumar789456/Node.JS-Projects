const { Sequelize } = require("sequelize");
require("dotenv").config();

// Environment variables
const dbName = process.env.DB_NAME;
const username = process.env.NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.DBPORT;
const dialect = process.env.DIALECT;

// Sequelize instance
const sequelize = new Sequelize(dbName, username, password, {
  host,
  port,
  dialect,
  logging: false,
});

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database authenticated successfully");

    await sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Database initialization error: ", error.message);
  }
};

// Call the initialization function only in non-test environments
if (process.env.NODE_ENV !== "test") {
  initializeDatabase();
}

// Export the Sequelize instance
module.exports = sequelize;
