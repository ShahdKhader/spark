const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Skill = sequelize.define('Skill', {
    skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = Skill;
