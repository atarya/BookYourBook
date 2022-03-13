const mongoose = require('mongoose');
const User = sequelize.define('User', {

    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },


    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    gender: {
        type: DataTypes.STRING,
        allowNull: false

    },

    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    current_society: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    address: {
        type: DataTypes.ARRAY,
        allowNull: false,
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, { timestamp: true });


module.exports = User;