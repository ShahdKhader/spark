const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

User.sync()
.then(() => {
    console.log('User table created successfully');
})
.catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = User;