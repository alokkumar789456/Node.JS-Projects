const express = require("express");
const app = express();
const port = 3000;

// 1.connecting to DataBase  
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("DB1", "root", "Root.@123", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

// 2.Authenticate the DataBase OR Check The DataBase
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => {
    console.error("Something Went Wrong!", error);
  });

// 2.1.Sync The dataBase
sequelize
  .sync()
  .then(() => {
    console.log("Database Synced Successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// 3.Create a Model
const DataTypes = require("sequelize");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

// 4.create a USER
app.use(express.json());

app.post("/", async (req, res) => {
  const { fName, lName } = req.body;
  const newUser = await User.create({ firstName: fName, lastName: lName });
  res.status(201).json({ message: "User created successfully", user: newUser });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
