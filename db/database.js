const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('expressJS_DB', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    port: 3000 // Default port for PostgreSQL
});

//Above info. for more clearification:-
// DB name- expressJS_DB, username- postgres, password- 123456 (all these must be in quoate ('' or ""))

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = { sequelize, User };