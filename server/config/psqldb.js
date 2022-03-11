
const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config({ path: '../../.env' });
const { DB_URI, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_URI, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
});

module.exports = {
    sequelize
}