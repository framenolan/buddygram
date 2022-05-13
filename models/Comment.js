const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    body: {
        type:DataTypes.TEXT,
        allowNull:false
    },
    commenter: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"unknown"
    }
},{
    sequelize
});

module.exports=Comment