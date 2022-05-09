const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    body: {
        type:DataTypes.TEXT,
        allowNull:false
    },
    postedTime: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    sequelize
});

module.exports=Comment