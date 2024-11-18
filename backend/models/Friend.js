const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Friend = sequelize.define('Friend', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    friendId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted'),
        allowNull: false,
        defaultValue: 'pending'  // Default status when a friend request is sent
    }
});

module.exports = Friend;
