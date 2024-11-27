const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB.js");
const bcrypt = require("bcrypt");

const Employee = sequelize.define(
  "Emp",
  {
    empId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "emp",
    timestamps: false,
  }
);

Employee.beforeCreate(async (employee) => {
  const saltRounds = 10;
  employee.password = await bcrypt.hash(employee.password, saltRounds);
});

Employee.beforeUpdate(async (employee) => {
  const saltRounds = 10;
  if (employee.changed("password")) {
    employee.password = await bcrypt.hash(employee.password, saltRounds);
  }
});

// const createAccounts = async () => {
//   const accounts = [
//     {
//       empId: 1,
//       email: "admin@gmail.com",
//       password: "admin",
//       role: "ADMIN",
//       dept: "IT",
//       branch: "BLORE",
//       admin: 1,
//       createdBy: null,
//     },
//     {
//       empId: 10,
//       email: "emp@gmail.com",
//       password: "admin",
//       role: "trainee",
//       dept: "IT",
//       branch: "BLORE",
//       admin: 0,
//       createdBy: null,
//     },
//     {
//       empId: 17,
//       email: "emp06@gmail.com",
//       password: "admin",
//       role: "trainee",
//       dept: "IT",
//       branch: "BLORE",
//       admin: 0,
//       createdBy: null,
//     },
//     {
//       empId: 22,
//       email: "emp21@gmail.com",
//       password: "admin",
//       role: "trainee",
//       dept: "IT",
//       branch: "BLORE",
//       admin: 0,
//       createdBy: null,
//     },
//     {
//       empId: 52,
//       email: "testemployee@gmail.com",
//       password: "admin",
//       role: "Employee",
//       dept: "IT",
//       branch: "Headquarters",
//       admin: 0,
//       createdBy: null,
//     },
//   ];

//   try {
//     for (const account of accounts) {
//       await Employee.create(account);
//       console.log(account);
//     }
//     console.log("Accounts created successfully!");
//   } catch (error) {
//     console.error("Error creating accounts:", error.message);
//   }
// };

// createAccounts()



module.exports = Employee;
