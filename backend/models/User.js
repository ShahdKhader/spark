const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');
const Skill = require('./Skill'); 
const Friend = require('./Friend');

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

// Hash password before saving
User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Skills association
User.belongsToMany(Skill, { through: 'UserSkills', foreignKey: 'user_id' });
Skill.belongsToMany(User, { through: 'UserSkills', foreignKey: 'skill_id' });

// Friends associations
User.belongsToMany(User, {
    as: 'SentRequests', // For users who send friend requests
    through: Friend,
    foreignKey: 'userId',
    otherKey: 'friendId'
});

User.belongsToMany(User, {
    as: 'ReceivedRequests', // For users who receive friend requests
    through: Friend,
    foreignKey: 'friendId',
    otherKey: 'userId'
});

module.exports = User;
