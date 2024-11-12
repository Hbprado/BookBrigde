const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Club = require('./Club');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Book.belongsTo(Club, { foreignKey: 'clubId' });
Club.hasMany(Book, { foreignKey: 'clubId' });

module.exports = Book;
