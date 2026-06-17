const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define(
    'usuario',
    {
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        idade: {
            type: DataTypes.INTEGER,
        }

    },
    {
        tableName: 'Usuarios',
        timestamps: true
    }
);

module.exports = Usuario;  