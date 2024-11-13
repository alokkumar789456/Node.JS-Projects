const { DataTypes } = require('sequelize');
const sequelize = require("../config/DB.js");

const Attendance = sequelize.define('Attendance', {
  empId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Emp',  // Assuming "Emp" is the name of your Employee model
      key: 'empId'
    }
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  timeDuration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING, 
    allowNull: true
  }
}, {
  tableName: 'attendance',
  timestamps: false
});

module.exports = Attendance;
