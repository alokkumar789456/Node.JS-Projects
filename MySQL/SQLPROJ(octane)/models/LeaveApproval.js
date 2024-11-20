const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");

const LeaveApproval = sequelize.define("LeaveApproval", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    empId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emp', // Assumes emp table is already defined
            key: 'empId',
        },
    },
    leaveStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leaveCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    deductedSalary: {
        type: DataTypes.VIRTUAL,
        get() {
            return (this.totalSalary / 30) * this.leaveCount;
        },
    },
    monthlySalary: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.totalSalary - this.deductedSalary;
        },
    },
}, {
    tableName: "LeaveApproval",
    timestamps: true,
});

module.exports = LeaveApproval;
