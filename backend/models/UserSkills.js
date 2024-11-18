const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserSkills = sequelize.define('UserSkills', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    skill_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Skills',
            key: 'id',
        },
        onDelete: 'CASCADE'
    }
});

module.exports = UserSkills;
