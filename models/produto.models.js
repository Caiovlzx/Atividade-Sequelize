const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define(
    'produto',
    {
        nome: {
            type: DataTypes.STRING,
        },
        preco: {
            type: DataTypes.FLOAT,
        }
    },
    {
        tableName: 'Produtos',
        timestamps: true
    }
);

module.exports = Produto;  