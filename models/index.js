const User = require("./User");
const Vite = require("./Vite");
const Comment = require("./Comment")

User.hasMany(Vite);
Vite.belongsTo(User);

Vite.hasMany(Comment);
Comment.belongsTo(Vite);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
    User,
    Vite,
    Comment
}