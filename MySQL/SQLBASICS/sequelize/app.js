const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("DB1","root","Root.@123",{
    host:
})