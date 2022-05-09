const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vite extends Model {}

Vite.init({
    location: {
         type: DataTypes.STRING,
         allowNull:false
    },
    time: {
        type: DataTypes.DATE,
        allowNull:false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    capacity: {
        type: DataTypes.INTEGER
    }
},{
    sequelize
});

module.exports=Vite