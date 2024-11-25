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



module.exports = Employee;
