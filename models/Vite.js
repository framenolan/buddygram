const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vite extends Model {}

Vite.init({
    location: {
         type: DataTypes.STRING,
         allowNull:false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    time: {
        type: DataTypes.TIME,
        allowNull:false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    capacity: {
        type: DataTypes.INTEGER,
    },
<<<<<<< HEAD
    imageURL: {
        type: DataTypes.STRING
    }
=======
>>>>>>> dev
},{
    sequelize
});
module.exports=Vite