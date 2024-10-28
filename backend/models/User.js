const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,    
        allowNull: true,
    }
});

User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
