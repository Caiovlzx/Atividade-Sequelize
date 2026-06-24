const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Video = sequelize.define('Video', {
    titulo: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
});

module.exports = Video;