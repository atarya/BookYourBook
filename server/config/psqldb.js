
const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config({ path: '../../.env' });
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
});

module.exports = {
    sequelize
}